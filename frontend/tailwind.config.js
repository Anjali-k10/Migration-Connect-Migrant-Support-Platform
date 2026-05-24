/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "system-ui", "sans-serif"]
      },
      colors: {
        brand: {
          50: "#ecfdf8",
          100: "#d1faf0",
          200: "#a7f3e1",
          300: "#6ee7cb",
          400: "#34d3b0",
          500: "#14b89a",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a"
        },
        accent: {
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706"
        }
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(15, 118, 110, 0.12)",
        glow: "0 0 40px -8px rgba(20, 184, 154, 0.45)",
        card: "0 8px 30px -12px rgba(15, 23, 42, 0.15)"
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(20, 184, 154, 0.25), transparent), radial-gradient(ellipse 60% 50% at 100% 0%, rgba(245, 158, 11, 0.12), transparent)",
        "mesh-light":
          "linear-gradient(135deg, #ecfdf8 0%, #f8fafc 40%, #fff7ed 100%)",
        "mesh-dark":
          "linear-gradient(135deg, #0f172a 0%, #134e4a 50%, #1e293b 100%)"
      },
      animation: {
        shimmer: "shimmer 1.8s infinite",
        float: "float 6s ease-in-out infinite"
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" }
        }
      }
    }
  },
  plugins: []
};
