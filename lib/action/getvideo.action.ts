import * as z from 'zod';
import axios from 'axios';
import { FormSchema } from '@/components/shared/download-form';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// Enhanced Download Action
export const getvideoAction = async (values: z.infer<typeof FormSchema>) => {
  try {
    // Validate & Sanitize Input
    const validatedFields = FormSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: 'Invalid URL. Please check and try again.' };
    }

    const { url } = validatedFields.data;

    // Extra URL Validation
    if (!url || !/^https?:\/\/(www\.)?youtube\.com|youtu\.be/.test(url)) {
      return { error: 'Invalid video URL. Please enter a valid YouTube URL.' };
    }

    // Send secure request to backend
    const response = await axios.post(`${BASE_URL}/api/get-video?url=${url}`, {
      timeout: 10000, // Prevent infinite waits
      responseType: 'json', // Expect JSON response
      headers: { 'Content-Type': 'application/json' },
    });

    if (response?.data?.error) {
      return { error: response.data.error };
    }

    return {
      success: 'Video fetched successfully!',
      videoDetails: response.data,
    };
  } catch (error: unknown) {
    console.error('Error in getvideoAction:', error);

    // Improved Error Handling
    if (axios.isAxiosError(error)) {
      return {
        error:
          error.response?.data?.error || 'Server error while fetching video.',
      };
    }

    return { error: 'Unexpected error occurred while fetching video.' };
  }
};
