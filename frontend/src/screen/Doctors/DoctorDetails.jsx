import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialIcons } from "@expo/vector-icons";
import useAxios from '../../hooks/useAxios'
import { useNavigation } from '@react-navigation/native';

const Details = (props) => {
    const navigation = useNavigation()

    const goToChat = (doctor) => {
        navigation.navigate("Chat Detail", { user: doctor });
    };

    return (
        <View className="items-center w-full min-h-full">
            <View className="w-full h-60">
                <Image
                    source={require("./../../assets/demo-img/hospital.jpg")}
                    className="object-cover w-full h-full overflow-hidden"
                    alt={props.name}
                />
            </View>
            <View className="-mt-2 p-4 bg-white rounded-t-xl w-full max-w-s shadow-sm">
                <Text className="pt-24 text-center mb-2 text-slate-900 text-2xl font-bold">Bác sĩ {props.name}</Text>
                <View className="m-auto flex-row">
                    <MaterialIcons name={props.stars >= 1 ? "star" : "star-border"} size={30} style={props.stars >= 1 ? styles.starSelected : styles.starUnselected} />
                    <MaterialIcons name={props.stars >= 2 ? "star" : "star-border"} size={30} style={props.stars >= 2 ? styles.starSelected : styles.starUnselected} />
                    <MaterialIcons name={props.stars >= 3 ? "star" : "star-border"} size={30} style={props.stars >= 3 ? styles.starSelected : styles.starUnselected} />
                    <MaterialIcons name={props.stars >= 4 ? "star" : "star-border"} size={30} style={props.stars >= 4 ? styles.starSelected : styles.starUnselected} />
                    <MaterialIcons name={props.stars == 5 ? "star" : "star-border"} size={30} style={props.stars == 5 ? styles.starSelected : styles.starUnselected} />
                </View>

                <TouchableOpacity style={styles.bgColor} className="w-full mt-4 p-2 text-center rounded-lg border"
                    onPress={() => goToChat({
                        id: props.id,
                        name: props.name,
                        avatar: props.imageURL
                    })}
                >
                    <Text className="text-white text-base text-center font-bold">Liên hệ</Text>
                </TouchableOpacity>
            </View>
            <View className="top-24 p-1.5 w-56 h-56 rounded-full absolute items-center justify-center bg-white">
                <Image
                    src={props.imageURL}
                    className="w-full h-full object-cover rounded-full"
                    alt={props.name}
                />
            </View>

            <View className="mt-1.5 p-4 bg-white w-full max-w-s shadow-sm">
                <Text className="text-slate-900 text-xl font-bold">Thông tin chi tiết</Text>
                <View className="p-1">
                    <Text className="text-slate-900 text-base font-normal text-justify">
                        Chức danh: {props.title}
                    </Text>
                    <View className="h-px mb-2 bg-gray-300 block" />
                    <TouchableOpacity className="w-fit" onPress={() => navigation.navigate("Thông tin bệnh viện", {
                        id: props.hospital?.id
                    })}>
                        <Text className="text-slate-900 text-base font-normal text-justify">
                            Nơi làm việc: {props.hospital?.name}
                        </Text>
                    </TouchableOpacity>
                    <View className="h-px mb-2 bg-gray-300" />
                    <Text className="text-slate-900 text-base font-normal text-justify">
                        Chuyên môn: {props.department}
                    </Text>
                    <View className="h-px mb-2 bg-gray-300" />
                </View>
            </View>
        </View>
    )
}

export default function DoctorDetails({ navigation, route }) {
    const id = route.params.id
    const [doctor, setDoctor] = React.useState({})
    const axios = useAxios()

    React.useEffect(() => {
        if(!id) return
        axios.get(`/user/profile/${id}`)
            .then(res => res.data.data)
            .then(user => {
                setDoctor({
                    id: user.userId,
                    name: user.name,
                    title: user.doctor.rank,
                    address: user.address,
                    department: user.doctor.department.name,
                    hospital: {
                        name: user.doctor.department.hospital.user.name,
                        id: user.doctor.department.hospital.user.userId
                    },
                    imageURL: user.avatar || "https://static.vecteezy.com/system/resources/previews/001/223/214/original/female-doctor-wearing-a-medical-mask-vector.jpg",
                    star: 4,
                })
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })
    }, [id])

    return (
        <KeyboardAwareScrollView>
            <ScrollView pagingEnabled={true}>
                <Details
                    key={`doctor-${doctor.id}-detail`}
                    id={doctor?.id}
                    name={doctor?.name}
                    title={doctor?.title}
                    address={doctor?.address}
                    department={doctor?.department}
                    stars={doctor?.star}
                    hospital={doctor?.hospital}
                    imageURL={doctor?.imageURL} />
            </ScrollView>
        </KeyboardAwareScrollView>  

    )
}

const styles = StyleSheet.create({ 
    starUnselected: {
        color: "#aaa",
    },
    starSelected: {
        color: "#ffb300",
    },
    bgColor: {
      backgroundColor: "#1AD1FF",
      borderColor: "#1AD1FF"
    },
  });