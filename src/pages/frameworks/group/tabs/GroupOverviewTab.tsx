import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/app/store";

import {
  fetchFrameworkGroupById,
} from "@/features/frameworkGroups/frameworkGroupsSlice";
import { selectGroupById } from "@/features/frameworkGroups/frameworkGroupsSelectors";

interface Props {
  groupId: string;
}

export default function GroupOverviewTab({ groupId }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const group = useSelector(selectGroupById(groupId));

  useEffect(() => {
    if (!group) {
      dispatch(fetchFrameworkGroupById(groupId));
    }
  }, [dispatch, groupId, group]);

  if (!group) {
    return <div className="text-sm">Loading group...</div>;
  }

  return (
    <div className="space-y-4 max-w-xl">
      <div>
        <p className="text-sm text-muted-foreground">Title</p>
        <p className="font-medium">{group.title}</p>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">Subtitle</p>
        <p className="font-medium">{group.subtitle || "-"}</p>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">Description</p>
        <p className="font-medium">{group.description || "-"}</p>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">Order</p>
        <p className="font-medium">{group.sortOrder}</p>
      </div>
    </div>
  );
}
