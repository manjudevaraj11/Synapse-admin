import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch } from "@/app/store";
import {
  fetchFrameworkStagesByFramework,
  deleteFrameworkStage,
} from "@/features/frameworkStages/frameworkStagesSlice";
import { selectFrameworkStages } from "@/features/frameworkStages/frameworkStagesSelectors";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import CreateFrameworkStageDialog from "./CreateFrameworkStageDialog";
import EditFrameworkStageDialog from "./EditFrameworkStageDialog";

type Props = {
  frameworkId: string;
};

export default function FrameworkStagesTab({ frameworkId }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const stages = useSelector(selectFrameworkStages);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [stageToDelete, setStageToDelete] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    dispatch(fetchFrameworkStagesByFramework(frameworkId));
  }, [dispatch, frameworkId]);

  const handleDeleteClick = (stage: { id: string; title: string }) => {
    setStageToDelete(stage);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (stageToDelete) {
      dispatch(deleteFrameworkStage(stageToDelete.id));
      setDeleteModalOpen(false);
      setStageToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setStageToDelete(null);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium">Stages</h2>
          <p className="text-sm text-muted-foreground">
            Define the lifecycle stages for this framework.
          </p>
        </div>

        <CreateFrameworkStageDialog frameworkId={frameworkId} />
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Code</TableHead>
            <TableHead className="text-center">Order</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {stages.map((stage) => (
            <TableRow key={stage.id}>
              <TableCell className="font-medium">{stage.title}</TableCell>

              <TableCell>{stage.code || "-"}</TableCell>

              <TableCell className="text-center">{stage.sortOrder}</TableCell>

              <TableCell className="text-center space-x-2">
                <EditFrameworkStageDialog stage={stage} />

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteClick({ id: stage.id, title: stage.title })}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {stages.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground"
              >
                No stages have been defined for this framework.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Stage</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{stageToDelete?.title}</span>? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelDelete}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
