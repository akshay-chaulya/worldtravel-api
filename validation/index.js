import z from "zod";

export const signupInputsValidate = z.object({
  firstName: z.string().max(50).trim(),
  lastName: z.string().max(50).trim(),
  email: z.string().email().toLowerCase().min(3),
  password: z.string().trim().min(6),
});

export const loginInputsValidate = z.object({
  email: z.string().email().min(3),
  password: z.string().min(6),
});

export const citiesInputsValidate = z.object({
  cityName: z.string().trim(),
  countryName: z.string().trim(),
  position: z.object({
    lat: z.string(),
    lng: z.string(),
  }), // z.object() for nested object schema
  emoji: z.string().trim(),
  visitDate: z.string(),
  description: z.string().optional(),
});

export const userMessageInputsValidate = z.object({
  name: z.string().trim(),
  email: z.string().email(),
  message: z.string(),
});
