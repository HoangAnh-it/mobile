import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Appointments from "../../../screen/Doctors/Appointment";

const Stack = createStackNavigator();
export default function AppointmentStack() {
    return (
        <Stack.Navigator initialRoutName="AccountDoctor">
            <Stack.Screen
                name="Lịch khám"
                component={Appointments}
            />
            
        </Stack.Navigator>
    )
}