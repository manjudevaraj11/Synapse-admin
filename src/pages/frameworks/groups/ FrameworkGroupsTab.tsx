import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch } from "@/app/store";
import {
  fetchStagesWithGroupsByFramework,
} from "@/features/frameworkStages/frameworkStagesSlice";
import {
  selectStagesWithGroups,
  selectStagesWithGroupsLoading,
} from "@/features/frameworkStages/frameworkStagesSelectors";

import FrameworkStageGroupsTable from "./FrameworkStageGroupsTable";

interface FrameworkGroupsTabProps {
  frameworkId: string;
}

export default function FrameworkGroupsTab({  // present
  frameworkId,
}: FrameworkGroupsTabProps) {
  const dispatch = useDispatch<AppDispatch>();

  const stages = useSelector(selectStagesWithGroups);
  const loading = useSelector(selectStagesWithGroupsLoading);

  useEffect(() => {
    if (frameworkId) {
      dispatch(fetchStagesWithGroupsByFramework(frameworkId));
    }
  }, [frameworkId, dispatch]);

  if (loading) {
    return <div className="p-4 text-sm">Loading groups...</div>;
  }

  if (stages.length === 0) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        No stages or groups found.
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {stages.map((stage) => (
        <FrameworkStageGroupsTable
          key={stage.id}
          stage={stage}
          groups={stage.groups}
          frameworkId={frameworkId}
        />
      ))}
    </div>
  );
}
