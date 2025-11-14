// resources/js/app.tsx

import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),

  resolve: (name) =>
    resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx'),
    ).catch((error) => {
      console.error(`Page not found: ./pages/${name}.tsx`);
      console.error(error);
      throw error;
    }),

  setup({ el, App, props }) {
    const Page = App as any;
    const Layout = Page.layout || ((page: any) => page);

    createRoot(el).render(
      <StrictMode>
        {Layout(<App {...props} />)}
      </StrictMode>
    );
  },

  progress: {
    color: '#4B5563',
  },
});

// Initialize theme
initializeTheme();
