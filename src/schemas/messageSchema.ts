import {z} from "zod"

export const messageSchema= z.object({
    content: z.string().min(10,"content must of 10 characters")
    .max(300," content must no longer than 300 chars"),    
})