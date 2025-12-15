import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePermission,
  fetchPermissions,
} from "../../features/permissions/permissionsSlice";
import { selectPermissions } from "../../features/permissions/permissionsSelectors";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AppDispatch } from "@/app/store";

export default function EditPermissionPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const permissions = useSelector(selectPermissions);
  const existingPermission = permissions.find((p) => p.id === id);

  const [name, setName] = useState(existingPermission?.name || "");
  const [error, setError] = useState<string | null>(null);

  // Fetch permissions if not loaded
  useEffect(() => {
    if (!existingPermission) {
      dispatch(fetchPermissions());
    }
  }, []);

  // Update form once permission is available
  useEffect(() => {
    if (existingPermission && !name) {
      setName(existingPermission.name);
    }
  }, [existingPermission]);

  const handleUpdate = async () => {
    setError(null);

    const result = await dispatch(
      updatePermission({ id: id!, name })
    );

    if (updatePermission.fulfilled.match(result)) {
      navigate("/permissions");
    } else {
      const errors = result.payload?.errors;
      setError(errors?.[0]?.message || "Something went wrong.");
    }
  };

  if (!existingPermission) return <div className="p-6">Loading...</div>;

  return (
    <div className="container mx-auto py-10">
      <div className="p-6 max-w-md space-y-7">
        <h1 className="text-4xl font-bold">Edit Permission</h1>

        <Input value={name} onChange={(e) => setName(e.target.value)} />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button size="lg" onClick={handleUpdate}>
          Update
        </Button>
      </div>
    </div>
  );
}
