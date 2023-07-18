import { NativeStackScreenProps, createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import Login from './screens/Login';
import Home from './screens/Home';
import { useAuthContext } from './contexts/AuthContext';
import PodcastScreen from './screens/PodcastScreen';
import { PodcastType } from './types/PodcastType';

type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    PodcastScreen: { podcast: PodcastType };
}

export type PodcastScreenProps = NativeStackScreenProps<RootStackParamList, 'PodcastScreen'>;
export type PodcastNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PodcastScreen'>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Router() {
    const { isLogged } = useAuthContext();

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: "#0E0E0E", },
                headerTintColor: "#fff",
                headerTitleStyle: { fontFamily: 'Inter600', fontSize: 14, },
            }}
        >
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
            <Stack.Screen
                name='PodcastScreen'
                component={PodcastScreen}
                options={{
                    title: 'Voltar para Meus Podcasts',
                    headerTransparent: true,
                    headerStyle: {
                        backgroundColor: "transparent",
                    }
                }}
            />
        </Stack.Navigator>
    );
}