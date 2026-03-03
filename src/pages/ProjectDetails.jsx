import { useParams } from "react-router-dom";

export default function ProjectDetails() {
  const { id } = useParams();

  return (
    <div className="max-w-5xl mx-auto py-24 px-6">
      <h1 className="text-3xl font-bold text-white">
        Project Details
      </h1>
      <p className="mt-4 text-gray-400">
        Project ID: <span className="text-cyan-400">{id}</span>
      </p>
    </div>
  );
}