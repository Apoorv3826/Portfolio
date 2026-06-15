import { createElement, useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2, X } from "lucide-react";
import api from "../../api/api";
import {
    getIconCatalog,
    ICON_PROVIDERS,
    renderSkillIcon,
} from "../../utils/skillIcons";

const emptyForm = {
    name: "",
    color: "#6c63ff",
    iconProvider: ICON_PROVIDERS.SIMPLE,
    icon: "SiReact",
};

export default function SkillsManager() {
    const [skills, setSkills] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [iconSearch, setIconSearch] = useState("");
    const [showIconPicker, setShowIconPicker] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const filteredIconNames = useMemo(() => {
        const query = iconSearch.trim().toLowerCase();
        const catalog = getIconCatalog(form.iconProvider);

        return Object.keys(catalog)
            .filter((name) => name.toLowerCase().includes(query))
            .slice(0, 120);
    }, [form.iconProvider, iconSearch]);

    const loadSkills = async () => {
        try {
            setError("");
            const response = await api.get("/skills");
            setSkills(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Unable to load skills");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Initial API synchronization when the manager opens.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadSkills();
    }, []);

    const resetForm = () => {
        setForm(emptyForm);
        setEditingId(null);
        setShowIconPicker(false);
        setIconSearch("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSaving(true);
        setError("");
        setMessage("");

        try {
            if (editingId) {
                await api.put(`/skills/${editingId}`, form);
                setMessage("Skill updated successfully");
            } else {
                await api.post("/skills", form);
                setMessage("Skill added successfully");
            }

            resetForm();
            await loadSkills();
        } catch (err) {
            setError(err.response?.data?.message || "Unable to save skill");
        } finally {
            setIsSaving(false);
        }
    };

    const handleEdit = (skill) => {
        setEditingId(skill._id);
        setForm({
            name: skill.name,
            color: skill.color,
            iconProvider: skill.iconProvider || ICON_PROVIDERS.LUCIDE,
            icon: skill.icon === "Code2" ? "Code" : skill.icon || "Code",
        });
        setMessage("");
        setError("");
    };

    const handleDelete = async (skill) => {
        const shouldDelete = window.confirm(`Delete ${skill.name}?`);
        if (!shouldDelete) return;

        try {
            setError("");
            setMessage("");
            await api.delete(`/skills/${skill._id}`);
            setMessage("Skill deleted successfully");

            if (editingId === skill._id) {
                resetForm();
            }

            await loadSkills();
        } catch (err) {
            setError(err.response?.data?.message || "Unable to delete skill");
        }
    };

    return (
        <section>
            <div className="flex items-center justify-between gap-4 mb-8">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6c63ff]">
                        Content Manager
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">Skills</h2>
                </div>
                <span className="text-sm text-gray-500">
                    {skills.length} skills
                </span>
            </div>

            <div className="grid xl:grid-cols-[360px_1fr] gap-6">
                <form
                    onSubmit={handleSubmit}
                    className="border border-white/10 bg-white/[0.03] rounded-lg p-5 self-start"
                >
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="font-bold">
                            {editingId ? "Edit skill" : "Add skill"}
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
                        Skill name
                    </label>
                    <input
                        required
                        value={form.name}
                        onChange={(event) =>
                            setForm({ ...form, name: event.target.value })
                        }
                        className="w-full bg-[#050810] border border-white/10 rounded-md px-3 py-2.5 text-sm outline-none focus:border-[#6c63ff]"
                        placeholder="PostgreSQL"
                    />

                    <label className="block text-xs font-semibold text-gray-400 mt-5 mb-2">
                        Icon color
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="color"
                            value={form.color}
                            onChange={(event) =>
                                setForm({ ...form, color: event.target.value })
                            }
                            className="h-10 w-11 bg-transparent border border-white/10 rounded-md cursor-pointer"
                        />
                        <input
                            required
                            value={form.color}
                            onChange={(event) =>
                                setForm({ ...form, color: event.target.value })
                            }
                            className="flex-1 bg-[#050810] border border-white/10 rounded-md px-3 py-2 text-sm outline-none focus:border-[#6c63ff]"
                        />
                    </div>

                    <label className="block text-xs font-semibold text-gray-400 mt-5 mb-2">
                        Icon library
                    </label>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                        {[
                            [ICON_PROVIDERS.SIMPLE, "Brand icons"],
                            [ICON_PROVIDERS.LUCIDE, "General icons"],
                        ].map(([provider, label]) => (
                            <button
                                key={provider}
                                type="button"
                                onClick={() => {
                                    setForm({
                                        ...form,
                                        iconProvider: provider,
                                        icon:
                                            provider === ICON_PROVIDERS.SIMPLE
                                                ? "SiReact"
                                                : "Code",
                                    });
                                    setIconSearch("");
                                }}
                                className={`rounded-md border px-3 py-2 text-xs font-semibold cursor-pointer ${
                                    form.iconProvider === provider
                                        ? "border-[#6c63ff] bg-[#6c63ff]/15 text-white"
                                        : "border-white/10 text-gray-500 hover:text-white"
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowIconPicker(!showIconPicker)}
                        className="w-full flex items-center gap-3 bg-[#050810] border border-white/10 rounded-md px-3 py-2.5 text-left hover:border-[#6c63ff]/60 cursor-pointer"
                    >
                        {renderSkillIcon(form, {
                            size: 20,
                            style: { color: form.color },
                        })}
                        <span className="text-sm">{form.icon}</span>
                    </button>

                    {showIconPicker && (
                        <div className="mt-3 border border-white/10 bg-[#050810] rounded-md p-3">
                            <div className="flex items-center gap-2 border border-white/10 rounded-md px-2 mb-3">
                                <Search size={15} className="text-gray-500" />
                                <input
                                    value={iconSearch}
                                    onChange={(event) =>
                                        setIconSearch(event.target.value)
                                    }
                                    placeholder="Search icons"
                                    className="w-full bg-transparent py-2 text-sm outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-6 gap-1 max-h-56 overflow-y-auto">
                                {filteredIconNames.map((iconName) => {
                                    const Icon = getIconCatalog(
                                        form.iconProvider,
                                    )[iconName];

                                    return (
                                        <button
                                            key={iconName}
                                            type="button"
                                            title={iconName}
                                            onClick={() => {
                                                setForm({
                                                    ...form,
                                                    icon: iconName,
                                                });
                                                setShowIconPicker(false);
                                            }}
                                            className={`aspect-square flex items-center justify-center rounded-md cursor-pointer ${
                                                form.icon === iconName
                                                    ? "bg-[#6c63ff]/25 text-white"
                                                    : "text-gray-500 hover:bg-white/5 hover:text-white"
                                            }`}
                                        >
                                            {createElement(Icon, { size: 18 })}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSaving}
                        className="mt-6 w-full flex items-center justify-center gap-2 bg-[#6c63ff] hover:bg-[#5b52ff] disabled:opacity-60 rounded-md py-2.5 text-sm font-bold transition-colors cursor-pointer"
                    >
                        <Plus size={17} />
                        {isSaving
                            ? "Saving..."
                            : editingId
                              ? "Update skill"
                              : "Add skill"}
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
                            Loading skills...
                        </p>
                    ) : (
                        <div className="grid sm:grid-cols-2 2xl:grid-cols-3 gap-3">
                            {skills.map((skill) => {
                                return (
                                    <article
                                        key={skill._id}
                                        className="border border-white/10 bg-white/[0.03] rounded-lg p-4 flex items-center gap-3"
                                    >
                                        <div
                                            className="w-10 h-10 border border-white/10 rounded-md flex items-center justify-center shrink-0"
                                            style={{ color: skill.color }}
                                        >
                                            {renderSkillIcon(skill, {
                                                size: 20,
                                            })}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-semibold truncate">
                                                {skill.name}
                                            </p>
                                            <p className="text-xs text-gray-600 truncate">
                                                {skill.iconProvider || "legacy"}{" "}
                                                · {skill.icon || "automatic"}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleEdit(skill)}
                                            title={`Edit ${skill.name}`}
                                            className="text-gray-500 hover:text-[#6c63ff] cursor-pointer"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(skill)}
                                            title={`Delete ${skill.name}`}
                                            className="text-gray-500 hover:text-[#ff6b9d] cursor-pointer"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
