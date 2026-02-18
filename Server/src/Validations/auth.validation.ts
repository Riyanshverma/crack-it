import { z } from "zod";

const userSignUpSchema = z.object({
    
})

export type userSignUpType = z.infer<typeof userSignUpSchema>

export { userSignUpSchema }