import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit } from "lucide-react";

import type { AppDispatch } from "@/app/store";
import { fetchOrganisationById } from "@/features/organisations/organisationsSlice";
import {
  selectCurrentOrganisation,
  selectOrganisationLoading,
} from "@/features/organisations/organisationsSelectors";
import { AssignFrameworkDialog } from "@/features/organisations/AssignFrameworkDialog";
import { fetchOrganisationFrameworksByOrganisation } from "@/features/organisationFrameworks/organisationFrameworksSlice";
import { selectOrganisationFrameworks, selectOrganisationFrameworksLoading } from "@/features/organisationFrameworks/organisationFrameworksSelectors";

export default function OrganisationView() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const organisation = useSelector(selectCurrentOrganisation);
  console.log("organisation: ", organisation);
  const loading = useSelector(selectOrganisationLoading);
  const organisationFrameworks = useSelector(selectOrganisationFrameworks);
  const organisationFrameworksLoading = useSelector(
    selectOrganisationFrameworksLoading
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchOrganisationById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (organisation?.id) {
      dispatch(fetchOrganisationFrameworksByOrganisation(organisation.id));
    }
  }, [organisation?.id, dispatch]);

  if (loading || !organisation) {
    return <div className="p-6">Loading organisation...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/organisations">
                <ArrowLeft className="h-6 w-6" />
              </Link>
            </Button>
            <h1 className="text-2xl font-semibold">{organisation.name}</h1>
          </div>
        </div>

        <Button asChild>
          <Link to={`/organisations/${organisation.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Organisation
          </Link>
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Organisation Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Website:</span>{" "}
                <a
                  href={organisation.websiteUrl}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  {organisation.websiteUrl}
                </a>
              </div>
              <div>
                <span className="font-medium">Industry:</span>{" "}
                {organisation.industry}
              </div>
              <div>
                <span className="font-medium">Status:</span>{" "}
                {organisation.status}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Frameworks */}
        <TabsContent value="frameworks">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Frameworks</CardTitle>
              <AssignFrameworkDialog organisationId={organisation.id} />
            </CardHeader>
            <CardContent>
              {organisationFrameworksLoading ? (
                <p className="text-sm text-muted-foreground">
                  Loading frameworks...
                </p>
              ) : organisationFrameworks.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No frameworks assigned yet.
                </p>
              ) : (
                <ul className="space-y-2">
                  {organisationFrameworks.map((of) => (
                    <li
                      key={of.id}
                      className="flex justify-between items-center border rounded p-2"
                    >
                      <span className="font-medium">{of.framework?.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
