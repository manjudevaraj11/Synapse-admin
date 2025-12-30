import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import type { AppDispatch } from "@/app/store";
import { fetchFrameworks } from "@/features/frameworks/frameworksSlice";
import { selectFrameworks } from "@/features/frameworks/frameworksSelectors";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FrameworkOverviewTab from "./FrameworkOverviewTab";
import FrameworkStagesTab from "./stages/FrameworkStagesTab";
import FrameworkGroupsTab from "./groups/ FrameworkGroupsTab";

export default function FrameworkView() {
  // present
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const frameworks = useSelector(selectFrameworks);
  const framework = frameworks.find((f) => f.id === id);

  useEffect(() => {
    if (!framework) {
      dispatch(fetchFrameworks());
    }
  }, [dispatch, framework]);

  if (!framework) {
    return <div className="p-6">Loading framework...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">{framework.name}</h1>
        <p className="text-muted-foreground capitalize">
          Status: {framework.status}
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="stages">Stages</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          {/* future */}
          {/* <TabsTrigger value="organisations">Organisations</TabsTrigger> */}
        </TabsList>

        <TabsContent value="overview">
          <FrameworkOverviewTab framework={framework} />
        </TabsContent>

        <TabsContent value="stages">
          <FrameworkStagesTab frameworkId={framework.id} />
        </TabsContent>

        <TabsContent value="groups">
          <FrameworkGroupsTab frameworkId={framework.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
