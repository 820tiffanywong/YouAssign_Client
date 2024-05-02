import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from './pages/login/login';
import ContentRouter from "./components/content_router";

export const App = () => {
    const auth = getAuth()
    const [user, loading, error] = useAuthState(auth);

    return (
        loading?(
            <div className="w-screen h-screen bg-gray-200 dark:bg-gray-700"></div>
        ):(
            (user)?(
                <ContentRouter />
            ):(<Login />)
        )
    )
}