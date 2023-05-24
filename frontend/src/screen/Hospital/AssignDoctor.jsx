import React from 'react'
import { ActivityIndicator, View, TouchableOpacity, TextInput, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { dictionary } from '../../helpers/helpers';
import useAxios from '../../hooks/useAxios';
import { useNavigation } from '@react-navigation/native';
import useConfirmModal from '../../hooks/useConfirmModal';
import useSocket from '../../hooks/useSocket';

export default function AssignDoctor({ navigation, route }) {
    const { appointment } = route.params
    const [loading, setLoading] = React.useState(false)
    const [doctors, setDoctors] = React.useState([])
    const [selectedDoctor, setSelectedDoctor] = React.useState({})
    const [search, setSearch] = React.useState({
        inputSearch: "",
        isSearch: false,
    });
    const {setTitle, setIsAlert, setVisible, setAction} = useConfirmModal()

    const axios = useAxios()
    const socket = useSocket()

    const searchChange = (val) => {
        if (val.length != 0) {
          setSearch({
            inputSearch: val,
            isSearch: true,
          });
        } else {
          setSearch({
            inputSearch: val,
            isSearch: false,
          });
        }
      };
    
    const searchInfo = (name) => {
        console.log("Search doctor", name)
        setLoading(true)
        axios.get(`/department/${appointment.department.id}/doctor?name=${name.inputSearch}`)
            .then(res => {
                if (res.status === 200) {
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
                    setTimeout(() => {
                        setLoading(false)
                    }, 300)
                }
            }).catch(err => {
                console.log(JSON.stringify(err))
                setLoading(false)
            })
    };

    const done = () => {
        if (Object.keys(selectedDoctor).length === 0) {
            setTitle("Chưa chọn bác sĩ")
            setIsAlert(true)
            setVisible(true)
            return
        }
        setTitle("Xác nhận đặt lịch")
        setAction(() => {
            axios.post("/hospital/assign_doctor_appointment", {
                appointmentId: appointment.id,
                userDoctorId: selectedDoctor.id
            }).then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    socket.emit('status appointment', {
                        id: res.data.id,
                        status: res.data.status,
                        doctor: res.data.doctor
                    })
                }
            }).then(() => {
                navigation.goBack(null)
            })
                .catch(err => {
                    console.log(JSON.stringify(err))
                })
        })
        setVisible(true)
    }

    return (
        <>
            <View className="pt-10 flex-row" />
            <View className="flex-row items-center justify-center border-b border-gray-200">
                <TouchableOpacity
                    className="m-3 absolute left-0"
                    onPress={() => navigation.goBack(null)}
                >
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <View className="my-3 flex-row items-center">
                    <Text className="font-semibold text-lg ml-3">Đặt lịch </Text>
                </View>
            </View>

            <View>
                <View className="flex-row justify-between items-center">
                    <Text className="font-bold text-lg m-2">Hồ sơ</Text>
                    <TouchableOpacity
                        className="p-2 mx-3 bg-[#1AD1FF] rounded border-1 border-black"
                        onPress={done}
                    >
                        <Text className="text-white font-bold">Xong</Text>
                    </TouchableOpacity>
                </View>
                <View className="w-screen p-2">
                    <View className="flex-row py-1 border-b border-gray-200">
                        <Text>Họ tên</Text>
                        <Text className="right-0 bottom-1 absolute">{appointment.fullname}</Text>
                    </View>
                    <View className="flex-row py-1 border-b border-gray-200">
                        <Text>Giới tính</Text>
                        <Text className="right-0 bottom-1 absolute">{appointment.sex}</Text>
                    </View>
                    <View className="flex-row py-1 border-b border-gray-200">
                        <Text>Ngày sinh</Text>
                        <Text className="right-0 bottom-1 absolute">{appointment.dateOfBirth}</Text>
                    </View>
                    <View className="flex-row py-1 border-b border-gray-200">
                        <Text>Mối quan hệ</Text>
                        <Text className="right-0 bottom-1 absolute">{appointment.relationship}</Text>
                    </View>
                    <View className="flex-row py-1 border-b border-gray-200">
                        <Text>Số điện thoại</Text>
                        <Text className="right-0 bottom-1 absolute">{appointment.numberphone}</Text>
                    </View>
                    {
                        appointment.department?.id &&
                        <View className="flex-row py-1 border-b border-gray-200">
                            <Text>Chuyên khoa</Text>
                            <Text className="right-0 bottom-1 absolute">{appointment.department.name}</Text>
                        </View>
                    }
                    <View className="flex-row py-1 border-b border-gray-200">
                        <Text>Ngày khám</Text>
                        <Text className="right-0 bottom-1 absolute">{appointment.date}</Text>
                    </View>
                    <View className="flex-row py-1 border-b border-gray-200">
                        <Text>Giờ khám</Text>
                        <Text className="right-0 bottom-1 absolute">{appointment.hour}</Text>
                    </View>
                    <View className="flex-row py-1 border-b border-gray-200">
                        <Text>Loại</Text>
                        <Text className="right-0 bottom-1 absolute">{dictionary[appointment.type]}</Text>
                    </View>
                    {
                        appointment.package?.id &&
                        <View className="flex-row py-1 border-b border-gray-200">
                            <Text>Gói khám</Text>
                            <Text className="right-0 bottom-1 absolute">{appointment.package?.name}</Text>
                        </View>
                    }
                    {
                        selectedDoctor.id &&
                        <View className="flex-row py-1 border-b border-gray-200">
                            <Text>Bác sĩ</Text>
                            <Text className="right-0 bottom-1 absolute">{selectedDoctor.name}</Text>
                        </View>
                    }

                </View>

                <Text className="font-bold text-lg m-2">Chọn bác sĩ {appointment?.department ? `khoa: ${appointment?.department.name}` : ""}</Text>
                
                <View className="flex-column justify-center align-center">
                    <View className="bg-gray-200 rounded-full px-3 py-2 w-full flex-row items-center">
                        {search.isSearch ? (
                            <Ionicons name="search" size={20} color="black" />
                        ) : (
                            <Ionicons name="search" size={20} color="gray" />
                        )}

                        <TextInput
                            className="pl-2" placeholder='Nhập tên bác sĩ'
                            onChangeText={(val) => searchChange(val)}
                            onEndEditing={() => searchInfo(search)}
                        />
                    </View>

                    <ScrollView className="min-h-screen">
                        <View>
                            {
                                loading && <ActivityIndicator></ActivityIndicator>
                            }
                            {!loading && doctors.length === 0 && <Text className="m-2 text-center">Không có bác sĩ phù hợp</Text>}
                            {
                                !loading && doctors.map((doctor, index) => {
                                    return <DoctorItem
                                        key={`doctor-item-${index}-${doctor.id}`}
                                        id={doctor.id}
                                        name={doctor.name}
                                        image={doctor.avatar}
                                        department={doctor.department}
                                        choose={() => {
                                            if (doctor.id !== selectedDoctor.id) {
                                                setSelectedDoctor({
                                                    id: doctor.id,
                                                    name: doctor.name
                                                })
                                            }
                                        }}
                                        selectedDoctor={selectedDoctor.id === doctor.id}
                                    />
                                })
                            }
                        </View>
                    </ScrollView>
                </View>
            </View>
        </>
    )
}

