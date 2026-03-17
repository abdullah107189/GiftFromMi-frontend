/* eslint-disable @typescript-eslint/no-explicit-any */
import MapSkeleton from "../shared/loadingEffect/MapSkeleton";

const extractIframeSrc = (iframeString: string) => {
  const match = iframeString.match(/src="([^"]+)"/);
  return match ? match[1] : "";
};
const MapSection = ({
  settings,
  isLoading,
}: {
  settings: any;
  isLoading: boolean;
}) => {
  const src = extractIframeSrc(settings?.google_map_location || "");

  return (
    <section className="w-full overflow-hidden px-3 rounded-2xl">
      <div className="xl:h-158.25 md:h-140 h-80 rounded-2xl border border-gray-200 overflow-hidden">
        {isLoading ? (
          <MapSkeleton />
        ) : (
          <iframe
            src={src}
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: "16px" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
      </div>
    </section>
  );
};

export default MapSection;
