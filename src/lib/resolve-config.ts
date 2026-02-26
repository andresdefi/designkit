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
import { heroStyles } from "@/data/heroes";
import { modalStyles } from "@/data/modals";
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
import type {
  DesignConfig,
  ColorPaletteData,
  ColorMode,
  TypographyData,
  Selections,
} from "./types";

interface ColorPicks {
  light: Record<string, string>;
  dark: Record<string, string>;
}

export interface DesignKitState {
  selections: Selections;
  colorPicks: ColorPicks;
  typeScale: string;
}

export function resolveColors(
  colorPicks: ColorPicks,
  paletteId: string | undefined
): ColorPaletteData | undefined {
  const palette = colorPalettes.find((p) => p.id === paletteId);
  const hasLightPicks = Object.keys(colorPicks.light).length > 0;
  const hasDarkPicks = Object.keys(colorPicks.dark).length > 0;

  if (!palette && !hasLightPicks && !hasDarkPicks) return undefined;

  function buildMode(
    _mode: "light" | "dark",
    base: ColorMode | undefined,
    picks: Record<string, string>
  ): ColorMode {
    const get = (key: string) =>
      picks[key] ?? (base as unknown as Record<string, string>)?.[key] ?? "";
    const getSemantic = (key: string) =>
      picks[`semantic.${key}`] ??
      base?.semantic[key as keyof typeof base.semantic] ??
      "";

    return {
      background: get("background"),
      surface: get("surface"),
      surfaceAlt: get("surfaceAlt"),
      border: get("border"),
      text: get("text"),
      textSecondary: get("textSecondary"),
      textMuted: get("textMuted"),
      primary: get("primary"),
      primaryForeground: get("primaryForeground"),
      secondary: get("secondary"),
      secondaryForeground: get("secondaryForeground"),
      accent: get("accent"),
      accentForeground: get("accentForeground"),
      semantic: {
        success: getSemantic("success"),
        warning: getSemantic("warning"),
        error: getSemantic("error"),
        info: getSemantic("info"),
      },
    };
  }

  return {
    light: buildMode("light", palette?.data.light, colorPicks.light),
    dark: buildMode("dark", palette?.data.dark, colorPicks.dark),
    primaryScale: palette?.data.primaryScale ?? {
      50: "",
      100: "",
      200: "",
      300: "",
      400: "",
      500: "",
      600: "",
      700: "",
      800: "",
      900: "",
      950: "",
    },
  };
}

export function resolveTypography(
  typoId: string | undefined,
  scaleId: string
): TypographyData | undefined {
  if (!typoId) return undefined;
  const items = getTypographyItems(scaleId);
  return items.find((i) => i.id === typoId)?.data;
}

