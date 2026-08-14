"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Clock, Mail, MapPin, MessageCircle, Phone, X } from "lucide-react";
import { Dialog } from "radix-ui";
import { Button } from "@/components/ui/button";

const EMAIL = "halo@venturaauto.id";
const PHONE = "+62 812 1000 2000";
const PHONE_TEL = "tel:+6281210002000";
const WHATSAPP =
  "https://wa.me/6281210002000?text=Halo%20Ventura%20Auto%2C%20saya%20ingin%20tanya%20seputar%20sewa%20mobil.";

const inputClass =
  "h-12 w-full rounded-full border border-hairline bg-canvas px-5 text-sm text-ink placeholder:text-stone focus:border-stone focus:outline-none focus:ring-[3px] focus:ring-stone/15";

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
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-mute">
        {label}
        {required && <span className="text-sale"> *</span>}
      </span>
      {children}
    </label>
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
    <Dialog.Root
      onOpenChange={(open) => {
        if (open) setSubmitted(false);
      }}
    >
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/45 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-x-4 top-1/2 z-50 max-h-[90svh] -translate-y-1/2 overflow-y-auto rounded-lg border border-hairline bg-canvas p-6 md:inset-x-auto md:left-1/2 md:w-full md:max-w-3xl md:-translate-x-1/2 md:p-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="font-display text-4xl uppercase leading-none md:text-5xl">
                {t("title")}
              </Dialog.Title>
              <Dialog.Description className="mt-3 max-w-md text-sm text-mute">
                {t("description")}
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close"
                className="flex size-10 shrink-0 items-center justify-center rounded-full border border-hairline text-ink transition-colors hover:bg-soft-cloud"
              >
                <X className="size-4" />
              </button>
            </Dialog.Close>
          </div>

          {submitted ? (
            <div className="mt-10 flex flex-col items-center py-10 text-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-success/10">
                <Check className="size-8 text-success" />
              </span>
              <p className="mt-6 font-display text-3xl uppercase">{t("successTitle")}</p>
              <p className="mt-2 max-w-sm text-sm text-mute">{t("successBody")}</p>
              <Dialog.Close asChild>
                <Button className="mt-8">{t("successCta")}</Button>
              </Dialog.Close>
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
                  <input
                    type="text"
                    required
                    placeholder={t("namePlaceholder")}
                    className={inputClass}
                  />
                </Field>
                <Field label={t("phoneLabel")} required>
                  <input
                    type="tel"
                    required
                    placeholder={t("phonePlaceholder")}
                    className={inputClass}
                  />
                </Field>
                <Field label={t("cityLabel")} required>
                  <select
                    required
                    defaultValue=""
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="" disabled>
                      {t("cityLabel")}
                    </option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={t("carLabel")}>
                  <select defaultValue="" className={`${inputClass} appearance-none`}>
                    <option value="" disabled>
                      {t("carPlaceholder")}
                    </option>
                    {cars.map((car) => (
                      <option key={car} value={car}>
                        {car}
                      </option>
                    ))}
                  </select>
                </Field>
                <div className="sm:col-span-2">
                  <Field label={t("messageLabel")}>
                    <textarea
                      rows={4}
                      placeholder={t("messagePlaceholder")}
                      className="w-full resize-none rounded-lg border border-hairline bg-canvas px-5 py-4 text-sm text-ink placeholder:text-stone focus:border-stone focus:outline-none focus:ring-[3px] focus:ring-stone/15"
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
