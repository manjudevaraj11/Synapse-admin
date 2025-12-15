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
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function RolesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const roles = useSelector(selectRoles);
  const loading = useSelector(selectRolesLoading);
  const error = useSelector(selectRolesError);
  console.log("loading: ", loading);
  console.log("roles: ", roles);
  console.log("error: ", error);

  useEffect(() => {
    console.log("calling once ======");
    dispatch(fetchRoles());
    console.log("calling once end-=====");
  }, [dispatch]);

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between py-10">
        <h1 className="text-4xl font-bold">Roles</h1>

        <Button className="cursor-pointer" onClick={() => navigate("/roles/create")}>Create Role</Button>
      </div>

      {!loading && <RolesDataTable columns={columns} data={roles} />}
    </div>
  );
}
