import { AnimatePresence, motion, useScroll, useTransform, type Variants } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Chip } from "@/components/site/chip";
import { SectionHeading } from "@/components/site/section-heading";
import { TemplePattern } from "@/components/site/pattern";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { menuItems } from "@/data/coromandel-menu";
import { reviewItems } from "@/data/coromandel-reviews";
import { Link } from "@tanstack/react-router";
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  Flame,
  Leaf,
  MapPin,
  Menu,
  Mountain,
  Phone,
  QrCode,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Trees,
  UtensilsCrossed,
  Users,
  Waves,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

// Real photos from /public/uploads
const PHOTOS = {
  logo: "/uploads/logo.png",
  hero: "/uploads/unnamed (1).webp",
  diningWide: "/uploads/unnamed (2).webp",
  artWall: "/uploads/unnamed (3).webp",
  tables: "/uploads/unnamed (4).webp",
  sign: "/uploads/unnamed (5).webp",
  menuMain: "/uploads/image.png",
  menuSpecialty: "/uploads/unnamed.webp",
};

const heroBadges = [
  { icon: Star, label: "4.9 guest-rated ambience" },
  { icon: ShieldCheck, label: "Authentic regional recipes" },
  { icon: Leaf, label: "Fresh ingredients, daily prep" },
];

const featureCards = [
  {
    icon: Flame,
    title: "Authentic Coastal Recipes",
    description:
      "A menu shaped by Andhra spice, Chettinad depth, Tamil comfort, and Travancore elegance.",
  },
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description:
      "Thoughtful sourcing, bright aromatics, and careful cooking that keeps every plate expressive.",
  },
  {
    icon: Sparkles,
    title: "Warm Ambience",
    description:
      "Golden lighting, wood textures, and cultural detailing make every meal feel elevated yet familiar.",
  },
  {
    icon: Users,
    title: "Family Friendly Dining",
    description:
      "A welcoming space for breakfast gatherings, leisurely lunches, and celebratory dinners together.",
  },
];

const galleryImages = [
  { src: PHOTOS.hero, alt: "Cafe Coromandel vibrant dining area with mandala wall art" },
  { src: PHOTOS.diningWide, alt: "Wide view of the restaurant interior and seating layout" },
  { src: PHOTOS.artWall, alt: "Cozy evening dining room with colourful South Indian mandala wall art" },
  { src: PHOTOS.tables, alt: "Bustling Cafe Coromandel with guests enjoying their meal" },
  { src: PHOTOS.sign, alt: "Cafe Coromandel illuminated exterior signage at night" },
];

const signatureDishes = [
  { name: "Coromandel Dosa", description: "House-special thick rice crepe with butter and bold coastal notes.", price: "₹260", category: "South Indian", image: "/uploads/dish-coromandel-dosa.png" },
  { name: "Rava Dosa", description: "A crisp semolina crepe highlighted by guests for its texture and flavour.", price: "₹210", category: "South Indian", image: "/uploads/dish-rava-dosa.png" },
  { name: "Paniyaram", description: "Golden dumplings with chutney and a deeply comforting South Indian soul.", price: "₹210", category: "South Indian", image: "/uploads/dish-paniyaram.png" },
  { name: "Chilli Paneer", description: "A lively Indo-Chinese classic with wok-fired richness and bright heat.", price: "₹380", category: "Chinese", image: "/uploads/dish-chilli-paneer.png" },
  { name: "Veg Club Sandwich", description: "Double-decker comfort with layered crunch, cheese, and fresh vegetables.", price: "₹340", category: "Western", image: "/uploads/dish-veg-club-sandwich.png" },
  { name: "Pal Ada Payasam", description: "Soft, milky sweetness to close the meal with quiet elegance.", price: "₹180", category: "Desserts", image: "/uploads/dish-pal-ada-payasam.png" },
  { name: "Degree Coffee", description: "Special filter coffee with aroma and finish worthy of a lingering table.", price: "₹110", category: "Beverages", image: "/uploads/dish-degree-coffee.png" },
  { name: "Chicken Coromandel", description: "The house signature curry with layered spice and a rounded coastal finish.", price: "₹425", category: "South Indian", image: "/uploads/dish-chicken-coromandel.png" },
];

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Signature Dishes", href: "#signature-dishes" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#reservation" },
];

