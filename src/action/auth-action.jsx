"use server";
import {signIn, signOut} from "@/auth";
import {redirect} from "next/navigation";


export async function loginAction(formData){
    const email = formData?.get('username');
    const password = formData?.get('password');
    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
    }catch (error){
        console.log("In action",  error);
    }
    redirect("/dashboard");
}


export async function LogoutAction(){
    await signOut();
    redirect("/login");
}