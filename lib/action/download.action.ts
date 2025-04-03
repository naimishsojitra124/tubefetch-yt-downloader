export const downloadVideoAction = (() => {
  let timeoutId: NodeJS.Timeout | null = null; // Debounce timer

  return async (url: string, title: string) => {
    try {
      if (!url || !title) {
        console.error('Invalid download request: Missing URL or title.');
        return;
      }

      // Debounce to prevent multiple rapid clicks
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        // Limit URL length to prevent abuse
        if (url.length > 2000) {
          console.error('URL is too long. Possible abuse attempt.');
          return;
        }

        // Construct the API route securely
        const downloadUrl = `/api/download-video?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;

        // Use a single reusable anchor element
        const a = document.createElement('a');
        a.style.display = 'none'; // Prevent flickering
        a.href = downloadUrl;
        a.setAttribute('download', `${title}.mp4`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, 300); // 300ms delay to avoid excessive API requests
    } catch (error) {
      console.error('Download failed:', error);
    }
  };
})();
