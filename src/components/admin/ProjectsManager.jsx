import { useEffect, useState } from "react";
import { ExternalLink, GitFork, Pencil, Plus, Trash2, X } from "lucide-react";
import api from "../../api/api";

const emptyForm = {
    num: "",
    title: "",
    description: "",
    github: "",
    live: "",
};

export default function ProjectsManager() {
    const [projects, setProjects] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const loadProjects = async () => {
        try {
            setError("");
            const response = await api.get("/projects");
            setProjects(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Unable to load projects");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const resetForm = () => {
        setForm(emptyForm);
        setEditingId(null);
    };

    const updateField = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSaving(true);
        setError("");
        setMessage("");

        const payload = {
            ...form,
            live: form.live.trim() || null,
        };

        try {
            if (editingId) {
                await api.put(`/projects/${editingId}`, payload);
                setMessage("Project updated successfully");
            } else {
                await api.post("/projects", payload);
                setMessage("Project added successfully");
            }

            resetForm();
            await loadProjects();
        } catch (err) {
            setError(err.response?.data?.message || "Unable to save project");
        } finally {
            setIsSaving(false);
        }
    };

    const handleEdit = (project) => {
        setEditingId(project._id);
        setForm({
            num: project.num || "",
            title: project.title || "",
            description: project.description || "",
            github: project.github || "",
            live: project.live || "",
        });
        setMessage("");
        setError("");
    };

    const handleDelete = async (project) => {
        const shouldDelete = window.confirm(`Delete ${project.title}?`);
        if (!shouldDelete) return;

        try {
            setError("");
            setMessage("");
            await api.delete(`/projects/${project._id}`);
            setMessage("Project deleted successfully");

            if (editingId === project._id) {
                resetForm();
            }

            await loadProjects();
        } catch (err) {
            setError(err.response?.data?.message || "Unable to delete project");
        }
    };

    return (
        <section>
            <div className="flex items-center justify-between gap-4 mb-8">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6c63ff]">
                        Content Manager
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">Projects</h2>
                </div>
                <span className="text-sm text-gray-500">
                    {projects.length} projects
                </span>
            </div>

            <div className="grid xl:grid-cols-[420px_1fr] gap-6">
                <form
                    onSubmit={handleSubmit}
                    className="border border-white/10 bg-white/[0.03] rounded-lg p-5 self-start"
                >
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="font-bold">
                            {editingId ? "Edit project" : "Add project"}
                        </h3>
                        {editingId && (
                            <button
                                type="button"
                                onClick={resetForm}
                                title="Cancel editing"
                                className="text-gray-500 hover:text-white cursor-pointer"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-[90px_1fr] gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">
                                No.
                            </label>
                            <input
                                required
                                value={form.num}
                                onChange={(event) =>
                                    updateField("num", event.target.value)
                                }
                                className="w-full bg-[#050810] border border-white/10 rounded-md px-3 py-2.5 text-sm outline-none focus:border-[#6c63ff]"
                                placeholder="05"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">
                                Title
                            </label>
                            <input
                                required
                                value={form.title}
                                onChange={(event) =>
                                    updateField("title", event.target.value)
                                }
                                className="w-full bg-[#050810] border border-white/10 rounded-md px-3 py-2.5 text-sm outline-none focus:border-[#6c63ff]"
                                placeholder="Portfolio CMS"
                            />
                        </div>
                    </div>

                    <label className="block text-xs font-semibold text-gray-400 mt-5 mb-2">
                        Description
                    </label>
                    <textarea
                        required
                        value={form.description}
                        onChange={(event) =>
                            updateField("description", event.target.value)
                        }
                        className="w-full min-h-28 bg-[#050810] border border-white/10 rounded-md px-3 py-2.5 text-sm outline-none focus:border-[#6c63ff] resize-y"
                        placeholder="Short project description"
                    />

                    <label className="block text-xs font-semibold text-gray-400 mt-5 mb-2">
                        GitHub URL
                    </label>
                    <input
                        required
                        value={form.github}
                        onChange={(event) =>
                            updateField("github", event.target.value)
                        }
                        className="w-full bg-[#050810] border border-white/10 rounded-md px-3 py-2.5 text-sm outline-none focus:border-[#6c63ff]"
                        placeholder="https://github.com/..."
                    />

                    <label className="block text-xs font-semibold text-gray-400 mt-5 mb-2">
                        Live URL
                    </label>
                    <input
                        value={form.live}
                        onChange={(event) =>
                            updateField("live", event.target.value)
                        }
                        className="w-full bg-[#050810] border border-white/10 rounded-md px-3 py-2.5 text-sm outline-none focus:border-[#6c63ff]"
                        placeholder="https://project-demo.netlify.app/"
                    />

                    <button
                        type="submit"
                        disabled={isSaving}
                        className="mt-6 w-full flex items-center justify-center gap-2 bg-[#6c63ff] hover:bg-[#5b52ff] disabled:opacity-60 rounded-md py-2.5 text-sm font-bold transition-colors cursor-pointer"
                    >
                        <Plus size={17} />
                        {isSaving
                            ? "Saving..."
                            : editingId
                              ? "Update project"
                              : "Add project"}
                    </button>
                </form>

                <div>
                    {message && (
                        <p className="mb-4 text-sm text-emerald-400">
                            {message}
                        </p>
                    )}
                    {error && (
                        <p className="mb-4 text-sm text-[#ff6b9d]">{error}</p>
                    )}

                    {isLoading ? (
                        <p className="text-sm text-gray-500">
                            Loading projects...
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {projects.map((project) => (
                                <article
                                    key={project._id}
                                    className="border border-white/10 bg-white/[0.03] rounded-lg p-5"
                                >
                                    <div className="flex items-start gap-4">
                                        <span className="text-xs font-black text-[#6c63ff] bg-[#6c63ff]/10 border border-[#6c63ff]/20 rounded-md px-2 py-1">
                                            {project.num}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-bold">
                                                {project.title}
                                            </h3>
                                            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-white"
                                                >
                                                    <GitFork size={14} />
                                                    Code
                                                </a>
                                                {project.live && (
                                                    <a
                                                        href={project.live}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-white"
                                                    >
                                                        <ExternalLink
                                                            size={14}
                                                        />
                                                        Live
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleEdit(project)}
                                            title={`Edit ${project.title}`}
                                            className="text-gray-500 hover:text-[#6c63ff] cursor-pointer"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(project)
                                            }
                                            title={`Delete ${project.title}`}
                                            className="text-gray-500 hover:text-[#ff6b9d] cursor-pointer"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
