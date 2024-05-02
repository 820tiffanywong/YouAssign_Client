import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


import { useRecoilState } from "recoil";
import { loginState } from '../../atoms'
import { Icon } from '@iconify/react';
import { LabeledInput } from "../../components/prebuilt.library";


const styles = {
    "optionMenu":"py-2 rounded bg-gray-700 my-2 shadow-2xl",
    "inputButton":"flex flex-col justify-between my-2 mx-auto bg-gray-600 rounded px-2 py-1 w-10/12 ",
    "submitButton":"text-gray-200 border-b-2 bg-gray-800 p-2 rounded shadow text-center m-auto block"
}

export const SignIn = ({currentUsers}) => {
    const auth = getAuth();

    const [email,setEmail] = useState("")
    const [pwd,setPwd] = useState("")

    return (
        <div className={`p-6 bg-gray-400 rounded [&>*]:my-2`}>
            <LabeledInput
                type='email' 
                placeholder="email.." 
                value={email}
                className="bg-gray-300 dark:bg-gray-700 text-gray-600"
                onChange={(event) => setEmail(event.target.value)}
            >
                email
            </LabeledInput>
            <LabeledInput
                type='password' 
                placeholder="password.." 
                value={pwd}
                className="bg-gray-300 dark:bg-gray-700 text-gray-600"
                onChange={(event) => setPwd(event.target.value)}
            >
                password
            </LabeledInput>

            <button className={`rounded mx-auto border-b bg-gray-500 text-gray-200 px-6 py-2 block my-2`} onClick={() => {
                if(email.length === 0){
                    alert("enter a valid email")
                    return
                }
                else if(pwd.length === 0){
                    alert("enter a valid password")
                    return
                }


                let seek = false;
                currentUsers.map((user) => {
                    if(user.email === email){
                        seek = true;
                    }
                })
                if(!seek){
                    alert('no account found with the given credentials. please create an account')
                    return false
                }
                else{
                    signInWithEmailAndPassword(auth, email, pwd)
                    .then((userCredential) => {
                        const user = userCredential.user;
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log("error logging in")
                    });
                }
            }}>sign-in</button>
            
            <button className="cursor-not-allowed mx-auto block my-2 border-t w- full text-blue-500 underline">
                forgot password?
            </button>
        </div>
    )
}
