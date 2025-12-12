import { useEffect, useState } from "react";
import { columns, type Payment } from "../../components/roles/columns";
import { DataTable } from "../../components/roles/data-table";
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
    dispatch(fetchRoles());
  }, [dispatch]);

  //   useEffect(() => {
  //     async function fetchData() {
  //       const result = [
  //         {
  //           id: "728ed52f",
  //           amount: 100,
  //           status: "pending",
  //           email: "m@example.com",
  //         },
  //         {
  //           id: "728ed52f",
  //           amount: 100,
  //           status: "pending",
  //           email: "m@example.com",
  //         },
  //         {
  //           id: "728ed52f",
  //           amount: 100,
  //           status: "pending",
  //           email: "m@example.com",
  //         },
  //         {
  //           id: "728ed52f",
  //           amount: 100,
  //           status: "pending",
  //           email: "m@example.com",
  //         },
  //         {
  //           id: "728ed52f",
  //           amount: 100,
  //           status: "pending",
  //           email: "m@example.com",
  //         },
  //         {
  //           id: "728ed52f",
  //           amount: 100,
  //           status: "pending",
  //           email: "m@example.com",
  //         },
  //         {
  //           id: "728ed52f",
  //           amount: 100,
  //           status: "pending",
  //           email: "m@example.com",
  //         },
  //         {
  //           id: "728ed52f",
  //           amount: 100,
  //           status: "pending",
  //           email: "m@example.com",
  //         },
  //         {
  //           id: "728ed52f",
  //           amount: 100,
  //           status: "pending",
  //           email: "m@example.com",
  //         },
  //         {
  //           id: "728ed52f",
  //           amount: 100,
  //           status: "pending",
  //           email: "m@example.com",
  //         },
  //         {
  //           id: "728ed52f",
  //           amount: 100,
  //           status: "pending",
  //           email: "m@example.com",
  //         },
  //         {
  //           id: "728ed52f",
  //           amount: 100,
  //           status: "pending",
  //           email: "m@example.com",
  //         },
  //         {
  //           id: "728ed52f",
  //           amount: 100,
  //           status: "pending",
  //           email: "m@example.com",
  //         },
  //         {
  //           id: "728ed52f",
  //           amount: 100,
  //           status: "pending",
  //           email: "m@example.com",
  //         },
  //         {
  //           id: "728ed52f",
  //           amount: 100,
  //           status: "pending",
  //           email: "m@example.com",
  //         },
  //         {
  //           id: "728ed52f",
  //           amount: 100,
  //           status: "pending",
  //           email: "m@example.com",
  //         },
  //         {
  //           id: "728ed52f",
  //           amount: 100,
  //           status: "pending",
  //           email: "m@example.com",
  //         },
  //         // ...
  //       ];
  //       setData(result);
  //     }

  //     fetchData();
  //   }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold py-10">Roles</h1>
      {!loading && <DataTable columns={columns} data={roles} />}
    </div>
  );
}
