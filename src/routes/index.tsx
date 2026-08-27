import { createFileRoute } from "@tanstack/react-router";
import {
  Clock,
  Coffee,
  MapPin,
  Music4,
  PartyPopper,
  Phone,
  Tv,
  UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SceneMount } from "@/components/SceneMount";
import { ReserveDialog } from "@/components/ReserveDialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Karoma Cafe — Matchday Spot in Pokhara | Book a Table" },
      {
        name: "description",
        content:
          "Karoma Cafe, Pokhara: live match screenings, specialty coffee, food, drinks and live music. Book a table, pre-order drinks or reserve the party space. Open daily 6 AM–10 PM.",
      },
      { property: "og:title", content: "Karoma Cafe — Your Matchday Spot in Pokhara" },
      {
        property: "og:description",
        content:
          "Live football on the big screen, specialty brews, live music and a party space for hire. Reserve your seat at Karoma Cafe.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const menu = [
  { name: "Karoma Signature Latte", note: "Double shot, caramel crema", price: "Rs 320", icon: Coffee },
  { name: "Himalayan Cold Brew", note: "18-hour steep, citrus finish", price: "Rs 380", icon: Coffee },
  { name: "Matchday Platter", note: "Wings, fries, dips — feeds 3", price: "Rs 890", icon: UtensilsCrossed },
  { name: "Sunset Mojito", note: "Mint, lime, soda, zero proof", price: "Rs 350", icon: Coffee },
];

