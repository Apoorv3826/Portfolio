import useTyped from "../hooks/useTyped";
import { heroData, contactData } from "../data";
import { GithubIcon, LinkedinIcon, MailIcon } from "./Icons";

function Sidebar({ active }) {
    const typedText = useTyped(heroData.roles);

    return (
        <aside // aside tag
            className="fixed top-0 left-0 h-screen w-[28%] flex flex-col justify-between px-10 py-16 z-10 overflow-hidden"
        >
            {/* Ambient glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#6c63ff]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
                {/* Avatar + Name */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6c63ff] to-[#ff6b9d] flex items-center justify-center text-white font-black text-xl flex-shrink-0 shadow-lg shadow-[#6c63ff]/20">
                        AS
                    </div>
                    <div>
                        <h1 className="text-white font-black text-2xl tracking-tight leading-tight">
                            Apoorv Singh
                        </h1>
                        <p className="text-gray-500 text-sm mt-0.5">
                            Computer Science Engineer
                        </p>
                    </div>
                </div>

                {/* Typed role */}
                <div className="mb-8">
                    <span className="text-[#6c63ff] text-base font-semibold font-mono">
                        {typedText}
                        <span className="animate-pulse text-[#ff6b9d]">_</span>
                    </span>
                </div>

                {/* Short bio */}
                <p className="text-gray-500 text-[15px] leading-relaxed mb-10 max-w-xs">
                    Building scalable web apps with the MERN stack. Based in
                    Bhopal, India. Open to full-time roles.
                </p>

                {/* Nav */}
                <nav className="flex flex-col gap-1">
                    {[
                        "about",
                        "experience",
                        "skills",
                        "projects",
                        "contact",
                    ].map((item) => (
                        <a
                            key={item}
                            href={`#${item}`}
                            className={`group flex items-center gap-3 py-2 transition-all duration-200 ${
                                active === item
                                    ? "text-white"
                                    : "text-gray-600 hover:text-gray-300"
                            }`}
                        >
                            <span
                                className={`h-px transition-all duration-300 ${
                                    active === item
                                        ? "w-10 bg-gradient-to-r from-[#6c63ff] to-[#ff6b9d]"
                                        : "w-4 bg-gray-700 group-hover:w-6 group-hover:bg-gray-500"
                                }`}
                            />
                            <span
                                className={`text-sm font-bold uppercase tracking-widest ${
                                    active === item ? "text-white" : ""
                                }`}
                            >
                                {item}
                            </span>
                        </a>
                    ))}
                </nav>
            </div>

            {/* Socials */}
            <div className="flex gap-4">
                {heroData.socials.map((s) => (
                    <a
                        key={s.label}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        title={s.label}
                        className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-[#6c63ff]/40 hover:bg-[#6c63ff]/10 transition-all duration-200"
                    >
                        {s.icon === "github" && <GithubIcon size={20} />}
                        {s.icon === "linkedin" && <LinkedinIcon size={20} />}
                        {s.icon === "hackerrank" && (
                            <span className="text-[11px] font-black tracking-wider text-[#00d4ff]">
                                HR
                            </span>
                        )}
                        {s.icon === "codechef" && (
                            <span className="text-[11px] font-black tracking-wider text-[#ff6b9d]">
                                CC
                            </span>
                        )}
                    </a>
                ))}
                {/* Email */}
                <a
                    href={`mailto:${contactData.email}`}
                    className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-[#ff6b9d]/40 hover:bg-[#ff6b9d]/10 transition-all duration-200"
                    title="Email"
                >
                    <MailIcon size={20} />
                </a>
            </div>
        </aside>
    );
}

export default Sidebar;
