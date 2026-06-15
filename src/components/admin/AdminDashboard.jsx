import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import ExperienceManager from "./ExperienceManager";
import ProjectsManager from "./ProjectsManager";
import SkillsManager from "./SkillsManager";

export default function AdminDashboard() {
    const [activeSection, setActiveSection] = useState("skills");

    return (
        <div className="min-h-screen bg-[#050810] text-white flex">
            <AdminSidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />

            <main className="flex-1 min-w-0 p-8">
                {activeSection === "skills" && <SkillsManager />}
                {activeSection === "projects" && <ProjectsManager />}
                {activeSection === "experience" && <ExperienceManager />}
            </main>
        </div>
    );
}
