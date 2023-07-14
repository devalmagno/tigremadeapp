import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login';
import Home from './screens/Home';
import { useAuthContext } from './contexts/AuthContext';

const Stack = createNativeStackNavigator();

export default function Router() {
    const { isLogged } = useAuthContext();

    return (
        <Stack.Navigator>
            {isLogged ? (
                <Stack.Screen
                    name='Home'
                    component={Home}
                    options={{
                        headerShown: false,
                    }}
                />
            ) : (
                <Stack.Screen
                    name='Login'
                    component={Login}
                    options={{
                        headerShown: false,
                    }}
                />
            )}
        </Stack.Navigator>
    );
}