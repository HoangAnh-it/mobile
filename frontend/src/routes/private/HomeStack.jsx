import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../../screen/Tabs/Home";
import Packages from "../../screen/Test/Packages";
import PackageDetails from "../../screen/Test/PackageDetails";
import DoctorList from "../../screen/Doctors/DoctorList";
import DoctorDetails from "../../screen/Doctors/DoctorDetails";
import HospitalDetails from "../../screen/Hospital/HospitalDetails";
import ListProfile from "../../screen/Appointments/ListProfile";
import ListDepartment from "../../screen/Appointments/ListDepartment";
import Book from "../../screen/Appointments/Book";
import Confirm from "../../screen/Appointments/Confirm";
import Notification from "../../screen/Tabs/Notification";
import Scheduling from "../../screen/Test/Scheduling";
import Search from "../../screen/Search/Search";
import ViewSchedules from "../../screen/Schedule/ViewSchedules";
import ConfirmTest from "../../screen/Test/Confirm";
import ListProfileTest from "../../screen/Test/ListProfile";
import ChatDetail from "../../screen/Chat/ChatDetail";
import CreateMedicalRecord from "../../screen/Appointments/CreateMedicalRecord";

const Stack = createStackNavigator();
export default function HomeStack() {
  return (
    <Stack.Navigator initialRoutName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat Detail"
        component={ChatDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tìm kiếm"
        component={Search}
        options={{ headerShown: false }} // headerLeft: () => <Ionicons title="Trở về" size={30} color={'#24dce2'} name={'arrow-back-outline'} />}}
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
        name="Thông báo"
        component={Notification}
        options={{
          headerTintColor: "#24dce2",
          headerTitleStyle: { color: "#000000" },
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
        name="Xét nghiệm tại nhà"
        component={Packages}
        options={{
          headerTintColor: "#24dce2",
          headerTitleStyle: { color: "#000000" },
          headerBackTitle: "Trang chủ"
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
        name="Xem lịch khám"
        component={ViewSchedules}
        options={{
          headerTintColor: "#24dce2",
          headerTitleStyle: { color: "#000000" },
          headerBackTitle: "Trang chủ"
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
        name="Chi tiết gói khám"
        component={PackageDetails}
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
        name="Hồ sơ xét nghiệm"
        component={ListProfileTest}
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
        name="Chọn lịch xét nghiệm"
        component={Scheduling}
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
        name="Xác nhận gói khám"
        component={ConfirmTest}
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
        component={DoctorList}
        options={{
          headerTintColor: "#24dce2",
          headerTitleStyle: { color: "#000000" },
          headerBackTitle: "Trang chủ"
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
        name="Hồ sơ"
        component={ListProfile}
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
        name="Chọn chuyên khoa"
        component={ListDepartment}
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
        name="Đặt lịch"
        component={Book}
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
        name="Xác nhận"
        component={Confirm}
        options={{
          headerTintColor: "#24dce2",
          headerTitleStyle: { color: "#000000" },
        }}
        navigationOptions={({ navigation, route }) => ({
          headerLeft: () => {
            return (
              <Ionicons
                labelVisible={false}
                title="Trở về"
                style={{ color: "#24dce2" }}
                name="arrow-back-outline"
              />
            );
          },
        })}
      />
      <Stack.Screen
        name="Tạo hồ sơ"
        component={CreateMedicalRecord}
        options={{
          headerTintColor: "#24dce2",
          headerTitleStyle: { color: "#000000" },
        }}
        navigationOptions={({ navigation, route }) => ({
          headerLeft: () => {
            return (
              <Ionicons
                labelVisible={false}
                title="Trở về"
                style={{ color: "#24dce2" }}
                name="arrow-back-outline"
              />
            );
          },
        })}
      />
    </Stack.Navigator>
  );
}
