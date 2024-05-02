import { useState } from "react";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    createUserWithEmailAndPassword 
} from 'firebase/auth' 
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../access/mutations/create_user';

import { useRecoilState } from "recoil";
import { Icon } from "@iconify/react";
import { LabeledInput, SubTitle } from "../../components/prebuilt.library";
import { CREATE_EVENT } from "../../access/mutations/create_event.mjs";


function currentDate() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    return currentDate; // "17-6-2022"
}

export const SignUpGoogle = ({currentUsers}) => {
    const [createUser] = useMutation(CREATE_USER);

    return (
        <div>
            <SubTitle className='text-center'>
                alternative sign-up methods
            </SubTitle>
            <div className="flex ">
                <div className="rounded shadow bg-gray-100 mx-auto p-2 cursor-not-allowed">
                    <Icon icon="flat-color-icons:google" width="40" height="40"/>
                </div>
                <div className="rounded shadow bg-gray-100 mx-auto p-2 cursor-not-allowed">
                    <Icon icon="logos:github-octocat" width="40" height="40"/>
                </div>
                <div className="rounded shadow bg-gray-100 mx-auto p-2 cursor-not-allowed">
                    <Icon icon="logos:apple" width="40"  height="40"/>
                </div>
            </div>
        </div>
    )
}



export const SignUp = ({currentUsers}) => {
    const auth = getAuth();
    const [createUser] = useMutation(CREATE_USER);

    const [first,setFirst] = useState("")
    const [last,setLast] = useState("")
    const [email,setEmail] = useState("")
    const [pwd,setPwd] = useState("")

    const [pwdState,setPwdState] = useState()

    const symbolSet = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    const numberSet = /[1234567890]/

    const [addEvent] = useMutation(CREATE_EVENT)


    const PasswordErrorCheck = () => {

        return (
            <div className="bg-gray-300 rounded p-2">
                <p className={`flex text-xs transition-all duration-300 [&>*]:my-auto ${pwd.length>8?'text-blue-500':'text-red-600'}`}><Icon icon={`${pwd.length>8?'material-symbols:check-circle-outline-rounded':'ph:x-circle-bold'}`} /><span>Longer than 8 characters</span></p>
                <p className={`flex text-xs transition-all duration-300 [&>*]:my-auto ${numberSet.test(pwd)?'text-blue-500':'text-red-600'}`}><Icon icon={`${numberSet.test(pwd)?'material-symbols:check-circle-outline-rounded':'ph:x-circle-bold'}`} /><span>Contains numbers</span></p>
                <p className={`flex text-xs transition-all duration-300 [&>*]:my-auto ${symbolSet.test(pwd)?'text-blue-500':'text-red-600'}`}><Icon icon={`${symbolSet.test(pwd)?'material-symbols:check-circle-outline-rounded':'ph:x-circle-bold'}`} /><span>Contains a symbol</span></p>
            </div>
        )
    }

    return (
        <div className="p-6 rounded bg-gray-400 ">
            <div className="[&>*]:my-2">
                <LabeledInput
                    placeholder="first name.." 
                    value={first}
                    className="bg-gray-300 dark:bg-gray-700 text-gray-600"
                    onChange={(event) => setFirst(event.target.value)}
                >
                    first
                </LabeledInput>

                <LabeledInput
                    placeholder="last name.." 
                    value={last}
                    className="bg-gray-300 dark:bg-gray-700 text-gray-600"
                    onChange={(event) => setLast(event.target.value)}
                >
                    last
                </LabeledInput>

                <LabeledInput
                    type='email'
                    placeholder="email" 
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
                <PasswordErrorCheck />
            </div>
            <button className={`text-gray-200 border-b-2 bg-gray-800 p-2 rounded shadow text-center m-auto block`} onClick={async() => {
                const date_joined = currentDate()
                
                if(email.length === 0){
                    alert("enter a valid email")
                    return
                }
                else if(pwd.length === 0){
                    alert("enter a valid password")
                    return
                }
                else if(pwd.length<8||!symbolSet.test(pwd)||!numberSet.test(pwd)){
                    alert("enter a valid password")
                    return
                }
                else if(first.length === 0){
                    alert("enter a valid first name")
                    return
                }
                else if(last.length === 0){
                    alert("enter a valid last name")
                    return
                }


                let seek = false;
                currentUsers.map((user) => {
                    if(user.email === email){
                        seek = true;
                    }
                })
                if(seek){
                    alert('a user already exists under that email!')
                    //spot to reset pwd
                    return false
                }
                else{
                    await createUser({ 
                        variables: {
                            input: [
                                {
                                    first: first,
                                    last: last,
                                    slug: email.split('@')[0],
                                    email: email,
                                    img:"https://via.placeholder.com/50x50",
                                    date_joined: date_joined
                                }
                            ]
                        }
                    });
                    await addEvent({
                        variables:{
                            input: [
                                {
                                    date: (new Date()).toDateString(),
                                    topic: "new_user",
                                    description: `${first} ${last} joined the team! Welcome them aboard by saying hi!`
                                } 
                            ]
                          }
                    })

                    createUserWithEmailAndPassword(auth, email, pwd)
                    .then(async(userCredential) => {
                        const auth_user = userCredential.user;
                    })
                    .catch((error) => {
                        console.log(error)
                    });
                }
            }}>create an account</button>
        </div>
    )
}
