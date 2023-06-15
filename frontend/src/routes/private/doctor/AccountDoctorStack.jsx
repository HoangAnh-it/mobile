import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ListHospital from "../../../screen/Account/ListHospital";
import HospitalDetails from "../../../screen/Hospital/HospitalDetails";
import ListDoctor from "../../../screen/Account/ListDoctor";
import DoctorDetails from "../../../screen/Doctors/DoctorDetails";
import ChangePassword from "../../../screen/Account/ChangePassword";
import Account from "../../../screen/Tabs/Account";
import EditInfomation from "../../../screen/Account/EditInfomation";

const Stack = createStackNavigator();
export default function AccountDoctorStack() {
    return (
        <Stack.Navigator initialRoutName="Account">
            <Stack.Screen
                name="Account"
                component={Account}
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
                    headerTintColor: "#1AD1FF",
                    headerTitleStyle: { color: "#000000" },
                    headerBackTitle: "Trở về"
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
                name="Danh sách bác sĩ"
                component={ListDoctor}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Thông tin bác sĩ"
                component={DoctorDetails}
                options={{
                    headerTintColor: "#1AD1FF",
                    headerTitleStyle: { color: "#000000" },
                    headerBackTitle: "Trở về"
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
                name="Đổi mật khẩu"
                component={ChangePassword}
            />
            <Stack.Screen
        name="Chỉnh sửa thông tin"
        component={EditInfomation}
        options={{
          headerTintColor: "#1AD1FF",
          headerTitleStyle: { color: "#000000" },
          headerBackTitle: "Trở về"
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
        </Stack.Navigator>
    )
}