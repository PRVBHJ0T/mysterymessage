import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dBConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { send } from "process";


export async function POST(request:Request){
    await dbConnect();
    try {
        const{username, email,password}= await request.json()
        const existingUserVerifiedByUsername =await UserModel.findOne({
            username,
            isVerified: true
        })

        if(existingUserVerifiedByUsername){
            return Response.json({
                success:false,
                message:"Username is already taken"
            },{status:400})
        }

        const existingUserbyEmail= await UserModel.findOne({email})
        const verifyCode= Math.floor(100000 + Math.random()*900000).toString()

        if(existingUserbyEmail){
            true//TODO: BACK HERE
        }else{
           const hashedPassword= await bcrypt.hash(password,10)
           const expiryDate = new Date();
           expiryDate.setHours(expiryDate.getHours()+1)

           const newUser =new UserModel({
            username,
            email,
            password:hashedPassword,
            verifyCode,
            verifyCodeExpiry:expiryDate,
            isVerified:false,
            isAcceptingMessage: true,
            messages: []
           })

           await newUser.save();
        }

        //send verify email
        const emailResponse =await sendVerificationEmail(email,username,verifyCode)
        if(!emailResponse.success){
            return Response.json({
                success:false,
                message:emailResponse.message
            },{status:500})

        }

    } catch (error) {
        console.error("Error registering user ", error)
         
        return Response.json({
            success: false,
            message: "Error registering user"
        
        })
    }
}