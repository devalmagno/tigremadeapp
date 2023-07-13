import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthProvider from "./contexts/AuthContext";
import Login from './screens/Login';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();

export default function Router() {
    return (
        <AuthProvider>
            <Stack.Navigator>
                <Stack.Screen
                    name='Home'
                    component={Home}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='Login'
                    component={Login}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </AuthProvider>
    );
}