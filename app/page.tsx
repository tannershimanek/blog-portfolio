import { draftMode } from "next/headers";
import Date from "./date";

import { getAllPosts } from "@/lib/api";
import { IcoGitHub } from "@/components/Icons/IcoGitHub";
import { IcoLinkedIn } from "@/components/Icons/IcoLinkedIn";
import { IcoTwitterX } from "@/components/Icons/IcoTwitterX";
import { IcoInstagram } from "@/components/Icons/IcoInstagram";
import { socialAccounts } from "@/static/links";

import ContentfulImage from "@/lib/contentful-image";
import Link from "next/link";
import clsx from "clsx";

import { Button } from "@/components/Buttons/Button";
import { Card } from "@/components/Cards/Card";
import { Container } from "@/components/Util/Container";
import { Newsletter } from "@/components/Forms/NewsLetter";
import { Metadata } from "next";

function BriefcaseIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  );
}

function ArrowDownIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Article({ article }: { article: any }) {
  console.log(article);
  return (
    <Card as="article">
      <Card.Title href={`/blog/posts/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {<Date dateString={article.date} />}
      </Card.Eyebrow>
      <Card.Description>{article.excerpt}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  );
}

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  );
}

function Role({ role }: { role: any }) {
  let startLabel =
    typeof role.start === "string" ? role.start : role.start.label;
  let startDate =
    typeof role.start === "string" ? role.start : role.start.dateTime;

  let endLabel = typeof role.end === "string" ? role.end : role.end.label;
  let endDate = typeof role.end === "string" ? role.end : role.end.dateTime;

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0" style={{backgroundColor: role.backgroundColor}}>
        <ContentfulImage
          src={
            role.logo
          }
          width={1000}
          height={1000}
          alt=""
          className="h-7 w-7"
        />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {role.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={startDate}>{startLabel}</time>{" "}
          <span aria-hidden="true">—</span>{" "}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </li>
  );
}

function Resume() {
  let resume: Array<any> = [
    {
      company: "TannerDotDev",
      title: "Founder",
      logo: 'https://images.ctfassets.net/58na20jjf1ok/75oWlU0u05olJiXhArmy9g/5614779bff8678e2d0271f9efc64c6b0/avatar-no-shadow.png',
      backgroundColor: "#FFDFBD",
      start: "2024",
      end: {
        label: "Present",
        // dateTime: (new Date() as any).getFullYear().toString(),
      },
    },
    {
      company: "Young Living Essential Oils",
      title: "Fullstack Developer",
      logo: 'https://images.ctfassets.net/58na20jjf1ok/3iPIQZkVGysPhCupN9TQce/5f7916e486e8e626a74a3f76d90e6cfe/YoungLivingLogo-Drop.svg',
      backgroundColor: "#f6f4ea",
      start: "2018",
      end: {
        label: "Present",
        // dateTime: (new Date() as any).getFullYear().toString(),
      },
    },
    {
      company: "Adobe",
      title: "Software Engineer; Capstone Intern",
      logo: 'https://images.ctfassets.net/58na20jjf1ok/CDqNL1CGch91n3i9qQTIW/dcc8ae2ab487e7c5fba6a0bf0e274576/0000017d-de39-7340-37e8-bd478662a1cd.jpg',
      backgroundColor: "#FF0000",
      start: "2023",
      end: "2024",
    },
  ];

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      <Button href="https://assets.ctfassets.net/58na20jjf1ok/giIU3GxfIJUl8KIFzydkQ/fb106e44b4115c43e536ad56d95a4088/Tanner_Shimanek_4-24.pdf" variant="secondary" className="group mt-6 w-full">
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  );
}

function Photos() {
  let rotations = [
    "rotate-2",
    "-rotate-2",
    "rotate-2",
    "rotate-2",
    "-rotate-2",
  ];

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {
          [
            "https://images.ctfassets.net/58na20jjf1ok/29AWGWPvaBcJooGGNW6v0N/879dbe9566fc16136c4df641352323cc/FeZsLY3VIAA-YuM.jpeg",
            "https://images.ctfassets.net/58na20jjf1ok/6yEFzDT3kFoBw6jHT7qjFj/f61e48ca0191ace348242e3f62c19351/lisha-riabinina-ErJiAxm6LdA-unsplash.jpg",
            "https://images.ctfassets.net/58na20jjf1ok/2FgA3dyT2Ga3RwotDJLTTY/5a85acbcf720325bcde17491e5cd859a/image-3.jpg",
            "https://images.ctfassets.net/58na20jjf1ok/3D0bhhhxBiOG9zxff89hDG/e4552a705fa1da0dc383214328c42338/FeZsKjKUAAEEHLo.jpeg",
            "https://images.ctfassets.net/58na20jjf1ok/3DXH6cG97o9wqDGsCf6R0/8225585b3708923f83b366a5fff36dc7/image-5.jpg",
          ].map((image, imageIndex) => (
            <div
              key={image}
              className={clsx(
                "relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800",
                rotations[imageIndex % rotations.length]
              )}
            >
              <ContentfulImage
                src={image}
                alt="placeholder image"
                quality={100}
                sizes="(min-width: 640px) 18rem, 11rem"
                width={299}
                height={330}
                priority
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ))
        }
      </div>
    </div>
  );
}

function AvatarContainer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={
        "h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10 mb-5"
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
        // width={1000}
        className={
          "rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 h-9 w-9"
          // large ? "h-16 w-16" : "h-9 w-9"
        }
        loading="lazy"
      />
    </Link>
  );
}

export const metadata: Metadata = {
  title: "Tanner Shimanek",
  description:
    "I’m Tanner Shimanek. I live in Salt Lake City, where I develop web apps.",
};

export default async function Home() {
  const { isEnabled } = draftMode();
  let articles = (await getAllPosts(isEnabled)).slice(0, 4);

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Software designer, founder, and amateur astronaut.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I’m Tanner, a software Engineer and entrepreneur based in Salt Lake
            City. I’m the founder and of TannerDotDev, where we develop
            technologies that empower people and businesses to automate on their
            own terms.
          </p>
          <div className="mt-6 flex gap-6">
            <IcoGitHub link={socialAccounts.github} />
            <IcoLinkedIn link={socialAccounts.linkedin} />
            <IcoTwitterX link={socialAccounts.x} />
            <IcoInstagram link={socialAccounts.instagram} />
          </div>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume />
          </div>
        </div>
      </Container>
    </>
  );
}
