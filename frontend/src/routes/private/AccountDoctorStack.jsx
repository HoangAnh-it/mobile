import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AccountDoctor from "../../screen/Tabs/AccountDoctor";
import ListHospital from "../../screen/Account/ListHospital";
import HospitalDetails from "../../screen/Hospital/HospitalDetails";
import ListDoctor from "../../screen/Account/ListDoctor";
import DoctorDetails from "../../screen/Doctors/DoctorDetails";
import ChangePassword from "../../screen/Account/ChangePassword";

const Stack = createStackNavigator();
export default function AccountDoctorStack() {
    return (
        <Stack.Navigator initialRoutName="AccountDoctor">
            <Stack.Screen
                name="AccountDoctor"
                component={AccountDoctor}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Danh sách bệnh viện"
                component={ListHospital}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Thông tin bệnh viện"
                component={HospitalDetails}
                options={{
                    headerTintColor: "#24dce2",
                    headerTitleStyle: { color: "#000000" },
                    headerBackTitle: "Trở về"
                }}
                navigationOptions={({ navigation, route }) => ({
                    headerLeft: (
                        <Ionicons
                            labelVisible={false}
                            title="Trở về"
                            style={{ color: "#24dce2" }}
                        />
                    ),
                })}
            />
            <Stack.Screen
                name="Danh sách bác sĩ"
                component={ListDoctor}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Thông tin bác sĩ"
                component={DoctorDetails}
                options={{
                    headerTintColor: "#24dce2",
                    headerTitleStyle: { color: "#000000" },
                    headerBackTitle: "Trở về"
                }}
                navigationOptions={({ navigation, route }) => ({
                    headerLeft: (
                        <Ionicons
                            labelVisible={false}
                            title="Trở về"
                            style={{ color: "#24dce2" }}
                        />
                    ),
                })}
            />
            <Stack.Screen
                name="Đổi mật khẩu"
                component={ChangePassword}
            />
            
        </Stack.Navigator>
    )
}