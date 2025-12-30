import { useState } from "react";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "@/app/store";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import FrameworkGroupForm from "./FrameworkGroupForm";
import { createFrameworkGroup } from "@/features/frameworkGroups/frameworkGroupsSlice";
import { fetchStagesWithGroupsByFramework } from "@/features/frameworkStages/frameworkStagesSlice";

interface CreateFrameworkGroupDialogProps {
  stageId: string;
  frameworkId: string;
}

export default function CreateFrameworkGroupDialog({  // present
  stageId,
  frameworkId,
}: CreateFrameworkGroupDialogProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreate = async (values: any) => {
    setLoading(true);

    const result = await dispatch(
      createFrameworkGroup({
        stageId,
        ...values, // title, subtitle, description, sortOrder
      })
    );

    if (createFrameworkGroup.fulfilled.match(result)) {
      dispatch(fetchStagesWithGroupsByFramework(frameworkId));

      setOpen(false);
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Add Group
        </Button>
      </DialogTrigger>

      <DialogContent>
        <FrameworkGroupForm
          submitLabel="Create Group"
          loading={loading}
          onSubmit={handleCreate}
        />
      </DialogContent>
    </Dialog>
  );
}