const features = [
  {
    icon: Tv,
    title: "Live Match Screenings",
    text: "Big screen, big sound, colder drinks. Every kickoff, every league night.",
  },
  {
    icon: Music4,
    title: "Live Music Nights",
    text: "Acoustic sets and local artists lighting up the courtyard after dark.",
  },
  {
    icon: PartyPopper,
    title: "Party & Events Space",
    text: "Birthdays, watch parties and private evenings — reserve the whole floor.",
  },
];

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-primary/15 ring-1 ring-primary/40">
              <Coffee className="size-5 text-primary" />
            </span>
            <span className="leading-none">
              <span className="block font-script text-xl text-cream">Karoma</span>
              <span className="block text-[10px] tracking-[0.35em] text-muted-foreground">CAFE</span>
            </span>
          </a>
          <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a className="transition-colors hover:text-primary" href="#menu">Menu</a>
            <a className="transition-colors hover:text-primary" href="#matchday">Matchday</a>
            <a className="transition-colors hover:text-primary" href="#party">Party</a>
            <a className="transition-colors hover:text-primary" href="#visit">Visit</a>
          </div>
          <ReserveDialog defaultMode="table">
            <Button size="sm" className="rounded-full px-5">Reserve</Button>
          </ReserveDialog>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative isolate">
        <span className="watermark absolute -left-6 top-10 hidden text-[16rem] lg:block">Karoma</span>
        <div className="mx-auto grid max-w-7xl items-center gap-4 px-6 pb-24 pt-10 lg:grid-cols-2 lg:pt-16">
          <div className="relative order-2 h-[380px] sm:h-[460px] lg:order-1 lg:h-[620px]">
            <div className="absolute inset-8 rounded-full bg-primary/15 blur-3xl" />
            <SceneMount className="absolute inset-0" />
          </div>

          <div className="order-1 lg:order-2">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs tracking-[0.25em] text-primary">
              POKHARA · SINCE DAY ONE
            </p>
            <h1 className="font-script text-6xl leading-[0.95] text-cream drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)] sm:text-7xl lg:text-8xl">
              Release
              <span className="mt-2 block text-brass">the Flavour</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Your matchday spot. Specialty coffee, plates worth staying for, and every goal on the
              big screen — open daily 6:00 AM to 10:00 PM.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ReserveDialog defaultMode="table">
                <Button size="lg" className="rounded-full px-8">Book a table</Button>
              </ReserveDialog>
              <ReserveDialog defaultMode="drink">
                <Button size="lg" variant="outline" className="rounded-full border-primary/40 px-8 text-cream hover:bg-primary/10">
                  Order a drink
                </Button>
              </ReserveDialog>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Clock className="size-4 text-primary" /> 6:00 AM – 10:00 PM</span>
              <span className="flex items-center gap-2"><MapPin className="size-4 text-primary" /> Karoma Cafe &amp; Car Wash, Pokhara</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="matchday" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <article key={f.title} className="tilt-card glass-panel rounded-3xl p-8">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary/15 ring-1 ring-primary/30">
                <f.icon className="size-6 text-primary" />
              </span>
              <h3 className="mt-6 text-xl font-semibold text-cream">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="relative mx-auto max-w-7xl px-6 py-20">
        <span className="watermark absolute right-0 top-0 hidden text-[12rem] lg:block">Menu</span>
        <div className="relative flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-script text-5xl text-cream">On the counter</h2>
          <p className="text-sm text-muted-foreground">Roasted in-house, poured all day.</p>
        </div>
        <div className="relative mt-10 grid gap-4 sm:grid-cols-2">
          {menu.map((m) => (
            <div
              key={m.name}
              className="group flex items-center justify-between gap-6 rounded-2xl border border-border/60 bg-card/50 p-6 transition-all hover:-translate-y-1 hover:border-primary/45 hover:bg-card"
            >
              <div className="flex items-center gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary/70 text-primary">
                  <m.icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-medium text-cream">{m.name}</h3>
                  <p className="text-sm text-muted-foreground">{m.note}</p>
                </div>
              </div>
              <span className="font-script text-2xl text-primary">{m.price}</span>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <ReserveDialog defaultMode="drink">
            <Button variant="outline" className="rounded-full border-primary/40 px-7 text-cream hover:bg-primary/10">
              Pre-order your drink
            </Button>
          </ReserveDialog>
        </div>
      </section>

      {/* PARTY */}
      <section id="party" className="mx-auto max-w-7xl px-6 py-20">
        <div className="glass-panel overflow-hidden rounded-[2.5rem] p-10 lg:p-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="font-script text-5xl text-cream lg:text-6xl">Throw it at Karoma</h2>
              <p className="mt-5 max-w-lg text-muted-foreground">
                Reserve the courtyard and lounge for birthdays, watch parties, and live music
                evenings. We handle the screens, the sound and the platters — you bring the crowd.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ReserveDialog defaultMode="party">
                  <Button size="lg" className="rounded-full px-8">Reserve the space</Button>
                </ReserveDialog>
                <a href="tel:+9779800000000">
                  <Button size="lg" variant="ghost" className="rounded-full px-6 text-cream hover:bg-primary/10">
                    <Phone className="mr-2 size-4" /> Call us
                  </Button>
                </a>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-4">
              {[
                ["60+", "Guest capacity"],
                ["3", "Big screens"],
                ["16h", "Open daily"],
                ["Free", "Parking & car wash"],
              ].map(([big, small]) => (
                <div key={small} className="rounded-2xl border border-border/60 bg-background/40 p-6 text-center">
                  <p className="font-script text-4xl text-primary">{big}</p>
                  <p className="mt-1 text-xs tracking-widest text-muted-foreground uppercase">{small}</p>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* VISIT */}
      <section id="visit" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-panel rounded-3xl p-10">
            <h2 className="font-script text-4xl text-cream">Find us</h2>
            <ul className="mt-6 space-y-4 text-muted-foreground">
              <li className="flex gap-3"><MapPin className="mt-0.5 size-5 shrink-0 text-primary" /> Karoma Cafe &amp; Car Wash, Pokhara 33700, Nepal</li>
              <li className="flex gap-3"><Clock className="mt-0.5 size-5 shrink-0 text-primary" /> Open daily · 6:00 AM – 10:00 PM</li>
              <li className="flex gap-3"><Tv className="mt-0.5 size-5 shrink-0 text-primary" /> Live match screenings · Food · Drinks · Live music</li>
            </ul>
            <a
              className="mt-8 inline-block"
              href="https://www.google.com/maps/place/Karoma+Cafe+%26+car+wash/@28.2583425,83.9771801,17z"
              target="_blank"
              rel="noreferrer"
            >
              <Button className="rounded-full px-7">Open in Google Maps</Button>
            </a>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border/60">
            <iframe
              title="Karoma Cafe location map"
              src="https://www.google.com/maps?q=28.2582189,83.9772637&z=17&output=embed"
              className="h-full min-h-[320px] w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 bg-background/50">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} Karoma Cafe, Pokhara</span>
          <span className="text-primary">#karomacafe</span>
          <span>DM for reservations</span>
        </div>
      </footer>
    </div>
  );
}
