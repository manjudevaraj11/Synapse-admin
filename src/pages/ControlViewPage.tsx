import { useParams } from "react-router-dom";

const ControlViewPage = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        Control Details - {id}
      </h1>

      <p className="text-gray-500 mt-2">
        This page will show details for control ID: {id}.
      </p>
    </div>
  );
};

export default ControlViewPage;
