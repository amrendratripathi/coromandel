import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Minus,
  Plus,
  QrCode,
  ShoppingCart,
  Trash2,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { menuCategories, menuItems, type MenuCategory } from "@/data/coromandel-menu";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dine-in")({
  head: () => ({
    meta: [
      { title: "Dine In — Cafe Coromandel Gurugram" },
      {
        name: "description",
        content:
          "Browse and order from the Cafe Coromandel menu while dining in. Select your dishes, add to cart, and place your order — all from your table.",
      },
      { property: "og:title", content: "Dine In — Cafe Coromandel" },
      { property: "og:url", content: "/dine-in" },
    ],
    links: [{ rel: "canonical", href: "/dine-in" }],
  }),
  component: DineInPage,
});

interface CartItem {
  category: MenuCategory;
  name: string;
  price: string;
  priceNum: number;
  quantity: number;
}

function parsePriceNum(price: string): number {
  // Grab the first numeric value from things like "₹180", "₹160–180", "₹440–480"
  const match = price.replace(/₹/g, "").match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

const categoryAccent: Record<MenuCategory, string> = {
  "South Indian": "bg-amber-50 text-amber-700 border-amber-200",
  "North Indian": "bg-orange-50 text-orange-700 border-orange-200",
  Chinese: "bg-red-50 text-red-700 border-red-200",
  Western: "bg-blue-50 text-blue-700 border-blue-200",
  Desserts: "bg-pink-50 text-pink-700 border-pink-200",
  Beverages: "bg-teal-50 text-teal-700 border-teal-200",
};

const categoryAccentDark: Record<MenuCategory, string> = {
  "South Indian": "dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
  "North Indian": "dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800",
  Chinese: "dark:bg-red-950/40 dark:text-red-300 dark:border-red-800",
  Western: "dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800",
  Desserts: "dark:bg-pink-950/40 dark:text-pink-300 dark:border-pink-800",
  Beverages: "dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800",
};

const scrollMotion = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function DineInPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<MenuCategory | "All">("All");
  const [query, setQuery] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId] = useState(() => `CC${Math.floor(1000 + Math.random() * 9000)}`);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q.length === 0 ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.priceNum * item.quantity, 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  function addToCart(item: (typeof menuItems)[number]) {
    setCart((prev) => {
      const existing = prev.find((c) => c.name === item.name && c.category === item.category);
      if (existing) {
        return prev.map((c) =>
          c.name === item.name && c.category === item.category
            ? { ...c, quantity: c.quantity + 1 }
            : c,
        );
      }
      return [
        ...prev,
        {
          category: item.category,
          name: item.name,
          price: item.price,
          priceNum: parsePriceNum(item.price),
          quantity: 1,
        },
      ];
    });
  }

  function updateQty(name: string, delta: number) {
    setCart((prev) =>
      prev
        .map((c) => (c.name === name ? { ...c, quantity: c.quantity + delta } : c))
        .filter((c) => c.quantity > 0),
    );
  }

  function removeFromCart(name: string) {
    setCart((prev) => prev.filter((c) => c.name !== name));
  }

  function getQty(name: string) {
    return cart.find((c) => c.name === name)?.quantity ?? 0;
  }

  function placeOrder() {
    if (!tableNumber.trim()) {
      alert("Please enter your table number before placing the order.");
      return;
    }
    setOrderPlaced(true);
    setCartOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div
          className="relative overflow-hidden py-20 text-primary-foreground"
          style={{
            backgroundImage: `url('/uploads/unnamed (3).webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(20,18,15,0.6) 0%, rgba(20,18,15,0.9) 100%)" }}
          />
          <div className="relative mx-auto max-w-2xl px-4 py-10 text-center sm:px-6">
            <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-primary/20">
              <CheckCircle2 className="size-10 text-primary" />
            </div>
            <h1 className="font-display text-5xl">Order Placed!</h1>
            <p className="mt-4 text-base leading-8 text-primary-foreground/80">
              Your order has been sent to the kitchen. We'll bring it to Table <strong>{tableNumber}</strong> shortly.
            </p>
            <p className="mt-2 text-sm text-primary-foreground/60">Order ID: <strong>{orderId}</strong></p>
          </div>
        </div>

        <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
          <div className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-luxury">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Your Order · Table {tableNumber}</p>
            <div className="mt-4 divide-y divide-border/60">
              {cart.map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">×{item.quantity}</p>
                    <p className="font-display text-lg text-primary">₹{item.priceNum * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-4">
              <p className="font-semibold">Total</p>
              <p className="font-display text-2xl text-primary">₹{cartTotal}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              variant="hero"
              size="lg"
              onClick={() => {
                setOrderPlaced(false);
                setCart([]);
                setTableNumber("");
              }}
            >
              Order More Items
            </Button>
            <Link to="/">
              <Button variant="outline" size="lg">Back to Home</Button>
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top Banner */}
      <div
        className="relative overflow-hidden text-primary-foreground"
        style={{
          backgroundImage: `url('/uploads/unnamed (1).webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(20,18,15,0.5) 0%, rgba(20,18,15,0.88) 100%)" }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link to="/">
                <Button variant="outline" size="sm" className="mb-6 border-white/20 bg-white/10 text-white hover:bg-white/20">
                  <ArrowLeft className="size-4" />
                  Home
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <UtensilsCrossed className="size-6 text-primary" />
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Dine In Ordering</p>
              </div>
              <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
                Browse & Order from Your Table
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-7 text-primary-foreground/75">
                Select your dishes, add them to your cart, enter your table number, and place your order directly with the kitchen.
              </p>
            </div>
            <div className="shrink-0">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                <div className="flex items-center gap-2 mb-3">
                  <QrCode className="size-4 text-primary" />
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Table Number</p>
                </div>
                <Input
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="e.g. T-12"
                  className="h-11 border-white/20 bg-white/10 text-white placeholder:text-white/50"
                />
                <p className="mt-2 text-xs text-primary-foreground/60">Find your table number on the QR card</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Cart Button */}
      <div className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          {/* Category Tabs — scrollable on mobile */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setActiveCategory("All")}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all",
                activeCategory === "All"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/70 bg-card text-muted-foreground hover:border-primary/50",
              )}
            >
              All
            </button>
            {menuCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all",
                  activeCategory === cat
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/70 bg-card text-muted-foreground hover:border-primary/50",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cart Button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative shrink-0 flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            <ShoppingCart className="size-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
        {/* Search */}
        <div className="border-t border-border/50 bg-surface/80 px-4 py-2 sm:px-6">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes…"
            className="h-9 max-w-sm text-sm"
          />
        </div>
      </div>

      {/* Menu Grid */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {filteredItems.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-card/70 p-10 text-center text-muted-foreground">
            No dishes matched your search.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item, index) => {
              const qty = getQty(item.name);
              return (
                <motion.article
                  key={`${item.category}-${item.name}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.02, 0.3), duration: 0.4 }}
                  className="group flex flex-col rounded-[1.5rem] border border-border/70 bg-card shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-luxury"
                >
                  <div className="flex flex-1 flex-col gap-3 p-4">
                    <span
                      className={cn(
                        "inline-flex self-start rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em]",
                        categoryAccent[item.category],
                        categoryAccentDark[item.category],
                      )}
                    >
                      {item.category}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-display text-xl leading-tight text-foreground">{item.name}</h3>
                      <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{item.description}</p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-display text-xl text-primary">{item.price}</p>
                      {qty === 0 ? (
                        <button
                          onClick={() => addToCart(item)}
                          className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md"
                        >
                          <Plus className="size-3" />
                          Add
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-2 py-1">
                          <button
                            onClick={() => updateQty(item.name, -1)}
                            className="flex size-5 items-center justify-center rounded-full text-primary hover:bg-primary/20"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="min-w-[1.25rem] text-center text-sm font-semibold text-primary">{qty}</span>
                          <button
                            onClick={() => updateQty(item.name, 1)}
                            className="flex size-5 items-center justify-center rounded-full text-primary hover:bg-primary/20"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </section>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-card shadow-luxury"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="size-5 text-primary" />
                  <p className="font-semibold text-foreground">Your Order</p>
                  {cartCount > 0 && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                      {cartCount} items
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="rounded-full p-1.5 transition-colors hover:bg-muted"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Table Number in drawer */}
              <div className="border-b border-border/50 bg-surface/60 px-5 py-3">
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Table Number
                </label>
                <Input
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="e.g. T-12"
                  className="mt-1.5 h-9"
                />
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto px-5 py-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-16 text-center text-muted-foreground">
                    <ShoppingCart className="size-10 opacity-30" />
                    <p className="text-sm">Your cart is empty. Add dishes from the menu!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/60 p-3"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-sm font-semibold text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.category}</p>
                          <p className="text-sm font-bold text-primary">₹{item.priceNum * item.quantity}</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateQty(item.name, -1)}
                            className="flex size-6 items-center justify-center rounded-full border border-border/70 text-muted-foreground hover:bg-muted"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="min-w-[1.25rem] text-center text-sm font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.name, 1)}
                            className="flex size-6 items-center justify-center rounded-full border border-border/70 text-muted-foreground hover:bg-muted"
                          >
                            <Plus className="size-3" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.name)}
                            className="ml-1 flex size-6 items-center justify-center rounded-full text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="size-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="border-t border-border/70 px-5 py-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Subtotal ({cartCount} items)</p>
                    <p className="font-display text-2xl text-primary">₹{cartTotal}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Taxes & service charge as applicable</p>
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full"
                    onClick={placeOrder}
                  >
                    Place Order
                    <ChevronDown className="size-4 rotate-[-90deg]" />
                  </Button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
