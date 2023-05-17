import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Account from "../../screen/Tabs/Account";
import ChangePassword from "../../screen/Account/ChangePassword";
import CreateMedicalRecord from "../../screen/Appointments/CreateMedicalRecord";
import ViewSchedules from "../../screen/Schedule/ViewSchedules";
import ListProfile from "../../screen/Appointments/ListProfile";

const Stack = createStackNavigator();
export default function AccountStack() {
    return (
        <Stack.Navigator initialRoutName="Account">
            <Stack.Screen
                name="Account"
                component={Account}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Hồ sơ"
                component={ListProfile}
            />
            <Stack.Screen
                name="Xem lịch khám"
                component={ViewSchedules}
            />
            <Stack.Screen
                name="Tạo hồ sơ"
                component={CreateMedicalRecord}
            />
            <Stack.Screen
                name="Đổi mật khẩu"
                component={ChangePassword}
            />
            
        </Stack.Navigator>
    )
}