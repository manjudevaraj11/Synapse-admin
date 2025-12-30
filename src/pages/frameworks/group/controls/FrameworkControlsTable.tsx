import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store";

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
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

import { deleteFrameworkControl } from "@/features/frameworkControls/frameworkControlsSlice";
import EditFrameworkControlDialog from "./EditFrameworkControlDialog";

export interface FrameworkControl {
  id: string;
  controlId: string;
  title: string;
  description?: string | null;
  sortOrder?: number | null;
  frameworkGroupId: string;
}

interface Props {
  controls: FrameworkControl[];
  groupId: string;
}

export default function FrameworkControlsTable({
  controls,
  groupId,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [controlToDelete, setControlToDelete] = useState<{
    id: string;
    controlId: string;
    title: string;
  } | null>(null);

  const handleDeleteClick = (control: {
    id: string;
    controlId: string;
    title: string;
  }) => {
    setControlToDelete(control);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (controlToDelete) {
      dispatch(
        deleteFrameworkControl({
          id: controlToDelete.id,
          groupId,
        })
      );
      setDeleteModalOpen(false);
      setControlToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setControlToDelete(null);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Control ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-center">Order</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {controls.map((control) => (
            <TableRow key={control.id}>
              <TableCell className="font-mono">
                {control.controlId}
              </TableCell>

              <TableCell className="font-medium">
                {control.title}
              </TableCell>

              <TableCell>
                {control.description || "-"}
              </TableCell>

              <TableCell className="text-center">
                {control.sortOrder ?? "-"}
              </TableCell>

              <TableCell className="text-center space-x-2">
                <EditFrameworkControlDialog control={control} />

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    handleDeleteClick({
                      id: control.id,
                      controlId: control.controlId,
                      title: control.title,
                    })
                  }
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {controls.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground"
              >
                No controls defined for this group.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Control</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete control{" "}
              <span className="font-semibold font-mono">
                {controlToDelete?.controlId}
              </span>{" "}
              - <span className="font-semibold">{controlToDelete?.title}</span>?
              This action cannot be undone.
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
    </>
  );
}
