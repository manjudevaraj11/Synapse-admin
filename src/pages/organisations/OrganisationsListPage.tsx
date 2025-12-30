import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import type { AppDispatch } from "@/app/store";
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

import {
  fetchOrganisations,
  deleteOrganisation,
} from "@/features/organisations/organisationsSlice";
import { selectOrganisations } from "@/features/organisations/organisationsSelectors";
import { Pencil, Trash2 } from "lucide-react";

export default function OrganisationsListPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const organisations = useSelector(selectOrganisations);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [orgToDelete, setOrgToDelete] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    dispatch(fetchOrganisations());
  }, [dispatch]);

  const handleDeleteClick = (org: { id: string; name: string }) => {
    setOrgToDelete(org);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (orgToDelete) {
      dispatch(deleteOrganisation(orgToDelete.id));
      setDeleteModalOpen(false);
      setOrgToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setOrgToDelete(null);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Organisations</h1>
        <Button onClick={() => navigate("/organisations/create")}>
          Create Organisation
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-center">Industry</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {organisations.map((org) => (
            <TableRow key={org.id}>
              {/* View page link */}
              <TableCell className="font-medium">
                <Link
                  to={`/organisations/${org.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {org.name}
                </Link>
              </TableCell>

              <TableCell className="text-center">
                {org.industry || "-"}
              </TableCell>

              <TableCell className="text-center capitalize">
                {org.status}
              </TableCell>

              <TableCell className="text-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    navigate(`/organisations/${org.id}/edit`)
                  }
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteClick({ id: org.id, name: org.name })}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {/* Empty state */}
          {organisations.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                No organisations found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Organisation</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{orgToDelete?.name}</span>? This
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
