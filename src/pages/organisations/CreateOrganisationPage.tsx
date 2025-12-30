import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import type { AppDispatch } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createOrganisation } from "@/features/organisations/organisationsSlice";

type CreateOrganisationForm = {
  name: string;
  slug: string;
  description?: string;
  websiteUrl?: string;
  industry?: string;
};

export default function CreateOrganisationPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreateOrganisationForm>();

  const onSubmit = async (data: CreateOrganisationForm) => {
    const result = await dispatch(createOrganisation(data));

    if (createOrganisation.fulfilled.match(result)) {
      navigate("/organisations");
    } else {
      const apiErrors = result.payload?.errors;
      setError("root", {
        message: apiErrors?.[0]?.message || "Something went wrong.",
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="p-6 max-w-md space-y-6">
        <h1 className="text-3xl font-bold">Create Organisation</h1>

        <Input
          placeholder="Organisation name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <Input
          placeholder="Slug"
          {...register("slug", { required: "Slug is required" })}
        />
        {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}

        <Input placeholder="Website URL" {...register("websiteUrl")} />
        <Input placeholder="Industry" {...register("industry")} />
        <Input placeholder="Description" {...register("description")} />

        {errors.root && (
          <p className="text-red-500 text-sm">{errors.root.message}</p>
        )}

        <Button
          size="lg"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          Create
        </Button>
      </div>
    </div>
  );
}