const DoctorItem = (props) => {
    const navigation = useNavigation()

    return (
        <View>
            <View className="h-0.5 w-full bg-gray-200 my-1" />
            <View
                className={"flex-row items-center p-1 " + props.extStyles}
                style={props.selectedDoctor && styles.selectedDoctor}
            >
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Detail doctor", { id: props.id })
                    }}
                >
                    <View className="ml-2 bg-transparent h-16 w-16 rounded-full items-center justify-center"
                    >
                        <Image src={props.image} className='object-scale-down h-16 w-16 rounded-full' />
                    </View>
                </TouchableOpacity>
                <View className="flex-1 px-1 mx-2">
                    <Text className="w-2/3 text-left break-normal font-semibold justify-center">{props.name}</Text>
                    <Text className="w-2/3 text-left break-normal font-light justify-center">{props.department}</Text>
                </View>
                <View className="flex-row items-center justify-items-center ml-auto">
                    <TouchableOpacity className="bg-[#ccc] p-3 rounded-lg mr-2"
                        onPress={() => props.choose()}
                    >
                        {
                            props.selectedDoctor ?
                                <Text className="font-bold text-gray-700">Đã chọn</Text>
                                :
                                <Text className="font-bold text-gray-700">Chọn</Text>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    selectedDoctor: {
        backgroundColor: '#1AD1FF'
    }
})