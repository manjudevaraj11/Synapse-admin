import { type Framework } from "@/features/frameworks/frameworksSlice";

type Props = {
  framework: Framework;
};

export default function FrameworkOverviewTab({ framework }: Props) {
  // present
  return (
    <div className="space-y-4 max-w-xl">
      <div>
        <p className="text-sm text-muted-foreground">Name</p>
        <p className="font-medium">{framework.name}</p>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">Code</p>
        <p className="font-medium">{framework.code || "-"}</p>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">Version</p>
        <p className="font-medium">{framework.version || "-"}</p>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">Description</p>
        <p className="font-medium">{framework.description || "-"}</p>
      </div>
    </div>
  );
}
