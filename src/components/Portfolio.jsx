import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import About from "./About";
import Experience from "./Experience";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";

export default function Portfolio() {
    const [activeSection, setActiveSection] = useState("about");

    useEffect(() => {
        const sections = [
            "about",
            "experience",
            "skills",
            "projects",
            "contact",
        ];
        let animationFrameId = null;

        const updateActiveSection = () => {
            const anchorLine = window.innerHeight * 0.35;
            let currentSection = sections[0];

            sections.forEach((id) => {
                const el = document.getElementById(id);
                if (!el) return;

                const rect = el.getBoundingClientRect();

                if (rect.top <= anchorLine) {
                    currentSection = id;
                }
            });

            setActiveSection(currentSection);
            animationFrameId = null;
        };

        const handleScroll = () => {
            if (animationFrameId) return;
            animationFrameId = window.requestAnimationFrame(updateActiveSection);
        };

        updateActiveSection();
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);

            if (animationFrameId) {
                window.cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);

    return (
        <div
            className="bg-[#050810] min-h-screen text-white"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
            <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');`}</style>

            <div className="hidden lg:block">
                <Sidebar active={activeSection} />
            </div>

            <main className="lg:ml-[28%] min-h-screen border-l border-white/[0.05]">
                <div className="px-16 pr-20 pt-16 pb-8">
                    <div className="lg:hidden mb-16">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6c63ff] to-[#ff6b9d] flex items-center justify-center text-white font-black text-lg">
                                AS
                            </div>
                            <div>
                                <h1 className="text-white font-black text-xl">
                                    Apoorv Singh
                                </h1>
                                <p className="text-gray-500 text-xs">
                                    MERN Stack Developer
                                </p>
                            </div>
                        </div>
                    </div>

                    <About />
                    <Experience />
                    <Skills />
                    <Projects />
                    <Contact />
                </div>
            </main>
        </div>
    );
}
