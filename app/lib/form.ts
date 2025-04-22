import { z } from "zod";

// Common password validation schema for reuse
const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number" });

// Reusable phone validation
const phoneSchema = z
  .string()
  .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" });

export const SignupFormSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phone: phoneSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const SigninFormSchema = z.object({
  phone: phoneSchema,
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().default(false).optional(),
});

export const resetPasswordFormSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export const profileFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .regex(/^[a-zA-Z\s]+$/, "Name should only contain letters and spaces"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  number: phoneSchema.or(z.string().min(1, "Phone number is required")),
  address: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
});
