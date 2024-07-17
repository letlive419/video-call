'use server'

import {z} from 'zod';
// import {sql} from '@vercel/postgres';
import {revalidatePath} from 'next/cache'
// import {signIn} from '/auth';
// import {AuthError} from 'next-auth';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';


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

export async function authenticate (
    prevState: string | undefined,
    formData: FormData,
) {
    return console.log(formData)
}



export async function create(formData:FormData) {
    const {userName,userEmail, userPassword} = UserFormSchema.parse({
        userName:formData.get("full-name"),
        userEmail: formData.get("email"),
        userPassword:formData.get("password"),
    });
    const {customerName,customerEmail} = CreateCustomer.parse({
        customerName:formData.get("full-name"),
        customerEmail: formData.get("email"),
        
    });

    await sql`
    INSERT INTO users (name, email, password)
    VALUES (${userName}, ${userEmail}, ${userPassword})
  `;
  await sql`
  INSERT INTO customers (name, email, image_url)
  VALUES (${customerName},${"newEmail@google.com"},${"image"})
`;

revalidatePath(`/dashboard/create`)
redirect(`/dashboard`)

}