const scrollMotion: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

function scrollToId(id: string) {
  const element = document.querySelector(id);
  if (element instanceof HTMLElement) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function CafeCoromandelHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[number] | null>(null);
  const [activeDishCategory, setActiveDishCategory] = useState<string>("All");
  const [menuQuery, setMenuQuery] = useState("");
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.08]);
  const navBlur = useTransform(scrollY, [0, 120], [10, 22]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  const searchableCategories = useMemo(
    () => ["All", "South Indian", "North Indian", "Chinese", "Western", "Desserts", "Beverages"],
    [],
  );

  const menuPreview = useMemo(() => {
    return menuItems
      .filter((item) => activeDishCategory === "All" || item.category === activeDishCategory)
      .filter((item) => {
        const q = menuQuery.trim().toLowerCase();
        return q.length === 0
          ? true
          : item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
      })
      .slice(0, 6);
  }, [activeDishCategory, menuQuery]);

  return (
    <div className="bg-background text-foreground">
      <motion.header
        style={{ backdropFilter: `blur(${navBlur.get()}px)` }}
        className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/35 text-white"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button className="text-left" onClick={() => scrollToId("#top")}>
            <img
              src={PHOTOS.logo}
              alt="Cafe Coromandel logo"
              className="h-10 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling!.style.display = "block";
              }}
            />
            <div style={{ display: "none" }}>
              <p className="font-display text-2xl text-white">Cafe Coromandel</p>
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">Gurugram</p>
            </div>
          </button>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToId(link.href)}
                className="text-sm font-medium text-white/85 transition-colors hover:text-white"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <Link to="/book-table">
              <Button variant="heroSecondary" size="sm">
                <CalendarDays className="size-3.5" />
                Book Table
              </Button>
            </Link>
            <Link to="/dine-in">
              <Button variant="hero" size="sm">
                <UtensilsCrossed className="size-3.5" />
                Dine In
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />
            <Button variant="navGhost" size="icon" onClick={() => setMenuOpen((value) => !value)}>
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-white/10 bg-background/90 lg:hidden"
            >
              <div className="space-y-2 px-4 py-4 sm:px-6">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    className="block w-full rounded-2xl border border-border/70 bg-card/70 px-4 py-3 text-left text-sm"
                    onClick={() => {
                      scrollToId(link.href);
                      setMenuOpen(false);
                    }}
                  >
                    {link.label}
                  </button>
                ))}
                <Link to="/book-table" onClick={() => setMenuOpen(false)}>
                  <button className="flex w-full items-center gap-2 rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-left text-sm font-semibold text-primary">
                    <CalendarDays className="size-4" />
                    Book Table
                  </button>
                </Link>
                <Link to="/dine-in" onClick={() => setMenuOpen(false)}>
                  <button className="flex w-full items-center gap-2 rounded-2xl border border-primary/50 bg-primary px-4 py-3 text-left text-sm font-semibold text-primary-foreground">
                    <UtensilsCrossed className="size-4" />
                    Dine In — Order from Table
                  </button>
                </Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.header>

      <main id="top">
        {/* Hero */}
        <section className="relative min-h-screen overflow-hidden bg-hero text-primary-foreground">
          <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
            <img
              src={PHOTOS.hero}
              alt="Vibrant interior of Cafe Coromandel with mandala wall art and warm pendant lights"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </motion.div>
          <div className="hero-overlay absolute inset-0" />
          <div className="relative mx-auto flex min-h-screen max-w-7xl items-end px-4 pb-20 pt-32 sm:px-6 lg:px-8">
            <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1.1fr)_380px] lg:items-end">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={scrollMotion}
                className="max-w-3xl space-y-8"
              >
                <Chip>Cultural coastal dining • Gurugram</Chip>
                <div className="space-y-5">
                  <h1 className="font-display text-5xl leading-[0.95] text-white sm:text-6xl lg:text-8xl" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
                    Authentic South Indian Coastal Cuisine
                  </h1>
                  <p className="max-w-2xl text-base leading-8 text-white/85 sm:text-lg">
                    Where tradition, culture, and exceptional flavors come together.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link to="/book-table">
                    <Button variant="heroSecondary" size="lg">
                      <CalendarDays className="size-4" />
                      Book a Table
                    </Button>
                  </Link>
                  <Link to="/dine-in">
                    <Button variant="hero" size="lg">
                      <UtensilsCrossed className="size-4" />
                      Dine In — Order Now
                    </Button>
                  </Link>
                  <Button variant="navGhost" size="lg" onClick={() => scrollToId("#interactive-menu")} className="border border-white/20 text-white hover:bg-white/10">
                    Explore Menu
                  </Button>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {heroBadges.map((badge) => {
                    const Icon = badge.icon;
                    return (
                      <div key={badge.label} className="glass-card flex items-center gap-3 rounded-2xl p-4">
                        <div className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                          <Icon className="size-4" />
                        </div>
                        <p className="text-sm leading-6 text-white/90">{badge.label}</p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.aside
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7 }}
                className="hidden rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-luxury backdrop-blur-md lg:block"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/60">Guest sentiment</p>
                      <p className="mt-2 font-display text-4xl text-white">4.9/5</p>
                    </div>
                    <div className="flex gap-1 text-primary">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="size-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4 border-t border-white/10 pt-6 text-sm text-white/78">
                    <p>Signature favourites include Rava Dosa, Paniyaram, and the house Chicken Coromandel.</p>
                    <p>Warm yellow lighting, wood accents, and cultural mandala wall art for a refined all-day dining feel.</p>
                  </div>
                  <div className="overflow-hidden rounded-[1.5rem] border border-white/10">
                    <img
                      src={PHOTOS.sign}
                      alt="Cafe Coromandel illuminated exterior signage at night"
                      className="h-56 w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  {/* Quick action buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Link to="/book-table">
                      <button className="w-full rounded-2xl border border-white/20 bg-white/10 px-3 py-2.5 text-xs font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                        <CalendarDays className="mx-auto mb-1 size-4" />
                        Book Table
                      </button>
                    </Link>
                    <Link to="/dine-in">
                      <button className="w-full rounded-2xl border border-primary/40 bg-primary/20 px-3 py-2.5 text-xs font-semibold text-primary backdrop-blur-sm transition-all hover:bg-primary/30">
                        <QrCode className="mx-auto mb-1 size-4" />
                        Dine In
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </section>

        {/* Book Table + Dine In CTA Strip */}
        <section className="bg-primary/8 border-b border-primary/15">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <p className="font-display text-2xl text-foreground">Ready for your next visit?</p>
              <div className="flex flex-wrap gap-3">
                <Link to="/book-table">
                  <Button variant="outline" size="lg" className="gap-2">
                    <CalendarDays className="size-4" />
                    Book a Table
                  </Button>
                </Link>
                <Link to="/dine-in">
                  <Button variant="hero" size="lg" className="gap-2">
                    <UtensilsCrossed className="size-4" />
                    Dine In — Order from Table
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <motion.section
          id="about"
          className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={scrollMotion}
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
            <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-luxury">
              <img
                src={PHOTOS.diningWide}
                alt="Wide dining room view at Cafe Coromandel with warm yellow pendant lights"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-background/85 p-4 shadow-soft backdrop-blur-md">
                <p className="text-xs uppercase tracking-[0.28em] text-primary">Coromandel coast inspiration</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  A modern dining room shaped by temple geometry, coastal warmth, and the easy hospitality of the southern shoreline.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-surface p-8 shadow-soft lg:p-10">
              <TemplePattern />
              <div className="relative space-y-8">
                <SectionHeading
                  eyebrow="About Cafe Coromandel"
                  title="A Gurugram address inspired by the depth of the Coromandel Coast"
                  description="Cafe Coromandel celebrates the culinary heritage of Andhra Pradesh, Chettinad, Tamil Nadu, and Travancore through a dining experience that feels both rooted and refined. The menu moves from fragrant curries and crisp dosas to filter coffee, payasam, and all-day comfort dishes that carry memory, spice, and warmth."
                />

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-border/70 bg-background/85 p-4">
                    <Waves className="size-5 text-primary" />
                    <p className="mt-3 text-sm font-semibold">Coastal soul</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">Shaped by seaside kitchens and spice-forward cooking traditions.</p>
                  </div>
                  <div className="rounded-2xl border border-border/70 bg-background/85 p-4">
                    <Mountain className="size-5 text-primary" />
                    <p className="mt-3 text-sm font-semibold">Temple detail</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">Decorative rhythm inspired by South Indian architecture and craft.</p>
                  </div>
                  <div className="rounded-2xl border border-border/70 bg-background/85 p-4">
                    <Trees className="size-5 text-primary" />
                    <p className="mt-3 text-sm font-semibold">Natural warmth</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">Wood, warm ivory, mustard light, and soft earthy notes throughout.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Signature Dishes */}
        <motion.section
          id="signature-dishes"
          className="bg-surface py-20 lg:py-28"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={scrollMotion}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Signature Dishes"
              title="Real menu favourites, presented with a contemporary luxury touch"
              description="Selected directly from the menu, these dishes represent the range of Cafe Coromandel — from coastal breakfast classics to Chinese comfort, Western cafe staples, desserts, and beverages."
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {signatureDishes.map((dish, index) => (
                <motion.article
                  key={dish.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.05, duration: 0.55 }}
                  className="group overflow-hidden rounded-[1.75rem] border border-border/70 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-luxury"
                >
                  <div className="relative overflow-hidden" style={{ height: '13rem' }}>
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/95 backdrop-blur-sm">
                        {dish.category}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-2xl text-foreground">{dish.name}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{dish.description}</p>
                      </div>
                      <p className="font-display text-2xl text-primary">{dish.price}</p>
                    </div>
                    <div className="h-px bg-border/70" />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>From the menu</span>
                      <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/dine-in">
                <Button variant="hero" size="lg" className="gap-2">
                  <UtensilsCrossed className="size-4" />
                  Order from Your Table
                </Button>
              </Link>
              <Link to="/menu">
                <Button variant="outline" size="lg">Browse Full Menu</Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Interactive Menu */}
        <motion.section
          id="interactive-menu"
          className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={scrollMotion}
        >
          <div className="grid gap-10 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-start">
            <div className="space-y-6">
              <SectionHeading
                eyebrow="Interactive Menu"
                title="Browse a searchable menu with real dishes and prices"
                description="Use quick filters or search by dish name. The complete menu is also available on its own page."
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-[1.75rem] border border-border/70 bg-card shadow-soft">
                  <img src={PHOTOS.menuMain} alt="Cafe Coromandel menu card — South Indian and North Indian dishes" className="h-72 w-full object-cover" loading="lazy" />
                </div>
                <div className="overflow-hidden rounded-[1.75rem] border border-border/70 bg-card shadow-soft">
                  <img src={PHOTOS.menuSpecialty} alt="Cafe Coromandel menu — Chinese, Western, Cool Bar, Combo meals" className="h-72 w-full object-cover" loading="lazy" />
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/menu">
                  <Button variant="hero" size="lg">Open Full Menu</Button>
                </Link>
                <Link to="/dine-in">
                  <Button variant="outline" size="lg" className="gap-2">
                    <UtensilsCrossed className="size-4" />
                    Order from Table
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border/70 bg-surface p-6 shadow-luxury lg:p-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap gap-2">
                  {searchableCategories.map((category) => (
                    <Button
                      key={category}
                      variant={activeDishCategory === category ? "filterActive" : "filter"}
                      size="sm"
                      onClick={() => setActiveDishCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
                <label className="relative block w-full lg:max-w-xs">
                  <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    value={menuQuery}
                    onChange={(event) => setMenuQuery(event.target.value)}
                    placeholder="Search dishes"
                    className="h-11 pl-11"
                  />
                </label>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {menuPreview.map((item) => (
                  <article key={`${item.category}-${item.name}`} className="rounded-[1.5rem] border border-border/70 bg-card/80 p-5 shadow-soft">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-primary">{item.category}</p>
                        <h3 className="mt-2 font-display text-2xl text-foreground">{item.name}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                      </div>
                      <p className="font-display text-2xl text-primary">{item.price}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Gallery */}
        <motion.section
          id="gallery"
          className="bg-surface py-20 lg:py-28"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={scrollMotion}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Ambience Gallery"
              title="Warm lighting, mandala art, and a dining room designed to linger in"
              description="Real photos from inside Cafe Coromandel highlighting the vibrant yellow mandala wall, golden pendant lights, wood textures, and cozy atmosphere guests keep coming back for."
              align="center"
            />

            <div className="mt-10 columns-1 gap-4 md:columns-2 xl:columns-3 [&>button:not(:first-child)]:mt-4">
              {galleryImages.map((image) => (
                <button
                  key={image.src}
                  onClick={() => setSelectedImage(image)}
                  className="group relative w-full overflow-hidden rounded-[1.75rem] border border-border/60 bg-card shadow-soft"
                >
                  <img src={image.src} alt={image.alt} className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/12" />
                </button>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Reviews */}
        <motion.section
          id="reviews"
          className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={scrollMotion}
        >
          <SectionHeading
            eyebrow="Customer Reviews"
            title="What guests are saying about the food, hospitality, and atmosphere"
            description="Real review screenshots from guests paired with concise highlights so the praise feels visible, credible, and immediate."
          />

          <div className="relative mt-10 px-2 sm:px-12">
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent>
                {reviewItems.map((review) => (
                  <CarouselItem key={review.name} className="md:basis-1/2 xl:basis-1/3">
                    <div className="h-full rounded-[1.75rem] border border-border/70 bg-card p-5 shadow-soft">
                      <div className="space-y-4">
                        <div className="overflow-hidden rounded-2xl border border-border/60 shadow-soft">
                          <img src={review.screenshot} alt={`Review screenshot from ${review.name}`} className="w-full object-cover" loading="lazy" />
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-1 text-primary">
                            {Array.from({ length: review.rating }).map((_, index) => (
                              <Star key={index} className="size-4 fill-current" />
                            ))}
                          </div>
                          <div>
                            <h3 className="font-display text-2xl">{review.name}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{review.meta}</p>
                          </div>
                          <p className="text-sm font-medium text-foreground">"{review.highlight}"</p>
                          <p className="text-sm leading-7 text-muted-foreground">{review.summary}</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 top-[45%] hidden lg:flex" />
              <CarouselNext className="right-0 top-[45%] hidden lg:flex" />
            </Carousel>
          </div>
        </motion.section>

        {/* Why Choose Us */}
        <motion.section
          className="bg-surface py-20 lg:py-28"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={scrollMotion}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Why Choose Us"
              title="A premium neighbourhood dining experience rooted in craft and comfort"
              description="Every detail—from the menu and plating to the lighting and table setting—is designed to feel thoughtful, generous, and quietly memorable."
              align="center"
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {featureCards.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.article
                    key={feature.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.06, duration: 0.5 }}
                    className="rounded-[1.75rem] border border-border/70 bg-card p-6 shadow-soft"
                  >
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-5 font-display text-2xl text-foreground">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{feature.description}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Reservation / Contact */}
        <motion.section
          id="reservation"
          className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={scrollMotion}
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-stretch">
            <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-luxury">
              <img src={PHOTOS.artWall} alt="Cafe Coromandel dining room with vibrant mandala art wall" className="h-full w-full object-cover" loading="lazy" />
            </div>

            <div className="rounded-[2rem] border border-border/70 bg-surface p-7 shadow-luxury sm:p-8 lg:p-10">
              <SectionHeading
                eyebrow="Visit & Reservations"
                title="Plan your next breakfast, lunch, or dinner at Cafe Coromandel"
                description="Book online or call us directly. Walk-ins are welcome subject to availability."
              />

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/book-table">
                  <Button variant="hero" size="lg" className="gap-2">
                    <CalendarDays className="size-4" />
                    Book a Table
                  </Button>
                </Link>
                <Link to="/dine-in">
                  <Button variant="outline" size="lg" className="gap-2">
                    <UtensilsCrossed className="size-4" />
                    Dine In
                  </Button>
                </Link>
                <a href="tel:+919999999999">
                  <Button variant="outline" size="lg">
                    <Phone className="size-4" />
                    Call the Restaurant
                  </Button>
                </a>
              </div>

              <div className="mt-8 grid gap-4 border-t border-border/70 pt-8 sm:grid-cols-3">
                <div>
                  <MapPin className="size-4 text-primary" />
                  <p className="mt-3 text-sm font-semibold">Visit</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">Cafe Coromandel, Gurugram</p>
                </div>
                <div>
                  <Clock3 className="size-4 text-primary" />
                  <p className="mt-3 text-sm font-semibold">Hours</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">Breakfast to dinner service</p>
                </div>
                <div>
                  <CalendarDays className="size-4 text-primary" />
                  <p className="mt-3 text-sm font-semibold">Best for</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">Family meals, catch-ups, and relaxed dining</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-border/70 bg-forest text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.7fr_0.8fr_1fr] lg:px-8">
          <div className="space-y-4">
            <div>
              <img
                src={PHOTOS.logo}
                alt="Cafe Coromandel logo"
                className="h-12 w-auto object-contain brightness-0 invert"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling!.style.display = "block";
                }}
              />
              <div style={{ display: "none" }}>
                <p className="font-display text-3xl text-primary">Cafe Coromandel</p>
                <p className="mt-1 text-xs uppercase tracking-[0.3em] text-primary-foreground/60">Gurugram</p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-7 text-primary-foreground/78">
              Premium South Indian coastal dining with warm hospitality, cultural detail, and menu depth that moves from breakfast comfort to evening indulgence.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="social-icon">IG</a>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="social-icon">FB</a>
              <a href="https://wa.me/?text=I%27d%20like%20to%20reserve%20a%20table%20at%20Cafe%20Coromandel%2C%20Gurugram" target="_blank" rel="noreferrer" className="social-icon">WA</a>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Quick Links</p>
            <div className="mt-4 space-y-3 text-sm text-primary-foreground/78">
              {navLinks.map((link) => (
                <button key={link.label} className="block hover:text-primary-foreground" onClick={() => scrollToId(link.href)}>
                  {link.label}
                </button>
              ))}
              <Link to="/menu" className="block hover:text-primary-foreground">Full Menu</Link>
              <Link to="/book-table" className="block hover:text-primary-foreground">Book a Table</Link>
              <Link to="/dine-in" className="block hover:text-primary-foreground">Dine In</Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Contact</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-primary-foreground/78">
              <p>Cafe Coromandel, Gurugram</p>
              <a href="tel:+919999999999" className="block hover:text-primary-foreground">+91 99999 99999</a>
              <a href="mailto:hello@cafecoromandel.in" className="block hover:text-primary-foreground">hello@cafecoromandel.in</a>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Location & Hours</p>
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10">
              <iframe
                title="Cafe Coromandel map"
                src="https://www.google.com/maps?q=Cafe%20Coromandel%20Gurugram&output=embed"
                className="h-48 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="text-sm leading-7 text-primary-foreground/78">Open daily • Breakfast, brunch, lunch, and dinner</p>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/?text=I%27d%20like%20to%20reserve%20a%20table%20at%20Cafe%20Coromandel%2C%20Gurugram"
        target="_blank"
        rel="noreferrer"
        className="floating-whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <Phone className="size-5" />
      </a>

      <Dialog open={Boolean(selectedImage)} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogTrigger asChild>
          <span />
        </DialogTrigger>
        <DialogContent className="max-w-5xl border-border/70 bg-card p-3 sm:p-4">
          {selectedImage ? (
            <div className="space-y-4">
              <DialogHeader>
                <DialogTitle className="font-display text-3xl text-foreground">Ambience Preview</DialogTitle>
                <DialogDescription>{selectedImage.alt}</DialogDescription>
              </DialogHeader>
              <div className="overflow-hidden rounded-[1.5rem]">
                <img src={selectedImage.src} alt={selectedImage.alt} className="max-h-[75vh] w-full object-contain" />
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
