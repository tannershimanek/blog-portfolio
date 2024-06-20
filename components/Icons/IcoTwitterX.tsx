import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";

export const IcoTwitterX = ({ link }: { link: string }) => {
  return (
    <Link href={link} target="_blank">
      <BsTwitterX />
    </Link>
  );
};
