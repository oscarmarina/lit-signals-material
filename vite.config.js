import {defineConfig} from 'vite';
import copy from 'rollup-plugin-copy';
import totalBundlesize from '@blockquote/rollup-plugin-total-bundlesize';
import externalizeSourceDependencies from '@blockquote/rollup-plugin-externalize-source-dependencies';

const copyConfig = {
  targets: [
    {
      src: ['demo/*.html', 'demo/*.css'],
      dest: 'dev/',
    },
  ],
  hook: 'writeBundle',
};

const entriesDir = 'demo';
const entriesGlob = [`${entriesDir}/entry.js`];

// https://github.com/vitejs/vite/discussions/1736#discussioncomment-5126923
const entries = Object.fromEntries(
  entriesGlob.map((file) => {
    const [key] = file.match(new RegExp(`(?<=${entriesDir}\/).*`)) || [];
    return [key?.replace(/\.[^.]*$/, ''), file];
  })
);

// https://vitejs.dev/config/
// https://vite-rollup-plugins.patak.dev/

export default defineConfig({
  test: {
    onConsoleLog(log, type) {
      if (type === 'stderr' && log.includes('in dev mode')) {
        return false;
      }
    },
    include: ['test/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    browser: {
      enabled: true,
      headless: false,
      name: 'chromium',
      provider: 'playwright',
      screenshotFailures: false,
      instances: [
        {
          browser: 'chromium',
          launch: {
            devtools: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
          },
        },
      ],
    },
    coverage: {
      provider: 'v8',
      reportsDirectory: 'test/coverage/',
      reporter: ['lcov', 'json', 'text-summary', 'html'],
      enabled: true,
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 60,
        lines: 80,
      },
      include: ['**/src/**/*'],
      exclude: ['**/src/**/index.*', '**/src/styles/'],
    },
  },
  plugins: [
    externalizeSourceDependencies(['/__web-dev-server__web-socket.js']),
    copy(copyConfig),
    totalBundlesize(),
  ],
  optimizeDeps: {
    exclude: ['lit', 'lit-html'],
  },
  build: {
    target: ['chrome71'],
    outDir: 'dev',
    rollupOptions: {
      preserveEntrySignatures: 'exports-only',
      input: entries,
      output: {
        dir: 'dev/',
        entryFileNames: '[name].js',
        format: 'es',
      },
    },
  },
});
