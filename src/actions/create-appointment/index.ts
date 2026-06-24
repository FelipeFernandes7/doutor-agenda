"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { appointmentsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { createAppointmentSchema } from "./schema";

export const createAppointment = actionClient
  .schema(createAppointmentSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    if (!session.user.clinic) {
      throw new Error("User does not belong to any clinic.");
    }

    const [hours, minutes] = parsedInput.appointmentTime.split(":");
    const appointmentDateTime = new Date(parsedInput.appointmentDate);
    appointmentDateTime.setHours(Number(hours), Number(minutes), 0, 0);

    await db.insert(appointmentsTable).values({
      clinicId: session.user.clinic.id,
      patientId: parsedInput.patientId,
      doctorId: parsedInput.doctorId,
      date: appointmentDateTime,
    });

    revalidatePath("/appointments");
  });
