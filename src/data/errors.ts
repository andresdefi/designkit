import type { CatalogItem, ErrorStyleData } from "@/lib/types";

export type ErrorGroup = "Not Found" | "Connection" | "Application";

export interface ErrorMeta {
  id: string;
  group: ErrorGroup;
}

export const ERROR_GROUPS: ErrorGroup[] = ["Not Found", "Connection", "Application"];

export const ERROR_META: ErrorMeta[] = [
  { id: "error-404", group: "Not Found" },
  { id: "error-permission-denied", group: "Not Found" },
  { id: "error-connection", group: "Connection" },
  { id: "error-timeout", group: "Connection" },
  { id: "error-maintenance", group: "Connection" },
  { id: "error-generic", group: "Application" },
  { id: "error-validation-summary", group: "Application" },
];

export const errorStyles: CatalogItem<ErrorStyleData>[] = [
  {
    id: "error-404",
    category: "errors",
    name: "404 Not Found",
    description: "Classic page-not-found screen with large error code and navigation CTA",
    data: {
      variant: "404",
      errorType: "404",
      containerCss: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "24px" },
      iconCss: { fontSize: "32px", fontWeight: "800", marginBottom: "8px" },
      hasIcon: false,
      hasErrorCode: true,
      hasCta: true,
      hasSecondaryAction: true,
      tone: "friendly",
    },
  },
  {
    id: "error-permission-denied",
    category: "errors",
    name: "Permission Denied",
    description: "Access denied screen with lock icon and redirect options",
    data: {
      variant: "permission-denied",
      errorType: "permission",
      containerCss: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "24px" },
      iconCss: { width: "40px", height: "40px", borderRadius: "9999px", marginBottom: "12px" },
      hasIcon: true,
      hasErrorCode: false,
      hasCta: true,
      hasSecondaryAction: true,
      tone: "serious",
    },
  },
  {
    id: "error-connection",
    category: "errors",
    name: "Connection Error",
    description: "No internet or server unreachable screen with retry button",
    data: {
      variant: "connection",
      errorType: "connection",
      containerCss: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "24px" },
      iconCss: { width: "48px", height: "48px", borderRadius: "12px", marginBottom: "12px" },
      hasIcon: true,
      hasErrorCode: false,
      hasCta: true,
      hasSecondaryAction: false,
      tone: "friendly",
    },
  },
  {
    id: "error-timeout",
    category: "errors",
    name: "Timeout Error",
    description: "Request timed out screen with retry and help link",
    data: {
      variant: "timeout",
      errorType: "timeout",
      containerCss: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "24px" },
      iconCss: { width: "40px", height: "40px", borderRadius: "9999px", marginBottom: "12px" },
      hasIcon: true,
      hasErrorCode: false,
      hasCta: true,
      hasSecondaryAction: true,
      tone: "minimal",
    },
  },
  {
    id: "error-maintenance",
    category: "errors",
    name: "Maintenance Mode",
    description: "Scheduled downtime screen with estimated return time",
    data: {
      variant: "maintenance",
      errorType: "maintenance",
      containerCss: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "24px" },
      iconCss: { width: "48px", height: "48px", borderRadius: "12px", marginBottom: "12px" },
      hasIcon: true,
      hasErrorCode: false,
      hasCta: false,
      hasSecondaryAction: false,
      tone: "friendly",
    },
  },
  {
    id: "error-generic",
    category: "errors",
    name: "Generic Error",
    description: "Something went wrong — catch-all error screen",
    data: {
      variant: "generic",
      errorType: "generic",
      containerCss: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "24px" },
      iconCss: { width: "40px", height: "40px", borderRadius: "9999px", marginBottom: "12px" },
      hasIcon: true,
      hasErrorCode: false,
      hasCta: true,
      hasSecondaryAction: true,
      tone: "serious",
    },
  },
  {
    id: "error-validation-summary",
    category: "errors",
    name: "Validation Summary",
    description: "Inline error summary listing form validation issues",
    data: {
      variant: "validation-summary",
      errorType: "validation",
      containerCss: { display: "flex", flexDirection: "column", padding: "16px", borderRadius: "8px" },
      iconCss: { width: "20px", height: "20px", marginRight: "8px" },
      hasIcon: true,
      hasErrorCode: false,
      hasCta: false,
      hasSecondaryAction: false,
      tone: "serious",
    },
  },
];
