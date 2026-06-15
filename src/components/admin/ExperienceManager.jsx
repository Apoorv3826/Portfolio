import { useEffect, useState } from "react";
import { ChevronRight, Pencil, Plus, Trash2, X } from "lucide-react";
import api from "../../api/api";

const emptyForm = {
    role: "",
    company: "",
    period: "",
    pointsText: "",
    tagsText: "",
};

const splitLines = (value) => {
    return value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);
};

const splitTags = (value) => {
    return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
};

export default function ExperienceManager() {
    const [experiences, setExperiences] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const loadExperiences = async () => {
        try {
            setError("");
            const response = await api.get("/experience");
            setExperiences(response.data);
        } catch (err) {
            setError(
                err.response?.data?.message || "Unable to load experience",
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadExperiences();
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
            role: form.role,
            company: form.company,
            period: form.period,
            points: splitLines(form.pointsText),
            tags: splitTags(form.tagsText),
        };

        try {
            if (editingId) {
                await api.put(`/experience/${editingId}`, payload);
                setMessage("Experience updated successfully");
            } else {
                await api.post("/experience", payload);
                setMessage("Experience added successfully");
            }

            resetForm();
            await loadExperiences();
        } catch (err) {
            setError(
                err.response?.data?.message || "Unable to save experience",
            );
        } finally {
            setIsSaving(false);
        }
    };

    const handleEdit = (experience) => {
        setEditingId(experience._id);
        setForm({
            role: experience.role || "",
            company: experience.company || "",
            period: experience.period || "",
            pointsText: (experience.points || []).join("\n"),
            tagsText: (experience.tags || []).join(", "),
        });
        setMessage("");
        setError("");
    };

    const handleDelete = async (experience) => {
        const shouldDelete = window.confirm(`Delete ${experience.role}?`);
        if (!shouldDelete) return;

        try {
            setError("");
            setMessage("");
            await api.delete(`/experience/${experience._id}`);
            setMessage("Experience deleted successfully");

            if (editingId === experience._id) {
                resetForm();
            }

            await loadExperiences();
        } catch (err) {
            setError(
                err.response?.data?.message || "Unable to delete experience",
            );
        }
    };

    return (
        <section>
            <div className="flex items-center justify-between gap-4 mb-8">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6c63ff]">
                        Content Manager
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">Experience</h2>
                </div>
            </div>

            <div className="grid xl:grid-cols-[420px_1fr] gap-6">
                <form
                    onSubmit={handleSubmit}
                    className="border border-white/10 bg-white/[0.03] rounded-lg p-5 self-start"
                >
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="font-bold">
                            {editingId ? "Edit experience" : "Add experience"}
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

                    <label className="block text-xs font-semibold text-gray-400 mb-2">
                        Role
                    </label>
                    <input
                        required
                        value={form.role}
                        onChange={(event) =>
                            updateField("role", event.target.value)
                        }
                        className="w-full bg-[#050810] border border-white/10 rounded-md px-3 py-2.5 text-sm outline-none focus:border-[#6c63ff]"
                        placeholder="Full Stack Developer"
                    />

                    <label className="block text-xs font-semibold text-gray-400 mt-5 mb-2">
                        Company
                    </label>
                    <input
                        required
                        value={form.company}
                        onChange={(event) =>
                            updateField("company", event.target.value)
                        }
                        className="w-full bg-[#050810] border border-white/10 rounded-md px-3 py-2.5 text-sm outline-none focus:border-[#6c63ff]"
                        placeholder="Company name"
                    />

                    <label className="block text-xs font-semibold text-gray-400 mt-5 mb-2">
                        Period
                    </label>
                    <input
                        required
                        value={form.period}
                        onChange={(event) =>
                            updateField("period", event.target.value)
                        }
                        className="w-full bg-[#050810] border border-white/10 rounded-md px-3 py-2.5 text-sm outline-none focus:border-[#6c63ff]"
                        placeholder="Jan 2026 - Present"
                    />

                    <label className="block text-xs font-semibold text-gray-400 mt-5 mb-2">
                        Bullet points
                    </label>
                    <textarea
                        value={form.pointsText}
                        onChange={(event) =>
                            updateField("pointsText", event.target.value)
                        }
                        className="w-full min-h-32 bg-[#050810] border border-white/10 rounded-md px-3 py-2.5 text-sm outline-none focus:border-[#6c63ff] resize-y"
                        placeholder={
                            "One point per line\nBuilt REST APIs\nImproved UI performance"
                        }
                    />

                    <label className="block text-xs font-semibold text-gray-400 mt-5 mb-2">
                        Tags
                    </label>
                    <input
                        value={form.tagsText}
                        onChange={(event) =>
                            updateField("tagsText", event.target.value)
                        }
                        className="w-full bg-[#050810] border border-white/10 rounded-md px-3 py-2.5 text-sm outline-none focus:border-[#6c63ff]"
                        placeholder="React, Node.js, MongoDB"
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
                              ? "Update experience"
                              : "Add experience"}
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
                            Loading experience...
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {experiences.map((experience) => (
                                <article
                                    key={experience._id}
                                    className="border border-white/10 bg-white/[0.03] rounded-lg p-5"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-start justify-between gap-2">
                                                <h3 className="font-bold">
                                                    {experience.role}
                                                </h3>
                                                <span className="text-xs font-semibold text-[#00d4ff] bg-[#00d4ff]/10 border border-[#00d4ff]/20 px-2.5 py-1 rounded-full">
                                                    {experience.period}
                                                </span>
                                            </div>
                                            <p className="mt-1 text-sm text-[#6c63ff]">
                                                {experience.company}
                                            </p>
                                            <ul className="mt-4 space-y-2">
                                                {(experience.points || []).map(
                                                    (point) => (
                                                        <li
                                                            key={point}
                                                            className="flex gap-2 text-sm text-gray-500"
                                                        >
                                                            <ChevronRight
                                                                size={15}
                                                                className="mt-0.5 text-[#6c63ff] shrink-0"
                                                            />
                                                            {point}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {(experience.tags || []).map(
                                                    (tag) => (
                                                        <span
                                                            key={tag}
                                                            className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#6c63ff]/10 border border-[#6c63ff]/20 text-[#6c63ff]"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleEdit(experience)
                                            }
                                            title={`Edit ${experience.role}`}
                                            className="text-gray-500 hover:text-[#6c63ff] cursor-pointer"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(experience)
                                            }
                                            title={`Delete ${experience.role}`}
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
