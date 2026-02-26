"use client";

import { useState } from "react";

/*
 * DesignKit E2E Test — Settings Screen
 *
 * Generated from DesignKit config:
 *   - Button style: 3D Layered (solid, 3d-push animation)
 *   - Hover animation: Border Reveal (200ms ease-out)
 *   - Colors: neutral defaults (no palette selected)
 *   - Typography: Geist (project default)
 *   - Spacing: 4px base scale
 *   - Radius: 12px (medium)
 */

/* ── Design Tokens (from config + defaults) ────────── */
const tokens = {
  colors: {
    bg: "#0a0a0a",
    surface: "#141414",
    surfaceAlt: "#1a1a1a",
    border: "#262626",
    borderHover: "#404040",
    text: "#f5f5f5",
    textSecondary: "#a3a3a3",
    textMuted: "#525252",
    primary: "#3b82f6",
    primaryHover: "#2563eb",
    primaryForeground: "#ffffff",
    danger: "#ef4444",
    dangerHover: "#dc2626",
    success: "#22c55e",
    warning: "#f59e0b",
  },
  radius: "12px",
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
  },
};

/* ── 3D Layered Button (from componentPreferences.buttonStyle) ── */
function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  onClick?: () => void;
}) {
  const sizeStyles = {
    sm: { padding: "6px 14px", fontSize: "13px" },
    md: { padding: "10px 20px", fontSize: "14px" },
    lg: { padding: "14px 28px", fontSize: "16px" },
  };

  const variantStyles = {
    primary: {
      background: tokens.colors.primary,
      color: tokens.colors.primaryForeground,
      boxShadow: "0 5px 0 rgba(0,0,0,0.3)",
      border: "none",
    },
    secondary: {
      background: tokens.colors.surfaceAlt,
      color: tokens.colors.text,
      boxShadow: "0 5px 0 rgba(0,0,0,0.3)",
      border: `1px solid ${tokens.colors.border}`,
    },
    danger: {
      background: tokens.colors.danger,
      color: "#fff",
      boxShadow: "0 5px 0 rgba(0,0,0,0.3)",
      border: "none",
    },
    ghost: {
      background: "transparent",
      color: tokens.colors.textSecondary,
      boxShadow: "none",
      border: "none",
    },
  };

  return (
    <button
      onClick={onClick}
      className="settings-btn"
      style={{
        ...sizeStyles[size],
        ...variantStyles[variant],
        borderRadius: "6px",
        fontWeight: 600,
        cursor: "pointer",
        transition: "transform 80ms ease, box-shadow 80ms ease",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        position: "relative",
        fontFamily: "inherit",
      }}
    >
      {icon}
      {children}
    </button>
  );
}

/* ── Toggle Switch ── */
function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{
        width: "44px",
        height: "24px",
        borderRadius: "12px",
        background: checked ? tokens.colors.primary : tokens.colors.border,
        border: "none",
        cursor: "pointer",
        position: "relative",
        transition: "background 200ms ease-out",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "2px",
          left: checked ? "22px" : "2px",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: "#fff",
          transition: "left 200ms ease-out",
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
        }}
      />
    </button>
  );
}

/* ── Setting Row with Border Reveal hover (from componentPreferences.hoverAnimation) ── */
function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="setting-row"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: tokens.spacing.md,
        padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
        borderRadius: tokens.radius,
        borderLeft: "2px solid transparent",
        transition: "border-color 200ms ease-out, background 200ms ease-out",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: tokens.colors.text,
          }}
        >
          {label}
        </div>
        {description && (
          <div
            style={{
              fontSize: "13px",
              color: tokens.colors.textSecondary,
              marginTop: "2px",
            }}
          >
            {description}
          </div>
        )}
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}

/* ── Section Card ── */
function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: tokens.colors.surface,
        border: `1px solid ${tokens.colors.border}`,
        borderRadius: tokens.radius,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
          borderBottom: `1px solid ${tokens.colors.border}`,
          display: "flex",
          alignItems: "center",
          gap: tokens.spacing.sm,
        }}
      >
        <span style={{ fontSize: "16px" }}>{icon}</span>
        <h2
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: tokens.colors.text,
            margin: 0,
          }}
        >
          {title}
        </h2>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Select Dropdown ── */
function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        background: tokens.colors.surfaceAlt,
        color: tokens.colors.text,
        border: `1px solid ${tokens.colors.border}`,
        borderRadius: tokens.radius,
        padding: "8px 12px",
        fontSize: "13px",
        cursor: "pointer",
        fontFamily: "inherit",
        outline: "none",
        minWidth: "140px",
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

