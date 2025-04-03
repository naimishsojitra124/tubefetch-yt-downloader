'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useTransition, useMemo, useCallback } from 'react';
import { Card, CardContent } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { FormError } from './form-error';
import { FormSuccess } from './form-success';
import { useRouter } from 'next/navigation';
import { getvideoAction } from '@/lib/action/getvideo.action';
import { Loader2 } from 'lucide-react';
import { downloadVideoAction } from '@/lib/action/download.action';
import Image from 'next/image';

// Video Format Interface
interface VideoFormat {
  format_id: string;
  quality: string;
  resolution: string;
  filesize: number;
  download_url: string;
}

// Video Information Interface
interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: number;
  formats: VideoFormat[];
}

// Resolution-to-Quality Mapping
const resolutionMap: Record<string, string> = {
  '256x144': '144p',
  '426x240': '240p',
  '640x360': '360p',
  '854x480': '480p',
  '1280x720': '720p',
  '1920x1080': '1080p60',
  '2560x1440': '1440p60',
};

// YouTube URL Validation Schema
export const FormSchema = z.object({
  url: z
    .string()
    .url()
    .regex(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/, {
      message: 'Invalid YouTube URL',
    }),
});

const DownloadForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { url: '' },
  });

  // Memoized Function to Get Best Video Formats
  const bestFormats = useMemo(() => {
    if (!videoInfo?.formats) return [];

    const selectedFormats: Record<string, VideoFormat> = {};

    videoInfo.formats.forEach((format) => {
      const resolutionQuality = resolutionMap[format.resolution];

      if (resolutionQuality) {
        const fileSize =
          typeof format.filesize === 'number' ? format.filesize : Infinity;

        if (
          !selectedFormats[resolutionQuality] ||
          fileSize < selectedFormats[resolutionQuality].filesize
        ) {
          selectedFormats[resolutionQuality] = format;
        }
      }
    });

    return Object.values(selectedFormats);
  }, [videoInfo]);

  // Handle Form Submission
  const onSubmit = useCallback(
    async (values: z.infer<typeof FormSchema>) => {
      setError(undefined);
      setSuccess(undefined);
      setVideoInfo(null);

      startTransition(async () => {
        const response = await getvideoAction(values);
        if (response.error) {
          setError(response.error);
        } else {
          setVideoInfo(response.videoDetails);
          setSuccess('Video details fetched successfully!');
        }
        router.refresh();
      });
    },
    [router]
  );

  return (
    <div className='w-full px-2 sm:px-[10%] md:px-40 gap-x-1.5 gap-y-6 flex flex-col items-center'>
      <span className='w-full font-semibold text-2xl sm:text-3xl md:text-6xl text-center pt-14'>
        Youtube <span className='text-[#15B37E]'>Video Downloader</span>
      </span>

      <span className='w-full md:w-1/ text-sm md:text-lg text-center text-gray-500'>
        Download any Youtube video of your choice with TubeFetch&apos;s Youtube
        Video Downloader, for absolutely free!
      </span>

      {/* Form */}
      <Card className='w-[95%] md:max-w-[70%] h-auto bg-gray-50 border-gray-100 border-2 shadow-lg text-zinc-950 flex flex-col items-center justify-center'>
        <CardContent className='w-full flex items-center justify-center'>
          {videoInfo ? (
            <div className='w-full'>
              {/* Video Thumbnail and Title */}
              <div className='text-center mb-5'>
                <Image
                  src={videoInfo.thumbnail}
                  alt='Video Thumbnail'
                  width={640} // Set proper width
                  height={360} // Set proper height
                  loading='lazy'
                  unoptimized={false}
                  className='w-full max-w-sm rounded-lg mx-auto'
                />
                <h2 className='sm:text-lg md:text-xl font-semibold mt-2'>
                  {videoInfo.title}
                </h2>
              </div>

              {/* Available Video Qualities */}
              <div className='w-full'>
                <h3 className='md:text-lg font-semibold mb-2'>
                  Select Video Quality:
                </h3>
                <div className='space-y-2'>
                  {bestFormats.map((format) => (
                    <div
                      key={format.format_id}
                      className='flex justify-between items-center bg-gray-100 p-3 rounded-lg'>
                      <span>
                        {format.quality} (
                        {(format.filesize / (1024 * 1024)).toFixed(2)} MB)
                      </span>
                      <Button
                        className='bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 cursor-pointer'
                        onClick={() =>
                          downloadVideoAction(
                            format.download_url,
                            videoInfo.title
                          )
                        }>
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='w-full md:w-4/5 space-y-6'>
                <FormField
                  control={form.control}
                  name='url'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor='url'
                        className='text-emerald-600 dark:text-emerald-400'>
                        YouTube Video URL{' '}
                        <span className='text-red-600 dark:text-red-400'>
                          *
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id='url'
                          type='url'
                          placeholder='Enter YouTube Video URL'
                          disabled={isPending}
                          className='border-2 border-stone-400 focus:border-emerald-600'
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormError message={error} />
                <FormSuccess message={success} />

                <Button
                  type='submit'
                  disabled={isPending}
                  className='w-full bg-emerald-600 text-zinc-50 hover:bg-emerald-700 cursor-pointer'>
                  {isPending ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Getting
                      video...
                    </>
                  ) : (
                    <>Get video</>
                  )}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DownloadForm;
