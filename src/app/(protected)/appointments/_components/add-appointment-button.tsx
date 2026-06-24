"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { doctorsTable, patientsTable } from "@/db/schema";

import { CreateAppointmentForm } from "./create-appointment-form";

interface AddAppointmentButtonProps {
  patients: Array<typeof patientsTable.$inferSelect>;
  doctors: Array<typeof doctorsTable.$inferSelect>;
}

export function AddAppointmentButton({
  patients,
  doctors,
}: AddAppointmentButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Novo agendamento
        </Button>
      </DialogTrigger>
      <CreateAppointmentForm
        isOpen={isOpen}
        onSuccess={() => setIsOpen(false)}
        patients={patients}
        doctors={doctors}
      />
    </Dialog>
  );
}
