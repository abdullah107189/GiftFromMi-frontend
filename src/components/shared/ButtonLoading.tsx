import { Loader2 } from "lucide-react";

export const ButtonLoading = ({ loadingText }: { loadingText: string }) => {
    return (
        <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>{loadingText}</span>
        </div>
    );
};