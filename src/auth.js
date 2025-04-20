import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import {loginService} from "@/service/auth-service";

export const { auth , signOut, signIn } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const { email, password } = credentials;
                const res = await loginService({ email, password });
                return res;
            },
        }),
    ],
    callbacks: {
        async jwt(token) {
            return token;
        },
        async session(props) {
            const { token } = props;
            return token.token.user;
        },
    },
    strategy: "jwt",

    pages: {
        signIn: "/login",
    },
});







// {
//     "fullName": "fong",
//     "email": "son@gmail.com",
//     "password": "Son12@12"
// }