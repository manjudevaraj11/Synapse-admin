// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchFrameworkStages,
//   updateFrameworkStage,
// } from "@/features/frameworkStages/frameworkStagesSlice";
// import { selectFrameworkStages } from "@/features/frameworkStages/frameworkStagesSelectors";
// import { useParams, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import type { AppDispatch } from "@/app/store";

// export default function EditFrameworkStagePage() {
//   const { id } = useParams<{ id: string }>();
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const stages = useSelector(selectFrameworkStages);

//   const stage = stages.find((s) => s.id === id);

//   const [form, setForm] = useState<any>(stage);

//   useEffect(() => {
//     if (!stage) dispatch(fetchFrameworkStages());
//   }, []);

//   useEffect(() => {
//     if (stage) setForm(stage);
//   }, [stage]);

//   if (!form) return null;

//   const handleSubmit = async () => {
//     await dispatch(updateFrameworkStage({ id: id!, data: form }));
//     navigate("/framework-stages");
//   };

//   return (
//     <div className="space-y-4 max-w-lg">
//       <h1 className="text-xl font-semibold">Edit Framework Stage</h1>

//       <Input
//         value={form.title}
//         onChange={(e) =>
//           setForm({ ...form, title: e.target.value })
//         }
//       />

//       <Input
//         value={form.code}
//         onChange={(e) =>
//           setForm({ ...form, code: e.target.value })
//         }
//       />

//       <Input
//         type="number"
//         value={form.sortOrder}
//         onChange={(e) =>
//           setForm({
//             ...form,
//             sortOrder: Number(e.target.value),
//           })
//         }
//       />

//       <Button onClick={handleSubmit}>Save</Button>
//     </div>
//   );
// }
