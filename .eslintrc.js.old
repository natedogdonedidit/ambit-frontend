module.exports = {
  root: true,
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react"
  ],
  "rules": {
    "react/no-array-index-key": 0,
    "import/no-extraneous-dependencies": "off",
    "react/prop-types": 0,
    "no-console": "off",
    "no-use-before-define": ["error", { "functions": true, "classes": true, "variables": false }], // disable the rule for variables, but enable it for functions and classes
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    ],
    "prettier/prettier": [
      "error",
      {
        "trailingComma": "es5",
        "singleQuote": true,
        "printWidth": 130
      }
    ]
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["src"]
      }
    }
  },
  "plugins": [
    "prettier"
  ],
};
