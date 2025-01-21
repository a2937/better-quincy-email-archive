// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://freecodecamp-quincy-archive',
  integrations: [
    tailwind({
      applyBaseStyles: true,
      configFile: './tailwind.config.mjs'
    })
  ]
});
