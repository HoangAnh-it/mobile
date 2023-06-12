import { View, Text, TouchableOpacity } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from "react-native-gesture-handler";
import Profile from "../../component/Utils/Profile";
import useAxios from "../../hooks/useAxios";
import React, { useEffect } from "react";
import useSocket from "../../hooks/useSocket";

const toProfile = (profile) => {
    return {
        id: profile.medicalRecordId,
        name: profile.name,
        gender: profile.gender,
        birthDay: profile.birthDay.split('T')[0],
        relationship: profile.relationship,
        phone: profile.phone,
        address: profile.address
    }
}

export default function ListProfile({ navigation, route }) {
    const onlyShow = route.params.onlyShow || false
    const [selected, setSelected] = React.useState(null);
    const [profiles, setProfiles] = React.useState([])
    const axios = useAxios()
    const socket = useSocket()

    useEffect(() => {
        axios.get("/patient/medical_record")
            .then(res => res.data.data)
            .then(data => {
                setProfiles(data.map(profile => toProfile(profile)))
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })
    }, [])
    
    useEffect(() => {
        const deleteMedicalRecordListener = (id) => {
            setProfiles(prev => prev.filter(i => i.id !== id))
        }

        const newMedicalRecord = (data) => {
            console.log(data)
            setProfiles(prev => [...prev, toProfile(data)])
        }

        const updateMedicalRecordListener = (data) => {
            console.log("on update medical record", data)
            setProfiles(prev => {
                const index = prev.findIndex(item => item.id === data.id)
                console.log("index;::", index)
                if (index >= 0) {
                    prev[index] = {
                        ...prev[index],
                        ...data
                    }
                }
                return [...prev]
            })
        }

        socket.on('delete medical record', deleteMedicalRecordListener)
        socket.on('medical record', newMedicalRecord)
        socket.on('update medical record', updateMedicalRecordListener)

        return () => {
            socket.off('delete medical record', deleteMedicalRecordListener)
            socket.off('medical record', newMedicalRecord)
            socket.off('update medical record', updateMedicalRecordListener)
        }
    }, [socket])

    const chooseNext = () => {
        navigation.navigate("Chọn chuyên khoa", { profile: selected, hospital: route.params.hospital })
    }

    return (
        <View>
            <TouchableOpacity
                onPress={() => { navigation.navigate("Tạo hồ sơ") }}
                className="flex-row m-4 mb-2 p-5 rounded-md bg-white shadow-sm"
            >
                <Text className="text-base font-bold w-11/12" style={{ color: "#1AD1FF" }}>Thêm hồ sơ</Text>
                <Ionicons name="add-circle" size={24} color="#1AD1FF" />
            </TouchableOpacity>
            <ScrollView className="mb-20">
                {
                    profiles.map(profile => {
                        return (
                            onlyShow ?
                                <Profile
                                    key={profile.id}
                                    selected={selected != null && profile.id == selected.id}
                                    id={profile.id}
                                    name={profile.name}
                                    gender={profile.gender}
                                    birthDay={profile.birthDay}
                                    relationship={profile.relationship}
                                    phone={profile.phone}
                                    address={profile.address}
                                    onlyShow={onlyShow}
                                />
                                :
                                <TouchableOpacity key={profile.id} onPress={() => { setSelected(profile) }}>
                                    <Profile
                                        selected={selected != null && profile.id == selected.id}
                                        id={profile.id}
                                        name={profile.name}
                                        gender={profile.gender}
                                        birthDay={profile.birthDay}
                                        relationship={profile.relationship}
                                        phone={profile.phone}
                                        address={profile.address}
                                        onlyShow={onlyShow}
                                    />
                                </TouchableOpacity>
                        )
                    })
                }
                {
                    !onlyShow && selected &&
                    <TouchableOpacity
                        className="m-auto w-1/3 p-2 mt-4 mb-8 rounded" style={{ backgroundColor: "#1AD1FF" }}
                        onPress={chooseNext}
                    >
                        <Text className="text-white font-bold text-center">Tiếp theo</Text>
                    </TouchableOpacity>
                }

            </ScrollView>
        </View>
    )
}