import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials";
import firebase from "firebase";
import { firebaseConfig } from "../../../../firebaseConfig";

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email (Guest Credentials👇)",
          type: "email",
          value: "user@testuser.com",
          placeholder: "jsmith@gmail.com",
        },
        password: {
          label: "Password (Guest Credentials👇)",
          type: "password",
          value: "testuser",
          placeholder: "******",
        },
      },
      async authorize(credentials, req) {
        try {
          const { email, password } = credentials;
          console.log("api/auth/[...nextauth].js -guestLogin", email, password);
          const app = !firebase.apps.length
            ? firebase.initializeApp(firebaseConfig)
            : firebase.app();

          if (email === "user@testuser.com" && password === "testuser") {
            return firebase
              .auth()
              .signInWithEmailAndPassword(email, password)
              .then(({ user }) => ({ name: "testuser", ...user }));
          }
          return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(({ user }) => ({ name: email.split("@")[0], ...user }));
        } catch (err) {
          console.log(err);
          const { errorCode, errorMessage } = err;
          console.log("error", errorCode, errorMessage, err);
          return null;
        }
      },
    }),
  ],
});
