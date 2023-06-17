import { View, Text, TouchableOpacity, Modal, Pressable } from "react-native";
import Profile from "../../component/Utils/Profile";
import React from "react";
import useAxios from "../../hooks/useAxios";
import useConfirmModal from "../../hooks/useConfirmModal";
import * as Notifications from 'expo-notifications';

export default function ConfirmTest({ navigation, route }) {
    const { profile, testPackage, date, hour } = route.params;
    const  [appointmentStatus, setAppointmentStatus ] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const {setTitle, setIsAlert, setVisible} = useConfirmModal()

    const axios = useAxios();
    const handleAppointment = () => {
        axios.post(`/patient/appointment`, {
            date: date.shortDate,
            time: hour,
            testPackageId: testPackage.id,
            medicalRecordId: profile.id
        }
        )
            .then(async res => {
                if (res.status === 200) {
                    setAppointmentStatus(true);
                }
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: "Cuộc hẹn",
                        body: `Bạn vừa tạo gói xét nghiệm vào lúc ${hour} ngày ${date.shortDate}`,
                        data: { data: 'goes here' },
                    },
                    trigger: { seconds: 2 },
                });
            })
            .catch(err => {
                console.log(JSON.stringify(err.response.message))
                setTitle(err.response.message)
                setIsAlert(true)
                setVisible(true)
            })
    }

    const Info = (props) => {
        return (
            <View className="mx-4 my-2 p-5 rounded-md bg-white shadow-sm">
                <View className="my-3">
                    <View className="flex-row py-1 border-b border-gray-200">
                        <Text>Gói khám</Text>
                        <Text className="right-0 bottom-1 absolute">{props.testPackage.title}</Text>
                    </View>
                    <View className="flex-row py-1 border-b border-gray-200">
                        <Text>Ngày khám</Text>
                        <Text className="right-0 bottom-1 absolute">{props.date.shortDate}</Text>
                    </View>
                    <View className="flex-row py-1 border-b border-gray-200">
                        <Text>Giờ khám</Text>
                        <Text className="right-0 bottom-1 absolute">{props.hour}</Text>
                    </View>
                    <View className="flex-row py-1 border-b border-gray-200">
                        <Text>Giá đặt khám</Text>
                        <Text className="right-0 bottom-1 absolute">{props.testPackage.price}đ</Text>
                    </View>
                    <View className="flex-row py-1">
                        <Text>Đơn vị cung cấp</Text>
                        <Text className="right-0 top-1 absolute w-2/3 text-right">{props.testPackage.hospital}</Text>
                    </View>
                </View>
            </View>
        )
    }

    // const [modalVisible, setModalVisible] = React.useState(false);

    return (
        <View>
            <Text className="text-lg font-bold ml-4 mt-4" style={{ color: "#1AD1FF" }}>Thông tin bệnh nhân</Text>
            <Profile
                name={profile.name}
                gender={profile.gender}
                birthDay={profile.birthDay}
                relationship={profile.relationship}
                phone={profile.phone}
                address={profile.address}
            />
            <Text className="text-lg font-bold ml-4 mt-4" style={{ color: "#1AD1FF" }}>Thông tin lịch xét nghiệm</Text>
            <Info
                testPackage={testPackage}
                date={date}
                hour={hour}
            />
            <TouchableOpacity
                className="m-auto w-1/3 p-2 mt-4 mb-8 rounded" style={{ backgroundColor: "#1AD1FF" }}
                onPress={() => {
                    handleAppointment();
                    setModalVisible(true);
                }
                }
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
                    <View className="bg-white items-center justify-center w-4/5 py-4 px-3.5 rounded-md shadow-sm">
                        {appointmentStatus?<Text className="font-bold text-lg">Đặt lịch xét nghiệm thành công!</Text>:<Text className="font-bold text-lg">Đặt lịch xét nghiệm thất bại!</Text>}
                        <Pressable
                            className="mt-4 p-2 rounded"
                            style={{ backgroundColor: "#1AD1FF" }}
                            onPress={() => { setModalVisible(!modalVisible); navigation.navigate("Home") }}>
                            <Text className="text-white font-bold">Đóng</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}