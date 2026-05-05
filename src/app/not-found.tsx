import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 p-8 text-center">
      <h2 className="text-4xl font-bold">404</h2>
      <p className="text-xl text-muted-foreground">Page not found</p>
      <p className="text-muted-foreground max-w-md">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
      >
        Return home
      </Link>
    </div>
  );
}
