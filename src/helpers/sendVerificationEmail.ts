import {resend} from "@/lib/resend";
import VerificationEmail  from "../../emails/VerificationEmails";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
): Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'you@example.com',
            to: email,
            subject: 'Verification code ',
            react: VerificationEmail({username,otp:verifyCode})
          });
        return {
            success:true,
            message:"messege send succcesfully"
        }
        
    } catch (emailError) {
        console.error("Error sending verify email", emailError)
        return {success:false,
            message:'Failed to send verification  email'
        }
    }
}
