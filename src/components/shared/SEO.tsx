import React from "react";

type SEOProps = { title: string; description?: string };

export default function SEO({ title, description }: SEOProps) {
  const fullTitle = `${title} | Gift From Mi`;
  const desc = description ?? "Personalized gifting platform for everyone.";

  React.useEffect(() => {
    document.title = fullTitle;

    // update meta description
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", desc);
  }, [fullTitle, desc]);

  return null;
}
