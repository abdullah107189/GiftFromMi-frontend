export const getImagesFromDescription = (html: string): string[] => {
    if (!html) return [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    return Array.from(doc.querySelectorAll("img"))
        .map((img) => img.getAttribute("src"))
        .filter((src): src is string => Boolean(src));
};
