import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import MyPodcasts from './MyPodcasts';
import Podcasts from './Podcast';
import Update from './Update';
import History from './History';
import Settings from './Settings';

import DataProvider from '../contexts/DataContext';
import Loading from '../components/Loading';

const Tab = createBottomTabNavigator();

export default function Home() {
    return (
        <DataProvider>
            <Tab.Navigator screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    justifyContent: 'space-around',
                    backgroundColor: '#000',
                    height: 72,
                    borderTopWidth: 0,
                    paddingBottom: 14,
                    paddingHorizontal: 10,
                },
                tabBarLabelStyle: {
                    fontFamily: 'Inter600',
                    fontSize: 12,
                },
                tabBarActiveTintColor: "#fff",
            }}>
                <Tab.Screen
                    name="MyPodcasts"
                    component={MyPodcasts}
                    options={{
                        tabBarLabel: 'Meus Podcats',
                        tabBarIcon: ({ color }) => (
                            <Feather name="headphones" size={20} color={color} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Update"
                    component={Update}
                    options={{
                        tabBarLabel: 'Atualizações',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="update" size={20} color={color} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="History"
                    component={History}
                    options={{
                        tabBarLabel: 'Histórico',
                        tabBarIcon: ({ color }) => (
                            <FontAwesome5 name="history" size={16} color={color} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Podcasts"
                    component={Podcasts}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome5 name="podcast" size={20} color={color} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                        tabBarLabel: 'Mais',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="dots-horizontal" size={20} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>

            <Loading />
        </DataProvider>
    )
}