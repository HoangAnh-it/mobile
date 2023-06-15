import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Account from "../../../screen/Tabs/Account";
import ChangePassword from "../../../screen/Account/ChangePassword";
import CreateMedicalRecord from "../../../screen/Appointments/CreateMedicalRecord";
import ViewSchedules from "../../../screen/Schedule/ViewSchedules";
import ListProfile from "../../../screen/Appointments/ListProfile";
import UpdateMedicalRecord from "../../../screen/Appointments/UpdateMedicalRecord";
import ExaminationResults from "../../../screen/components/ExaminationResults";
import EditInfomation from "../../../screen/Account/EditInfomation";

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
        name="Xem lịch khám"
        component={ViewSchedules}
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
        name="result appointment"
        component={ExaminationResults}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tạo hồ sơ"
        component={CreateMedicalRecord}
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
        name="Cập nhật hồ sơ"
        component={UpdateMedicalRecord}
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