/* ── Avatar ── */
function Avatar({ initials, size = 64 }: { initials: string; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${tokens.colors.primary}, #8b5cf6)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.35,
        fontWeight: 700,
        color: "#fff",
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

/* ── Main Settings Page ── */
export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: false,
    security: true,
  });
  const [appearance, setAppearance] = useState("dark");
  const [language, setLanguage] = useState("en");
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30");

  return (
    <>
      <style>{`
        .setting-row:hover {
          border-left-color: ${tokens.colors.primary} !important;
          background: ${tokens.colors.surfaceAlt} !important;
        }
        .settings-btn:hover {
          transform: translateY(-1px) !important;
          box-shadow: 0 6px 0 rgba(0,0,0,0.3) !important;
        }
        .settings-btn:active {
          transform: translateY(4px) !important;
          box-shadow: 0 1px 0 rgba(0,0,0,0.3) !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .setting-row,
          .settings-btn {
            transition: none !important;
          }
          .settings-btn:hover {
            transform: none !important;
            box-shadow: 0 5px 0 rgba(0,0,0,0.3) !important;
          }
          .settings-btn:active {
            transform: none !important;
            box-shadow: 0 5px 0 rgba(0,0,0,0.3) !important;
          }
        }
      `}</style>

      <div
        style={{
          minHeight: "100dvh",
          background: tokens.colors.bg,
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        }}
      >
        {/* Header */}
        <div
          style={{
            borderBottom: `1px solid ${tokens.colors.border}`,
            padding: `${tokens.spacing.lg} ${tokens.spacing.xl}`,
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: tokens.colors.text,
              margin: 0,
            }}
          >
            Settings
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: tokens.colors.textSecondary,
              margin: `${tokens.spacing.xs} 0 0`,
            }}
          >
            Manage your account preferences and configuration
          </p>
        </div>

        {/* Content */}
        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            padding: `${tokens.spacing.xl} ${tokens.spacing.lg}`,
            display: "flex",
            flexDirection: "column",
            gap: tokens.spacing.lg,
          }}
        >
          {/* Profile Section */}
          <Section title="Profile" icon="👤">
            <div
              style={{
                padding: tokens.spacing.lg,
                display: "flex",
                alignItems: "center",
                gap: tokens.spacing.lg,
                borderBottom: `1px solid ${tokens.colors.border}`,
              }}
            >
              <Avatar initials="BV" />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: tokens.colors.text,
                  }}
                >
                  User Profile
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: tokens.colors.textSecondary,
                    marginTop: "2px",
                  }}
                >
                  user@example.com
                </div>
              </div>
              <Button variant="secondary" size="sm">
                Edit
              </Button>
            </div>
            <SettingRow label="Display name" description="Visible to other users">
              <span
                style={{
                  fontSize: "14px",
                  color: tokens.colors.textSecondary,
                }}
              >
                User
              </span>
            </SettingRow>
            <SettingRow label="Email" description="Used for login and notifications">
              <span
                style={{
                  fontSize: "14px",
                  color: tokens.colors.textSecondary,
                }}
              >
                user@example.com
              </span>
            </SettingRow>
          </Section>

          {/* Appearance Section */}
          <Section title="Appearance" icon="🎨">
            <SettingRow
              label="Theme"
              description="Choose your preferred color scheme"
            >
              <Select
                value={appearance}
                onChange={setAppearance}
                options={[
                  { value: "dark", label: "Dark" },
                  { value: "light", label: "Light" },
                  { value: "system", label: "System" },
                ]}
              />
            </SettingRow>
            <SettingRow
              label="Language"
              description="Select your display language"
            >
              <Select
                value={language}
                onChange={setLanguage}
                options={[
                  { value: "en", label: "English" },
                  { value: "es", label: "Español" },
                  { value: "no", label: "Norsk" },
                  { value: "fr", label: "Français" },
                ]}
              />
            </SettingRow>
          </Section>

          {/* Notifications Section */}
          <Section title="Notifications" icon="🔔">
            <SettingRow
              label="Email notifications"
              description="Receive updates about your account activity"
            >
              <Toggle
                checked={notifications.email}
                onChange={(v) =>
                  setNotifications((prev) => ({ ...prev, email: v }))
                }
              />
            </SettingRow>
            <SettingRow
              label="Push notifications"
              description="Get notified on your device in real-time"
            >
              <Toggle
                checked={notifications.push}
                onChange={(v) =>
                  setNotifications((prev) => ({ ...prev, push: v }))
                }
              />
            </SettingRow>
            <SettingRow
              label="Marketing emails"
              description="Product news, tips, and special offers"
            >
              <Toggle
                checked={notifications.marketing}
                onChange={(v) =>
                  setNotifications((prev) => ({ ...prev, marketing: v }))
                }
              />
            </SettingRow>
            <SettingRow
              label="Security alerts"
              description="Critical alerts about suspicious activity"
            >
              <Toggle
                checked={notifications.security}
                onChange={(v) =>
                  setNotifications((prev) => ({ ...prev, security: v }))
                }
              />
            </SettingRow>
          </Section>

          {/* Security Section */}
          <Section title="Security" icon="🔒">
            <SettingRow
              label="Two-factor authentication"
              description="Add an extra layer of security to your account"
            >
              <Toggle
                checked={twoFactor}
                onChange={setTwoFactor}
              />
            </SettingRow>
            <SettingRow
              label="Session timeout"
              description="Automatically log out after inactivity"
            >
              <Select
                value={sessionTimeout}
                onChange={setSessionTimeout}
                options={[
                  { value: "15", label: "15 minutes" },
                  { value: "30", label: "30 minutes" },
                  { value: "60", label: "1 hour" },
                  { value: "never", label: "Never" },
                ]}
              />
            </SettingRow>
            <div
              style={{
                padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
              }}
            >
              <Button variant="secondary" size="sm">
                Change password
              </Button>
            </div>
          </Section>

          {/* Danger Zone */}
          <Section title="Danger zone" icon="⚠️">
            <SettingRow
              label="Delete account"
              description="Permanently remove your account and all associated data"
            >
              <Button variant="danger" size="sm">
                Delete account
              </Button>
            </SettingRow>
          </Section>

          {/* Save Actions */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: tokens.spacing.sm,
              paddingTop: tokens.spacing.md,
              paddingBottom: tokens.spacing["2xl"],
            }}
          >
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary">Save changes</Button>
          </div>
        </div>
      </div>
    </>
  );
}
