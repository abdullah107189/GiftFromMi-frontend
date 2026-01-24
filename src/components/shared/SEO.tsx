import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router";

interface SEOProps {
  title: string;
  description?: string;
}

export default function SEO({ title, description }: SEOProps) {
  const location = useLocation();

  const desc = description ?? "Personalized gifting platform for everyone.";

  return (
    <Helmet key={location.pathname}>
      <title>{title} | Gift From Mi</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={`${title} | Gift From Mi`} />
      <meta property="og:description" content={desc} />
      <meta
        property="og:url"
        content={`${window.location.origin}${location.pathname}`}
      />
    </Helmet>
  );
}
