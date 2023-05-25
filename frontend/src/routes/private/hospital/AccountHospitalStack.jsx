import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Account from "../../../screen/Tabs/Account";
import ChangePassword from "../../../screen/Account/ChangePassword";
import DepartmentManagement from "../../../screen/Hospital/DepartmentManagement";
import NewDepartment from "../../../screen/Hospital/NewDepartment";
import DepartmentDetail from "../../../screen/Hospital/DepartmentDetail";
import DoctorDetails from "../../../screen/Doctors/DoctorDetails";

const Stack = createStackNavigator();
export default function AccountHospitalStack() {
    return (
        <Stack.Navigator initialRoutName="AccountDoctor">
            <Stack.Screen
                name="main"
                component={Account}
                options={{ headerShown: false }}
            />
            
            <Stack.Screen
                name="department-management"
                component={DepartmentManagement}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="create-department"
                component={NewDepartment}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="detail-department"
                component={DepartmentDetail}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="detail-doctor"
                component={DoctorDetails}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Đổi mật khẩu"
                component={ChangePassword}
            />
        </Stack.Navigator>
    )
}