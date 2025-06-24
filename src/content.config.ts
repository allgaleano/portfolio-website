import { file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const experienceSchema = z.object({
  id: z.number(),
  position: z.string(),
  company: z.string(),
  location: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  type: z.string(),
});

const experienceEs = defineCollection({
  loader: file("src/content/experience-es.json"),
  schema: experienceSchema,
});

const experienceEn = defineCollection({
  loader: file("src/content/experience-en.json"),
  schema: experienceSchema,
});

export const collections = {
  'experience-es': experienceEs,
  'experience-en': experienceEn,
};