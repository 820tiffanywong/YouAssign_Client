import { useState } from "react";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { useQuery, } from '@apollo/client';
import { GET_USER } from '../../access/queries/get_user';
import { SignIn, SignInGoogle } from './sign_in'
import { SignUp, SignUpGoogle } from './sign_up'
import { SubTitle, Title } from "../../components/prebuilt.library";

const Login = () => {
    const [view, setView] = useState('login')
    const {data,loading,error} = useQuery(GET_USER);

    if(data){
        return (
            <div className="bg-graph h-screen">
                <div className="z-50 w-full h-full md:w-4/12 p-6 bg-gray-300">
                    <Title>
                        YouAssign
                    </Title>
                    <SubTitle>
                        A career progression application
                    </SubTitle>
                    
                    <div className="my-2 rounded-lg p-2">
                        <div className="bg-gray-700 rounded flex">
                            <button 
                                className={`rounded-tl rounded-bl w-1/2 py-2 transition-all ${(view ==="login" ? ' bg-gray-100':' bg-gray-400 text-gray-100')}`} 
                                onClick={() => setView("login")}
                            >log-in</button>
                            <button 
                                className={`rounded-tr rounded-br w-1/2 py-2 transition-all ${(view ==="signup" ? ' bg-gray-100':' bg-gray-400 text-gray-100')}`} 
                                onClick={() => setView("signup")}
                            >sign-up</button>
                        </div>
                        <SubTitle className={`text-center`}>
                            {view ==="login" ? ' sign into your account':' don\'t have an account?'}
                        </SubTitle>
                        {
                            view ==="login" ?(
                                <SignIn currentUsers={data.users} />
                            ):(
                                <SignUp currentUsers={data.users}/>
                            )
                        }
                        <SignUpGoogle currentUsers={data.users}/>
                    </div>
                </div>
                
            </div>
        )
    }
}
export default Login;