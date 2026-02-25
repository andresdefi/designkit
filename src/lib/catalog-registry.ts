import type { Category } from "./types";
import { colorPalettes } from "@/data/colors";
import { getTypographyItems } from "@/data/typography";
import { spacingSystems } from "@/data/spacing";
import { radiusSystems } from "@/data/radius";
import { shadowSystems } from "@/data/shadows";
import { buttonStyles } from "@/data/buttons";
import { inputStyles } from "@/data/inputs";
import { cardStyles } from "@/data/cards";
import { navigationStyles } from "@/data/navigation";
import { tabStyles } from "@/data/tabs";
import { sidebarStyles } from "@/data/sidebars";
import { modalStyles } from "@/data/modals";
import { heroStyles } from "@/data/heroes";
import { footerStyles } from "@/data/footers";
import { badgeStyles } from "@/data/badges";
import { avatarStyles } from "@/data/avatars";
import { listStyles } from "@/data/lists";
import { tableStyles } from "@/data/tables";
import { pricingStyles } from "@/data/pricing";
import { testimonialStyles } from "@/data/testimonials";
import { statStyles } from "@/data/stats";
import { dividerStyles } from "@/data/dividers";
import { imageStyles } from "@/data/images";
import { emptyStateStyles } from "@/data/empty-states";
import { loadingStyles } from "@/data/loading";
import { onboardingStyles } from "@/data/onboarding";
import { errorStyles } from "@/data/errors";
import { successStyles } from "@/data/success";
import { notificationStyles } from "@/data/notifications";
import { buttonAnimationStyles } from "@/data/button-animations";
import { hoverAnimationStyles } from "@/data/hover-animations";
import { pageTransitionStyles } from "@/data/page-transitions";
import { microInteractionStyles } from "@/data/micro-interactions";
import { entranceAnimationStyles } from "@/data/entrance-animations";

export const catalogRegistry: Record<Category, string[]> = {
  colors: colorPalettes.map((p) => p.id),
  typography: getTypographyItems("default").map((i) => i.id),
  spacing: spacingSystems.map((s) => s.id),
  radius: radiusSystems.map((r) => r.id),
  shadows: shadowSystems.map((s) => s.id),
  buttons: buttonStyles.map((b) => b.id),
  inputs: inputStyles.map((i) => i.id),
  cards: cardStyles.map((c) => c.id),
  navigation: navigationStyles.map((n) => n.id),
  tabs: tabStyles.map((t) => t.id),
  sidebars: sidebarStyles.map((s) => s.id),
  modals: modalStyles.map((m) => m.id),
  heroes: heroStyles.map((h) => h.id),
  footers: footerStyles.map((f) => f.id),
  badges: badgeStyles.map((b) => b.id),
  avatars: avatarStyles.map((a) => a.id),
  lists: listStyles.map((l) => l.id),
  tables: tableStyles.map((t) => t.id),
  pricing: pricingStyles.map((p) => p.id),
  testimonials: testimonialStyles.map((t) => t.id),
  stats: statStyles.map((s) => s.id),
  dividers: dividerStyles.map((d) => d.id),
  images: imageStyles.map((i) => i.id),
  "empty-states": emptyStateStyles.map((e) => e.id),
  loading: loadingStyles.map((l) => l.id),
  onboarding: onboardingStyles.map((o) => o.id),
  errors: errorStyles.map((e) => e.id),
  success: successStyles.map((s) => s.id),
  notifications: notificationStyles.map((n) => n.id),
  "button-animations": buttonAnimationStyles.map((b) => b.id),
  "hover-animations": hoverAnimationStyles.map((h) => h.id),
  "page-transitions": pageTransitionStyles.map((p) => p.id),
  "micro-interactions": microInteractionStyles.map((m) => m.id),
  "entrance-animations": entranceAnimationStyles.map((e) => e.id),
};

export function getRandomItemId(category: Category): string | undefined {
  const items = catalogRegistry[category];
  if (!items || items.length === 0) return undefined;
  return items[Math.floor(Math.random() * items.length)];
}
