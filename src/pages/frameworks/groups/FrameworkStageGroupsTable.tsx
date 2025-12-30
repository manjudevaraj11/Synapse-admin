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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

import { deleteFrameworkGroup } from "@/features/frameworkGroups/frameworkGroupsSlice";

import CreateFrameworkGroupDialog from "./CreateFrameworkGroupDialog";
import EditFrameworkGroupDialog from "./EditFrameworkGroupDialog";
// import { Link } from "react-router-dom";

interface Group {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  sortOrder: number;
}

interface Props {
  stage: {
    id: string;
    title: string;
  };
  groups: Group[];
  frameworkId: string;
}

export default function FrameworkStageGroupsTable({
  stage,
  groups,
  frameworkId,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<{ id: string; title: string } | null>(null);

  const handleDeleteClick = (group: { id: string; title: string }) => {
    setGroupToDelete(group);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (groupToDelete) {
      dispatch(deleteFrameworkGroup({ id: groupToDelete.id, stageId: stage.id }));
      setDeleteModalOpen(false);
      setGroupToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setGroupToDelete(null);
  };

  return (
    <div className="space-y-3">
      {/* Stage Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">{stage.title}</h3>
          <p className="text-sm text-muted-foreground">
            Groups under this stage
          </p>
        </div>

        <CreateFrameworkGroupDialog
          stageId={stage.id}
          frameworkId={frameworkId}
        />
      </div>

      {/* Groups Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Subtitle</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-center">Order</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {groups.map((group) => (
            <TableRow key={group.id}>
              <TableCell className="font-medium">
                {/* <Link
                  to={`/frameworks/${frameworkId}/groups/${group.id}`}
                  className="hover:underline"
                > */}
                  {group.title}
                {/* </Link> */}
              </TableCell>

              <TableCell>{group.subtitle || "-"}</TableCell>
              <TableCell>{group.description || "-"}</TableCell>

              <TableCell className="text-center">{group.sortOrder}</TableCell>

              <TableCell className="text-center space-x-2">
                <EditFrameworkGroupDialog
                  group={group}
                  frameworkId={frameworkId}
                />

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteClick({ id: group.id, title: group.title })}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {groups.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground"
              >
                No groups defined for this stage.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Group</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{groupToDelete?.title}</span>? This
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
