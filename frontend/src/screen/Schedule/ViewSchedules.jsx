import React from "react";
import { View, Text, ScrollView , StyleSheet} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import useAxios from "../../hooks/useAxios";
import { TouchableOpacity } from "react-native-gesture-handler";
import useConfirmModal from "../../hooks/useConfirmModal";

const ScheduleItem = ({ data }) => {
    const {setTitle, setAction, setVisible} = useConfirmModal()

    const cancelAppointment = () => {
        setTitle(`Hủy cuộc hẹn ${data.department?.name || ""}?`)
        setAction(() => () => {
            console.log("delete appointment ", data.id)

        })
        setVisible(true)
    }

    return (
        <View className="mx-4 my-2 p-5 rounded-md bg-white shadow-sm"
            style={
                data.status === 'PENDING' ? styles.pending : styles.done
            }
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
                    <Text className="right-0 bottom-1 absolute">{data.department?.name || 'Chưa có thông tin'}</Text>
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
                <View className="flex-row py-1 mt-4">
                    {
                        data.status === "PENDING" &&
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
                    <Text className="font-bold right-0 top-1 absolute w-2/3 text-right text-decoration-line: underline">
                        {data.status === "PENDING" && "Đang chờ"}
                        {data.status === "DONE" && "Đã xong"}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default function ViewSchedules({ navigation, route }) {
    const [schedules, setSchedules] = React.useState([])
    const axios = useAxios()

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
                setSchedules(d)
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })
    }, [])

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
                            key={`schedule-${schedule.appointmentId}-${index}`}
                            data={{
                                id: schedule.appointmentId,
                                fullname: schedule.medicalRecord.name,
                                sex: schedule.medicalRecord.gender,
                                dateOfBirth: getDate(new Date(schedule.medicalRecord.birthDay)),
                                relationship: schedule.medicalRecord.relationship,
                                numberphone: schedule.medicalRecord.phone,
                                address: schedule.medicalRecord.address,
                                hospital: schedule.department?.hospital.name || schedule.testPackage?.hospital.name,
                                department: schedule.department,
                                date: getDate(new Date(schedule.dateTime)),
                                hour: getTime(new Date(schedule.dateTime)),
                                status: schedule.status
                            }}
                        />
                    })
                }
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    pending: {
        borderColor: "yellow",
        borderWidth: "2px",
        shadowColor: "2px"
    },
    
    done: {
        borderColor: "green",
        borderWidth: "2px",
        shadowColor: "2px"
    }
});