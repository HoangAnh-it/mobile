import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import useAxios from '../../hooks/useAxios';

const Details = (props) => {
    const navigation = useNavigation()

    const goToScheduling = () => {
        navigation.navigate("Hồ sơ", { hospital: props.id });
    };

    return (
        <View className="items-center w-full min-h-full">
            <View className="w-full h-60">
                <Image
                    src={props.imageURL}
                    className="object-cover w-full h-full overflow-hidden"
                    alt={props.name}
                />
            </View>
            <View className="-mt-2 p-4 bg-white rounded-t-xl w-full max-w-s shadow-sm">
                <Text className=" mb-2 text-slate-900 text-2xl font-bold">{props.name}</Text>
                <Text className="text-slate-900 text-base font-normal">
                Địa chỉ: {props.address}
                </Text>
                <View className="h-px my-2 bg-gray-300" />
                
                <TouchableOpacity style={styles.bgColor} className="w-full mt-2 p-2 text-center rounded-lg border"
                    onPress={goToScheduling}
                    >
                    <Text className="text-white text-base text-center font-bold">Đặt khám</Text>
                </TouchableOpacity>
            </View>

            <View className="mt-1.5 p-4 bg-white w-full max-w-s shadow-sm">
                <Text className="mb-1.5 text-slate-900 text-xl font-bold">Mô tả chi tiết</Text>
                <Text className="text-slate-900 text-base font-normal text-justify">
                {props.description}
                </Text>
            </View>
        </View>
)}

export default function HospitalDetails({navigation, route}) {
    const id = route.params.id
    const [hospital, setHospital] = React.useState({})
    const axios = useAxios()

    React.useEffect(() => {
        if (!id) {
            return
        }
        axios.get(`/hospital/${id}`)
            .then(res => res.data.data)
            .then(h => {
                setHospital({
                    id: h.userId,
                    name: h.name,
                    address: h.address,
                    imageURL: h.avatar || "https://insmart.com.vn/wp-content/uploads/2021/05/BV-108-2.jpg",
                    description: h.hospitals.description
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
                    key={`hospital-${hospital.id}`}
                    id={hospital.id}
                    name={hospital.name}
                    address={hospital.address}
                    hospital={hospital.name}
                    imageURL={hospital.imageURL}
                    description={hospital.description}
                />
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({ 
    bgColor: {
      backgroundColor: "#24DCE2",
      borderColor: "#24DCE2"
    },
  });