module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "react/prop-types": "off",
    "prettier/prettier": "error",
    quotes: ["error", "double"], // Enforce double quotes, change to 'single' if desired
    "no-multiple-empty-lines": ["error", { max: 1 }], // Allow only one empty line
    "no-unused-vars": "error", // Point out unused variables
    "no-trailing-spaces": "error", // Disallow trailing spaces
    "no-console": ["error", { allow: ["warn", "error"] }],
  },
};
