// ============================================================
// Core catalog types
// ============================================================

export type Category =
  | "colors"
  | "typography"
  | "spacing"
  | "radius"
  | "shadows"
  | "buttons"
  | "inputs"
  | "cards"
  | "navigation"
  | "tabs"
  | "sidebars"
  | "modals"
  | "heroes"
  | "footers"
  | "badges"
  | "avatars"
  | "lists"
  | "tables"
  | "pricing"
  | "testimonials"
  | "stats"
  | "dividers"
  | "images"
  | "empty-states"
  | "loading"
  | "onboarding"
  | "errors"
  | "success"
  | "notifications"
  | "button-animations"
  | "hover-animations"
  | "page-transitions"
  | "micro-interactions"
  | "entrance-animations";

export type CategoryGroup =
  | "foundations"
  | "components"
  | "content"
  | "structure"
  | "patterns"
  | "motion";

export interface CategoryMeta {
  id: Category;
  label: string;
  group: CategoryGroup;
  description: string;
  icon: string;
}

// ============================================================
// Catalog item — the base for every element in the library
// ============================================================

export interface CatalogItem<T = Record<string, unknown>> {
  id: string;
  category: Category;
  name: string;
  description: string;
  data: T;
}

// ============================================================
// Color palette tokens
// ============================================================

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface SemanticColors {
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface ColorMode {
  background: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  semantic: SemanticColors;
}

export interface ColorPaletteData {
  light: ColorMode;
  dark: ColorMode;
  primaryScale: ColorScale;
}

export type ColorPaletteItem = CatalogItem<ColorPaletteData>;

// ============================================================
// Typography tokens
// ============================================================

export interface TypeStep {
  size: string;
  lineHeight: string;
  weight: number;
  letterSpacing?: string;
}

export interface TypeScale {
  h1: TypeStep;
  h2: TypeStep;
  h3: TypeStep;
  h4: TypeStep;
  h5: TypeStep;
  h6: TypeStep;
  body: TypeStep;
  bodySmall: TypeStep;
  caption: TypeStep;
  overline: TypeStep;
  button: TypeStep;
}

export interface TypographyData {
  headingFont: string;
  headingFontUrl?: string;
  bodyFont: string;
  bodyFontUrl?: string;
  monoFont?: string;
  monoFontUrl?: string;
  scaleRatio: number;
  scaleName: string;
  scale: TypeScale;
}

export type TypographyItem = CatalogItem<TypographyData>;

// ============================================================
// Spacing tokens
// ============================================================

export interface SpacingData {
  baseUnit: number;
  scale: Record<string, string>;
}

export type SpacingItem = CatalogItem<SpacingData>;

// ============================================================
// Border radius tokens
// ============================================================

export interface RadiusData {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  full: string;
  button: string;
  card: string;
  input: string;
  badge: string;
  modal: string;
}

export type RadiusItem = CatalogItem<RadiusData>;

// ============================================================
// Shadow / elevation tokens
// ============================================================

export interface ShadowData {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  inner: string;
}

export type ShadowItem = CatalogItem<ShadowData>;

// ============================================================
// Component style definitions
// ============================================================

export type ButtonColorStrategy = "solid" | "outline" | "ghost" | "soft" | "surface" | "gradient";

export interface ButtonStyleData {
  variant: string;
  colorStrategy: ButtonColorStrategy;
  css: {
    default: Record<string, string>;
    hover: Record<string, string>;
    active: Record<string, string>;
    disabled: Record<string, string>;
  };
  supportsSizes: boolean;
  supportsIcons: boolean;
  animation?: string;
}

export type ButtonStyleItem = CatalogItem<ButtonStyleData>;

export interface InputStyleData {
  variant: string;
  subtype: "text" | "select" | "checkbox" | "radio" | "toggle" | "search" | "slider" | "textarea";
  css: {
    default: Record<string, string>;
    focus: Record<string, string>;
    filled: Record<string, string>;
    error: Record<string, string>;
    disabled: Record<string, string>;
  };
  hasFloatingLabel: boolean;
}

export type InputStyleItem = CatalogItem<InputStyleData>;

export interface CardStyleData {
  variant: string;
  css: Record<string, string>;
  hoverCss?: Record<string, string>;
  hasImage: boolean;
  layout: "vertical" | "horizontal";
}

export type CardStyleItem = CatalogItem<CardStyleData>;

// ============================================================
// Structural component definitions
// ============================================================

export interface NavigationStyleData {
  variant: string;
  subtype: "topbar" | "mobile-bottom" | "breadcrumb";
  layout: string;
  css: Record<string, string>;
  hoverCss?: Record<string, string>;
  hasLogo: boolean;
  hasAvatar: boolean;
  position: "static" | "sticky" | "fixed";
}

export type NavigationStyleItem = CatalogItem<NavigationStyleData>;

export interface TabStyleData {
  variant: string;
  orientation: "horizontal" | "vertical";
  containerCss: Record<string, string>;
  tabCss: Record<string, string>;
  activeTabCss: Record<string, string>;
  hoverTabCss?: Record<string, string>;
  hasIcons: boolean;
  indicatorStyle: "underline" | "pill" | "border" | "filled" | "none";
}

export type TabStyleItem = CatalogItem<TabStyleData>;

export interface SidebarStyleData {
  variant: string;
  css: Record<string, string>;
  itemCss: Record<string, string>;
  activeItemCss: Record<string, string>;
  hoverItemCss?: Record<string, string>;
  isCollapsible: boolean;
  hasGroupHeaders: boolean;
  width: string;
  collapsedWidth?: string;
}

export type SidebarStyleItem = CatalogItem<SidebarStyleData>;

export interface ModalStyleData {
  variant: string;
  subtype: "center" | "bottom-sheet" | "drawer" | "fullscreen" | "popover" | "command" | "toast";
  css: Record<string, string>;
  panelCss: Record<string, string>;
  hasOverlay: boolean;
  animationDirection: "center" | "bottom" | "right" | "top" | "none";
}

export type ModalStyleItem = CatalogItem<ModalStyleData>;

export interface HeroStyleData {
  variant: string;
  layout: string;
  css: Record<string, string>;
  contentCss?: Record<string, string>;
  hasImage: boolean;
  hasGradient: boolean;
  minHeight: string;
}

export type HeroStyleItem = CatalogItem<HeroStyleData>;

export interface FooterStyleData {
  variant: string;
  columns: number;
  css: Record<string, string>;
  hasCta: boolean;
  hasNewsletter: boolean;
}

export type FooterStyleItem = CatalogItem<FooterStyleData>;

// ============================================================
// Content component definitions
// ============================================================

export interface BadgeStyleData {
  variant: string;
  shape: "circle" | "pill" | "square";
  css: Record<string, string>;
  hasDismiss: boolean;
  hasIcon: boolean;
  hasDot: boolean;
}

export type BadgeStyleItem = CatalogItem<BadgeStyleData>;

export interface AvatarStyleData {
  variant: string;
  shape: "circle" | "rounded" | "square";
  css: Record<string, string>;
  hasStatus: boolean;
  hasBadge: boolean;
  hasRing: boolean;
  supportsGroup: boolean;
}

export type AvatarStyleItem = CatalogItem<AvatarStyleData>;

export interface ListStyleData {
  variant: string;
  css: Record<string, string>;
  itemCss: Record<string, string>;
  activeItemCss?: Record<string, string>;
  hasLeadingElement: boolean;
  hasTrailingElement: boolean;
  isGrouped: boolean;
  isExpandable: boolean;
}

export type ListStyleItem = CatalogItem<ListStyleData>;

export interface TableStyleData {
  variant: string;
  containerCss: Record<string, string>;
  headerCss: Record<string, string>;
  rowCss: Record<string, string>;
  altRowCss?: Record<string, string>;
  hoverRowCss?: Record<string, string>;
  hasStickyHeader: boolean;
  hasRowSelection: boolean;
  density: "compact" | "default" | "relaxed";
}

export type TableStyleItem = CatalogItem<TableStyleData>;

export interface PricingStyleData {
  variant: string;
  layout: "vertical" | "horizontal";
  css: Record<string, string>;
  headerCss?: Record<string, string>;
  priceCss?: Record<string, string>;
  isFeatured: boolean;
  hasToggle: boolean;
  hasTrialBadge: boolean;
}

export type PricingStyleItem = CatalogItem<PricingStyleData>;

export interface TestimonialStyleData {
  variant: string;
  layout: "card" | "inline" | "pull-quote" | "social";
  css: Record<string, string>;
  quoteCss?: Record<string, string>;
  hasAvatar: boolean;
  hasRating: boolean;
  hasMedia: boolean;
}

export type TestimonialStyleItem = CatalogItem<TestimonialStyleData>;

export interface StatStyleData {
  variant: string;
  layout: "stacked" | "inline" | "card";
  css: Record<string, string>;
  valueCss?: Record<string, string>;
  hasIcon: boolean;
  hasTrend: boolean;
  hasChart: boolean;
}

export type StatStyleItem = CatalogItem<StatStyleData>;

export interface DividerStyleData {
  variant: string;
  css: Record<string, string>;
  style: "solid" | "dashed" | "dotted" | "gradient" | "decorative";
  hasLabel: boolean;
  hasIcon: boolean;
  thickness: string;
}

export type DividerStyleItem = CatalogItem<DividerStyleData>;

export interface ImageStyleData {
  variant: string;
  css: Record<string, string>;
  overlayCss?: Record<string, string>;
  shape: "rounded" | "circle" | "square";
  hasOverlay: boolean;
  hasCaption: boolean;
  aspectRatio?: string;
}

export type ImageStyleItem = CatalogItem<ImageStyleData>;

// ============================================================
// UX pattern definitions
// ============================================================

export interface EmptyStateStyleData {
  variant: string;
  layout: "centered" | "top-heavy" | "split";
  containerCss: Record<string, string>;
  illustrationCss: Record<string, string>;
  hasIllustration: boolean;
  hasIcon: boolean;
  hasCta: boolean;
  hasSecondaryAction: boolean;
  tone: "neutral" | "friendly" | "error" | "info";
}

export type EmptyStateStyleItem = CatalogItem<EmptyStateStyleData>;

export interface LoadingStyleData {
  variant: string;
  type: "skeleton" | "spinner" | "progress" | "placeholder" | "inline";
  containerCss: Record<string, string>;
  elementCss: Record<string, string>;
  animationStyle: "shimmer" | "pulse" | "spin" | "fill" | "stagger" | "blur";
  lineCount: number;
  isFullPage: boolean;
}

export type LoadingStyleItem = CatalogItem<LoadingStyleData>;

export interface OnboardingStyleData {
  variant: string;
  layout: "carousel" | "single-page" | "stepped" | "checklist" | "tooltip" | "video" | "cards";
  containerCss: Record<string, string>;
  stepIndicatorCss: Record<string, string>;
  hasStepIndicator: boolean;
  hasSkipButton: boolean;
  hasIllustration: boolean;
  stepCount: number;
}

export type OnboardingStyleItem = CatalogItem<OnboardingStyleData>;

export interface ErrorStyleData {
  variant: string;
  errorType: "404" | "connection" | "generic" | "validation" | "timeout" | "maintenance" | "permission";
  containerCss: Record<string, string>;
  iconCss: Record<string, string>;
  hasIcon: boolean;
  hasErrorCode: boolean;
  hasCta: boolean;
  hasSecondaryAction: boolean;
  tone: "serious" | "friendly" | "minimal";
}

export type ErrorStyleItem = CatalogItem<ErrorStyleData>;

export interface SuccessStyleData {
  variant: string;
  type: "checkmark" | "confetti" | "text" | "countdown" | "card-flip";
  containerCss: Record<string, string>;
  iconCss: Record<string, string>;
  hasAnimation: boolean;
  hasRedirect: boolean;
  hasCta: boolean;
}

export type SuccessStyleItem = CatalogItem<SuccessStyleData>;

export interface NotificationStyleData {
  variant: string;
  subtype: "toast" | "banner" | "inline-alert" | "snackbar" | "floating" | "permission-sheet" | "permission-modal" | "permission-banner" | "permission-fullscreen" | "permission-primer";
  position: "top" | "bottom" | "center" | "inline" | "corner";
  containerCss: Record<string, string>;
  contentCss: Record<string, string>;
  hasIcon: boolean;
  hasAction: boolean;
  hasCloseButton: boolean;
  isAutoDismiss: boolean;
  semanticColor: "success" | "warning" | "error" | "info" | "neutral";
}

export type NotificationStyleItem = CatalogItem<NotificationStyleData>;

// ============================================================
// Animation definitions
// ============================================================

export interface AnimationData {
  variant: string;
  subtype: string;
  duration: string;
  easing: string;
  trigger: "hover" | "click" | "mount" | "scroll" | "focus";
  cssKeyframes?: string;
  cssProperties?: Record<string, string>;
}

export type AnimationItem = CatalogItem<AnimationData>;

// ============================================================
// Selection state — what the user has picked
// ============================================================

export type Selections = Partial<Record<Category, string>>;

// ============================================================
// Export config — the output
// ============================================================

export interface DesignConfig {
  name: string;
  createdAt: string;
  selections: Selections;
  colorPicks?: { light: Record<string, string>; dark: Record<string, string> };
  tokens: {
    colors?: ColorPaletteData;
    typography?: TypographyData;
    spacing?: SpacingData;
    radius?: RadiusData;
    shadows?: ShadowData;
  };
  componentPreferences: {
    buttonStyle?: string;
    buttonStyleDetails?: ButtonStyleData;
    inputStyle?: string;
    inputStyleDetails?: InputStyleData;
    cardStyle?: string;
    cardStyleDetails?: CardStyleData;
    navigationStyle?: string;
    navigationStyleDetails?: NavigationStyleData;
    tabStyle?: string;
    tabStyleDetails?: TabStyleData;
    sidebarStyle?: string;
    sidebarStyleDetails?: SidebarStyleData;
    modalStyle?: string;
    modalStyleDetails?: ModalStyleData;
    heroStyle?: string;
    heroStyleDetails?: HeroStyleData;
    footerStyle?: string;
    footerStyleDetails?: FooterStyleData;
    badgeStyle?: string;
    badgeStyleDetails?: BadgeStyleData;
    avatarStyle?: string;
    avatarStyleDetails?: AvatarStyleData;
    listStyle?: string;
    listStyleDetails?: ListStyleData;
    tableStyle?: string;
    tableStyleDetails?: TableStyleData;
    pricingStyle?: string;
    pricingStyleDetails?: PricingStyleData;
    testimonialStyle?: string;
    testimonialStyleDetails?: TestimonialStyleData;
    statStyle?: string;
    statStyleDetails?: StatStyleData;
    dividerStyle?: string;
    dividerStyleDetails?: DividerStyleData;
    imageStyle?: string;
    imageStyleDetails?: ImageStyleData;
    emptyStatePattern?: string;
    emptyStatePatternDetails?: EmptyStateStyleData;
    loadingPattern?: string;
    loadingPatternDetails?: LoadingStyleData;
    onboardingPattern?: string;
    onboardingPatternDetails?: OnboardingStyleData;
    errorPattern?: string;
    errorPatternDetails?: ErrorStyleData;
    successPattern?: string;
    successPatternDetails?: SuccessStyleData;
    notificationPattern?: string;
    notificationPatternDetails?: NotificationStyleData;
    buttonAnimation?: string;
    buttonAnimationDetails?: AnimationData;
    hoverAnimation?: string;
    hoverAnimationDetails?: AnimationData;
    pageTransition?: string;
    pageTransitionDetails?: AnimationData;
    microInteraction?: string;
    microInteractionDetails?: AnimationData;
    entranceAnimation?: string;
    entranceAnimationDetails?: AnimationData;
  };
}
