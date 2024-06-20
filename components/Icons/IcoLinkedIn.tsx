import Link from "next/link";
import { BsLinkedin } from "react-icons/bs";

export const IcoLinkedIn = ({ link }: { link: string }) => {
  return (
    <Link href={link} target="_blank">
      <BsLinkedin />
    </Link>
  );
};
