/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  //Tells tailwind to use the class attribute instead of the data attribute for dark mode (See Providers > ThemeProvider)
  darkMode: "class",
  theme: {
    screens: {
      mobile: "375px",
      desktop: "1440px",
    },
    extend: {
      colors: {
        "bright-blue": "#3a7bfd",

        // Light Theme
        "light-vl-gray": "#fafafa",
        "light-vl-grayish-blue": "#e4e5f1",
        "light-l-grayish-blue": "#d2d3db",
        "light-d-grayish-blue": "#9394a5",
        "light-vd-grayish-blue": "#484b6a",

        // Dark Theme
        "dark-vd-blue": "#161722",
        "dark-vd-desaturated-blue": "#25273c",
        "dark-l-grayish-blue": "#cacde8",
        "dark-l-grayish-blue-hover": "#e4e5f1",
        "dark-d-grayish-blue": "#777a92",
        "dark-vd-grayish-blue": "#4d5066",
        "dark-vd-grayish-blue-2": "#393a4c",
      },
    },
  },
  plugins: [],
};
