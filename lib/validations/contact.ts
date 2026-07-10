import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(3, "Nama lengkap minimal 3 karakter")
    .max(100, "Nama lengkap maksimal 100 karakter"),
  email: z
    .string()
    .min(1, "Alamat email wajib diisi")
    .email("Format email tidak valid"),
  contact: z
    .string()
    .min(1, "Nomor telepon wajib diisi")
    .regex(/^(\+62|62|0)8[0-9]{8,12}$/, "Contoh: +62812 7777 1111"),
  country: z
    .string()
    .min(2, "Kota wajib diisi")
    .max(50, "Kota maksimal 50 karakter"),
  message: z.string().max(1000, "Pesan maksimal 1000 karakter").optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
