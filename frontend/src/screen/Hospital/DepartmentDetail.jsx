import React from 'react'
import { View, Text, Image } from "react-native-animatable";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons"
import useAxios from '../../hooks/useAxios';
import { Button } from '@material-tailwind/react';
import { useNavigation } from '@react-navigation/native';

export default function DepartmentDetail({ route }) {
    const department = route.params.data
    const [doctors, setDoctors] = React.useState([])
    const axios = useAxios()
    const navigation = useNavigation()

    React.useEffect(() => {
        axios.get(`/department/${department.id}/doctor`)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data.data);
                    setDoctors(res.data.data.map(d => ({
                        id: d.user.userId,
                        name: d.user.name,
                        avatar: d.user.avatar,
                        department: d.department.name,
                        hospital: {
                            id: d.department.hospital.hospitalId,
                            name: d.department.hospital.user.name,
                        }
                    })))
                }
            }).catch(err => {
                console.log(JSON.stringify(err))
            })
    }, [department.id])

    return (
        <View>
            <View className="flex-row items-center justify-items-start pt-12 pb-2 px-5 bg-white">
                <TouchableOpacity
                    onPress={() => navigation.goBack(null)}
                >
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <View className="ml-2 bg-transparent h-16 w-16 rounded-full items-center justify-center">
                    <Image src={department.avatar} className='object-scale-down h-16 w-16 rounded-full' />
                </View>
                <Text className="font-bold text-2xl">{department.name}</Text>
            </View>

            <View>
                <Text className="font-bold m-2 text-lg">Bác sĩ</Text>

                <View>
                    <ScrollView>
                        {
                            doctors.length === 0 && <Text className="text-center">Không tìm thấy bác sĩ</Text>
                        }
                        {
                            doctors.map((doctor, index) => {
                                return <DoctorItem
                                    key={`doctor-item-${index}-${doctor.id}`}
                                    id={doctor.id}
                                    name={doctor.name}
                                    image={doctor.avatar}
                                />
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

const DoctorItem = (props) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            className=""
            onPress={() => {
                navigation.navigate("detail-doctor", { id: props.id })
            }}
        >
            <View className="flex-row items-center my-2">
                <View className="ml-2 bg-transparent h-16 w-16 rounded-full items-center justify-center">
                    <Image src={props.image} className='object-scale-down h-16 w-16 rounded-full' />
                </View>
                <Text className="w-2/3 text-left break-normal font-semibold justify-center mx-2">{props.name}</Text>

                <View className="">
                    <Ionicons name="caret-forward" size={24} color="#1AD1FF" />
                </View>
            </View>
        </TouchableOpacity>
    )
}