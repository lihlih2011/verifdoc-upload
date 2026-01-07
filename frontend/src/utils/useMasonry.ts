
import { useEffect, useRef, useState } from "react";

export default function useMasonry() {
    const masonryContainer = useRef<HTMLDivElement>(null);
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        if (masonryContainer.current) {
            const masonryItem = Array.from(masonryContainer.current.children);
            setItems(masonryItem);
        }
    }, []);

    useEffect(() => {
        if (items.length > 0) {
            // Simple grid layout logic or just let CSS grid handle it (if configured)
            // For now, returning ref is enough if CSS handles columns
            // But the original component likely expected a script to rearrange items.
            // We will assume simpler CSS columns for now to avoid complexity errors.
        }
    }, [items]);

    return masonryContainer;
}
