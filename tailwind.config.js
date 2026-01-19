/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
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

      // Colors - merged from both codebases
      colors: {
        // Utility colors
        dye: "#CCFF00",
        "dye-2": "#00FFDD",

        // Rule/border color - using product's lighter variant
        "rule-color": "#EDEEEC",

        // Active states
        "active-blue": "#181EB7",
        "active-color": "#F85456",
        yellow: "#8F8871",

        // Body text - using marketing's hex values (cleaner for general use)
        "body-text": {
          lightest: "#64748b",
          lighter: "#667177",
          light: "#334155",
          DEFAULT: "#262A33",
        },

        // Light body text - from marketing (for dark backgrounds)
        "light-body-text": {
          lightest: "rgba(227, 235, 230, 0.8)",
          lighter: "rgba(227, 235, 230, 0.65)",
          light: "rgba(227, 235, 230, 0.5)",
          DEFAULT: "#E3EBE6",
        },

        // Background - using marketing's transparency-based approach + #f7f7f7
        "pavlov-bg": {
          lightest: "rgba(255, 255, 255, 0.4)",
          lighter: "rgba(255, 255, 255, 0.6)",
          light: "rgba(255, 255, 255, 0.8)",
          DEFAULT: "#f7f7f7",
          dark: "rgba(0, 0, 0, 0.04)",
          darker: "rgba(0, 0, 0, 0.08)",
          darkest: "#040505",
        },

        // Slate scale from product
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

        // Grey scale from product
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

        // Semantic colors from product
        red: {
          10: "#FFECE8",
          lightest: "#FFEBE6",
          lighter: "#FFBDAD",
          light: "#FF8F73",
          DEFAULT: "#FF6B6B",
          dark: "#FF5630",
          darker: "#E82C19",
          darkest: "#BF2600",
        },
        blue: {
          10: "#EBF0F8",
          lightest: "#DEEBFF",
          lighter: "#B3D4FF",
          light: "#4C9AFF",
          DEFAULT: "#3797CE",
          dark: "#0065FF",
          darker: "#0052CC",
          darkest: "#0747A6",
        },
        orange: {
          10: "#FFFAED",
          light: "#FFB365",
          DEFAULT: "#FFA724",
          dark: "#FFA24C",
        },
        pink: {
          10: "#FFC2FC",
          DEFAULT: "#FC54F5",
          dark: "#FE80B2",
        },
        green: {
          10: "#E5F7EE",
          DEFAULT: "#00B558",
          darker: "#00A053",
        },
        purple: {
          10: "#F7F4FE",
          DEFAULT: "#A79A6D",
        },
        teal: {
          10: "#E9F6F8",
          DEFAULT: "#2AACBB",
        },
      },

      // Font sizes from product
      fontSize: {
        xxs: "0.5rem",
        sm: "13px",
      },

      // Box shadows from product
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
