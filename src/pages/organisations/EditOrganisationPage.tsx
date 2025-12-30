import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import type { AppDispatch } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  fetchOrganisations,
  updateOrganisation,
} from "@/features/organisations/organisationsSlice";
import { selectOrganisations } from "@/features/organisations/organisationsSelectors";

type EditOrganisationForm = {
  name: string;
  slug: string;
  description?: string;
  websiteUrl?: string;
  industry?: string;
};

export default function EditOrganisationPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const organisations = useSelector(selectOrganisations);

  const existing = organisations.find((o) => o.id === id);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditOrganisationForm>();

  useEffect(() => {
    if (!existing) {
      dispatch(fetchOrganisations());
    } else {
      reset(existing);
    }
  }, [existing, dispatch, reset]);

  const onSubmit = async (data: EditOrganisationForm) => {
    const result = await dispatch(
      updateOrganisation({ id: id!, ...data })
    );

    if (updateOrganisation.fulfilled.match(result)) {
      navigate("/organisations");
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
      <div className="p-6 max-w-md space-y-6">
        <h1 className="text-3xl font-bold">Edit Organisation</h1>

        <Input {...register("name", { required: true })} />
        <Input {...register("slug", { required: true })} />
        <Input {...register("websiteUrl")} />
        <Input {...register("industry")} />
        <Input {...register("description")} />

        {errors.root && (
          <p className="text-red-500 text-sm">{errors.root.message}</p>
        )}

        <Button
          size="lg"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          Update
        </Button>
      </div>
    </div>
  );
}
