import dynamic from 'next/dynamic';
import Header from '@/components/shared/header';

// Lazy loading
const Benefits = dynamic(() => import('@/components/shared/benefits'));
const DownloadForm = dynamic(() => import('@/components/shared/download-form'));
const Introduction = dynamic(() => import('@/components/shared/introduction'));

export default function Home() {
  return (
    <div className="relative h-full w-full">
      {/* Fixed Header */}
      <header className="fixed h-16 md:h-20 w-full bg-white/30 backdrop-blur-md shadow-md md:shadow-lg z-50">
        <Header />
      </header>

      {/* Main Content */}
      <main className="pt-12 md:pt-20 h-full w-full space-y-10 md:space-y-14">
        <section>
          <DownloadForm />
        </section>

        <section className="bg-[#f5f5f5]">
          <Introduction />
        </section>

        <section>
          <Benefits />
        </section>

        {/* Footer */}
      <footer className="w-full bg-black text-white text-center mt-3 p-2">
        <span>© TubeFetch 2025. All Rights Reserved.</span>
      </footer>
      </main>
    </div>
  );
}
