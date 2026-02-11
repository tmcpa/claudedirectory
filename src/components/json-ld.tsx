interface WebsiteJsonLdProps {
  url: string;
  name: string;
  description: string;
}

export function WebsiteJsonLd({ url, name, description }: WebsiteJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    description,
    url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface ItemJsonLdProps {
  type: "SoftwareApplication" | "HowTo" | "Article";
  name: string;
  description: string;
  url: string;
  author?: {
    name: string;
    url?: string;
  };
  tags?: string[];
  datePublished?: string;
  image?: string;
}

export function ItemJsonLd({
  type,
  name,
  description,
  url,
  author,
  tags,
  datePublished,
  image,
}: ItemJsonLdProps) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url,
  };

  if (author) {
    jsonLd.author = {
      "@type": "Person",
      name: author.name,
      ...(author.url && { url: author.url }),
    };
  }

  if (tags && tags.length > 0) {
    jsonLd.keywords = tags.join(", ");
  }

  if (type === "SoftwareApplication") {
    jsonLd.applicationCategory = "DeveloperApplication";
    jsonLd.operatingSystem = "Cross-platform";
  }

  if (type === "Article") {
    jsonLd.headline = name;
    if (datePublished) {
      jsonLd.datePublished = new Date(datePublished).toISOString();
    }
    if (image) {
      jsonLd.image = image;
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BreadcrumbJsonLdProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
