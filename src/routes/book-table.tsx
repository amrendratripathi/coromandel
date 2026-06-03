import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock3, MapPin, Phone, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/book-table")({
  head: () => ({
    meta: [
      { title: "Book a Table — Cafe Coromandel Gurugram" },
      {
        name: "description",
        content:
          "Reserve your table at Cafe Coromandel, Gurugram. Book for breakfast, lunch, or dinner and enjoy an authentic South Indian coastal dining experience.",
      },
      { property: "og:title", content: "Book a Table — Cafe Coromandel Gurugram" },
      { property: "og:url", content: "/book-table" },
    ],
    links: [{ rel: "canonical", href: "/book-table" }],
  }),
  component: BookTablePage,
});

const scrollMotion = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function BookTablePage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    occasion: "",
    notes: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-hero text-primary-foreground">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/uploads/unnamed (3).webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,18,15,0.55) 0%, rgba(20,18,15,0.85) 100%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mb-8 flex items-center gap-4">
            <Link to="/">
              <img
                src="/uploads/logo.png"
                alt="Cafe Coromandel"
                className="h-10 w-auto object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </Link>
          </div>
          <Link to="/">
            <Button variant="outline" className="mb-8 border-white/20 bg-white/10 text-white hover:bg-white/20">
              <ArrowLeft className="size-4" />
              Back to Home
            </Button>
          </Link>
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Cafe Coromandel · Gurugram
            </p>
            <h1 className="font-display text-5xl leading-tight text-white sm:text-6xl lg:text-7xl" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
              Reserve Your Table
            </h1>
            <p className="text-base leading-8 text-white/85">
              Plan your breakfast, lunch, or dinner experience. We'll have your table ready and your favourite dishes waiting.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
          {/* Form / Confirmation */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={scrollMotion}
            className="rounded-[2rem] border border-border/70 bg-surface p-7 shadow-luxury sm:p-8 lg:p-10"
          >
            {submitted ? (
              <div className="flex flex-col items-center gap-6 py-10 text-center">
                <div className="flex size-20 items-center justify-center rounded-full bg-primary/15">
                  <CheckCircle2 className="size-10 text-primary" />
                </div>
                <div className="space-y-2">
                  <h2 className="font-display text-4xl text-foreground">Booking Received!</h2>
                  <p className="text-base leading-7 text-muted-foreground">
                    Thank you, <strong className="text-foreground">{form.name}</strong>! We've received your reservation request.
                    Our team will confirm shortly on <strong className="text-foreground">{form.phone}</strong>.
                  </p>
                </div>
                <div className="w-full rounded-2xl border border-border/70 bg-card p-5 text-left space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Booking Summary</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Date</p>
                      <p className="font-semibold">{form.date || "—"}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Time</p>
                      <p className="font-semibold">{form.time || "—"}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Guests</p>
                      <p className="font-semibold">{form.guests || "—"}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Occasion</p>
                      <p className="font-semibold">{form.occasion || "Regular dining"}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" size="lg" onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", date: "", time: "", guests: "", occasion: "", notes: "" }); }}>
                    Make Another Booking
                  </Button>
                  <Link to="/">
                    <Button variant="outline" size="lg">Back to Home</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Table Reservation</p>
                  <h2 className="mt-2 font-display text-4xl text-foreground">Book Your Experience</h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Fill in your details below and we'll confirm your table. You can also call us directly.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground" htmlFor="name">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground" htmlFor="phone">
                      Phone Number *
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      required
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground" htmlFor="date">
                      Date *
                    </label>
                    <Input
                      id="date"
                      name="date"
                      required
                      type="date"
                      value={form.date}
                      onChange={handleChange}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground" htmlFor="time">
                      Time *
                    </label>
                    <Input
                      id="time"
                      name="time"
                      required
                      type="time"
                      value={form.time}
                      onChange={handleChange}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground" htmlFor="guests">
                      Number of Guests *
                    </label>
                    <Input
                      id="guests"
                      name="guests"
                      required
                      type="number"
                      min={1}
                      max={20}
                      value={form.guests}
                      onChange={handleChange}
                      placeholder="e.g. 4"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground" htmlFor="occasion">
                      Occasion
                    </label>
                    <Input
                      id="occasion"
                      name="occasion"
                      value={form.occasion}
                      onChange={handleChange}
                      placeholder="Birthday, Anniversary, etc."
                      className="h-12"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground" htmlFor="notes">
                      Special Requests
                    </label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Any dietary requirements, seating preferences, or special setups?"
                      className="min-h-28"
                    />
                  </div>
                  <div className="sm:col-span-2 flex flex-wrap gap-3">
                    <Button type="submit" variant="hero" size="lg">
                      Confirm Reservation
                    </Button>
                    <a href="tel:+919999999999">
                      <Button type="button" variant="outline" size="lg">
                        <Phone className="size-4" />
                        Call Us
                      </Button>
                    </a>
                  </div>
                </form>
              </>
            )}
          </motion.div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ ...scrollMotion, visible: { ...scrollMotion.visible, transition: { duration: 0.6, delay: 0.1 } } }}
              className="overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-soft"
            >
              <img
                src="/uploads/unnamed (2).webp"
                alt="Cafe Coromandel warm dining interior"
                className="h-64 w-full object-cover"
                loading="eager"
              />
              <div className="space-y-4 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Visiting Details</p>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">Address</p>
                      <p className="leading-6">Cafe Coromandel, Gurugram, Haryana</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock3 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">Hours</p>
                      <p className="leading-6">Breakfast · Lunch · Dinner</p>
                      <p className="leading-6">Open daily</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">Phone</p>
                      <a href="tel:+919999999999" className="text-primary hover:underline">+91 99999 99999</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="mt-0.5 size-4 shrink-0 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">Group Dining</p>
                      <p className="leading-6">We accommodate groups up to 20. For larger events, please call us.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ ...scrollMotion, visible: { ...scrollMotion.visible, transition: { duration: 0.6, delay: 0.2 } } }}
              className="rounded-[2rem] border border-border/70 bg-surface p-6 shadow-soft"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Good to Know</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-primary" />
                  Reservations are confirmed by phone within a few hours.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-primary" />
                  Walk-ins are always welcome, subject to availability.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-primary" />
                  Special dietary needs? Let us know in the notes.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-primary" />
                  For birthday setups or celebrations, please mention the occasion.
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ ...scrollMotion, visible: { ...scrollMotion.visible, transition: { duration: 0.6, delay: 0.25 } } }}
              className="overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-soft"
            >
              <div className="flex items-center gap-3 bg-primary/10 px-6 py-4">
                <CalendarDays className="size-5 text-primary" />
                <p className="font-semibold text-foreground">Dine-In Ordering Available</p>
              </div>
              <div className="p-6">
                <p className="text-sm leading-7 text-muted-foreground">
                  Already seated? Browse the menu and place your order directly from your table using our digital menu.
                </p>
                <Link to="/dine-in" className="mt-4 block">
                  <Button variant="outline" className="w-full">Open Dine-In Menu</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
