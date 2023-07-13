import { ReactNode, createContext, useContext, useState } from "react";
import { encode } from 'base-64';
import { handlerAuth } from "../services/api";

interface AuthContextType {
    email: string;
    changeEmail: (value: string) => void;
    password: string;
    changePassword: (value: string) => void;
    token: string;
    handlerLogin: () => void;
    isLogged: boolean;
}

interface Props {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
    const authContext = useContext(AuthContext);

    if (!authContext)
        throw new Error("AuthContext has to be used within <AuthContext.Provider>")

    return authContext;
}

export default function AuthProvider(props: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [isLogged, setIsLogged] = useState(false);

    const changeEmail = (value: string) => { setEmail(value) }
    const changePassword = (value: string) => { setPassword(value) }

    async function handlerLogin() {
        if (email === '' || password === '') return;
        const credentials = `${email}:${password}`;
        const encodedCredentials = encode(credentials);
        setToken(`Basic ${encodedCredentials}`);

        const result = await handlerAuth(token);
        setIsLogged(result);
    }

    return (
        <AuthContext.Provider
            value={{
                isLogged,
                token,
                email,
                password,
                changeEmail,
                changePassword,
                handlerLogin
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}