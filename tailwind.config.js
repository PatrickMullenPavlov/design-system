/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    // Override default colors completely - only our muted, warm palette is allowed
    colors: {
      // Fundamentals
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",

      // Rule/border color
      "rule-color": "#EDEEEC",

      // Action color - for interactive elements, links, CTAs
      "action-color": "#8F8871",

      // Active states
      "active-blue": "#4A5568",
      "active-color": "#C45D4A",

      // Body text - muted, warm charcoal tones
      "body-text": {
        lightest: "#8B9298",
        lighter: "#6B7280",
        light: "#4B5563",
        DEFAULT: "#2D3339",
      },

      // Light body text - for dark backgrounds
      "light-body-text": {
        lightest: "rgba(227, 235, 230, 0.8)",
        lighter: "rgba(227, 235, 230, 0.65)",
        light: "rgba(227, 235, 230, 0.5)",
        DEFAULT: "#E3EBE6",
      },

      // Background - warm off-whites
      "trig-bg": {
        lightest: "rgba(255, 255, 255, 0.4)",
        lighter: "rgba(255, 255, 255, 0.6)",
        light: "rgba(255, 255, 255, 0.8)",
        DEFAULT: "#f7f7f7",
        dark: "rgba(0, 0, 0, 0.04)",
        darker: "rgba(0, 0, 0, 0.08)",
        darkest: "#1a1a1a",
      },

      // Grey scale - warm neutral greys
      grey: {
        10: "#FDFDFC",
        20: "#FCFCFB",
        30: "#FBFBFA",
        40: "#FAFAF9",
        50: "#F8F8F7",
        60: "#F7F7F6",
        70: "#F6F6F5",
        80: "#F5F5F4",
        90: "#F4F4F3",
        100: "#F2F2F1",
        200: "#E8E8E7",
        300: "#DEDEDD",
        400: "#C8C8C7",
        500: "#A7A7A6",
        600: "#868685",
        700: "#656564",
        DEFAULT: "#656564",
        800: "#434342",
        900: "#222221",
      },

      // Slate scale - cool neutral for UI elements
      slate: {
        5: "#FBFBFB",
        10: "#F6F6F6",
        15: "#F1F1F1",
        20: "#F4F5F7",
        30: "#EBECF0",
        40: "#DFE1E6",
        50: "#C1C7D0",
        60: "#B3BAC5",
        70: "#A5ADBA",
        80: "#97A0AF",
        90: "#8993A4",
        100: "#7A869A",
        200: "#6B778C",
        300: "#5E6C84",
        400: "#505F79",
        500: "#42526E",
        600: "#344563",
        700: "#253858",
        DEFAULT: "#253858",
        800: "#172B4D",
        900: "#091E42",
      },

      // Gray - Tailwind-compatible scale with warm undertones
      gray: {
        50: "#FAFAF9",
        100: "#F4F4F3",
        200: "#E8E7E5",
        300: "#D6D5D2",
        400: "#A8A7A3",
        500: "#787774",
        600: "#5C5B58",
        700: "#454442",
        800: "#2D2D2B",
        900: "#1A1A19",
        950: "#0F0F0E",
      },

      // Red - muted, warm terracotta tones (for errors, destructive actions)
      red: {
        10: "#FEF5F3",
        50: "#FDF2F0",
        100: "#FADDDA",
        200: "#F5BBB5",
        300: "#E89A91",
        400: "#D97A6F",
        500: "#C45D4A",
        600: "#A84B3C",
        700: "#8B3D31",
        800: "#6E3128",
        900: "#522520",
        lightest: "#FDF2F0",
        lighter: "#F5BBB5",
        light: "#D97A6F",
        DEFAULT: "#C45D4A",
        dark: "#A84B3C",
        darker: "#8B3D31",
        darkest: "#6E3128",
      },

      // Blue - muted, warm steel/slate tones (for info, links, interactive)
      blue: {
        10: "#F4F6F8",
        50: "#F0F3F7",
        100: "#DCE4ED",
        200: "#B9C9DB",
        300: "#96ADC6",
        400: "#7392B0",
        500: "#5A7A99",
        600: "#4A6580",
        700: "#3D5368",
        800: "#314250",
        900: "#253138",
        lightest: "#F0F3F7",
        lighter: "#B9C9DB",
        light: "#7392B0",
        DEFAULT: "#5A7A99",
        dark: "#4A6580",
        darker: "#3D5368",
        darkest: "#314250",
      },

      // Green - muted, warm sage/olive tones (for success)
      green: {
        10: "#F3F7F4",
        50: "#F0F5F1",
        100: "#DCE8DE",
        200: "#B8D1BC",
        300: "#94B99A",
        400: "#70A078",
        500: "#5A8A62",
        600: "#4A724F",
        700: "#3D5C41",
        800: "#314834",
        900: "#253527",
        lightest: "#F0F5F1",
        lighter: "#B8D1BC",
        light: "#70A078",
        DEFAULT: "#5A8A62",
        dark: "#4A724F",
        darker: "#3D5C41",
        darkest: "#314834",
      },

      // Yellow - muted, warm golden/amber tones (for warnings)
      yellow: {
        50: "#FDFBF5",
        100: "#FAF5E6",
        200: "#F2E7C7",
        300: "#E6D5A3",
        400: "#D4BE7A",
        500: "#BFA757",
        600: "#A08C45",
        700: "#7F6F38",
        800: "#5E532C",
        900: "#3D3720",
      },

      // Orange - muted, warm terracotta/rust tones
      orange: {
        10: "#FDF7F3",
        50: "#FCF5F0",
        100: "#F7E8DD",
        200: "#EDD0BC",
        300: "#DEB396",
        400: "#CC9570",
        500: "#B87A52",
        600: "#996342",
        700: "#7A4F35",
        800: "#5C3C29",
        900: "#3D291D",
        light: "#CC9570",
        DEFAULT: "#B87A52",
        dark: "#996342",
      },

      // Pink - muted, warm dusty rose tones
      pink: {
        10: "#FDF6F7",
        50: "#FBF2F4",
        100: "#F5E0E4",
        200: "#E9C5CC",
        300: "#D9A5B0",
        400: "#C68594",
        500: "#AD6B7A",
        600: "#8F5664",
        700: "#714550",
        800: "#54353D",
        900: "#38252A",
        DEFAULT: "#AD6B7A",
        dark: "#8F5664",
      },

      // Purple - muted, warm mauve/plum tones
      purple: {
        10: "#F8F6F9",
        50: "#F5F3F7",
        100: "#E8E3ED",
        200: "#D1C7DB",
        300: "#B5A7C4",
        400: "#9888AB",
        500: "#7C6B91",
        600: "#655776",
        700: "#50455D",
        800: "#3C3445",
        900: "#28232E",
        DEFAULT: "#7C6B91",
      },

      // Teal - muted, warm sea-green tones
      teal: {
        10: "#F3F7F7",
        50: "#F0F6F5",
        100: "#DCE9E7",
        200: "#B8D3CF",
        300: "#94BBB5",
        400: "#70A29A",
        500: "#5A8A82",
        600: "#4A726B",
        700: "#3D5C56",
        800: "#314842",
        900: "#25352F",
        DEFAULT: "#5A8A82",
      },

      // Indigo - muted, warm purple-blue tones
      indigo: {
        50: "#F4F4F8",
        100: "#E4E4ED",
        200: "#C9C9DB",
        300: "#ABABC4",
        400: "#8D8DAD",
        500: "#727294",
        600: "#5C5C78",
        700: "#48485E",
        800: "#353546",
        900: "#24242F",
      },

      // Amber - warm golden tones (alias for yellow in some contexts)
      amber: {
        50: "#FDFBF5",
        100: "#FAF5E6",
        200: "#F2E7C7",
        300: "#E6D5A3",
        400: "#D4BE7A",
        500: "#BFA757",
        600: "#A08C45",
        700: "#7F6F38",
        800: "#5E532C",
        900: "#3D3720",
      },

      // ============================================
      // COMMUNICATIONS PALETTE (Stankowski-style)
      // For marketing, campaigns, whitepapers only.
      // NOT for product UI.
      // ============================================

      // Vibrant magenta - communications only
      "comms-magenta": {
        light: "#F472B6",
        DEFAULT: "#EC4899",
        dark: "#DB2777",
      },

      // Vibrant cyan - communications only
      "comms-cyan": {
        light: "#67E8F9",
        DEFAULT: "#22D3EE",
        dark: "#06B6D4",
      },

      // Vibrant green - communications only
      "comms-green": {
        light: "#86EFAC",
        DEFAULT: "#22C55E",
        dark: "#16A34A",
      },

      // Vibrant violet - communications only
      "comms-violet": {
        light: "#C4B5FD",
        DEFAULT: "#8B5CF6",
        dark: "#7C3AED",
      },

      // Vibrant amber - communications only
      "comms-amber": {
        light: "#FDE68A",
        DEFAULT: "#F59E0B",
        dark: "#D97706",
      },
    },

    extend: {
      // Brand typeface
      fontFamily: {
        brand: ["'Circular'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        sans: ["'Circular'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },

      // Typography from marketing
      fontWeight: {
        thin: "200",
        light: "300",
        regular: "400",
        semibold: "500",
        bold: "600",
      },

      letterSpacing: {
        tightest: "-.072em",
        tighter: "-.048em",
        tight: "-.032em",
        normal: "0",
        wide: ".025em",
        wider: ".05em",
        widest: ".25em",
      },

      // Typography plugin customization from product
      typography: {
        DEFAULT: {
          css: {
            h1: { marginTop: 0 },
            h2: { marginTop: 0, marginBottom: "12px" },
            h3: { marginTop: 0, marginBottom: "12px" },
            strong: { fontWeight: "500" },
            ul: { marginTop: "0", marginBottom: "12px" },
            li: { marginTop: "0", marginBottom: "4px" },
            "li > p": { marginTop: "0", marginBottom: "0" },
          },
        },
      },

      // Animations from product
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateX(2rem)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(1rem)" },
        },
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "pulse-slow": "pulse 5s ease infinite",
        "fade-in": "fade-in 0.5s ease-in-out",
        "fade-out": "fade-out 0.5s ease-in-out",
        fade: "fade 0.5s ease-in-out",
      },

      // Layout from product
      height: {
        128: "32rem",
      },
      maxWidth: {
        "8xl": "1536px",
      },
      borderWidth: {
        1: "1px",
      },
      gridTemplateColumns: {
        campaignForm: "minmax(0, 1fr) 352px",
        optionsAndDetail: "360px minmax(0, 1fr)",
        flexibleLeftColumn: "max-content 1fr",
      },

      // Extended screens from marketing
      screens: {
        "3xl": "1880px",
      },

      // Font sizes from product
      fontSize: {
        xxs: "0.5rem",
        sm: "13px",
      },

      // Box shadows from product
      // Angular gradients - NEVER use radial gradients
      backgroundImage: {
        "gradient-45": "linear-gradient(45deg, var(--tw-gradient-stops))",
        "gradient-90": "linear-gradient(90deg, var(--tw-gradient-stops))",
        "gradient-135": "linear-gradient(135deg, var(--tw-gradient-stops))",
        "gradient-180": "linear-gradient(180deg, var(--tw-gradient-stops))",
        "gradient-225": "linear-gradient(225deg, var(--tw-gradient-stops))",
        "gradient-270": "linear-gradient(270deg, var(--tw-gradient-stops))",
        "gradient-315": "linear-gradient(315deg, var(--tw-gradient-stops))",
      },

      boxShadow: {
        "ai-action":
          "-2px -2px 4px rgba(167, 51, 255, 0.1), 2px 2px 8px rgba(51, 153, 255, 0.1)",
      },
    },
  },

  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],

  darkMode: "class",
};
