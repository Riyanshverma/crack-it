import { z } from "zod";

const userSignUpSchema = z.object({
    first_name: z.string().min(3, "First name must be at least 3 characters long"),
    last_name: z
        .string()
        .min(3, "Last name must be at least 3 characters long"),
    email: z.email("Invalid email address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .regex(
            /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).*$/,
            "Password must contain at least one uppercase letter, one number, and one special character"
        ),
})

export type userSignUpType = z.infer<typeof userSignUpSchema>

export { userSignUpSchema }