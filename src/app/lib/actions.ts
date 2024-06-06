'use server'

import {z} from 'zod';
import {sql} from '@vercel/postgres';
import {revalidatePath} from 'next/cache'
import {signIn} from '/auth';
import {AuthError} from 'next-auth';

export async function authenticate (
    prevState: string | undefined,
    formData: FormData,
) {
    console.log(formData)
}