import Link from "next/link";
import { BsDiscord } from "react-icons/bs";

export const IcoDiscord = ({ link }: { link: string }) => {
  return (
    <Link href={link} target="_blank">
      <BsDiscord />
    </Link>
  );
};
