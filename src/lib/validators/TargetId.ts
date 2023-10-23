import { z } from "zod";

export const TargetIdValidator = z.object({
  targetId: z.string(),
});
