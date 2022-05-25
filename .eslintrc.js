module.exports = {
  root: true,
  ignorePatterns: [
    'node_modules/**/*',
    '*.json',
    '**/*.d.ts',
  ],
  extends: [
    'airbnb',
    'jest-enzyme',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:yaml/recommended',
  ],
  parser: '@babel/eslint-parser',

  parserOptions: {
    // "requireConfigFile": false,
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    tsconfigRootDir: __dirname,
    babelOptions: {
      configFile: `${__dirname}/.babelrc`,
    },
  },
  plugins: [
    '@babel',
    'import',
    'react',
    'yaml',
    'jest',
    'jsx-a11y',
    'react-hooks',
    'organize-imports',
  ],
  settings: {
    'import/ignore': ['node_modules', '.json', '.d.ts'],
    react: {
      version: '17.0.2',
    },
    'import/resolver': {
      alias: {
        extensions: ['.js', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        // use a glob pattern
        project: 'tsconfig.json',
      },
    },
  },
  globals: {
    window: true,
    document: true,
    JSX: true,
  },

  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'comma-dangle': [2, 'always-multiline'],
    'react/prop-types': 'off',

    // TODO: revise all disabled jsx-a11y rules
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-tabindex': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',

    'arrow-body-style': 'off',
    'array-callback-return': 'off',
    'function-paren-newline': 'off',
    'linebreak-style': 'off',
    'multiline-ternary': 'off',
    'import/order': 'off',
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'no-prototype-builtins': 'off',
    'object-curly-newline': 'off',
    'prefer-promise-reject-errors': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-wrap-multilines': 'off',
    'import/prefer-default-export': 'off',
    'react/function-component-definition': 'off',
    'react/state-in-constructor': 'off',
    'react/sort-comp': 'off',
    indent: 'off',

    'no-console': 'error',
    'no-alert': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'no-trailing-spaces': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],

    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    semi: ['error', 'always'],
    curly: ['error', 'all'],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 }],
    quotes: [
      'error',
      'single',
      { allowTemplateLiterals: true, avoidEscape: true },
    ],
    'no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true },
    ],
    'operator-linebreak': [
      'error',
      'after',
      { overrides: { '?': 'before', ':': 'before' } },
    ],

    'react/static-property-placement': [
      'error',
      'property assignment',
      {
        childContextTypes: 'static getter',
        contextTypes: 'static public field',
        contextType: 'static public field',
        displayName: 'static public field',
        propTypes: 'static public field',
        defaultProps: 'static public field',
      },
    ],
    'organize-imports/organize-imports': [
      'error',
      {
        orderRules: [
          {
            moduleType: 'nodeModule',
            comment: 'vendor modules',
          },
          {
            moduleType: 'utilityModule',
            comment: 'utils',
            // "include": ["**/constants", "**/store", "**/utils", "**/helpers"]
            include: ['**/*'],
            exclude: [
              '**/components',
              '**/ui',
              '**/packages/app-config',
              '**/packages/app-core',
            ],
          },
          {
            moduleType: 'componentModule',
            comment: 'components',
            include: ['**/components'],
          },
          {
            moduleType: 'uiModule',
            comment: 'ui',
            include: ['**/ui'],
          },
        ],
      },
    ],

    // "import/no-unresolved": "off",
    // "import/no-duplicates": "off",
    // "import/no-named-as-default": "off",
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: true,
      },
    ],
    // "jsx-quotes": ["error", "prefer-double"],
    // "react/forbid-prop-types": "off",
    // "react/no-danger": "off",
    // "react/require-default-props": "off",
    // "react/no-array-index-key": "off",
    // "no-use-before-define": 0,
    // "global-require": 0,
    // "no-useless-escape": "off",
    // "spaced-comment": "error",
    // "eol-last": ["error", "always"],
    // "guard-for-in": "error",
    // "no-unused-labels": "error",
    // "no-caller": "error",
    // "no-bitwise": "error",
    // "no-new-wrappers": "error",
    // "no-eval": "error",
    // "dot-notation": "error",
    // "default-case": "error",
    // "eqeqeq": "error"
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      extends: [
        'prettier',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:yaml/recommended',
      ],

      plugins: ['@typescript-eslint', 'simple-import-sort'],
      rules: {
        '@typescript-eslint/triple-slash-reference': 'off',
        'jsx-a11y/alt-text': ['warn', { elements: ['img'] }], // Don't force alt for <Image/>
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/explicit-module-boundary-types': ['error'],
        'react/prop-types': 'off',
        'react/require-default-props': 'off', // https://www.reddit.com/r/typescript/comments/k7txwc/type_undefined_cannot_be_used_as_an_index_type/
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            vars: 'all',
            args: 'after-used',
            ignoreRestSiblings: false,
          },
        ],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': [
          'error',
          { variables: false },
        ],
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': [
          'error',
          { ignoreDeclarationMerge: true },
        ],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],

        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              [
                // Packages. `react` related packages come first.
                '^react',
                // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
                '^@?\\w',
              ],
              ['.*(/store)(/.*|$)'],
              ['.*(/hooks|/components)(/.*|$)'],
              ['.*(/utils|/services)(/.*|$)', '^\\.'],
              // Anything not matched in another group.
              ['^'],
              ['.*(/constants|/types)(/.*|$)'],
              ['.*(/ui)(/.*|$)'],
              // for scss imports.
              ['^[^.]'],
            ],
          },
        ],
      },
    },
  ],
};
