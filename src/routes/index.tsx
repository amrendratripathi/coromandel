import { createFileRoute } from "@tanstack/react-router";

import { CafeCoromandelHome } from "@/components/site/cafe-coromandel-home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cafe Coromandel Gurugram | Authentic South Indian Coastal Cuisine" },
      {
        name: "description",
        content:
          "Premium South Indian coastal cuisine in Gurugram with warm ambience, authentic regional recipes, elegant interiors, and a searchable menu.",
      },
      { property: "og:title", content: "Cafe Coromandel Gurugram | Authentic South Indian Coastal Cuisine" },
      {
        property: "og:description",
        content:
          "Discover Cafe Coromandel in Gurugram — a premium, warm, modern restaurant experience inspired by the culinary heritage of the Coromandel Coast.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: "Cafe Coromandel Gurugram",
          servesCuisine: ["South Indian", "Coastal Indian", "Chettinad", "Andhra", "Tamil", "Travancore"],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Gurugram",
            addressCountry: "IN",
          },
          url: "/",
          telephone: "+91 99999 99999",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <CafeCoromandelHome />;
}
