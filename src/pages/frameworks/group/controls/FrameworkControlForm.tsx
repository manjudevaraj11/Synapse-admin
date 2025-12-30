import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export type FrameworkControlFormValues = {
  controlId: string;
  title: string;
  description?: string;
  sortOrder?: number;
};

interface Props {
  defaultValues?: Partial<FrameworkControlFormValues>;
  loading?: boolean;
  submitLabel?: string;
  onSubmit: (values: FrameworkControlFormValues) => void;
}

export default function FrameworkControlForm({
  defaultValues,
  loading = false,
  submitLabel = "Save",
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FrameworkControlFormValues>({
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <Input
        placeholder="Control ID (e.g. A.5.1)"
        {...register("controlId", { required: true })}
      />

      <Input
        placeholder="Title"
        {...register("title", { required: true })}
      />

      <Textarea
        placeholder="Description (optional)"
        {...register("description")}
      />

      <Input
        type="number"
        placeholder="Sort order"
        {...register("sortOrder", { valueAsNumber: true })}
      />

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
