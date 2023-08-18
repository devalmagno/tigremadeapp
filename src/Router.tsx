import { NativeStackScreenProps, createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import Login from './screens/Login';
import Home from './screens/Home';
import { useAuthContext } from './contexts/AuthContext';
import PodcastScreen from './screens/PodcastScreen';
import { PodcastType } from './types/PodcastType';
import Player from './screens/Player';
import PlayerProvider from './contexts/PlayerContext';
import PlayerLoading from './components/PlayerLoading';

type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    PodcastScreen: { podcast: PodcastType };
    Player: undefined;
}

export type PodcastScreenProps = NativeStackScreenProps<RootStackParamList, 'PodcastScreen'>;
export type PodcastNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PodcastScreen'>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Router() {
    const { isLogged } = useAuthContext();

    return (
        <PlayerProvider>
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
                <Stack.Screen
                    name='Player'
                    component={Player}
                    options={{
                        headerTransparent: true,
                        headerStyle: {
                            backgroundColor: "transparent",
                        }
                    }}
                />

            </Stack.Navigator>

            <PlayerLoading />
        </PlayerProvider>
    );
}