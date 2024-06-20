import Link from "next/link";
import { BsTiktok } from "react-icons/bs";

export const IcoTikTok = ({ link }: { link: string }) => {
  return (
    <Link href={link} target="_blank">
      <BsTiktok />
    </Link>
  );
};
