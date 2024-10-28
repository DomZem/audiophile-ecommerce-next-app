"use client";

import { useRouter } from "next/navigation";

export const GoBackButton = () => {
  const router = useRouter();

  return (
    <button
      className="animation-standard capitalize hover:text-black"
      type="button"
      onClick={() => router.back()}
    >
      go back
    </button>
  );
};
