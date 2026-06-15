const SectionLabel = ({ children }) => {
    return (
        <div className="flex items-center gap-3 mb-8">
            <span className="text-sm font-black uppercase tracking-widest text-gray-600">
                {children}
            </span>
            <span className="flex-1 h-px bg-white/[0.06]" />
        </div>
    );
};

export default SectionLabel;
