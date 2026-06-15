import {
    GraduationCap,
    MapPin,
    Briefcase,
    Zap,
    Award,
    Coffee,
    Terminal,
    Globe,
} from "lucide-react";
import SectionLabel from "./SectionLabel";
import { aboutData } from "../data";

const highlightIcons = {
    "B.Tech CSE": <GraduationCap size={18} className="text-[#6c63ff]" />,
    Location: <MapPin size={18} className="text-[#ff6b9d]" />,
    Status: <Briefcase size={18} className="text-[#00d4ff]" />,
    Focus: <Zap size={18} className="text-[#fbbf24]" />,
};

const certIcons = {
    "Problem Solving (Intermediate)": (
        <Award size={18} className="text-[#00d4ff]" />
    ),
    "Advance Java": <Coffee size={18} className="text-[#ff6b9d]" />,
    "Linux System Administration": (
        <Terminal size={18} className="text-[#4ade80]" />
    ),
    "IIRS Geoprocessing using Python": (
        <Globe size={18} className="text-[#fbbf24]" />
    ),
};

export default function About() {
    return (
        <section id="about" className="mb-20">
            <SectionLabel>About</SectionLabel>

            {/* Bio */}
            <div className="space-y-4 mb-10">
                {aboutData.paragraphs.map((p, i) => (
                    <p
                        key={i}
                        className="text-gray-400 text-[16px] leading-loose tracking-wide"
                    >
                        {p}
                    </p>
                ))}
            </div>

            {/* Highlight pills */}
            <div className="grid grid-cols-2 gap-3 mb-10">
                {aboutData.highlights.map((h) => (
                    <div
                        key={h.title}
                        className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.07] rounded-xl px-5 py-4 hover:border-[#6c63ff]/30 hover:bg-[#6c63ff]/5 transition-all duration-200 group"
                    >
                        <div className="w-9 h-9 rounded-lg bg-white/[0.05] flex items-center justify-center flex-shrink-0 group-hover:bg-[#6c63ff]/10 transition-colors">
                            {highlightIcons[h.title]}
                        </div>
                        <div className="flex-1">
                            <div className="text-gray-500 text-[11px] font-bold uppercase tracking-[0.12em]">
                                {h.title}
                            </div>
                            <div className="text-white text-[15px] font-semibold mt-0.5 tracking-[0.06em]">
                                {h.value}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Certifications */}
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-600 mb-6">
                    Certifications
                </p>
                <div className="space-y-5">
                    {aboutData.certifications.map((c) => (
                        <div
                            key={c.name}
                            className="flex items-center gap-4 group"
                        >
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                                style={{ background: c.color }}
                            >
                                {certIcons[c.name]}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-white text-[15px] font-medium group-hover:text-[#6c63ff] transition-colors tracking-wide">
                                    {c.name}
                                </div>
                                <div className="text-gray-600 text-sm tracking-wide mt-0.5">
                                    {c.org}
                                </div>
                            </div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#6c63ff]/40 flex-shrink-0 group-hover:bg-[#6c63ff] transition-colors" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
