import React from "react";

interface LoadingProps {
    variant?: "grid" | "spinner" | "page";
    count?: number;
}

const PageLoader: React.FC<LoadingProps> = ({
    variant = "page",
    count = 8,
}) => {
    // 🔹 Center Spinner
    if (variant === "spinner") {
        return (
            <div className="flex items-center justify-center h-40">
                <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // 🔹 Full Page Loader
    if (variant === "page") {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary"></div>
            </div>
        );
    }

    // 🔹 Product Grid Skeleton (Default)
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="flex flex-col p-4 gap-4 rounded-2xl border bg-white animate-pulse"
                >
                    <div className="w-full h-48 bg-gray-200 rounded-xl"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
                </div>
            ))}
        </div>
    );
};

export default PageLoader;
