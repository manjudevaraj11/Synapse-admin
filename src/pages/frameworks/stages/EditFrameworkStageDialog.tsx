import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store";
import { updateFrameworkStage } from "@/features/frameworkStages/frameworkStagesSlice";
import FrameworkStageForm from "./FrameworkStageForm";

type Props = {
  stage: {
    id: string;
    title: string;
    code?: string;
    sortOrder: number;
  };
};

export default function EditFrameworkStageDialog({ stage }: Props) {  // present
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);

  const handleSave = async (data: {
    title?: string;
    code?: string;
    sortOrder?: number;
  }) => {
    const resultAction = await dispatch(
      updateFrameworkStage({
        id: stage.id,
        data,
      })
    );

    // Close dialog only on success
    if (updateFrameworkStage.fulfilled.match(resultAction)) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Pencil className="h-4 w-4 mr-1" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Stage</DialogTitle>
        </DialogHeader>

        <FrameworkStageForm
          initialValues={stage}
          submitLabel="Save"
          onSubmit={handleSave}
        />
      </DialogContent>
    </Dialog>
  );
}
