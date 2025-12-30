import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import type { AppDispatch } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createFramework } from "@/features/frameworks/frameworksSlice";

type CreateFrameworkForm = {
  name: string;
  code: string;
  slug: string;
  version?: string;
  description?: string;
};

export default function CreateFrameworkPage() {  // present
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CreateFrameworkForm>();

  const onSubmit = async (data: CreateFrameworkForm) => {
    const result = await dispatch(createFramework(data));

    if (createFramework.fulfilled.match(result)) {
      navigate("/frameworks");
    } else {
      const apiErrors = result.payload?.errors;
      console.log("apiErrors?.[0]", result)
      setError("root", {
        message: apiErrors?.[0]?.message || "Something went wrong.",
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="p-6 max-w-md space-y-7">
        <h1 className="text-4xl font-bold">Create New Framework</h1>

        <Input
          placeholder="Framework name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        <Input
          placeholder="Code (e.g. ISO27001)"
          {...register("code", { required: "Code is required" })}
        />
        {errors.code && (
          <p className="text-red-500 text-sm">{errors.code.message}</p>
        )}

        <Input
          placeholder="Slug (e.g. iso-27001)"
          {...register("slug", { required: "Slug is required" })}
        />
        {errors.slug && (
          <p className="text-red-500 text-sm">{errors.slug.message}</p>
        )}

        <Input
          placeholder="Version (optional)"
          {...register("version")}
        />

        <Input
          placeholder="Description (optional)"
          {...register("description")}
        />

        {errors.root && (
          <p className="text-red-500 text-sm">{errors.root.message}</p>
        )}

        <Button size="lg" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create"}
        </Button>
      </div>
    </div>
  );
}
