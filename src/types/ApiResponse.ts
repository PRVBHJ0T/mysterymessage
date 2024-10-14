import { Message } from "@/model/User";


export interface ApiResponse{
    success:boolean;
    message: string;
    isAcceptingMesseges?:boolean
    messeges?: Array<Message>
}