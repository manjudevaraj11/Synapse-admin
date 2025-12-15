import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFrameworks,
  deleteFramework,
} from "@/features/frameworks/frameworksSlice";
import { selectFrameworks } from "@/features/frameworks/frameworksSelectors";
import { type AppDispatch } from "@/app/store";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function FrameworksListPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const frameworks = useSelector(selectFrameworks);

  useEffect(() => {
    dispatch(fetchFrameworks());
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Frameworks</h1>
        <Button onClick={() => navigate("/frameworks/create")}>
          Create Framework
        </Button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Name</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {frameworks.map((f) => (
            <tr key={f.id} className="border-b">
              <td className="p-2">{f.name}</td>
              <td className="p-2 text-center">{f.status}</td>
              <td className="p-2 flex gap-2 justify-center">
                <Button
                  size="sm"
                  onClick={() => navigate(`/frameworks/${f.id}/edit`)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => dispatch(deleteFramework(f.id))}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
