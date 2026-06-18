import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { usersToClinicsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { SignOutButton } from "./_components/sign-out-button";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  const clinics = await db.query.usersToClinicsTable.findMany({
    where: eq(usersToClinicsTable.userId, session.user.id),
  });

  if (clinics.length === 0) {
    redirect("/clinic-form");
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex flex-col space-y-4">
        <h1>{session?.user.name}</h1>
        <h1>{session?.user.email}</h1>
        {clinics.length > 0 &&
          clinics.map((clinic, index) => (
            <div
              key={index}
              className="flex w-full flex-col space-y-2 rounded-2xl border border-gray-300 bg-gray-100 p-3"
            >
              <h1>{clinic.clinicId}</h1>
              <p>{new Date(clinic.createdAt).toLocaleDateString("pt-BR")}</p>
            </div>
          ))}
      </div>
      <SignOutButton />
    </div>
  );
}
