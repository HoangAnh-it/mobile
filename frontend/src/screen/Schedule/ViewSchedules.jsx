import React from "react";
import { View, Text, ScrollView , StyleSheet} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import useAxios from "../../hooks/useAxios";
import { TouchableOpacity } from "react-native-gesture-handler";
import useConfirmModal from "../../hooks/useConfirmModal";
import useSocket from "../../hooks/useSocket";
import { dictionary } from "../../helpers/helpers";

export const ScheduleItem = ({ data }) => {
    const { setTitle, setAction, setVisible, setIsAlert } = useConfirmModal()
    const axios = useAxios()
    const socket = useSocket()


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
            style={styles.status[data.status]}
        >
            <View className="my-3">
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Họ tên</Text>
                    <Text className="right-0 bottom-1 absolute">{data.fullname}</Text>
                </View>
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Giới tính</Text>
                    <Text className="right-0 bottom-1 absolute">{data.sex}</Text>
                </View>
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Ngày sinh</Text>
                    <Text className="right-0 bottom-1 absolute">{data.dateOfBirth}</Text>
                </View>
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Mối quan hệ</Text>
                    <Text className="right-0 bottom-1 absolute">{data.relationship}</Text>
                </View>
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Số điện thoại</Text>
                    <Text className="right-0 bottom-1 absolute">{data.numberphone}</Text>
                </View>
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Chuyên khoa</Text>
                    <Text className="right-0 bottom-1 absolute">{data.department}</Text>
                </View>
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Ngày khám</Text>
                    <Text className="right-0 bottom-1 absolute">{data.date}</Text>
                </View>
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Giờ khám</Text>
                    <Text className="right-0 bottom-1 absolute">{data.hour}</Text>
                </View>
                <View className="flex-row py-1">
                    <Text>Bệnh viện</Text>
                    <Text className="right-0 top-1 absolute w-2/3 text-right">{data.hospital}</Text>
                </View>
                <View className="flex-row py-1">
                    <Text>Địa chỉ</Text>
                    <Text className="right-0 top-1 absolute w-2/3 text-right">{data.address}</Text>
                </View>
                {
                    data.doctor &&
                    <View className="flex-row py-1">
                        <Text>Bác sĩ</Text>
                        <Text className="right-0 top-1 absolute w-2/3 text-right">{data.doctor}</Text>
                    </View>
                }
                <View className="flex-row py-1 mt-4">
                    {
                        ["PENDING", "ACCEPTED"].includes(data.status) &&
                        <TouchableOpacity
                            onPress={cancelAppointment}
                        >
                            <Text
                                className="font-bold p-1.5"
                                style={{
                                    backgroundColor: '#ff0000',
                                }}
                            >
                                Hủy lịch hẹn?
                            </Text>
                        </TouchableOpacity>
                    }
                    {
                        [].includes(data.status) &&
                        <Text
                                className="font-bold p-1.5"
                                style={{
                                    backgroundColor: '#ff0000',
                                }}
                            >
                                Đã hủy?
                            </Text>
                    }
                    <Text className="font-bold right-0 top-1 absolute w-2/3 text-right text-decoration-line: underline">
                        {dictionary[data.status]}
                    </Text>
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
                    fullname: schedule.medicalRecord.name,
                    sex: schedule.medicalRecord.gender,
                    dateOfBirth: getDate(new Date(schedule.medicalRecord.birthDay)),
                    relationship: schedule.medicalRecord.relationship,
                    numberphone: schedule.medicalRecord.phone,
                    address: schedule.medicalRecord.address,
                    hospital: schedule.department?.hospital.user.name || schedule.testPackage?.department.hospital.user.name,
                    department: schedule.department?.name,
                    date: getDate(new Date(schedule.dateTime)),
                    hour: getTime(new Date(schedule.dateTime)),
                    status: schedule.status,
                    doctor: schedule.doAppointment?.user.name
                })))
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })
    }, [])

    React.useEffect(() => {
        const statusAppointmentListener = (data) => {
            console.log(data)
            setSchedules(prev => {
                const index = prev.findIndex(e => e.id === data.id)
                console.log(index)
                console.log(prev.map(prev => prev.id))
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
            borderColor: 'yellow',
            borderWidth: 2,
        },
            
        ACCEPTED: {
            borderColor: '#3333ff',
            borderWidth: 2,
        },

        DONE: {
            borderColor: '#33ff33',
            borderWidth: 2,
        },
    
        CANCELED: {
            borderColor: '#ff9933',
            borderWidth: 2,
        },

        REJECTED: {
            borderColor: '#ff3333',
            borderWidth: 2,
        },

    }
})