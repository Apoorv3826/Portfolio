import { BriefcaseBusiness, Code2, FolderKanban, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const sections = [
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "experience", label: "Experience", icon: BriefcaseBusiness },
];

export default function AdminSidebar({ activeSection, setActiveSection }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin", { replace: true });
    };

    return (
        <aside className="w-64 min-h-screen border-r border-white/10 bg-white/[0.02] p-5 flex flex-col">
            <div className="mb-10">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6c63ff]">
                    Apoorv CMS
                </p>
                <h1 className="mt-2 text-xl font-bold">Dashboard</h1>
            </div>

            <nav className="space-y-1">
                {sections.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        type="button"
                        onClick={() => setActiveSection(id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold transition-colors cursor-pointer ${
                            activeSection === id
                                ? "bg-[#6c63ff]/15 text-white"
                                : "text-gray-500 hover:bg-white/5 hover:text-gray-200"
                        }`}
                    >
                        <Icon size={18} />
                        {label}
                    </button>
                ))}
            </nav>

            <button
                type="button"
                onClick={handleLogout}
                className="mt-auto w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-gray-500 hover:bg-[#ff6b9d]/10 hover:text-[#ff6b9d] transition-colors cursor-pointer"
            >
                <LogOut size={18} />
                Logout
            </button>
        </aside>
    );
}
