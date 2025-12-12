import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPermissions } from "../../features/permissions/permissionsSlice";
import { selectPermissions } from "../../features/permissions/permissionsSelectors";
import type { AppDispatch } from "@/app/store";

export default function PermissionsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const permissions = useSelector(selectPermissions);
  console.log("permissions-----: ", permissions);

  useEffect(() => {
    dispatch(fetchPermissions());
  }, []);

  // return <PermissionsTable data={permissions} />;

  return <h1>Permissions</h1>;
}
