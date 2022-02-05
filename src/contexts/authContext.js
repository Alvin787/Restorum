import React, {useState, useEffect} from 'react';
import { auth } from '../firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            // firebase done loading
            setCurrentUser(user);
            setLoading(false);
        });
    }, []);
    return (
    <AuthContext.Provider value={{currentUser}}>
        {!loading ? children : null}
     </AuthContext.Provider>
    );
}
