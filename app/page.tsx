import { BackgroundLines } from "@/components/ui/background-lines";
import PulsatingButton from "@/components/ui/pulsating-button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen h-screen w-screen overflow-hidden p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
          <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
            POLITICAL SCIENCE <br /> PROJECT.
          </h2>
          <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
            By : Josh, Grace, & Brandon
          </p>
          <PulsatingButton pulseColor="#595959" className="bg-black mt-10 ">
            <Link href="/demo">PLAY NOW</Link>
          </PulsatingButton>
        </BackgroundLines>
      </main>
    </div>
  );
}
