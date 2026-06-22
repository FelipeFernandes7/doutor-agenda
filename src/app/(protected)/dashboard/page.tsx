import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { SignOutButton } from "./_components/sign-out-button";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  if (!session.user.clinic) {
    redirect("/clinic-form");
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex flex-col space-y-4">
        <h1>{session?.user.name}</h1>
        <h1>{session?.user.email}</h1>
      </div>
      <SignOutButton />
    </div>
  );
}
