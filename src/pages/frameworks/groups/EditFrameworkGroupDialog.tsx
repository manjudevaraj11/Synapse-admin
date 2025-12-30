import { useState } from "react";
import { useDispatch } from "react-redux";
import { Pencil } from "lucide-react";

import type { AppDispatch } from "@/app/store";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import FrameworkGroupForm from "./FrameworkGroupForm";
import { updateFrameworkGroup } from "@/features/frameworkGroups/frameworkGroupsSlice";
import { fetchStagesWithGroupsByFramework } from "@/features/frameworkStages/frameworkStagesSlice";

interface EditFrameworkGroupDialogProps {  // present
  group: {
    id: string;
    title: string;
    subtitle?: string | null;
    description?: string | null;
    sortOrder?: number | null;
    frameworkStageId: string;
  };
  frameworkId: string;
}

export default function EditFrameworkGroupDialog({
  group,
  frameworkId,
}: EditFrameworkGroupDialogProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log("group edit: ", frameworkId);

  const handleUpdate = async (values: any) => {
    setLoading(true);

    const result = await dispatch(
      updateFrameworkGroup({
        id: group.id,
        stageId: group.frameworkStageId,
        ...values,
      })
    );

    if (updateFrameworkGroup.fulfilled.match(result)) {
      dispatch(fetchStagesWithGroupsByFramework(frameworkId));

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
        <FrameworkGroupForm
          defaultValues={{
            title: group.title,
            subtitle: group.subtitle ?? "",
            description: group.description ?? "",
            sortOrder: group.sortOrder ?? 0,
          }}
          submitLabel="Save Changes"
          loading={loading}
          onSubmit={handleUpdate}
        />
      </DialogContent>
    </Dialog>
  );
}
