import React from 'react'
import { View, Text } from "react-native-animatable";
import useAxios from "../../hooks/useAxios";
import { extractDate } from '../../helpers/helpers';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const toAppointment = (data) => {
    return {

    }
}

export default function Appointments() {
    const [appointments, setAppointments] = React.useState([])
    const axios = useAxios()

    React.useEffect(() => {
        axios.get("/doctor/appointment")
            .then(res => {
                if (res.status === 200) {
                    
                }
            }).catch(err => {
                console.log(JSON.stringify(err))
            })
    }, [])

    return (
        <View className="m-4">
            <Text className="font-light text-right underline">Ấn để xem chi tiết</Text>
            {

            }
            <ScrollView>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
                <AppointmentItem/>
            </ScrollView>
        </View>
    )
}

const AppointmentItem = ({data}) => {
    return (
        <TouchableOpacity>
            <View className="flex-row items-center justify-between p-2 my-1 bg-slate-200 rounded-md shadow border">
                <View >
                    <Text>Loại: Gói xét nghiệm tại nhà</Text>
                    <Text>Bệnh nhân: Vũ Hoàng Anh</Text>
                </View>

                <View>
                    <Text>{extractDate(new Date())}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}