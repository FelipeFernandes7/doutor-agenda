"use client";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  return (
    <button
      onClick={() =>
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/authentication");
            },
          },
        })
      }
      className="h-8 w-fit rounded-md bg-red-500/10 px-4 text-red-600 transition-all duration-300 ease-in active:scale-95"
    >
      Sair
    </button>
  );
}
