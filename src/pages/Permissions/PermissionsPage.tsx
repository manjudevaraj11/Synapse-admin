import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPermissions } from "../../features/permissions/permissionsSlice";
import {
  selectPermissions,
  selectPermissionsLoading,
} from "../../features/permissions/permissionsSelectors";
import type { AppDispatch } from "@/app/store";
import { Button } from "@/components/ui/button";
import { PermissionsDataTable } from "@/components/permissions/permissions-data-table";
import { columns } from "@/components/permissions/columns";
import { useNavigate } from "react-router-dom";

export default function PermissionsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const permissions = useSelector(selectPermissions);
  const loading = useSelector(selectPermissionsLoading);
  console.log("permissions-----: ", permissions);

  useEffect(() => {
    dispatch(fetchPermissions());
  }, []);

  // return <PermissionsTable data={permissions} />;

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between py-10">
        <h1 className="text-4xl font-bold">Permissions</h1>

        <Button
          className="cursor-pointer"
          onClick={() => navigate("/permissions/create")}
        >
          Create Permission
        </Button>
      </div>

      {!loading && (
        <PermissionsDataTable columns={columns} data={permissions} />
      )}
    </div>
  );
}