export function buildConfig(state: DesignKitState): DesignConfig {
  const { selections, colorPicks, typeScale } = state;

  const colors = resolveColors(colorPicks, selections.colors);
  const typography = resolveTypography(selections.typography, typeScale);
  const spacing = selections.spacing
    ? spacingSystems.find((s) => s.id === selections.spacing)?.data
    : undefined;
  const radius = selections.radius
    ? radiusSystems.find((r) => r.id === selections.radius)?.data
    : undefined;
  const shadows = selections.shadows
    ? shadowSystems.find((s) => s.id === selections.shadows)?.data
    : undefined;

  const selectedButton = selections.buttons
    ? buttonStyles.find((b) => b.id === selections.buttons)
    : undefined;

  const selectedInput = selections.inputs
    ? inputStyles.find((i) => i.id === selections.inputs)
    : undefined;

  const selectedCard = selections.cards
    ? cardStyles.find((c) => c.id === selections.cards)
    : undefined;

  const selectedNavigation = selections.navigation
    ? navigationStyles.find((n) => n.id === selections.navigation)
    : undefined;

  const selectedTab = selections.tabs
    ? tabStyles.find((t) => t.id === selections.tabs)
    : undefined;

  const selectedSidebar = selections.sidebars
    ? sidebarStyles.find((s) => s.id === selections.sidebars)
    : undefined;

  const selectedHero = selections.heroes
    ? heroStyles.find((h) => h.id === selections.heroes)
    : undefined;

  const selectedModal = selections.modals
    ? modalStyles.find((m) => m.id === selections.modals)
    : undefined;

  const selectedFooter = selections.footers
    ? footerStyles.find((f) => f.id === selections.footers)
    : undefined;

  const selectedBadge = selections.badges
    ? badgeStyles.find((b) => b.id === selections.badges)
    : undefined;

  const selectedAvatar = selections.avatars
    ? avatarStyles.find((a) => a.id === selections.avatars)
    : undefined;

  const selectedList = selections.lists
    ? listStyles.find((l) => l.id === selections.lists)
    : undefined;

  const selectedTable = selections.tables
    ? tableStyles.find((t) => t.id === selections.tables)
    : undefined;

  const selectedPricing = selections.pricing
    ? pricingStyles.find((p) => p.id === selections.pricing)
    : undefined;

  const selectedTestimonial = selections.testimonials
    ? testimonialStyles.find((t) => t.id === selections.testimonials)
    : undefined;

  const selectedStat = selections.stats
    ? statStyles.find((s) => s.id === selections.stats)
    : undefined;

  const selectedDivider = selections.dividers
    ? dividerStyles.find((d) => d.id === selections.dividers)
    : undefined;

  const selectedImage = selections.images
    ? imageStyles.find((i) => i.id === selections.images)
    : undefined;

  const selectedEmptyState = selections["empty-states"]
    ? emptyStateStyles.find((e) => e.id === selections["empty-states"])
    : undefined;

  const selectedLoading = selections.loading
    ? loadingStyles.find((l) => l.id === selections.loading)
    : undefined;

  const selectedOnboarding = selections.onboarding
    ? onboardingStyles.find((o) => o.id === selections.onboarding)
    : undefined;

  const selectedError = selections.errors
    ? errorStyles.find((e) => e.id === selections.errors)
    : undefined;

  const selectedSuccess = selections.success
    ? successStyles.find((s) => s.id === selections.success)
    : undefined;

  const selectedNotification = selections.notifications
    ? notificationStyles.find((n) => n.id === selections.notifications)
    : undefined;

  const selectedButtonAnimation = selections["button-animations"]
    ? buttonAnimationStyles.find((b) => b.id === selections["button-animations"])
    : undefined;

  const selectedHoverAnimation = selections["hover-animations"]
    ? hoverAnimationStyles.find((h) => h.id === selections["hover-animations"])
    : undefined;

  const selectedPageTransition = selections["page-transitions"]
    ? pageTransitionStyles.find((p) => p.id === selections["page-transitions"])
    : undefined;

  const selectedMicroInteraction = selections["micro-interactions"]
    ? microInteractionStyles.find((m) => m.id === selections["micro-interactions"])
    : undefined;

  const selectedEntranceAnimation = selections["entrance-animations"]
    ? entranceAnimationStyles.find((e) => e.id === selections["entrance-animations"])
    : undefined;

  return {
    name: "DesignKit Export",
    createdAt: new Date().toISOString(),
    selections,
    colorPicks: (Object.keys(colorPicks.light).length > 0 || Object.keys(colorPicks.dark).length > 0)
      ? colorPicks
      : undefined,
    tokens: {
      colors,
      typography,
      spacing,
      radius,
      shadows,
    },
    componentPreferences: {
      buttonStyle: selectedButton?.name,
      buttonStyleDetails: selectedButton?.data,
      inputStyle: selectedInput?.name,
      inputStyleDetails: selectedInput?.data,
      cardStyle: selectedCard?.name,
      cardStyleDetails: selectedCard?.data,
      navigationStyle: selectedNavigation?.name,
      navigationStyleDetails: selectedNavigation?.data,
      tabStyle: selectedTab?.name,
      tabStyleDetails: selectedTab?.data,
      sidebarStyle: selectedSidebar?.name,
      sidebarStyleDetails: selectedSidebar?.data,
      modalStyle: selectedModal?.name,
      modalStyleDetails: selectedModal?.data,
      heroStyle: selectedHero?.name,
      heroStyleDetails: selectedHero?.data,
      footerStyle: selectedFooter?.name,
      footerStyleDetails: selectedFooter?.data,
      badgeStyle: selectedBadge?.name,
      badgeStyleDetails: selectedBadge?.data,
      avatarStyle: selectedAvatar?.name,
      avatarStyleDetails: selectedAvatar?.data,
      listStyle: selectedList?.name,
      listStyleDetails: selectedList?.data,
      tableStyle: selectedTable?.name,
      tableStyleDetails: selectedTable?.data,
      pricingStyle: selectedPricing?.name,
      pricingStyleDetails: selectedPricing?.data,
      testimonialStyle: selectedTestimonial?.name,
      testimonialStyleDetails: selectedTestimonial?.data,
      statStyle: selectedStat?.name,
      statStyleDetails: selectedStat?.data,
      dividerStyle: selectedDivider?.name,
      dividerStyleDetails: selectedDivider?.data,
      imageStyle: selectedImage?.name,
      imageStyleDetails: selectedImage?.data,
      emptyStatePattern: selectedEmptyState?.name,
      emptyStatePatternDetails: selectedEmptyState?.data,
      loadingPattern: selectedLoading?.name,
      loadingPatternDetails: selectedLoading?.data,
      onboardingPattern: selectedOnboarding?.name,
      onboardingPatternDetails: selectedOnboarding?.data,
      errorPattern: selectedError?.name,
      errorPatternDetails: selectedError?.data,
      successPattern: selectedSuccess?.name,
      successPatternDetails: selectedSuccess?.data,
      notificationPattern: selectedNotification?.name,
      notificationPatternDetails: selectedNotification?.data,
      buttonAnimation: selectedButtonAnimation?.name,
      buttonAnimationDetails: selectedButtonAnimation?.data,
      hoverAnimation: selectedHoverAnimation?.name,
      hoverAnimationDetails: selectedHoverAnimation?.data,
      pageTransition: selectedPageTransition?.name,
      pageTransitionDetails: selectedPageTransition?.data,
      microInteraction: selectedMicroInteraction?.name,
      microInteractionDetails: selectedMicroInteraction?.data,
      entranceAnimation: selectedEntranceAnimation?.name,
      entranceAnimationDetails: selectedEntranceAnimation?.data,
    },
  };
}
