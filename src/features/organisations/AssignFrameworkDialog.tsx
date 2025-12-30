import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { fetchFrameworks } from "@/features/frameworks/frameworksSlice";
import {
  selectFrameworks,
  selectFrameworksLoading,
} from "@/features/frameworks/frameworksSelectors";
import {
  assignFrameworkToOrganisation,
  fetchOrganisationFrameworksByOrganisation,
} from "../organisationFrameworks/organisationFrameworksSlice";

interface AssignFrameworkDialogProps {
  organisationId: string;
}

export function AssignFrameworkDialog({
  organisationId,
}: AssignFrameworkDialogProps) {
  const dispatch = useDispatch<AppDispatch>();
  const frameworks = useSelector(selectFrameworks);
  const loading = useSelector(selectFrameworksLoading);

  const [frameworkId, setFrameworkId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Fetch frameworks when dialog opens (better UX)
  useEffect(() => {
    if (open) {
      dispatch(fetchFrameworks());
    }
  }, [open, dispatch]);

  const handleAssign = async () => {
    if (!frameworkId) return;

    const result = await dispatch(
      assignFrameworkToOrganisation({
        organisationId,
        frameworkId,
      })
    );

    if (assignFrameworkToOrganisation.fulfilled.match(result)) {
      dispatch(fetchOrganisationFrameworksByOrganisation(organisationId));

      // close dialog + reset
      setFrameworkId(null);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Assign Framework</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Framework</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Select
            value={frameworkId ?? undefined}
            onValueChange={setFrameworkId}
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  loading ? "Loading frameworks..." : "Select a framework"
                }
              />
            </SelectTrigger>

            <SelectContent>
              {frameworks.map((fw) => (
                <SelectItem key={fw.id} value={fw.id}>
                  {fw.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={handleAssign}
            disabled={!frameworkId}
            className="w-full"
          >
            Assign
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
