// Import the glob loader
import { glob } from 'astro/loaders';
// Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';
// Define a `loader` and `schema` for each collection
const email = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/email' }),
  schema: z.object({
    date: z.string(),
    linkOneText: z.string(),
    linkTwoText: z.string(),
    linkThreeText: z.string(),
    linkFourText: z.string(),
    linkFiveText: z.string(),
    quote: z.string(),
    quote_author: z.string(),
    bonus: z.string().optional()
  })
});
// Export a single `collections` object to register your collection(s)
export const collections = { email };
