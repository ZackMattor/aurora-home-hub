module.exports = {
  "env": {
    "node": true,
    "commonjs": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "no-console": [ "error",{ allow: ["log", "warn", "error"] }],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "dot-notation": [
      "error"
    ],
    "eqeqeq": [
      "error",
      "always"
    ],
    "no-else-return": [
      "error"
    ],
    "no-useless-return": [
      "error"
    ],
    "no-unused-expressions": [
      "error"
    ],
    "no-undefined": [
      "error"
    ],
    "lines-between-class-members": [
      "error",
      "always"
    ],
    "no-multiple-empty-lines": [
      "error"
    ],
    "spaced-comment": [
      "error",
      "always"
    ],
    "keyword-spacing": [
      "error",
      {"overrides": {
        "if": {"after": false},
        "switch": {"after": false},
        "for": {"after": false},
        "while": {"after": false}}}
    ]
  }
};
