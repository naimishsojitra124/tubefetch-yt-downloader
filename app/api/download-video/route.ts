import axios from 'axios';
import contentDisposition from 'content-disposition';
import { NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';
import compression from 'compression';
import express from 'express';

const allowedDomains = ['youtube.com', 'googlevideo.com']; // Restrict to trusted domains

// Input validation schema using Zod
const querySchema = z.object({
  url: z.string().url(),
  title: z.string().min(1).max(100),
});

// Rate limiting variables
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 10; // Max 10 downloads per 2 minutes
const TIME_WINDOW = 2 * 60 * 1000; // 2 minutes

export async function GET(request: NextRequest) {
  const app = express();
  app.use(compression());

  try {
    // Extract and validate query parameters
    const { searchParams } = new URL(request.url);
    const url = decodeURIComponent(searchParams.get('url') || '');
    const title = decodeURIComponent(searchParams.get('title') || '');

    const validation = querySchema.safeParse({ url, title });
    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // Check for SSRF risk by allowing only specific domains
    const urlObject = new URL(url);
    if (!allowedDomains.some((domain) => urlObject.hostname.includes(domain))) {
      return NextResponse.json(
        { error: 'Unauthorized domain' },
        { status: 403 }
      );
    }

    // Get client IP correctly
    const clientIP =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';

    // Implement rate limiting
    const now = Date.now();
    const entry = rateLimitMap.get(clientIP) || { count: 0, timestamp: now };

    if (now - entry.timestamp > TIME_WINDOW) {
      // Reset limit after time window
      rateLimitMap.set(clientIP, { count: 1, timestamp: now });
    } else {
      if (entry.count >= RATE_LIMIT) {
        return NextResponse.json(
          { error: 'Rate limit exceeded' },
          { status: 429 }
        );
      }
      entry.count += 1;
      rateLimitMap.set(clientIP, entry);
    }

    // Fetch the video content as a stream
    const response = await axios.get(url, {
      responseType: 'stream',
      headers: {
        Connection: 'keep-alive', // Enable Keep-Alive for persistent connections
        'User-Agent': 'Mozilla/5.0', // Mimic a browser request for better performance
      },
      timeout: 10000, // Set a timeout (10s)
      maxRedirects: 5, // Prevent excessive redirects
    });

    // Set headers for secure and efficient downloading
    const headers = new Headers({
      'Content-Disposition': contentDisposition(`${title}.mp4`),
      'Content-Type': 'video/mp4',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    });

    // Fix TypeScript issue by using ReadableStream instead of any
    return new Response(response.data as ReadableStream, { headers });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Failed to download the video' },
      { status: 500 }
    );
  }
}
