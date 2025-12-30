import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store";
import { createFrameworkStage } from "@/features/frameworkStages/frameworkStagesSlice";
import FrameworkStageForm from "./FrameworkStageForm";

type Props = {
  frameworkId: string;
};

export default function CreateFrameworkStageDialog({ frameworkId }: Props) { // present
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);

  const handleCreate = async (data: {
    title: string;
    code?: string;
    description?: string;
    sortOrder?: number;
    metadata?: any;
  }) => {
    const resultAction = await dispatch(
      createFrameworkStage({
        frameworkId,
        data,
      })
    );

    // Close dialog only if create succeeded
    if (createFrameworkStage.fulfilled.match(resultAction)) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Stage</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Stage</DialogTitle>
        </DialogHeader>

        <FrameworkStageForm
          submitLabel="Create"
          onSubmit={handleCreate}
        />
      </DialogContent>
    </Dialog>
  );
}
