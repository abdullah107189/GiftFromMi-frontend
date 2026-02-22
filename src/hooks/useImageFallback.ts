/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

interface UseImageFallbackReturn {
    currentImage: string;
    setImageIndex: (index: number) => void;
    handleError: () => void;
}

const useImageFallback = (
    images: string[] = [],
    fallback: string
): UseImageFallbackReturn => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // Reset when images change
    useEffect(() => {
        setCurrentIndex(0);
    }, [images]);

    const handleError = () => {
        if (images[currentIndex + 1]) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            setCurrentIndex(-1); // fallback mode
        }
    };

    const currentImage =
        currentIndex === -1 ? fallback : images[currentIndex] || fallback;

    return {
        currentImage,
        setImageIndex: setCurrentIndex,
        handleError,
    };
};

export default useImageFallback;
