import { auth } from "../auth"; // adjust path as needed

export async function getAuthToken() {
    const session = await auth();
    return session?.user.token?.user?.payload?.token ?? null;
}








// {
//     token: {
//         token: { sub: '70eb0d96-3027-44ee-9a18-cc364a82fbca' },
//         user: {
//             message: 'Login successful',
//                 status: 'OK',
//                 payload: [Object],
//                 time: '2025-04-19T18:51:59.346009',
//                 id: '70eb0d96-3027-44ee-9a18-cc364a82fbca'
//         },
//         account: {
//             providerAccountId: '70eb0d96-3027-44ee-9a18-cc364a82fbca',
//                 type: 'credentials',
//                 provider: 'credentials'
//         },
//         isNewUser: false,
//             trigger: 'signIn',
//             iat: 1745063519,
//             exp: 1747655519,
//             jti: 'd1477221-77dc-4c77-9781-6cfcb09990b3'
//     }
// }

