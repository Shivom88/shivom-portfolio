import { useParams, Link } from "react-router-dom";
import { projects } from "@/data/projects";

export default function ProjectDetails() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  // Safety check
  if (!project) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-6 text-center">
        <h1 className="text-2xl font-bold text-white">Project not found</h1>
        <Link
          to="/"
          className="inline-block mt-6 text-cyan-400 hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-24 px-6">
      {/* Back */}
      <Link
        to="/"
        className="text-sm text-cyan-400 hover:underline"
      >
        ← Back to projects
      </Link>

      {/* Title */}
      <h1 className="text-4xl font-bold text-white mt-6">
        {project.title}
      </h1>

      {/* Image */}
      <div className="mt-8 rounded-2xl overflow-hidden border border-white/10">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-[420px] object-cover"
        />
      </div>

      {/* Description */}
      <p className="mt-8 text-gray-300 leading-relaxed max-w-3xl">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-3 mt-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-4 py-1.5 rounded-full text-sm border"
            style={{
              borderColor: `${project.color}55`,
              color: project.color,
              background: `${project.color}15`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-10">
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 rounded-lg bg-cyan-500 text-black font-medium hover:bg-cyan-400 transition"
        >
          Live Demo
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 rounded-lg border border-white/20 text-white hover:bg-white/5 transition"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}