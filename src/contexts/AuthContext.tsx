import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { encode } from 'base-64';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { handlerAuth } from "../services/api";

interface AuthContextType {
    email: string;
    changeEmail: (value: string) => void;
    password: string;
    changePassword: (value: string) => void;
    token: string;
    changeToken: (value: string) => void;
    handlerLogin: () => void;
    isLogged: boolean;
    changeLoggedStatus: (value: boolean) => void;
    errorMessage: string;
    handlerLogout: () => void;
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
    const [errorMessage, setErrorMessage] = useState('');

    const changeEmail = (value: string) => { setEmail(value) };
    const changePassword = (value: string) => { setPassword(value) };
    const changeToken = (value: string) => { setToken(`Basic ${value}`) };
    const changeLoggedStatus = (value: boolean) => { setIsLogged(value) };

    const storeData = async (value: string) => {
        try {
            await AsyncStorage.setItem('token', value);
        } catch (e) {
            console.log(e);
        }
    }

    async function handlerLogout() {
        await AsyncStorage.removeItem('token');
        setToken('');
        setIsLogged(false);
    }

    async function handlerLogin() {
        if (email === '' || password === '') return;
        const credentials = `${email}:${password}`;
        const encodedCredentials = encode(credentials);
        changeToken(encodedCredentials);

        const result = await handlerAuth(`Basic ${encodedCredentials}`);

        if (!result) setErrorMessage("O e-mail ou a senha inserida pode está incorreta.")
        if (result) {
            if (errorMessage !== '')
                setErrorMessage('');
            await storeData(encodedCredentials);
            setIsLogged(result);
        }
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('token');
                if (value !== null) {
                    const result = await handlerAuth(`Basic ${value}`);
                    changeLoggedStatus(result);
                    if (result) changeToken(value);
                }
            } catch (e) {
                console.log(e);
            }
        }

        getData();
    }, [])

    return (
        <AuthContext.Provider
            value={{
                isLogged,
                token,
                email,
                password,
                changeEmail,
                changePassword,
                handlerLogin,
                errorMessage,
                changeLoggedStatus,
                changeToken,
                handlerLogout,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}