import { z } from "zod";

export const MessageValidator = z.object({
  name: z.string(),
  email: z.string(),
  text: z.string(),
});

export type CreateMessagePayload = z.infer<typeof MessageValidator>;
