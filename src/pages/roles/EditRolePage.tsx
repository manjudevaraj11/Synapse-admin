import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRole, fetchRoles } from "../../features/roles/rolesSlice";
import { selectRoles } from "../../features/roles/rolesSelectors";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AppDispatch } from "@/app/store";

export default function EditRolePage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const roles = useSelector(selectRoles);

  const existingRole = roles.find((r) => r.id === id);

  const [name, setName] = useState(existingRole?.name || "");
  const [error, setError] = useState<string | null>(null);

  // If role isn't loaded yet, fetch roles
  useEffect(() => {
    if (!existingRole) {
      dispatch(fetchRoles());
    }
  }, []);

  // When roles load, update form state
  useEffect(() => {
    if (existingRole && !name) {
      setName(existingRole.name);
    }
  }, [existingRole]);

  const handleUpdate = async () => {
    setError(null);

    const result = await dispatch(updateRole({ id: id!, name }));

    if (updateRole.fulfilled.match(result)) {
      navigate("/roles");
    } else {
      // Backend returns: { success:false, errors:[ { message:"" } ] }
      const errors = result.payload?.errors;
      if (errors?.length) {
        setError(errors[0].message);
      } else {
        setError("Something went wrong.");
      }
    }
  };

  if (!existingRole) return <div className="p-6">Loading...</div>;

  return (
    <div className="container mx-auto py-10">
      <div className="p-6 max-w-md space-y-7">
        <h1 className="text-4xl font-bold">Edit Role</h1>

        <Input value={name} onChange={(e) => setName(e.target.value)} />

        {/* Validation Error */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button size="lg" onClick={handleUpdate}>
          Update
        </Button>
      </div>
    </div>
  );
}
