import Link from "next/link";
import Image from "next/image";

export const SocialLinks = () => {
  return (
    <ul className="flex items-center gap-4">
      <li>
        <Link href="fb">
          <Image
            className="hover:text-primary"
            src="icons/facebook.svg"
            width={24}
            height={24}
            alt="facebook icon"
          />
        </Link>
      </li>
      <li>
        <Link href="tw">
          <Image
            src="icons/twitter.svg"
            width={24}
            height={19.5}
            alt="twitter icon"
          />
        </Link>
      </li>
      <li>
        <Link href="instagram">
          <Image
            src="icons/instagram.svg"
            width={24}
            height={24}
            alt="instagram icon"
          />
        </Link>
      </li>
    </ul>
  );
};
