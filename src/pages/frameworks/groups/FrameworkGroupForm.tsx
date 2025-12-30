import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export type FrameworkGroupFormValues = {
  title: string;
  subtitle?: string;
  description?: string;
  sortOrder?: number;
};

interface FrameworkGroupFormProps {
  defaultValues?: Partial<FrameworkGroupFormValues>;
  loading?: boolean;
  submitLabel?: string;
  onSubmit: (values: FrameworkGroupFormValues) => void;
}

export default function FrameworkGroupForm({  // present
  defaultValues,
  loading = false,
  submitLabel = "Save",
  onSubmit,
}: FrameworkGroupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FrameworkGroupFormValues>({
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      {/* Title (required) */}
      <div>
        <Input
          placeholder="Title"
          {...register("title", {
            required: "Title is required",
          })}
        />
        {errors.title && (
          <p className="text-xs text-red-500 mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Subtitle */}
      <Input
        placeholder="Subtitle (optional)"
        {...register("subtitle")}
      />

      {/* Description */}
      <Textarea
        placeholder="Description (optional)"
        {...register("description")}
      />

      {/* Sort Order */}
      <Input
        type="number"
        placeholder="Sort order"
        {...register("sortOrder", {
          valueAsNumber: true,
        })}
      />

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
