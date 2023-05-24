import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import MedicalRecordManagement from "../../../screen/Hospital/MedicalRecordManagement";
import Notification from "../../../screen/Tabs/Notification";
import AssignDoctor from "../../../screen/Hospital/AssignDoctor";
import DoctorDetails from "../../../screen/Doctors/DoctorDetails";
import HospitalDetails from "../../../screen/Hospital/HospitalDetails";

const Stack = createStackNavigator();
export default function MedicalRecordStack() {
    return (
        <Stack.Navigator initialRoutName="hospital_home">
            <Stack.Screen
                name="medical-record-management"
                component={MedicalRecordManagement}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Thông báo"
                component={Notification}
                options={{
                    headerTintColor: "#1AD1FF",
                    headerTitleStyle: { color: "#000000" },
                }}
                navigationOptions={({ navigation, route }) => ({
                    headerLeft: (
                        <Ionicons
                            labelVisible={false}
                            title="Trở về"
                            style={{ color: "#1AD1FF" }}
                        />
                    ),
                })}
            />
            <Stack.Screen
                name="medical-record-assign-doctor"
                component={AssignDoctor}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Detail doctor"
                component={DoctorDetails}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}