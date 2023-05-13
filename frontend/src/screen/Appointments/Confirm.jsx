import { View, Text, TouchableOpacity, Modal, Pressable } from "react-native";
import Profile from "../../component/Utils/Profile";
import React from "react";

export default function Confirm({ navigation, route }) {
    const { profile, hospital, department, date, hour } = route.params;
    const { appointmentStatus, setAppointmentStatus } = React.useState(false);
    const { message, setMessage } = React.useState("");
    const axios = useAxios();
    const handleAppoinment = () => {
        axios.post(`/patient/appointment`, {
            date: date.shortDate,
            hour: hour,
            testPackageId: testPackage.id,
            medicalRecordId: profile.medicalRecordId
        }
        )
            .then(res => {
                if (res.status < 400) {
                    setAppointmentStatus(true);
                    setModalVisible(true)
                } else {
                    setMessage(res.message)
                }
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })
    }

    const Info = (props) => {
        return (
            <View className="mx-4 my-2 p-5 rounded-md bg-white shadow-sm">
                <View className="my-3">
                    <View className="flex-row py-1 border-b border-gray-200">
                        <Text>Bệnh viện</Text>
                        <Text className="right-0 bottom-1 absolute w-2/3 text-right">{props.hospital.name}</Text>
                    </View>
                    <View className="flex-row py-1 border-b border-gray-200">
                        <Text>Chuyên khoa</Text>
                        <Text className="right-0 bottom-1 absolute">{props.department.name}</Text>
                    </View>
                    <View className="flex-row py-1 border-b border-gray-200">
                        <Text>Ngày khám</Text>
                        <Text className="right-0 bottom-1 absolute">{props.date.shortDate}</Text>
                    </View>
                    <View className="flex-row py-1 border-b border-gray-200">
                        <Text>Giờ khám</Text>
                        <Text className="right-0 bottom-1 absolute">{props.hour}</Text>
                    </View>
                    <View className="flex-row py-1">
                        <Text>Địa chỉ</Text>
                        <Text className="right-0 top-1 absolute w-2/3 text-right">{props.hospital.address}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const [modalVisible, setModalVisible] = React.useState(false);

    return (
        <View>
            <Text className="text-lg font-bold ml-4 mt-4" style={{ color: "#24DCE2" }}>Thông tin bệnh nhân</Text>
            <Profile
                fullname={profile.fullname}
                sex={profile.sex}
                dateOfBirth={profile.dateOfBirth}
                relationship={profile.relationship}
                numberphone={profile.numberphone}
                address={profile.address}
            />
            <Text className="text-lg font-bold ml-4 mt-4" style={{ color: "#24DCE2" }}>Thông tin lịch khám</Text>
            <Info
                hospital={hospital}
                department={department}
                date={date}
                hour={hour}
            />
            <TouchableOpacity
                className="m-auto w-1/3 p-2 mt-4 mb-8 rounded" style={{ backgroundColor: "#24DCE2" }}
                onPress={() => handleAppoinment()}
            >
                <Text className="text-white font-bold text-center">Xác nhận</Text>
            </TouchableOpacity>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View className="w-screen h-screen items-center justify-center">
                    <View className="w-screen h-screen bg-black opacity-25 absolute"></View>
                    <View className="bg-white items-center justify-center w-2/3 p-4 rounded-md shadow-sm">
                        <Text className="font-bold text-lg">Đặt lịch khám thành công!</Text>
                        <Pressable
                            className="mt-4 p-2 rounded"
                            style={{ backgroundColor: "#24DCE2" }}
                            onPress={() => { setModalVisible(!modalVisible); navigation.navigate("Home") }}>
                            <Text className="text-white font-bold">Đóng</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}