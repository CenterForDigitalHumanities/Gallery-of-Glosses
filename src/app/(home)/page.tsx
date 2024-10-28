import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="z-10 w-full items-center justify-between text-sm lg:block h-full">
      <section className="flex flex-col text-center px-8 mt-10 w-full">
        <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
          <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
            Gallery of Glosses
          </h1>
          <p className="mt-6 text-md sm:text-sm lg:text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
            Discover a curated collection of scholarly notes that provide
            insights into historical texts.
          </p>
          <div className="mt-6 sm:mt-10 flex flex-col gap-2 md:flex-row justify-center w-full text-sm">
            <a href="./docs/about">
              <Button className="truncate w-[150px]">What are Glosses?</Button>
            </a>
            <a href="./browse">
              <Button className="truncate w-[150px]">Start Browsing</Button>
            </a>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center px-8 mt-10 w-full ">
        <iframe
          className="rounded-md"
          src="https://www.youtube.com/embed/248EDx1u30Q?rel=0"
          allowFullScreen
        />
      </section>
    </div>
  );
}
