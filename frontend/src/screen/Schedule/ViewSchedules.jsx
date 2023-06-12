import React from "react";
import { View, Text, ScrollView , StyleSheet} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import useAxios from "../../hooks/useAxios";
import { TouchableOpacity } from "react-native-gesture-handler";
import useConfirmModal from "../../hooks/useConfirmModal";
import useSocket from "../../hooks/useSocket";
import { dictionary } from "../../helpers/helpers";
import { useNavigation } from "@react-navigation/native";

export const ScheduleItem = ({ data }) => {
    const { setTitle, setAction, setVisible, setIsAlert } = useConfirmModal()
    const axios = useAxios()
    const socket = useSocket()
    const navigation = useNavigation()

    const cancelAppointment = () => {
        setTitle(`Hủy cuộc hẹn ${data.department?.name || ""}?`)
        setAction(() => {
            axios.put(`/patient/appointment/${data.id}?status=CANCELED`)
                .then(res => {
                    if (res.status === 200) {
                        socket.emit("status appointment", {
                            id: res.data.id,
                            status: res.data.status
                        })
                    }
                }).catch(err => {
                    console.log(JSON.stringify(err))
                    setTitle("Không thể hủy. Vui lòng thử lại")
                    setIsAlert(true)
                })

        })
        setVisible(true)
    }

    return (
        <View className="mx-4 my-2 p-5 rounded-md bg-white shadow-sm"
        // style={styles.status[data.status]}
        >
            <View className="my-3">
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Họ tên</Text>
                    <Text className="right-0 bottom-1 absolute">{data.name}</Text>
                </View>
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Giới tính</Text>
                    <Text className="right-0 bottom-1 absolute">{data.gender}</Text>
                </View>
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Ngày sinh</Text>
                    <Text className="right-0 bottom-1 absolute">{data.birthDay}</Text>
                </View>
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Mối quan hệ</Text>
                    <Text className="right-0 bottom-1 absolute">{data.relationship}</Text>
                </View>
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Số điện thoại</Text>
                    <Text className="right-0 bottom-1 absolute">{data.phone}</Text>
                </View>
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Chuyên khoa</Text>
                    <Text className="right-0 bottom-1 absolute">{data.department}</Text>
                </View>
                {
                    data.testPackage &&
                    <View className="flex-row py-1 border-b border-gray-200">
                        <Text>Gói khám</Text>
                        <Text className="right-0 top-1 absolute w-2/3 text-right">{data.testPackage}</Text>
                    </View>
                }
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Ngày khám</Text>
                    <Text className="right-0 bottom-1 absolute">{data.date}</Text>
                </View>
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Giờ khám</Text>
                    <Text className="right-0 bottom-1 absolute">{data.hour}</Text>
                </View>
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Bệnh viện</Text>
                    <Text className="right-0 top-1 absolute w-2/3 text-right">{data.hospital}</Text>
                </View>
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Địa chỉ</Text>
                    <Text className="right-0 top-1 absolute w-2/3 text-right">{data.address}</Text>
                </View>
                {
                    data.doctor &&
                    <View className="flex-row py-1 border-b border-gray-200">
                        <Text>Bác sĩ</Text>
                        <Text className="right-0 top-1 absolute w-2/3 text-right">{data.doctor}</Text>
                    </View>
                }
                <View className="flex-row py-1 mt-4">
                    {
                        ["PENDING", "ACCEPTED"].includes(data.status) &&
                        <TouchableOpacity className="p-2 bg-[#ff8080] rounded"
                            onPress={cancelAppointment}
                        >
                            <Text
                                className="font-bold text-white"
                            >
                                Hủy lịch hẹn?
                            </Text>
                        </TouchableOpacity>
                    }
                    {
                        [].includes(data.status) &&
                        <Text className="font-bold p-2 bg-[#ff8080]">
                            Đã hủy?
                        </Text>
                    }
                    {
                        ["DONE"].includes(data.status) &&
                        <TouchableOpacity onPress={() => navigation.navigate("result appointment", {data: {result: data.result}})}>
                            <Text className="font-bold w-fit text-right text-decoration-line: underline">
                                Xem kết quả
                            </Text>
                        </TouchableOpacity>
                    }
                    <View className="p-2 rounded-md right-0 absolute items-center"
                        style={styles.status[data.status]}>
                        <Text className="font-bold w-fit text-right text-decoration-line: underline">
                            {dictionary[data.status]}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default function ViewSchedules({ navigation, route }) {
    const [schedules, setSchedules] = React.useState([])
    const axios = useAxios()
    const socket = useSocket()

    const getDate = React.useMemo(() => (d) => {
        return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
    }, [])

    const getTime = React.useMemo(() => (d) => {
        return d.getHours() + ":" + d.getMinutes();
    }, [])


    React.useEffect(() => {
        axios.get('/patient/appointment')
            .then(res => res.data.data)
            .then(d => {
                setSchedules(d.map(schedule => ({
                    id: schedule.appointmentId,
                    name: schedule.medicalRecord.name,
                    gender: schedule.medicalRecord.gender,
                    birthDay: getDate(new Date(schedule.medicalRecord.birthDay)),
                    relationship: schedule.medicalRecord.relationship,
                    phone: schedule.medicalRecord.phone,
                    address: schedule.medicalRecord.address,
                    hospital: schedule.department?.hospital.user.name || schedule.testPackage?.department.hospital.user.name,
                    department: schedule.department?.name || schedule.testPackage.department.name,
                    date: getDate(new Date(schedule.dateTime)),
                    hour: getTime(new Date(schedule.dateTime)),
                    status: schedule.status,
                    doctor: schedule.doAppointment?.user.name,
                    testPackage: schedule.testPackage?.name,
                    result: schedule.medicalResult
                })))
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })
    }, [])

    React.useEffect(() => {
        const statusAppointmentListener = (data) => {
            setSchedules(prev => {
                const index = prev.findIndex(e => e.id === data.id)
                if (index >= 0) {
                    prev[index].status = data.status
                    if (data.status === 'ACCEPTED') {
                        prev[index].doctor = data.doctor
                    }
                }
                return [...prev]
            })
        }

        socket.on("status appointment", statusAppointmentListener)
        return () => {
            socket.off("status appointment", statusAppointmentListener)
        }
    }, [socket])

    return (
        <KeyboardAwareScrollView>
            <ScrollView pagingEnabled={true}>
                {
                    schedules.length === 0 &&
                        <Text className="text-lg m-auto mt-4" style={{ color: "#000" }}>Chưa có lịch khám</Text>
                }
                {
                    schedules.map((schedule, index) => {
                        return <ScheduleItem
                            key={`schedule-${schedule.id}-${index}`}
                            data={schedule}
                        />
                    })
                }
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    status: {
        PENDING: {
            backgroundColor: 'yellow',
            // borderWidth: 2,
        },
            
        ACCEPTED: {
            backgroundColor: '#99ddff',
            // borderWidth: 2,
        },

        DONE: {
            backgroundColor: '#99ff99',
            // borderWidth: 2,
        },
    
        CANCELED: {
            backgroundColor: '#ffcc66',
            // borderWidth: 2,
        },

        REJECTED: {
            backgroundColor: '#ff8080',
            // borderWidth: 2,
        },

    }
})