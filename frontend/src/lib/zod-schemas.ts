import { z } from "zod";

const PasswordSchema = z.string().min(6);

export const SignInDataSchema = z.object({
  username: z.string().trim(),
  password: PasswordSchema,
  rememberMe: z.boolean().default(false),
});

export const EmailSchema = z
  .string()
  .email()
  .trim()
  .transform((v) => v.toLocaleLowerCase());

export const SignUpDataSchema = SignInDataSchema.merge(
  z.object({
    name: z.string().trim(),
    email: EmailSchema,
  })
);

export const UpdateUserSchema = SignUpDataSchema.pick({
  email: true,
  name: true,
  username: true,
}).merge(
  z.object({
    avatar: z.string().optional(),
  })
);

export const ResetPasswordSchema = z.object({
  password: PasswordSchema,
  confirmPassword: PasswordSchema,
});

export const ChatTypeSchema = z.enum(["dm", "channel"]).optional();

export const MessagesPaginationCursorSchema = z
  .object({
    chatType: z.literal("dm"),
    messageId: z.string(),
    username: z.string(),
  })
  .or(
    z.object({
      chatType: z.literal("channel"),
      messageId: z.string(),
      channelName: z.string(),
    })
  );
