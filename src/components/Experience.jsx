import { useEffect, useState } from "react";
import SectionLabel from "./SectionLabel";
import { ChevronRight } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Experience = () => {
    const [experiences, setExperiences] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const response = await fetch(`${API_URL}/api/experience`);

                if (!response.ok) {
                    throw new Error("Unable to load experience");
                }

                const data = await response.json();
                setExperiences(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchExperiences();
    }, []);

    return (
        <section id="experience" className="mb-20">
            <SectionLabel>Experience</SectionLabel>

            {isLoading && (
                <p className="text-gray-500 text-sm tracking-wide">
                    Loading experience...
                </p>
            )}

            {!isLoading && error && (
                <p className="text-[#ff6b9d] text-sm tracking-wide">{error}</p>
            )}

            {!isLoading && !error && (
                <div className="space-y-4">
                    {experiences.map((exp) => (
                        <div
                            key={exp._id || `${exp.role}-${exp.company}`}
                            className="group bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 hover:border-[#6c63ff]/30 hover:bg-white/[0.05] transition-all duration-300 cursor-default"
                        >
                            <div className="flex justify-between items-start mb-1 flex-wrap gap-2">
                                <h3 className="text-white font-bold text-[17px] tracking-wide group-hover:text-[#6c63ff] transition-colors">
                                    {exp.role}
                                </h3>
                                <span className="text-xs font-semibold text-[#00d4ff] bg-[#00d4ff]/10 border border-[#00d4ff]/20 px-3 py-1 rounded-full whitespace-nowrap">
                                    {exp.period}
                                </span>
                            </div>
                            <p className="text-[#6c63ff] text-[14px] tracking-wide font-medium mb-4">
                                {exp.company}
                            </p>
                            <ul className="space-y-2 mb-4">
                                {(exp.points || []).map((pt, j) => (
                                    <li
                                        key={j}
                                        className="flex gap-2 text-gray-500 text-[15px] tracking-wide leading-relaxed"
                                    >
                                        <ChevronRight
                                            size={16}
                                            className="text-[#6c63ff] mt-0.5 flex-shrink-0"
                                        />
                                        {pt}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-wrap gap-2">
                                {(exp.tags || []).map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs tracking-wider font-semibold px-2.5 py-1 rounded-full bg-[#6c63ff]/10 border border-[#6c63ff]/20 text-[#6c63ff]"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Experience;
