"use client";
import Form from "next/form";
import {LoginAction} from "../../action/auth-action";
export function LoginForm() {
    return (
        <>
            <Form action={LoginAction}>
                <input name={"username"} type="text" placeholder={"Enter username or email"}/>
                <input name={"password"} type="password" placeholder={"Enter password"}/>
                <button type={"submit"}>Login</button>
            </Form>
        </>
    )
}