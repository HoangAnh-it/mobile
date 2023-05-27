import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Appointments from "../../../screen/Doctors/Appointment";
import { Entypo } from '@expo/vector-icons';
import ExaminationResults from "../../../screen/components/ExaminationResults";

const Stack = createStackNavigator();
export default function AppointmentStack() {
    return (
        <Stack.Navigator initialRoutName="AccountDoctor">
            <Stack.Screen
                name="Lịch khám"
                component={Appointments}
                options={{
                  headerTitleStyle: { color: "#000000", fontSize: 20, fontWeight: "bold" },
                }}
            />
            <Stack.Screen
                name="Tạo kết quả khám"
                component={ExaminationResults}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}