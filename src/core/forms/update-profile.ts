import { z } from 'zod';

export const profileFormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  avatar: z.instanceof(File).optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;