"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Clock, Mail, MapPin, MessageCircle, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EMAIL = "halo@venturaauto.id";
const PHONE = "+62 812 1000 2000";
const PHONE_TEL = "tel:+6281210002000";
const WHATSAPP =
  "https://wa.me/6281210002000?text=Halo%20Ventura%20Auto%2C%20saya%20ingin%20tanya%20seputar%20sewa%20mobil.";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label className="text-xs font-semibold uppercase tracking-wider text-mute">
        {label}
        {required && <span className="text-sale"> *</span>}
      </Label>
      {children}
    </div>
  );
}

export function ContactDialog({ children }: { children: React.ReactNode }) {
  const t = useTranslations("contactModal");
  const [submitted, setSubmitted] = useState(false);
  const cities = t.raw("cities") as string[];
  const cars = t.raw("cars") as string[];

  const info = [
    { icon: Mail, label: t("emailLabel"), value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: Phone, label: t("phoneLabelInfo"), value: PHONE, href: PHONE_TEL },
    {
      icon: MessageCircle,
      label: t("whatsappLabel"),
      value: PHONE,
      href: WHATSAPP,
    },
    { icon: Clock, label: t("hoursLabel"), value: t("hoursValue"), href: null },
  ];

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) setSubmitted(false);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90svh] overflow-y-auto rounded-lg border-hairline bg-canvas p-6 text-ink md:max-w-3xl md:p-10" showCloseButton={false}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <DialogTitle className="font-display text-4xl uppercase leading-none md:text-5xl">
              {t("title")}
            </DialogTitle>
            <DialogDescription className="mt-3 max-w-md text-sm text-mute">
              {t("description")}
            </DialogDescription>
          </div>
          <DialogClose asChild>
            <Button
              variant="outline"
              size="icon-lg"
              aria-label="Close"
              className="shrink-0"
            >
              <X className="size-4" />
            </Button>
          </DialogClose>
        </div>

        {submitted ? (
          <div className="mt-10 flex flex-col items-center py-10 text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-success/10">
              <Check className="size-8 text-success" />
            </span>
            <p className="mt-6 font-display text-3xl uppercase">{t("successTitle")}</p>
            <p className="mt-2 max-w-sm text-sm text-mute">{t("successBody")}</p>
            <DialogClose asChild>
              <Button className="mt-8">{t("successCta")}</Button>
            </DialogClose>
          </div>
        ) : (
          <div className="mt-8 grid gap-10 md:grid-cols-[1fr_240px]">
            <form
              className="grid gap-4 sm:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              <Field label={t("nameLabel")} required>
                <Input
                  type="text"
                  required
                  placeholder={t("namePlaceholder")}
                  className="h-12 rounded-full border-hairline bg-canvas px-5 text-sm text-ink placeholder:text-stone focus-visible:border-stone focus-visible:ring-stone/15"
                />
              </Field>
              <Field label={t("phoneLabel")} required>
                <Input
                  type="tel"
                  required
                  placeholder={t("phonePlaceholder")}
                  className="h-12 rounded-full border-hairline bg-canvas px-5 text-sm text-ink placeholder:text-stone focus-visible:border-stone focus-visible:ring-stone/15"
                />
              </Field>
              <Field label={t("cityLabel")} required>
                <Select required>
                  <SelectTrigger className="h-12 rounded-full border-hairline bg-canvas px-5 text-sm text-ink data-placeholder:text-stone focus-visible:border-stone focus-visible:ring-stone/15">
                    <SelectValue placeholder={t("cityLabel")} />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label={t("carLabel")}>
                <Select>
                  <SelectTrigger className="h-12 rounded-full border-hairline bg-canvas px-5 text-sm text-ink data-placeholder:text-stone focus-visible:border-stone focus-visible:ring-stone/15">
                    <SelectValue placeholder={t("carPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {cars.map((car) => (
                      <SelectItem key={car} value={car}>
                        {car}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <div className="sm:col-span-2">
                <Field label={t("messageLabel")}>
                  <Textarea
                    rows={4}
                    placeholder={t("messagePlaceholder")}
                    className="rounded-lg border-hairline bg-canvas px-5 py-4 text-sm text-ink placeholder:text-stone focus-visible:border-stone focus-visible:ring-stone/15"
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" className="w-full">
                  {t("submit")}
                </Button>
              </div>
            </form>

            <aside className="flex flex-col gap-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-mute">
                {t("infoTitle")}
              </p>
              {info.map((item) => {
                const inner = (
                  <>
                    <item.icon className="size-4 shrink-0 text-mute" />
                    <span className="text-sm text-ink">{item.value}</span>
                  </>
                );
                return (
                  <div key={item.label} className="flex items-start gap-3">
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                        className="flex items-center gap-3 transition-opacity hover:opacity-70"
                      >
                        {inner}
                      </a>
                    ) : (
                      <span className="flex items-center gap-3">{inner}</span>
                    )}
                  </div>
                );
              })}
              <div className="mt-1 flex items-start gap-3">
                <MapPin className="size-4 shrink-0 text-mute" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-mute">
                    {t("citiesLabel")}
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                    {cities.map((city) => (
                      <li key={city} className="text-sm text-ink">
                        {city}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}