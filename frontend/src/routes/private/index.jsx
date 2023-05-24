import React from 'react';
import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from './HomeStack'
import AccountDoctorStack from './doctor/AccountDoctorStack'
import AccountStack from './patient/AccountStack'
import ChatStack from './ChatStack'
import CommunityStack from './CommunityStack'

import useAuth from '../../hooks/useAuth';
import AccountHospitalStack from './hospital/AccountHospitalStack';
import MedicalRecordStack from './hospital/MedicalRecordStack';
import AppointmentStack from './doctor/AppointmentStack';

export default function PrivateStackScreen() {
    const Tab = createBottomTabNavigator();
    const {auth} = useAuth()._j

    return (
        <Tab.Navigator
            screenOptions={({ route }) => {
                    return ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;
                            if (route.name === "Trang chủ") {
                                iconName = focused ? 'home' : 'home-outline';
                            } else if (route.name == 'Cộng đồng') {
                                iconName = focused ? 'md-people' : 'people-outline';
                            } else if (route.name == 'Chat') {
                                iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
                            } else if (route.name == 'Hồ sơ' || route.name == 'Lịch') {
                                iconName = focused? 'clipboard' : 'clipboard-outline'
                            }
                            else {
                                iconName = focused ? 'person-circle' : 'person-circle-outline';
                            }
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: '#1AD1FF',
                        tabBarInactiveTintColor: 'gray',
                        headerShown: false,
                    });
            }}
        >
            {console.log("Register routes with:::", auth?.user)}
            {
                ["PATIENT"].includes(auth?.user.role) && <Tab.Screen name="Trang chủ" component={HomeStack} />
            }
            {
                ["HOSPITAL"].includes(auth?.user.role) && <Tab.Screen name="Hồ sơ" component={MedicalRecordStack} />
            }
            {
                ["PATIENT", "DOCTOR", "HOSPITAL"].includes(auth?.user.role) && <Tab.Screen name="Cộng đồng" component={CommunityStack} />
            }
            {
                ["PATIENT", "DOCTOR", "HOSPITAL"].includes(auth?.user.role) && <Tab.Screen name="Chat" component={ChatStack} />
            }
            {
                ["PATIENT"].includes(auth?.user.role) && <Tab.Screen name="Tài khoản" component={AccountStack} />
            }
            {
                ["DOCTOR"].includes(auth?.user.role) && <Tab.Screen name="Lịch" component={AppointmentStack} />
            }
            {
                ["DOCTOR"].includes(auth?.user.role) && <Tab.Screen name="Tài khoản" component={AccountDoctorStack} />
            }
            {
                ["HOSPITAL"].includes(auth?.user.role) && <Tab.Screen name="Tài khoản" component={AccountHospitalStack} />
            }
        </Tab.Navigator>
    )
}