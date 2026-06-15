import SectionLabel from "./SectionLabel";
import { Mail } from "lucide-react";

const Contact = () => {
    const contactData = {
        email: "singhapoorv350@gmail.com",
        socials: [
            { label: "GitHub", url: "https://github.com/Apoorv3826" },
            {
                label: "LinkedIn",
                url: "https://www.linkedin.com/in/apoorv-singh-a7b79b224/",
            },
            {
                label: "Portfolio",
                url: "https://apoorv-my-portfolio.netlify.app/",
            },
        ],
    };

    const currentYear = new Date().getFullYear();

    return (
        <section id="contact" className="mb-20">
            <SectionLabel>Contact</SectionLabel>
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 text-center hover:border-[#6c63ff]/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6c63ff] to-[#ff6b9d] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#6c63ff]/20">
                    <Mail size={22} className="text-white" />
                </div>

                <h3 className="text-white font-black text-2xl mb-2 tracking-tight">
                    Let's Work Together
                </h3>

                <p className="text-gray-500 text-[15px] mb-6 max-w-xs mx-auto leading-relaxed tracking-wide">
                    Currently open to full-time roles and freelance projects. My
                    inbox is always open.
                </p>

                <a
                    href={`mailto:${contactData.email}`}
                    className="inline-flex items-center gap-2 px-10 py-3.5 rounded-full bg-gradient-to-r from-[#6c63ff] to-[#ff6b9d] text-white text-[15px] font-bold hover:opacity-80 hover:scale-105 transition-all duration-200 shadow-lg shadow-[#6c63ff]/20"
                >
                    Say Hello →
                </a>

                <div className="flex justify-center gap-3 mt-6">
                    {contactData.socials.map((s) => (
                        <a
                            key={s.label}
                            href={s.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-600 hover:text-gray-300 text-sm font-medium transition-colors underline underline-offset-4 tracking-wide"
                        >
                            {s.label}
                        </a>
                    ))}
                </div>
            </div>

            <p className="text-center text-gray-700 text-xs mt-10">
                Designed & Built by{" "}
                <span className="text-gray-500">Apoorv Singh</span> ·{" "}
                {currentYear}
            </p>
        </section>
    );
};

export default Contact;
