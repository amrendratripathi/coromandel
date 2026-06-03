import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, MapPin, Phone, UtensilsCrossed } from "lucide-react";

import { MenuBrowser } from "@/components/site/menu-browser";
import { Button } from "@/components/ui/button";

const MENU_MAIN = "/uploads/image.png";
const MENU_SPECIALTY = "/uploads/unnamed.webp";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Cafe Coromandel Gurugram" },
      {
        name: "description",
        content:
          "Browse the searchable Cafe Coromandel menu featuring South Indian coastal dishes, beverages, desserts, Chinese and Western favourites in Gurugram.",
      },
      { property: "og:title", content: "Menu — Cafe Coromandel Gurugram" },
      {
        property: "og:description",
        content:
          "Search the Cafe Coromandel menu with real dishes and prices extracted from the restaurant menu photos.",
      },
      { property: "og:url", content: "/menu" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
  component: MenuPage,
});

function MenuPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border/70 bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Link to="/">
            <Button variant="outline" className="mb-8">
              <ArrowLeft className="size-4" />
              Back to Home
            </Button>
          </Link>

          <div className="grid gap-10 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-center">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Cafe Coromandel Menu</p>
              <h1 className="font-display text-5xl leading-tight sm:text-6xl">Search the full dining menu</h1>
              <p className="max-w-2xl text-base leading-8 text-muted-foreground">
                Explore South Indian coastal classics, North Indian mains, Chinese comfort plates, Western cafe staples, desserts, and beverage offerings using the dish names and prices extracted from the uploaded menu cards.
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2"><MapPin className="size-4 text-primary" /> Gurugram</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2"><Phone className="size-4 text-primary" /> Breakfast to dinner dining</span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-soft">
                <img src={MENU_MAIN} alt="Cafe Coromandel menu — South Indian and North Indian dishes" className="h-80 w-full object-cover" loading="lazy" />
              </div>
              <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-soft">
                <img src={MENU_SPECIALTY} alt="Cafe Coromandel menu — Chinese, Western, Cool Bar, Combo meals" className="h-80 w-full object-cover" loading="lazy" />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/dine-in">
                <Button variant="hero" size="lg" className="gap-2">
                  <UtensilsCrossed className="size-4" />
                  Order from Your Table
                </Button>
              </Link>
              <Link to="/book-table">
                <Button variant="outline" size="lg" className="gap-2">
                  <CalendarDays className="size-4" />
                  Book a Table
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <MenuBrowser />
      </section>
    </main>
  );
}
