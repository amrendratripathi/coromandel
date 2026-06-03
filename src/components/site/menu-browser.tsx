import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { menuCategories, menuItems, type MenuCategory } from "@/data/coromandel-menu";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categoryAccent: Record<MenuCategory, string> = {
  "South Indian": "bg-primary/12 text-primary border-primary/25",
  "North Indian": "bg-accent/12 text-accent border-accent/25",
  Chinese: "bg-secondary text-secondary-foreground border-border/80",
  Western: "bg-card text-card-foreground border-border/80",
  Desserts: "bg-primary-soft text-foreground border-primary/20",
  Beverages: "bg-accent-soft text-accent-foreground border-accent/20",
};

interface MenuBrowserProps {
  compact?: boolean;
  initialCategory?: MenuCategory | "All";
}

export function MenuBrowser({ compact = false, initialCategory = "All" }: MenuBrowserProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<MenuCategory | "All">(initialCategory);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesQuery =
        query.trim().length === 0 ||
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase());

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const displayedItems = compact ? filteredItems.slice(0, 8) : filteredItems;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant={activeCategory === "All" ? "filterActive" : "filter"}
            size="sm"
            onClick={() => setActiveCategory("All")}
          >
            All
          </Button>
          {menuCategories.map((category) => (
            <Button
              key={category}
              type="button"
              variant={activeCategory === category ? "filterActive" : "filter"}
              size="sm"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <label className="relative block w-full lg:max-w-sm">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search dishes, flavours, or categories"
            className="h-12 rounded-full pl-11"
          />
        </label>
      </div>

      <div className={cn("grid gap-4", compact ? "md:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3")}>
        {displayedItems.map((item) => (
          <article
            key={`${item.category}-${item.name}`}
            className="group rounded-3xl border border-border/70 bg-card/85 p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-luxury"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <span className={cn("inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold tracking-[0.18em] uppercase", categoryAccent[item.category])}>
                  {item.category}
                </span>
                <div className="space-y-2">
                  <h3 className="font-display text-2xl text-foreground">{item.name}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
              </div>
              <p className="font-display text-2xl text-primary">{item.price}</p>
            </div>
          </article>
        ))}
      </div>

      {displayedItems.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card/70 p-8 text-center text-muted-foreground">
          No dishes matched your search.
        </div>
      ) : null}
    </div>
  );
}
