import { file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const experienceSchema = z.object({
  id: z.number(),
  position: z.string(),
  company: z.string(),
  companyLogo: z.string(),
  companyColor: z.string().optional(),
  location: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  description: z.array(z.string()),
  technologies: z.array(z.string()),
  type: z.string(),
});

const projectsSchema = z.object({
  id: z.number(),
  title: z.string(),
  name: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  description: z.array(z.string()),
  technologies: z.array(z.string()),
  githubUrl: z.string().optional(),
  videosUrl: z.array(z.object({
    mp4: z.string(),
    webm: z.string()
  })).optional(),
  imagesUrl: z.array(z.string()).optional(),
})

const educationSchema = z.object({
  id: z.number(),
  title: z.string(),
  institution: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  description: z.array(z.string()).optional(),
})

const experienceEs = defineCollection({
  loader: file("src/content/experience-es.json"),
  schema: experienceSchema,
});

const experienceEn = defineCollection({
  loader: file("src/content/experience-en.json"),
  schema: experienceSchema,
});

export const projectsEs = defineCollection({
  loader: file("src/content/projects-es.json"),
  schema: projectsSchema,
});

export const projectsEn = defineCollection({
  loader: file("src/content/projects-en.json"),
  schema: projectsSchema,
});

export const educationEs = defineCollection({
  loader: file("src/content/education-es.json"),
  schema: educationSchema,
});

export const educationEn = defineCollection({
  loader: file("src/content/education-en.json"),
  schema: educationSchema,
});

export const collections = {
  'experience-es': experienceEs,
  'experience-en': experienceEn,
  'projects-es': projectsEs,
  'projects-en': projectsEn,
  'education-es': educationEs,
  'education-en': educationEn,
};