import { useState } from "react";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "@/app/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import {
  createFrameworkControl,
} from "@/features/frameworkControls/frameworkControlsSlice";

import FrameworkControlForm from "./FrameworkControlForm";
import type {
  FrameworkControlFormValues,
} from "./FrameworkControlForm";

interface Props {
  groupId: string;
}

export default function CreateFrameworkControlDialog({
  groupId,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreate = async (
    values: FrameworkControlFormValues
  ) => {
    setLoading(true);

    const result = await dispatch(
      createFrameworkControl({
        groupId,
        ...values,
      })
    );

    if (createFrameworkControl.fulfilled.match(result)) {
      setOpen(false);
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Add Control</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Control</DialogTitle>
        </DialogHeader>

        <FrameworkControlForm
          submitLabel="Create Control"
          loading={loading}
          onSubmit={handleCreate}
        />
      </DialogContent>
    </Dialog>
  );
}
