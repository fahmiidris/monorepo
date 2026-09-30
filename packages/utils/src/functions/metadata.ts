interface Output {
    name: string;
    content: string | undefined;
}

export function metadata({ title, description, keywords, image }: { title: string; description?: string; image?: string; keywords?: string }): ({ title: string } | Output)[] {
    const tags = [
        { name: "description", content: description },
        { name: "keywords", content: keywords },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        // { name: "twitter:creator", content: "@monorepo" },
        // { name: "twitter:site", content: "@monorepo" },
        { name: "og:type", content: "website" },
        { name: "og:title", content: title },
        { name: "og:description", content: description },
        ...(image
            ? [
                  { name: "twitter:image", content: image },
                  { name: "twitter:card", content: "summary_large_image" },
                  { name: "og:image", content: image },
              ]
            : []),
    ];

    return [{ title }, ...tags];
}
