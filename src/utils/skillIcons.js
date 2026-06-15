import { createElement } from "react";
import * as LucideIcons from "lucide-react";
import * as SimpleIcons from "react-icons/si";

export const ICON_PROVIDERS = {
    SIMPLE: "simple-icons",
    LUCIDE: "lucide",
};

const brandIconBySkillName = {
    React: "SiReact",
    "Node.js": "SiNodedotjs",
    "Express.js": "SiExpress",
    MongoDB: "SiMongodb",
    JavaScript: "SiJavascript",
    TypeScript: "SiTypescript",
    Java: "SiOpenjdk",
    Python: "SiPython",
    MySQL: "SiMysql",
    PostgreSQL: "SiPostgresql",
    "Tailwind CSS": "SiTailwindcss",
    "Git & GitHub": "SiGithub",
    Linux: "SiLinux",
    Docker: "SiDocker",
    "Spring Boot": "SiSpringboot",
    "HTML & CSS": "SiHtml5",
};

export const getIconCatalog = (provider) => {
    return provider === ICON_PROVIDERS.SIMPLE ? SimpleIcons : LucideIcons.icons;
};

export const resolveSkillIcon = (skill) => {
    const legacyBrandIcon = brandIconBySkillName[skill.name];

    if (
        legacyBrandIcon &&
        (!skill.icon || skill.icon === "Code" || skill.icon === "Code2")
    ) {
        return SimpleIcons[legacyBrandIcon];
    }

    if (skill.iconProvider === ICON_PROVIDERS.SIMPLE) {
        return SimpleIcons[skill.icon] || LucideIcons.Code2;
    }

    return (
        LucideIcons[skill.icon] ||
        LucideIcons.icons[skill.icon] ||
        LucideIcons.Code2
    );
};

export const renderSkillIcon = (skill, props = {}) => {
    return createElement(resolveSkillIcon(skill), props);
};
