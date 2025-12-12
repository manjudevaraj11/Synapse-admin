import { useEffect } from "react";
import { columns } from "../../components/roles/columns";
import { RolesDataTable } from "../../components/roles/roles-data-table";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "@/features/roles/rolesSlice";
import type { AppDispatch } from "@/app/store";
import {
  selectRoles,
  selectRolesError,
  selectRolesLoading,
} from "@/features/roles/rolesSelectors";

export default function RolesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const roles = useSelector(selectRoles);
  const loading = useSelector(selectRolesLoading);
  const error = useSelector(selectRolesError);
  console.log("loading: ", loading);
  console.log("roles: ", roles);
  console.log("error: ", error);

  useEffect(() => {
    console.log("calling once ======")
    dispatch(fetchRoles());
    console.log("calling once end-=====")

  }, [dispatch]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold py-10">Roles</h1>
      {!loading && <RolesDataTable columns={columns} data={roles} />}
    </div>
  );
}
