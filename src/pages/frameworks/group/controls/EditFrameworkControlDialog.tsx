import { useState } from "react";
import { useDispatch } from "react-redux";
import { Pencil } from "lucide-react";

import type { AppDispatch } from "@/app/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { updateFrameworkControl } from "@/features/frameworkControls/frameworkControlsSlice";

import FrameworkControlForm from "./FrameworkControlForm";
import type { FrameworkControlFormValues } from "./FrameworkControlForm";

interface Props {
  control: {
    id: string;
    frameworkGroupId: string;
    controlId: string;
    title: string;
    description?: string | null;
    sortOrder?: number | null;
  };
}

export default function EditFrameworkControlDialog({ control }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (values: FrameworkControlFormValues) => {
    setLoading(true);

    const result = await dispatch(
      updateFrameworkControl({
        id: control.id,
        groupId: control.frameworkGroupId,
        data: {
          ...values,
        },
      })
    );

    if (updateFrameworkControl.fulfilled.match(result)) {
      setOpen(false);
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Control</DialogTitle>
        </DialogHeader>

        <FrameworkControlForm
          defaultValues={{
            controlId: control.controlId,
            title: control.title,
            description: control.description ?? "",
            sortOrder: control.sortOrder ?? 0,
          }}
          submitLabel="Save Changes"
          loading={loading}
          onSubmit={handleUpdate}
        />
      </DialogContent>
    </Dialog>
  );
}
