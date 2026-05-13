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
  dateModified?: string;
  image?: string;
  repoUrl?: string;
  installCommand?: string;
  stars?: number;
  programmingLanguage?: string;
  license?: string;
  applicationSubCategory?: string;
}

export function ItemJsonLd({
  type,
  name,
  description,
  url,
  author,
  tags,
  datePublished,
  dateModified,
  image,
  repoUrl,
  installCommand,
  stars,
  programmingLanguage,
  license,
  applicationSubCategory,
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

  if (dateModified) {
    jsonLd.dateModified = new Date(dateModified).toISOString();
  }

  if (type === "SoftwareApplication") {
    jsonLd.applicationCategory = "DeveloperApplication";
    if (applicationSubCategory) {
      jsonLd.applicationSubCategory = applicationSubCategory;
    }
    jsonLd.operatingSystem = "Cross-platform";
    jsonLd.offers = {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    };
    if (repoUrl) {
      jsonLd.codeRepository = repoUrl;
      jsonLd.sameAs = repoUrl;
    }
    if (installCommand) {
      jsonLd.installUrl = installCommand;
    }
    if (programmingLanguage) {
      jsonLd.programmingLanguage = programmingLanguage;
    }
    if (license) {
      jsonLd.license = license;
    }
    if (typeof stars === "number" && stars > 0) {
      jsonLd.interactionStatistic = {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/LikeAction",
        userInteractionCount: stars,
      };
    }
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

  if (type === "HowTo") {
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

interface CollectionPageJsonLdProps {
  name: string;
  description: string;
  url: string;
  itemCount: number;
}

export function CollectionPageJsonLd({
  name,
  description,
  url,
  itemCount,
}: CollectionPageJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: itemCount,
    },
  };

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
