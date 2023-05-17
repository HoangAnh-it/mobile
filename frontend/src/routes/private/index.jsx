import React from 'react';
import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from './HomeStack'
import AccountDoctorStack from './AccountDoctorStack'
import AccountStack from './AccountStack'
import ChatStack from './ChatStack'
import CommunityStack from './CommunityStack'

import useAuth from '../../hooks/useAuth';

export default function PrivateStackScreen() {
    const Tab = createBottomTabNavigator();
    const {auth} = useAuth()._j

    return (
            <Tab.Navigator
                screenOptions={({ route }) => {
                    if (auth?.user.role == "PATIENT") {
                        return ({
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName;
                                if (route.name === "Trang chủ") {
                                    iconName = focused ? 'home' : 'home-outline';
                                } else if (route.name == 'Cộng đồng') {
                                    iconName = focused ? 'md-people' : 'people-outline';
                                } else if (route.name == 'Chat') {
                                    iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
                                } else {
                                    iconName = focused ? 'person-circle' : 'person-circle-outline';
                                }
                                return <Ionicons name={iconName} size={size} color={color} />;
                            },
                            tabBarActiveTintColor: '#24dce2',
                            tabBarInactiveTintColor: 'gray',
                            headerShown: false,
                        });
                    } else {
                        return ({
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName;
                                if (route.name == 'Cộng đồng') {
                                    iconName = focused ? 'md-people' : 'people-outline';
                                } else if (route.name == 'Chat') {
                                    iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
                                } else {
                                    iconName = focused ? 'person-circle' : 'person-circle-outline';
                                }
                                return <Ionicons name={iconName} size={size} color={color} />;
                            },
                            tabBarActiveTintColor: '#24dce2',
                            tabBarInactiveTintColor: 'gray',
                            headerShown: false,
                        });
                    }
                }}
        >
            {console.log("Register routes with:::", auth?.user)}
                {
                    ["PATIENT"].includes(auth?.user.role) && <Tab.Screen name="Trang chủ" component={HomeStack} />
                }
                {
                    ["PATIENT", "DOCTOR"].includes(auth?.user.role) && <Tab.Screen name="Cộng đồng" component={CommunityStack} />
                }
                {
                    ["PATIENT", "DOCTOR"].includes(auth?.user.role) && <Tab.Screen name="Chat" component={ChatStack} />
                }
                {
                    ["PATIENT"].includes(auth?.user.role) && <Tab.Screen name="Tài khoản" component={AccountStack} />
                }
                {
                    ["DOCTOR"].includes(auth?.user.role) && <Tab.Screen name="Tài khoản" component={AccountDoctorStack} />
                }
            </Tab.Navigator>
    )
}