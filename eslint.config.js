import {configs as lit} from 'eslint-plugin-lit';
import {default as litA11y} from 'eslint-plugin-lit-a11y';
import {configs as wc} from 'eslint-plugin-wc';
import {configs as tseslint} from 'typescript-eslint';

const fileTypes = '{js,ts,mjs}';

//
// ──────────────────────────────────────────────────────────────
// eslint-plugin-lit-a11y
// ──────────────────────────────────────────────────────────────
//
// @ts-expect-error
const litA11yFilesConfig = [litA11y.configs.recommended].map((conf) => ({
  ...conf,
  files: [`**/*.${fileTypes}`],
}));

const litA11yFilesRules = {
  files: [`**/*.${fileTypes}`],
  rules: {
    'lit-a11y/no-autofocus': 'warn',
    'lit-a11y/anchor-is-valid': 'off',
    'lit-a11y/click-events-have-key-events': 'off',
  },
};

//
// ──────────────────────────────────────────────────────────────
// eslint-plugin-wc
// ──────────────────────────────────────────────────────────────
//
const wcFilesConfig = [wc['flat/recommended']].map((conf) => ({
  ...conf,
  files: [`**/*.${fileTypes}`],
}));

const wcFilesRules = {
  files: [`**/*.${fileTypes}`],
  rules: {
    'wc/no-constructor-attributes': 'warn',
  },
};

//
// ──────────────────────────────────────────────────────────────
// eslint-plugin-lit
// ──────────────────────────────────────────────────────────────
//
const litFilesConfig = [lit['flat/recommended']].map((conf) => ({
  ...conf,
  files: [`**/*.${fileTypes}`],
}));

const litFilesRules = {
  files: [`**/*.${fileTypes}`],
  rules: {
    'lit/lifecycle-super': 'error',
    'lit/no-native-attributes': 'off',
    'lit/no-useless-template-literals': 'off',
    'lit/binding-positions': 'off',
    'lit/no-invalid-html': 'off',
  },
};

//
// ──────────────────────────────────────────────────────────────
// typescript-eslint
// ──────────────────────────────────────────────────────────────
//
const tsFilesConfig = [...tseslint.strict, ...tseslint.stylistic].map((conf) => ({
  ...conf,
  files: ['**/*.ts'],
  // @ts-expect-error
  ...(conf.languageOptions && {
    languageOptions: {
      // @ts-expect-error
      ...conf.languageOptions,
      parserOptions: {
        // @ts-expect-error
        ...conf.languageOptions.parserOptions,
        projectService: {
          allowDefaultProject: [
            `test/*.${fileTypes}`,
            `*.config.${fileTypes}`,
            `*.conf.${fileTypes}`,
          ],
        },
      },
    },
  }),
}));

const tsFilesRules = {
  files: ['**/*.ts'],
  rules: {
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/class-literal-property-style': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
  },
};

// eslint-config
export default [
  {
    ignores: [
      '**/.idea',
      '**/.tmp',
      '**/.vscode',
      '**/.wireit',
      '**/_site',
      '**/build',
      '**/coverage',
      '**/dev',
      '**/dist',
      '**/reports',
      '**/storybook-static',
      '**/*screenshots*',
      '**/*snapshots*',
      '**/*.config.*',
      '**/*.d.ts',
      '**/*.min.js',
      '**/*.workspace.*',
    ],
  },
  ...litA11yFilesConfig,
  litA11yFilesRules,

  ...wcFilesConfig,
  wcFilesRules,

  ...litFilesConfig,
  litFilesRules,

  ...tsFilesConfig,
  tsFilesRules,
];
