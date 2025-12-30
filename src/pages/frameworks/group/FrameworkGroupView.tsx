import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch } from "@/app/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import GroupOverviewTab from "./tabs/GroupOverviewTab";
import GroupControlsTab from "./tabs/GroupControlsTab";

// import GroupOverviewTab from "./tabs/GroupOverviewTab";
// import GroupControlsTab from "./tabs/GroupControlsTab";

export default function FrameworkGroupView() {
  const { frameworkId, groupId } = useParams<{
    frameworkId: string;
    groupId: string;
  }>();

  if (!frameworkId || !groupId) {
    return <div className="p-6">Invalid group</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link to={`/frameworks/${frameworkId}`}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>

        <h1 className="text-2xl font-semibold">Group</h1>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="controls">Controls</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <GroupOverviewTab groupId={groupId} />
        </TabsContent>

        <TabsContent value="controls">
          <GroupControlsTab groupId={groupId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
