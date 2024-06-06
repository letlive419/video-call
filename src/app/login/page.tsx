`use client`

import React from "react";
import SignIn from "../ui/login-form";
import Bar from "../ui/bar";

export default function login() {
    return(
        <main>
            <div>
            <Bar/>
             <SignIn />
            </div>
        </main>
    )
}