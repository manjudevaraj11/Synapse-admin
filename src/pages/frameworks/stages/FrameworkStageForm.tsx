import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  initialValues?: {
    title: string;
    code?: string;
    sortOrder: number;
  };
  onSubmit: (data: {
    title: string;
    code?: string;
    sortOrder: number;
  }) => void;
  submitLabel: string;
};
 
export default function FrameworkStageForm({  // present re usable form
  initialValues,
  onSubmit,
  submitLabel,
}: Props) {
  const [form, setForm] = useState({
    title: initialValues?.title || "",
    code: initialValues?.code || "",
    sortOrder: initialValues?.sortOrder || 0,
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Titles</Label>
        <Input
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Code</Label>
        <Input
          value={form.code}
          onChange={(e) =>
            setForm({ ...form, code: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Sort Order</Label>
        <Input
          type="number"
          value={form.sortOrder}
          onChange={(e) =>
            setForm({
              ...form,
              sortOrder: Number(e.target.value),
            })
          }
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={() => onSubmit(form)}>
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}
