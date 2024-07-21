import React from "react";
import Bar from "../ui/bar";
import { fetchCustomers } from "../lib/data";
import { string } from "zod";


export default function DashBoard() {

    return(
        <main>
            <div>
            <Bar/>
            <a href="/dashboard/create">+ Add User </a>
            <Customers/>
            
            
              </div>
        </main>
    )
}



async function Customers(){
    const people = await fetchCustomers();
    

    return( 
    
        <div>
        <ul role="list" className="divide-y divide-gray-100">
        {people.map((person) => (
          <li key={person.name} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.image_url} alt="" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-white-900">{person.name}</p>
                <button>Call</button>
                
              </div>
            </div>
          </li>
        ))}
      </ul>
      </div>
    )
}