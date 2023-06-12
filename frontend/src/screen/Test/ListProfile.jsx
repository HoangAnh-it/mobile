import { View, Text, TouchableOpacity } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from "react-native-gesture-handler";
import Profile from "../../component/Utils/Profile";
import React, { useEffect } from "react";
import useAxios from "../../hooks/useAxios";

export default function ListProfileTest({ navigation, route }) {
    const onlyShow = route.onlyShow
    const [selected, setSelected] = React.useState(null);
    const [profiles, setProfiles] = React.useState([]);

    const axios = useAxios();

    const { testPackage } = route.params;

    const chooseNext = () => {
        navigation.navigate("Chọn lịch xét nghiệm", { profile: selected, testPackage: testPackage })
    }

    React.useEffect(() => {
        axios.get("/patient/medical_record")
            .then(res => res.data.data)
            .then(data => {
                setProfiles(data.map(profile => ({
                    id: profile.medicalRecordId,
                    name: profile.name,
                    gender: profile.gender,
                    birthDay: profile.birthDay.split('T')[0],
                    relationship: profile.relationship,
                    phone: profile.phone,
                    address: profile.address
                })))
            })
    }, [])

    
    const listProfile = []
    profiles.forEach((profile) => {
        listProfile.push(
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
                />
            </TouchableOpacity>
        )
    })

    return (
        <View>
            <TouchableOpacity className="flex-row m-4 mb-2 p-5 rounded-md bg-white shadow-sm">
                <Text className="text-base font-bold w-11/12" style={{ color: "#1AD1FF" }}>Thêm hồ sơ</Text>
                <Ionicons name="add-circle" size={24} color="#1AD1FF" />
            </TouchableOpacity>
            <ScrollView className="mb-20">
                {listProfile}
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