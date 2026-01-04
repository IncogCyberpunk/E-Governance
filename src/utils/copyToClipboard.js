import toast from "react-hot-toast";
import { useRef } from "react";

export const useCopyToClipboard = () => {
    const copiedRef = useRef(false);

    const copyToClipboard = (text, label) => {
        if (copiedRef.current) return;

        try {
            copiedRef.current = true;
            navigator.clipboard.writeText(text);
            toast.success(`Copied ${label} to clipboard!`);

            // Reset after 1 second to allow copying again
            setTimeout(() => {
                copiedRef.current = false;
            }, 1000);

        } catch (err) {
            console.error('Failed to copy text: ', err);
            toast.error(`Failed to copy ${label} to clipboard.`);
            copiedRef.current = false;
        }
    };

    return copyToClipboard;
};

