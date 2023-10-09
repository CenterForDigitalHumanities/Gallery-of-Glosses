import { FC } from "react";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className="py-6 md:px-8 md:py-0 bg-background/95 backdrop-blur">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left ">
          &copy; {new Date().getFullYear()}. Gallery of Glosses.
        </p>
        <p className="text-center text-sm text-muted-foreground md:text-right ">
          <a
            href="https://github.com/shadcn-ui/ui"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 ml-auto"
          >
            Improve this page
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
