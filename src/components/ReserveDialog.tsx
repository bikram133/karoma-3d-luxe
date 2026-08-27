import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Mode = "table" | "drink" | "party";

const copy: Record<Mode, { title: string; blurb: string; cta: string }> = {
  table: {
    title: "Book a table",
    blurb: "Grab your matchday seat before kickoff — best screens fill up fast.",
    cta: "Confirm booking",
  },
  drink: {
    title: "Order a drink",
    blurb: "Pre-order your brew and we will have it steaming when you walk in.",
    cta: "Place order",
  },
  party: {
    title: "Reserve the party space",
    blurb: "Birthdays, watch parties, live music nights — the whole floor is yours.",
    cta: "Request the space",
  },
};

export function ReserveDialog({
  children,
  defaultMode = "table",
}: {
  children: ReactNode;
  defaultMode?: Mode;
}) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>(defaultMode);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = new FormData(e.currentTarget).get("name")?.toString() || "Friend";
    setOpen(false);
    toast.success(`${copy[mode].title} received`, {
      description: `Thanks ${name} — Karoma Cafe will confirm on your phone shortly.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="glass-panel max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-script text-3xl text-primary">{copy[mode].title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">{copy[mode].blurb}</DialogDescription>
        </DialogHeader>

        <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
          <TabsList className="grid w-full grid-cols-3 bg-secondary/60">
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="drink">Drinks</TabsTrigger>
            <TabsTrigger value="party">Party</TabsTrigger>
          </TabsList>

          <form onSubmit={submit} className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" required placeholder="98XXXXXXXX" />
              </div>
            </div>

            <TabsContent value="table" className="m-0 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Date &amp; time</Label>
                <Input id="date" name="date" type="datetime-local" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guests">Guests</Label>
                <Input id="guests" name="guests" type="number" min={1} defaultValue={2} />
              </div>
            </TabsContent>

            <TabsContent value="drink" className="m-0 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="order">What can we brew?</Label>
                <Textarea id="order" name="order" placeholder="2x Karoma Signature Latte, 1x Cold Brew" />
              </div>
            </TabsContent>

            <TabsContent value="party" className="m-0 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="pdate">Event date</Label>
                  <Input id="pdate" name="pdate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Headcount</Label>
                  <Input id="size" name="size" type="number" min={5} defaultValue={20} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Occasion &amp; needs</Label>
                <Textarea id="notes" name="notes" placeholder="Birthday, live music, big screen for the final…" />
              </div>
            </TabsContent>

            <Button type="submit" size="lg" className="w-full">
              {copy[mode].cta}
            </Button>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
