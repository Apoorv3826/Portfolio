import { useState, useEffect } from "react";

function useTyped(words) {
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = words[wordIndex];
        const timeout = setTimeout(
            () => {
                if (!deleting) {
                    setText(current.substring(0, text.length + 1));
                    if (text.length + 1 === current.length) {
                        setTimeout(() => setDeleting(true), 1500);
                    }
                } else {
                    setText(current.substring(0, text.length - 1));
                    if (text.length - 1 === 0) {
                        setDeleting(false);
                        setWordIndex((prev) => (prev + 1) % words.length);
                    }
                }
            },
            deleting ? 50 : 100,
        );
        return () => clearTimeout(timeout);
    }, [text, deleting, wordIndex, words]);

    return text;
}

export default useTyped;
