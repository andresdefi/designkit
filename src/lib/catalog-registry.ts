import type { Category } from "./types";

/**
 * Hardcoded ID arrays for each category.
 * This avoids importing all 31 data files just for IDs, significantly
 * reducing the initial bundle size. When adding a new catalog item,
 * add its ID here as well.
 */
export const catalogRegistry: Record<Category, string[]> = {
  colors: ["stone","slate","zinc","snow","ink","ember","terracotta","honey","blush","sunset","cinnamon","ocean-sunset","ocean","arctic","indigo-night","forest","mint","steel","electric","citrus","candy","tropical","sunrise","midnight","charcoal","obsidian","deep-sea","noir","fintech","health","productivity","social","creative","enterprise","eco","luxury","playful","editorial","lavender-dream","seafoam","peach-cream","cloud","rose-quartz"],
  typography: ["inter","geist","sf-pro","roboto","dm-sans","figtree","noto-sans","lato","playfair-source","fraunces-inter","lora-merriweather-sans","cormorant-montserrat","libre-baskerville-source","bodoni-moda-jost","crimson-pro-raleway","eb-garamond-karla","bitter-source","jetbrains-inter","ibm-plex","space-grotesk-mono","outfit-fira","inconsolata-noto","red-hat-mono-text","overpass","azeret-dm","clash-satoshi","cabinet-general","plus-jakarta","sora","manrope","bricolage-grotesque","red-hat-display","lexend","unbounded-inter","outfit-dm-sans","nunito","quicksand-open","comfortaa-karla","baloo-work","poppins","rubik","varela-round-lato","grandstander-nunito-sans","system-stack","archivo","albert-sans","switzer","instrument-sans","public-sans","wix-madefor","hanken-grotesk"],
  spacing: ["tight","compact","default","comfortable","spacious","airy","fibonacci","golden-ratio","linear","tailwind","material","fluid","bootstrap","ant-design","carbon","chakra","ios","dense","geometric","asymmetric","modular","proportional","micro","cinematic"],
  radius: ["sharp","subtle","moderate","rounded","pill","mixed","squircle","chunky","ios-default","material-default","asymmetric","notched","soft-square","blob","chamfer","tailwind-default","bootstrap-default","fluent","ant-design-radius","carbon-radius","retro","inverted","diagonal","scalloped"],
  shadows: ["flat","subtle","material","soft","crisp","layered","colored","neumorphic","glow","hard-offset","dreamy","ambient","long-shadow","inset","ring","paper-curl","top-lit","dark-mode","tailwind-default","ios-shadow","material-elevated","carbon-shadow","ant-shadow","chakra-shadow","bootstrap-shadow","warm","cool","neon","retro-shadow","dramatic","frosted","minimal-border","floating","recessed-panel","spotlight","letterpress"],
  buttons: ["flat-solid","elevated-solid","gradient-solid","hover-lift","press-shrink","bold-solid","shadow-pop","rounded-solid","thin-outline","thick-outline","outline-fill-hover","dashed-outline","double-border","outline-glow","outline-slide","ghost","text-only","text-arrow","underline-slide","ghost-tinted","ghost-scale","tinted-bg","frosted-glass","pastel-solid","soft-shadow","muted-solid","neumorphic-raised","neumorphic-pressed","three-d-layered","brutalist","retro-pixel","shimmer","magnetic","morphing","glow-pulse","sliding-bg","icon-reveal","split-button","fab","fab-extended","pill-dot","loading-spinner","success-error","sliding-border","neon-glow","glassmorphic","skeuomorphic","paper-fold","cyberpunk","minimal-line","confetti-pop","wobble-jelly","rainbow-shift","bubble-float","bouncy-squish"],
  inputs: ["underline-text","bordered-text","filled-text","floating-label-text","inset-label-text","pill-text","flush-text","neumorphic-text","frosted-glass-text","thick-focus-text","left-accent-text","bordered-select","filled-select","underline-select","pill-select","flush-select","standard-checkbox","rounded-checkbox","circle-checkbox","toggle-ios","toggle-android","animated-check","fill-checkbox","standard-radio","filled-radio","card-radio","segmented-radio","chip-radio","simple-search","expanding-search","command-palette","pill-search","filter-search","standard-slider","stepped-slider","labeled-slider","bordered-textarea","filled-textarea","floating-label-textarea","flush-textarea","neumorphic-textarea"],
  cards: ["flat","flat-border","minimal-text","dotted-border","outlined-dashed","soft-shadow","material-elevated","heavy-shadow","colored-shadow","floating","gradient-shadow","glassmorphic","gradient-border","gradient-fill","frosted-dark","split-card","accent-top","accent-left","outlined-bold","card-ribbon","sectioned","neumorphic-raised","neumorphic-inset","inset-recessed","brutalist","image-header","full-bleed-image","horizontal","interactive-tilt","expandable","hover-reveal","stacked","paper-stack","cutout-window","neon-glow","retro-pixel","claymorphism","spotlight","overlay-pattern","morphing-border"],
  navigation: ["nav-simple-centered","nav-logo-links-right","nav-logo-center-actions","nav-transparent-overlay","nav-bordered-bottom","nav-filled-solid","nav-blurred-frosted","nav-slim","nav-mega-menu","nav-bottom-ios","nav-bottom-material","nav-bottom-fab","nav-hamburger","nav-bottom-sheet","nav-floating-pill","nav-breadcrumb-slash","nav-breadcrumb-chevron","nav-breadcrumb-dot"],
  tabs: ["tab-underline","tab-pill","tab-bordered","tab-scrollable","tab-vertical","tab-icon-label"],
  sidebars: ["sidebar-fixed","sidebar-collapsible","sidebar-floating","sidebar-grouped","sidebar-minimal","sidebar-dark"],
  modals: ["modal-center","modal-command","modal-fullscreen","modal-bottom-sheet","modal-drawer-right","modal-popover","modal-toast"],
  heroes: ["hero-centered-text","hero-split","hero-minimal","hero-full-image","hero-gradient","hero-video","hero-animated","hero-floating-cards"],
  footers: ["footer-simple","footer-minimal","footer-multi-column","footer-cta","footer-fat"],
  badges: ["solid-badge","outline-badge","soft-badge","dot-indicator","pill-badge","icon-badge","removable-badge","status-badge","counter-badge","gradient-badge"],
  avatars: ["circle-image","rounded-square","square-image","initials","with-status-dot","with-notification","avatar-group","with-ring","placeholder-silhouette"],
  lists: ["simple-text-row","with-leading-icon","with-leading-avatar","with-trailing-action","with-description","swipeable-actions","grouped-sections","inset-grouped","with-checkbox","with-toggle","expandable-accordion"],
  tables: ["simple-clean","striped-rows","bordered","hoverable-rows","compact-dense","card-rows","sticky-header","with-selection"],
  pricing: ["simple-vertical","featured-highlighted","horizontal-layout","toggle-billing","comparison-table","minimal-pricing","gradient-header","with-trial-badge"],
  testimonials: ["simple-quote","avatar-name-role","card-testimonial","large-pull-quote","carousel-ready","star-rating","social-style","video-placeholder"],
  stats: ["large-number-label","with-icon","with-trend-arrow","card-stat","inline-stat","progress-ring","sparkline","comparison-stat"],
  dividers: ["solid-line","dashed-line","dotted-line","with-text-label","gradient-fade","thick-decorative","with-icon-centered"],
  images: ["rounded-corners","circle-crop","color-overlay","gradient-overlay","text-overlay","parallax-ready","border-frame","aspect-ratio-locked"],
  "empty-states": ["illustration-centered","friendly-fun","onboarding-step","icon-text","minimal","search-no-results","action-focused","error-themed","permissions-needed"],
  loading: ["skeleton-shimmer","skeleton-pulse","skeleton-stagger","spinner-centered","progress-bar","content-placeholder","lazy-image-blurup","pull-to-refresh","inline-button-loading"],
  onboarding: ["carousel-swipe","progressive-disclosure","checklist","single-page-welcome","benefit-cards","tooltip-tour","video-intro"],
  errors: ["error-404","error-permission-denied","error-connection","error-timeout","error-maintenance","error-generic","error-validation-summary"],
  success: ["checkmark-animation","confetti-celebration","card-flip-reveal","simple-text-confirmation","redirect-countdown"],
  notifications: ["toast-top","toast-bottom","floating-notification","banner-fullwidth","inline-alert","snackbar-action","alert-icon-color","dismissable-auto","permission-bottom-sheet","permission-modal","permission-inline-banner","permission-fullscreen","permission-pre-primer"],
  "button-animations": ["scale-down","bounce-press","3d-push","ripple","color-flash","glow-pulse","none"],
  "hover-animations": ["lift-shadow","scale-up","icon-nudge","color-shift","underline-slide","glow","background-slide","border-reveal"],
  "page-transitions": ["pt-fade","pt-slide-left","pt-slide-up","pt-none","pt-scale-zoom","pt-shared-element-morph","pt-blur-transition"],
  "micro-interactions": ["mi-toggle-flip","mi-checkbox-draw","mi-heart-pop","mi-count-up-numbers","mi-pull-to-refresh","mi-swipe-delete","mi-tooltip-fade","mi-menu-expand"],
  "entrance-animations": ["ea-fade-in","ea-slide-up-fade","ea-slide-from-left","ea-slide-from-right","ea-scale-in","ea-stagger-children","ea-clip-reveal","ea-typewriter","ea-parallax","ea-reveal-on-scroll","ea-sticky-header-transition","ea-progress-indicator","ea-counter-on-visible"],
};

export function getRandomItemId(category: Category): string | undefined {
  const items = catalogRegistry[category];
  if (!items || items.length === 0) return undefined;
  return items[Math.floor(Math.random() * items.length)];
}
