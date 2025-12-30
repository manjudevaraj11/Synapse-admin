// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchFrameworkStages,
//   deleteFrameworkStage,
// } from "@/features/frameworkStages/frameworkStagesSlice";
// import {
//   selectFrameworkStages,
//   selectFrameworkStagesLoading,
// } from "@/features/frameworkStages/frameworkStagesSelectors";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useNavigate } from "react-router-dom";
// import type { AppDispatch } from "@/app/store";

// export default function FrameworkStagesListPage() {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const stages = useSelector(selectFrameworkStages);
//   const loading = useSelector(selectFrameworkStagesLoading);

//   useEffect(() => {
//     dispatch(fetchFrameworkStages());
//   }, [dispatch]);

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h1 className="text-xl font-semibold">Framework Stages</h1>
//         <Button onClick={() => navigate("/framework-stages/create")}>
//           Add Stage
//         </Button>
//       </div>

//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Title</TableHead>
//               <TableHead>Code</TableHead>
//               <TableHead>Framework</TableHead>
//               <TableHead className="text-right">Order</TableHead>
//               <TableHead className="text-right" />
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {loading && (
//               <TableRow>
//                 <TableCell colSpan={5} className="text-center">
//                   Loading...
//                 </TableCell>
//               </TableRow>
//             )}

//             {!loading && stages.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={5} className="text-center">
//                   No stages found
//                 </TableCell>
//               </TableRow>
//             )}

//             {!loading &&
//               stages.map((stage) => (
//                 <TableRow key={stage.id}>
//                   <TableCell className="font-medium">
//                     {stage.title}
//                   </TableCell>
//                   <TableCell>{stage.code || "-"}</TableCell>
//                   <TableCell>
//                     {stage.framework?.name || "-"}
//                   </TableCell>
//                   <TableCell className="text-right">
//                     {stage.sortOrder}
//                   </TableCell>
//                   <TableCell className="text-right space-x-2">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() =>
//                         navigate(
//                           `/framework-stages/${stage.id}/edit`
//                         )
//                       }
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       variant="destructive"
//                       size="sm"
//                       onClick={() =>
//                         dispatch(deleteFrameworkStage(stage.id))
//                       }
//                     >
//                       Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }
