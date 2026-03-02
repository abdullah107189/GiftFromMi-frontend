import { Skeleton } from "@/components/ui/skeleton";

const ProfileFormSkeleton = () => {
    return (
        <div className="border border-[#E5E7EB] shadow-[0_6px_16px_0_rgba(0,0,0,0.12)] xl:rounded-4xl rounded-2xl xl:p-10 md:p-6 p-3 border-solid bg-white">

            {/* Profile Image Skeleton */}
            <div className="relative xl:w-[150px] xl:h-[150px] md:w-[120px] md:h-[120px] w-[100px] h-[100px] xl:mb-12 lg:mb-10 md:mb-8 mb-6">
                <Skeleton className="w-full h-full rounded-full" />
                <Skeleton className="absolute bottom-1 right-1 w-8 h-8 rounded-full border-2 border-white" />
            </div>

            <div className="space-y-6">
                {/* Name Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" /> {/* Label */}
                        <Skeleton className="md:h-12 h-10 w-full rounded-2xl" /> {/* Input */}
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="md:h-12 h-10 w-full rounded-2xl" />
                    </div>
                </div>

                {/* Email Skeleton */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="md:h-12 h-10 w-full rounded-2xl" />
                </div>

                {/* Phone Skeleton */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="md:h-12 h-10 w-full rounded-2xl" />
                </div>

                {/* Gender Skeleton */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="md:h-12 h-10 w-full rounded-2xl" />
                </div>

                {/* Button Skeleton */}
                <Skeleton className="h-12 w-full rounded-2xl mt-4" />
            </div>
        </div>
    );
};

export default ProfileFormSkeleton;