import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPermission } from "../../features/permissions/permissionsSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AppDispatch } from "@/app/store";

export default function CreatePermissionPage() {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError(null);

    const result = await dispatch(createPermission(name));

    if (createPermission.fulfilled.match(result)) {
      navigate("/permissions");
    } else {
      const errors = result.payload?.errors;
      setError(errors?.[0]?.message || "Something went wrong.");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="p-6 max-w-md space-y-7">
        <h1 className="text-4xl font-bold">Create New Permission</h1>

        <Input
          placeholder="Permission name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button size="lg" onClick={handleSubmit}>
          Create
        </Button>
      </div>
    </div>
  );
}
