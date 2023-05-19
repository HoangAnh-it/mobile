import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Post from "../../component/Post/Post";

import useAxios from '../../hooks/useAxios'

export default function ListHospital({ navigation, route }) {
    const [search, setSearch] = React.useState(route.params?.search || {})

    const axios = useAxios()

    const searchChange = (val) => {
        if (val.length != 0) {
            setSearch({
                inputSearch: val,
                isSearch: true
            });
        } else {
            setSearch({
                inputSearch: val,
                isSearch: false
            });
        }
    }

    const searchInfo = () => {
        // ghep api search hospital
        setListHospital([
            {
                id: 2,
                name: "Bệnh viện Bạch Mai",
                address: "số 78 đường Giải Phóng, Phương Mai, Đống Đa, Hà Nội.",
                imageURL: "https://cdn.baoquocte.vn/stores/news_dataimages/lananh/032020/22/11/in_article/benh-vien-bach-mai-ra-thong-bao-tam-dung-kham-benh-theo-yeu-cau.jpg"
            }
        ])
    }

    const [listHospitals, setListHospital] = React.useState([
        {
            id: 1,
            name: "Bệnh viện Trung ương Quân đội 108",
            address: "1B Trần Hưng Đạo, Bạch Đằng, Hai Bà Trưng, Hà Nội",
            imageURL: "https://static.vecteezy.com/system/resources/previews/001/223/214/original/female-doctor-wearing-a-medical-mask-vector.jpg"
        }
    ])

    return (
        <View className="bg-white">
            <View className="flex-row pt-10 pb-2 px-5 space-x-2">
                <View className='bg-gray-200 rounded-full px-3 py-2 w-full flex-row items-center'>
                    {search.isSearch ?
                        <Ionicons name='search' size={20} color="black" />
                        : <Ionicons name='search' size={20} color="gray" />
                    }

                    <TextInput
                        className="pl-2" placeholder='Nhập tên bệnh viện'
                        defaultValue={search.inputSearch}
                        onChangeText={(val) => searchChange(val)}
                        onEndEditing={() => searchInfo()}
                    />
                </View>
            </View>
            <KeyboardAwareScrollView>
                <ScrollView className="flex-1">
                    <View className="my-2 mx-2 pt-2 bg-white rounded-xl w-fit max-w-s shadow-sm">
                        {
                            listHospitals.map((item, index) => {
                                return (
                                    <TouchableOpacity onPress={() => { navigation.navigate("Thông tin bệnh viện", { id: item.id }) }}>
                                        <HospitalBrief key={`hospital-${index}-${item.id}`} id={item.id} name={item.name} address={item.address} image={item.imageURL} />
                                    </TouchableOpacity>
                                )
                            })
                        }

                    </View>

                </ScrollView>
            </KeyboardAwareScrollView>
        </View>
    )
}

function HospitalBrief(props) {
    return (
        <>
            <View className="h-0.5 w-full bg-gray-200" />
            <View className="p-2 h-20 w-full flex-row items-center text-center rounded-lg">
                <View className="ml-2 bg-transparent h-16 w-16 rounded-lg items-center justify-center">
                    <Image src={props.image} className='object-scale-down h-16 w-16 rounded-lg' />
                </View>
                <View className="left-3 w-full">
                    <Text className="w-2/3 text-left break-normal font-semibold justify-center">{props.name}</Text>
                    <Text className="w-2/3 text-left break-normal font-normal justify-center">{props.address}</Text>
                    <View className="w-1/5 absolute ml-60 mt-5">
                        <Ionicons name="caret-forward" size={24} color="#1ad1ff" />
                    </View>
                </View>
            </View>
            <View style={{ width: '1.2%' }}></View>
        </>
    )
}

const styles = StyleSheet.create({
    starUnselected: {
        color: "#aaa",
    },
    starSelected: {
        color: "#ffb300",
    },
    textColor: {
        color: "#1ad1ff",
        fontWeight: "bold"
    },
    bgColor: {
        backgroundColor: "#1ad1ff",
        borderColor: "#1ad1ff"
    },
    focus: {
        borderColor: "#1ad1ff",
        color: "#1ad1ff",
    },
    none: {
        fontWeight: "normal"
    },
});