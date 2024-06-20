import Link from "next/link";
import { BsInstagram } from "react-icons/bs";

export const IcoInstagram= ({ link }: { link: string }) => {
  return (
    <Link href={link} target="_blank">
      <BsInstagram />
    </Link>
  );
};
