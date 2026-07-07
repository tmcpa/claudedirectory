import { Plugin } from "@/lib/types";

export const portaljsPlugin: Plugin = {
  slug: "portaljs",
  title: "PortalJS",
  description: "Agent skills that build data portals: scaffold a portal, add datasets, charts and maps, connect CKAN, and generate DCAT/Croissant metadata",
  tags: ["data", "open-data", "data-portal", "ckan", "dcat"],
  author: { name: "Datopian", url: "https://github.com/datopian" },
  repoUrl: "https://github.com/datopian/portaljs",
  installCommand: "npx skills add datopian/portaljs",
  commands: [
    { name: "/portaljs-new-portal", description: "Scaffold a new data portal from a brief" },
    { name: "/portaljs-add-dataset", description: "Add CSV/TSV/JSON/GeoJSON datasets and register them" },
    { name: "/portaljs-add-dcat", description: "Generate DCAT (v2/v3, DCAT-US, DCAT-AP, GeoDCAT-AP) and Croissant metadata" },
    { name: "/portaljs-add-chart", description: "Add a visualization to a dataset page" },
    { name: "/portaljs-add-map", description: "Render GeoJSON on an interactive map" },
    { name: "/portaljs-connect-ckan", description: "Wire a portal to a CKAN backend" },
    { name: "/portaljs-deploy", description: "Deploy the portal" },
  ],
};
