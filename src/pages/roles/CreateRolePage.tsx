import { useState } from "react";
import { useDispatch } from "react-redux";
import { createRole } from "../../features/roles/rolesSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AppDispatch } from "@/app/store";

export default function CreateRolePage() {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError(null); // reset

    const result = await dispatch(createRole(name));

    // ❗ Redux Toolkit unwraps fulfilled/rejected using `.unwrap()`
    if (createRole.fulfilled.match(result)) {
      navigate("/roles");
    } else {
      console.log("result.payload: ", result.payload?.errors);
      const backendErrors = result.payload?.errors;

      if (backendErrors?.length) {
        setError(backendErrors[0].message);
      } else {
        setError("Something went wrong.");
      }
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="p-6 max-w-md space-y-7">
        <h1 className="text-4xl font-bold">Create New Role</h1>

        <Input
          placeholder="Role name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Show Zod Error */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button size="lg" onClick={handleSubmit}>
          Create
        </Button>
      </div>
    </div>
  );
}
