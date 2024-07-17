import { sql } from "@vercel/postgres";
import {unstable_noStore as noStore} from "next/cache";



export async function fetchCustomers() {
    noStore();
    try {
        const data = await sql`
        SELECT
        id,
        name,
        image_url
        FROM customers
        ORDER BY name ASC`;
        
        const customers = data.rows;
        
        return customers
    }catch(err) {
        console.error(`Database error:`, err);
        throw new Error(`Failed to fetch all customers`);
    }

}