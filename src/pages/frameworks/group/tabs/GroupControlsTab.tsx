import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch } from "@/app/store";

import {
  fetchFrameworkControlsByGroup,
  deleteFrameworkControl,
} from "@/features/frameworkControls/frameworkControlsSlice";
import {
  selectControlsByGroup,
  selectControlsLoading,
} from "@/features/frameworkControls/frameworkControlsSelectors";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

import CreateFrameworkControlDialog from "../controls/CreateFrameworkControlDialog";
import EditFrameworkControlDialog from "../controls/EditFrameworkControlDialog";
import FrameworkControlsTable from "../controls/FrameworkControlsTable";

interface Props {
  groupId: string;
}

export default function GroupControlsTab({ groupId }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const controls = useSelector(selectControlsByGroup(groupId));
  const loading = useSelector(selectControlsLoading);

  useEffect(() => {
    dispatch(fetchFrameworkControlsByGroup(groupId));
  }, [dispatch, groupId]);

  if (loading) {
    return <div className="text-sm">Loading controls...</div>;
  }

  return (
    <div className="space-y-4 max-w-5xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Controls</h3>
          <p className="text-sm text-muted-foreground">
            Controls under this group
          </p>
        </div>

        <CreateFrameworkControlDialog groupId={groupId} />
      </div>

      {/* Table */}
      <FrameworkControlsTable
        controls={controls}
        groupId={groupId}
      />
    </div>
  );
}
