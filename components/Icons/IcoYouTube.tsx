import Link from "next/link";
import { BsYoutube } from "react-icons/bs";

export const IcoYouTube = ({ link }: { link: string }) => {
  return (
    <Link href={link} target="_blank">
      <BsYoutube />
    </Link>
  );
};
