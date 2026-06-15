import { useEffect, useState } from "react";
import SectionLabel from "./SectionLabel";
import { GitFork, ExternalLink } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${API_URL}/api/projects`);

                if (!response.ok) {
                    throw new Error("Unable to load projects");
                }

                const data = await response.json();
                setProjects(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <section id="projects" className="mb-20">
            <SectionLabel>Projects</SectionLabel>

            {isLoading && (
                <p className="text-gray-500 text-sm tracking-wide">
                    Loading projects...
                </p>
            )}

            {!isLoading && error && (
                <p className="text-[#ff6b9d] text-sm tracking-wide">{error}</p>
            )}

            {!isLoading && !error && (
                <div className="space-y-4">
                    {projects.map((p) => (
                        <div
                            key={p._id || p.num || p.title}
                            className="group bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 hover:border-[#6c63ff]/30 hover:bg-white/[0.05] transition-all duration-300"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-white font-bold text-[17px] tracking-wide group-hover:text-[#6c63ff] transition-colors">
                                            {p.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-500 text-[15px] leading-relaxed mb-4 tracking-wide">
                                        {p.description}
                                    </p>
                                    <div className="flex gap-2">
                                        <a
                                            href={p.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-white border border-white/10 hover:border-white/30 px-4 py-2 rounded-full transition-all duration-200"
                                        >
                                            <GitFork size={13} /> Code
                                        </a>
                                        {p.live && (
                                            <a
                                                href={p.live}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white bg-gradient-to-r from-[#6c63ff] to-[#ff6b9d] px-3 py-1.5 rounded-full hover:opacity-80 transition-all duration-200"
                                            >
                                                <ExternalLink size={13} /> Live
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Projects;
