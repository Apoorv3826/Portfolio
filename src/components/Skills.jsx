import { useEffect, useState } from "react";
import SectionLabel from "./SectionLabel";
import { renderSkillIcon } from "../utils/skillIcons";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Skills() {
    const [skills, setSkills] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await fetch(`${API_URL}/api/skills`);

                if (!response.ok) {
                    throw new Error("Unable to load skills");
                }

                const data = await response.json();
                setSkills(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSkills();
    }, []);

    return (
        <section id="skills" className="mb-20">
            <SectionLabel>Skills</SectionLabel>

            {isLoading && (
                <p className="text-gray-500 text-sm tracking-wide">
                    Loading skills...
                </p>
            )}

            {!isLoading && error && (
                <p className="text-[#ff6b9d] text-sm tracking-wide">{error}</p>
            )}

            {!isLoading && !error && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {skills.map((skill) => {
                        return (
                            <div
                                key={skill._id || skill.name}
                                className="group bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 flex flex-col items-center gap-3 hover:border-[#6c63ff]/40 hover:bg-[#6c63ff]/5 transition-all duration-200 cursor-default"
                            >
                                <div
                                    className="transition-transform duration-200 group-hover:scale-110"
                                    style={{ color: skill.color }}
                                >
                                    {renderSkillIcon(skill, { size: 26 })}
                                </div>
                                <span className="text-gray-500 text-xs font-semibold text-center tracking-widest uppercase group-hover:text-gray-300 transition-colors">
                                    {skill.name}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}
