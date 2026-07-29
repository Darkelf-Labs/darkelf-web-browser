import nextVitals from "eslint-config-next/core-web-vitals";

export default [
  ...nextVitals,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },

    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
];
