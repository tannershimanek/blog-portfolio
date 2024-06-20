import Link from "next/link";
import { BsGithub } from "react-icons/bs";

export const IcoGitHub = ({ link }: { link: string }) => {
  return (
    <Link href={link} target="_blank">
      <BsGithub />
    </Link>
  );
};
