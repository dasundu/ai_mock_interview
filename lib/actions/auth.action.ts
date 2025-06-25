'use server';

import {db , auth} from "@/firebase/admin";
import {cookies} from "next/headers";

const ONE_WEEK = 60*60*24*7;

export async function signUp(params: SignUpParams) {
    const { uid, name, email } = params;

    try {
        // check if user exists in db
        const userRecord = await db.collection("users").doc(uid).get();
        if (userRecord.exists)
            return {
                success: false,
                message: "User already exists. Please sign in.",
            };

        // save user to db
        await db.collection("users").doc(uid).set({
            name,
            email,

        });

        return {
            success: true,
            message: "Account created successfully. Please sign in.",
        };
    } catch (e: any) {
        console.error("Error creating user:", e);

        // Handle Firebase specific errors
        if (e.code === "auth/email-already-exists") {
            return {
                success: false,
                message: "This email is already in use",
            };
        }

        return {
            success: false,
            message: "Failed to create account. Please try again.",
        };
    }
}

export async function signIn(params: SignInParams){
    const { email, idToken } = params;

    try{
        const userRecord = await auth.getUserByEmail(email);

        if (!userRecord)
            return {
                success: false,
                message: 'User does not exists. Create an account'
            }


        await setSessionCookie(idToken);

    }catch (e){
        console.error(e);

        return{
            success: false,
            message: 'Failed to log into accoount.'
        }
    }
}

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();

    // Create session cookie
    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: ONE_WEEK * 1000, // milliseconds
    });

    // Set cookie in the browser
    cookieStore.set("session", sessionCookie, {
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
    });
}