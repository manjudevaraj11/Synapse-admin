// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createFrameworkStage } from "@/features/frameworkStages/frameworkStagesSlice";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useNavigate } from "react-router-dom";
// import type { AppDispatch } from "@/app/store";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { fetchFrameworks } from "@/features/frameworks/frameworksSlice";
// import { selectFrameworks } from "@/features/frameworks/frameworksSelectors";

// export default function CreateFrameworkStagePage() {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const frameworks = useSelector(selectFrameworks);

//   const [form, setForm] = useState({
//     title: "",
//     code: "",
//     frameworkId: "",
//     sortOrder: 0,
//   });

//   useEffect(() => {
//     dispatch(fetchFrameworks());
//   }, [dispatch]);

//   const handleSubmit = async () => {
//       console.log('form-----: ', form);
//     await dispatch(createFrameworkStage(form));
//     navigate("/framework-stages");
//   };

//   return (
//     <div className="max-w-lg space-y-6">
//       <h1 className="text-xl font-semibold">Create Framework Stage</h1>

//       <div className="space-y-4">
//         <div className="space-y-2">
//           <Label htmlFor="title">Title</Label>
//           <Input
//             id="title"
//             placeholder="Stage title"
//             value={form.title}
//             onChange={(e) => setForm({ ...form, title: e.target.value })}
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="code">Code</Label>
//           <Input
//             id="code"
//             placeholder="Optional code"
//             value={form.code}
//             onChange={(e) => setForm({ ...form, code: e.target.value })}
//           />
//         </div>

//         <div className="space-y-2">
//           <Label>Framework</Label>

//           <Select
//             value={form.frameworkId}
//             onValueChange={(value) =>
//               setForm({
//                 ...form,
//                 frameworkId: value,
//               })
//             }
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select a framework" />
//             </SelectTrigger>

//             <SelectContent>
//               {frameworks.map((framework) => (
//                 <SelectItem key={framework.id} value={framework.id}>
//                   {framework.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="sortOrder">Sort Order</Label>
//           <Input
//             id="sortOrder"
//             type="number"
//             value={form.sortOrder}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 sortOrder: Number(e.target.value),
//               })
//             }
//           />
//         </div>
//       </div>

//       <div className="flex justify-end gap-2">
//         <Button variant="outline" onClick={() => navigate("/framework-stages")}>
//           Cancel
//         </Button>
//         <Button onClick={handleSubmit}>Create</Button>
//       </div>
//     </div>
//   );
// }
