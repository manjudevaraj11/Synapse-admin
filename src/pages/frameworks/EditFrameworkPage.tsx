import type { AppDispatch } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { selectFrameworks } from "@/features/frameworks/frameworksSelectors";
import {
  fetchFrameworks,
  updateFramework,
} from "@/features/frameworks/frameworksSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

type EditFrameworkForm = {
  name: string;
  code: string;
  slug: string;
  version?: string;
  description?: string;
};

export default function EditFrameworkPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const frameworks = useSelector(selectFrameworks);

  const existing = frameworks.find((f) => f.id === id);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditFrameworkForm>();

  // Fetch + populate form
  useEffect(() => {
    if (!existing) {
      dispatch(fetchFrameworks());
    } else {
      reset({
        name: existing.name,
        code: existing.code,
        slug: existing.slug,
        version: existing.version || "",
        description: existing.description || "",
      });
    }
  }, [existing, dispatch, reset]);

  const onSubmit = async (data: EditFrameworkForm) => {
    const result = await dispatch(
      updateFramework({
        id: id!,
        ...data,
      })
    );

    if (updateFramework.fulfilled.match(result)) {
      navigate("/frameworks");
    } else {
      const apiErrors = result.payload?.errors;

      setError("root", {
        message: apiErrors?.[0]?.message || "Something went wrong.",
      });
    }
  };

  if (!existing) return null;

  return (
    <div className="container mx-auto py-10">
      <div className="p-6 max-w-md space-y-7">
        <h1 className="text-4xl font-bold">Edit Framework</h1>

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

        <Button
          size="lg"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update"}
        </Button>
      </div>
    </div>
  );
}
