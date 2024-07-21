'use server'

import {z} from 'zod';
import {revalidatePath} from 'next/cache'
import {signIn} from '@/auth';
import {AuthError} from 'next-auth';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';


export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn(`credentials`, formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch(error.type) {
                case `CredentialsSignin`:
                    return `Invalid Credentials`
                default:
                    return `Something went wrong`
            }
        }
        throw error
    }
}

const UserFormSchema = z.object({
    userName:z.string(),
    userEmail:z.string(),
    userPassword:z.string(),
})

const CustomerFormSchema = z.object({
    customerName:z.string(),
    customerEmail:z.string(),
    customerImage_url:z.string(),
})


const CreateCustomer = CustomerFormSchema.omit({ customerImage_url:true})





export async function create(formData:FormData) {
    const {userName,userEmail, userPassword} = UserFormSchema.parse({
        userName:formData.get("full-name"),
        userEmail: formData.get("email"),
        userPassword:formData.get("password"),
    });
    const hashedPassword = await bcrypt.hash(userPassword, 10);
    const {customerName,customerEmail} = CreateCustomer.parse({
        customerName:formData.get("full-name"),
        customerEmail: formData.get("email"),
        
    });

   

    await sql`
    INSERT INTO users (name, email, password)
    VALUES (${userName}, ${userEmail}, ${hashedPassword})
  `;
  await sql`
  INSERT INTO customers (name, email, image_url)
  VALUES (${customerName},${"newEmail@google.com"},${"image"})
`;

revalidatePath(`/dashboard/create`)
redirect(`/dashboard`)

}