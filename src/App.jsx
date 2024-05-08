import React from 'react';
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from './pages/login/login';
import ContentRouter from "./components/content_router";

const App = () => {
    console.log("Getting auth")
    const auth = getAuth();
    console.log("Got auth")
    const [user, loading, error] = useAuthState(auth);
    console.log("Got state")

    if (error) return <div>Error: {error.message}</div>;
    if (loading) return <div>Loading...</div>;
    if (!user) return <Login />;

    return <ContentRouter />;
};

export default App;
