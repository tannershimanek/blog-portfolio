import "./globals.css";
import { Inter } from "next/font/google";
import { CMS_NAME } from "@/lib/constants";
import { Container } from "@/components/Util/Container";
import Link from "next/link";
import {
  Popover,
  PopoverButton,
  PopoverOverlay,
  PopoverPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Footer } from "@/components/Footers/FooterTemplate";

export const metadata = {
  title: `Blog - Tanner Shimanek`,
  description: `This is a blog built by Tanner Shimanek.`,
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

function AvatarContainer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={
        "h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10"
      }
      {...props}
    />
  );
}

function Avatar({
  large = false,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Link>, "href"> & {
  large?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Home"
      className={"pointer-events-auto"}
      {...props}
    >
      <img
        src={
          "https://images.ctfassets.net/58na20jjf1ok/7AF4RL1xUVhEf17gXozsAc/f050fcff98111b9d80ae0b875de17efe/718EDA39-B154-46CB-95C6-332CF09569DF.webp"
        }
        alt=""
        sizes={"2.25rem"}
        className={
          "rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 h-9 w-9"
          // large ? "h-16 w-16" : "h-9 w-9"
        }
        // priority
      />
    </Link>
  );
}

function MobileNavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <PopoverButton as={Link} href={href} className="block py-2">
        {children}
      </PopoverButton>
    </li>
  );
}

function CloseIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 8 6" aria-hidden="true" {...props}>
      <path
        d="M1.75 1.75 4 4.25l2.25-2.5"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className={
          "relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
        }
      >
        {children}
      </Link>
    </li>
  );
}

function DesktopNavigation(props: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav {...props}>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        <NavItem href="/">Home</NavItem>
        <NavItem href="/about">About</NavItem>
        <NavItem href="/projects">Projects</NavItem>
        <NavItem href="/blog">Blog</NavItem>
      </ul>
    </nav>
  );
}
function MobileNavigation(
  props: React.ComponentPropsWithoutRef<typeof Popover>
) {
  return (
    <Popover {...props}>
      <PopoverButton className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
        Menu
        <ChevronDownIcon className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
      </PopoverButton>
      <Transition>
        <TransitionChild
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <PopoverOverlay className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />
        </TransitionChild>
        <TransitionChild
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <PopoverPanel
            focus
            className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
          >
            <div className="flex flex-row-reverse items-center justify-between">
              <PopoverButton aria-label="Close menu" className="-m-1 p-1">
                <CloseIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
              </PopoverButton>
              <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Navigation
              </h2>
            </div>
            <nav className="mt-6">
              <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                <MobileNavItem href="/">Home</MobileNavItem>
                <MobileNavItem href="/about">About</MobileNavItem>
                <MobileNavItem href="/projects">Projects</MobileNavItem>
                <MobileNavItem href="/blog">Blog</MobileNavItem>
              </ul>
            </nav>
          </PopoverPanel>
        </TransitionChild>
      </Transition>
    </Popover>
  );
}

function Header() {
  return (
    <div
      className="top-0 z-10 h-16 pt-6"
      style={{
        position: "var(--header-position)" as React.CSSProperties["position"],
      }}
    >
      <Container
        className="top-[var(--header-top,theme(spacing.6))] w-full"
        style={{
          position:
            "var(--header-inner-position)" as React.CSSProperties["position"],
        }}
      >
        <div className="relative flex gap-4">
          <div className="flex flex-1"></div>
          <div className="flex flex-1 justify-end md:justify-center">
            <DesktopNavigation className="pointer-events-auto hidden md:block" />
            <MobileNavigation className="pointer-events-auto md:hidden" />
          </div>

          <div className="flex justify-end md:flex-1">
            <div className="pointer-events-auto"></div>
          </div>
        </div>
      </Container>
    </div>
  );
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
      <link rel="icon" href="/avatar-no-bg.png" sizes="any" />
      </head>
      <body>
        <Header />
        <section className="min-h-screen">
          <main>{children}</main>
          <Footer />
        </section>
      </body>
    </html>
  );
}
