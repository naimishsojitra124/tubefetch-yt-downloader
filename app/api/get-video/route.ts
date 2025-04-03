import { NextResponse, NextRequest } from 'next/server';
import { spawn } from 'child_process';

const isValidYouTubeUrl = (url: string): boolean => {
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}/;
  return youtubeRegex.test(url);
};

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url || !isValidYouTubeUrl(url)) {
    return NextResponse.json({ error: 'Invalid or missing YouTube URL' }, { status: 400 });
  }

  return new Promise<Response>((resolve) => {
    const process = spawn('yt-dlp', ['-J', '--no-warnings', url]);

    let dataString = '';
    let errorString = '';

    process.stdout.on('data', (data) => {
      dataString += data.toString();
    });

    process.stderr.on('data', (data) => {
      errorString += data.toString();
    });

    process.on('close', (code) => {
      if (code !== 0) {
        console.error('yt-dlp error:', errorString.trim());
        resolve(NextResponse.json({ error: 'Failed to fetch video info' }, { status: 500 }));
        return;
      }

      try {
        const videoData = JSON.parse(dataString);
        if (!videoData || !videoData.title) {
          resolve(NextResponse.json({ error: 'Invalid response from yt-dlp' }, { status: 500 }));
          return;
        }

        const videoDetails = {
          title: videoData.title,
          author: videoData.uploader || 'Unknown',
          thumbnail: videoData.thumbnail || null,
          duration: videoData.duration || 0,
          formats: videoData.formats
            .filter((format: { format_note?: string }) => format.format_note)
            .map((format: { format_id: string; format_note: string; resolution: string; filesize?: number; url: string }) => ({
              format_id: format.format_id,
              quality: format.format_note,
              resolution: format.resolution || 'Unknown',
              filesize: format.filesize,
              download_url: format.url,
            })),
        };

        resolve(NextResponse.json(videoDetails, { status: 200 }));
      } catch (error) {
        console.error('Parsing error:', error);
        resolve(NextResponse.json({ error: 'Error parsing video info' }, { status: 500 }));
      }
    });
  });
}
