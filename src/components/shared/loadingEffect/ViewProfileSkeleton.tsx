import { Card, CardContent } from "@/components/ui/card";

export default function ViewProfileSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white">
        <div className="px-5 py-6 md:px-8 md:py-8 xl:px-10">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              {/* Avatar */}
              <div className="h-24 w-24 md:h-28 md:w-28 rounded-full bg-gray-200" />

              <div className="space-y-3">
                <div className="h-4 w-28 bg-gray-200 rounded" />
                <div className="h-7 w-48 bg-gray-200 rounded" />

                {/* badges */}
                <div className="flex gap-2">
                  <div className="h-6 w-24 bg-gray-200 rounded-full" />
                  <div className="h-6 w-20 bg-gray-200 rounded-full" />
                  <div className="h-6 w-28 bg-gray-200 rounded-full" />
                </div>

                {/* contact */}
                <div className="flex gap-4">
                  <div className="h-4 w-40 bg-gray-200 rounded" />
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                </div>
              </div>
            </div>

            {/* buttons */}
            <div className="flex gap-3">
              <div className="h-10 w-36 bg-gray-200 rounded-xl" />
              <div className="h-10 w-32 bg-gray-200 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Snapshot cards */}
        <div className="grid gap-4 border-t border-slate-200 bg-slate-50/70 p-3 md:grid-cols-2 xl:grid-cols-4 xl:p-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="rounded-3xl border-none bg-white">
              <CardContent className="flex items-start gap-3 p-5">
                <div className="h-10 w-10 rounded-xl bg-gray-200" />
                <div className="space-y-2 w-full">
                  <div className="h-3 w-24 bg-gray-200 rounded" />
                  <div className="h-4 w-full bg-gray-200 rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Info sections */}
      <div className="grid gap-6 xl:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="rounded-[28px] py-0">
            <CardContent className="space-y-6 p-5 md:p-7">
              <div className="space-y-2">
                <div className="h-6 w-56 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {Array.from({ length: 6 }).map((_, j) => (
                  <div
                    key={j}
                    className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 space-y-2"
                  >
                    <div className="h-3 w-20 bg-gray-200 rounded" />
                    <div className="h-4 w-full bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Address panels */}
      <div className="grid gap-6 xl:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="rounded-[28px] py-0">
            <CardContent className="space-y-5 p-5 md:p-7">
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 bg-gray-200 rounded-xl" />
                <div className="space-y-2">
                  <div className="h-5 w-40 bg-gray-200 rounded" />
                  <div className="h-4 w-56 bg-gray-200 rounded" />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                <div className="h-4 w-full bg-gray-200 rounded mb-2" />
                <div className="h-4 w-5/6 bg-gray-200 rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
