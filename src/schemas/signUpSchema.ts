import {z } from 'zod'

export const usernameValidation = z
.string()
.min(2,"Username must be atlease 2 characters")
.max(20,"20 characters max")
.regex(/^[a-zA-Z0-9_]+$/,"Username must not contain special characters")

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message:"invalid email address"}),
    password: z.string().min(6,{message:"password must be atlease 6 chars"})
})
