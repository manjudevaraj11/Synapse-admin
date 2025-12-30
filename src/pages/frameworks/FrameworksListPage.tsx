import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFrameworks,
  deleteFramework,
} from "@/features/frameworks/frameworksSlice";
import { selectFrameworks } from "@/features/frameworks/frameworksSelectors";
import { type AppDispatch } from "@/app/store";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
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
import { Pencil, Trash2 } from "lucide-react";

export default function FrameworksListPage() { // present
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const frameworks = useSelector(selectFrameworks);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [frameworkToDelete, setFrameworkToDelete] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    dispatch(fetchFrameworks());
  }, [dispatch]);

  const handleDeleteClick = (framework: { id: string; name: string }) => {
    setFrameworkToDelete(framework);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (frameworkToDelete) {
      dispatch(deleteFramework(frameworkToDelete.id));
      setDeleteModalOpen(false);
      setFrameworkToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setFrameworkToDelete(null);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Frameworks</h1>
        <Button onClick={() => navigate("/frameworks/create")}>
          Create Framework
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {frameworks.map((framework) => (
            <TableRow key={framework.id}>
              {/* Framework details link */}
              <TableCell className="font-medium">
                <Link
                  to={`/frameworks/${framework.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {framework.name}
                </Link>
              </TableCell>

              <TableCell className="text-center capitalize">
                {framework.status}
              </TableCell>

              <TableCell className="text-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    navigate(`/frameworks/${framework.id}/edit`)
                  }
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    handleDeleteClick({ id: framework.id, name: framework.name })
                  }
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {/* Empty state */}
          {frameworks.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center text-muted-foreground"
              >
                No frameworks found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Framework</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{frameworkToDelete?.name}</span>? This
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
