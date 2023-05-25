import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Post from "../../component/Post/Post";

import useAxios from '../../hooks/useAxios'

export default function ListDoctor({ navigation, route }) {
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
                id: 3,
                name: "Nguyễn Thị C",
                department: "Khoa tim mạch",
                stars: 5,
                imageURL: "https://icon-library.com/images/icon-avatar/icon-avatar-6.jpg"
            }
        ])
    }

    const [listHospitals, setListHospital] = React.useState([
        {
            id: 1,
            name: "Nguyễn Văn A",
            department: "Khoa thần kinh",
            stars: 4,
            imageURL: "https://static.vecteezy.com/system/resources/previews/001/223/214/original/female-doctor-wearing-a-medical-mask-vector.jpg"
        }, 
        {
            id: 2,
            name: "Nguyễn Văn B",
            department: "Khoa sản",
            stars: 4,
            imageURL: "https://www.citypng.com/public/uploads/preview/free-round-flat-male-portrait-avatar-user-icon-png-11639648873oplfof4loj.png?v=2023050603"
        },
        {
            id: 3,
            name: "Nguyễn Thị C",
            department: "Khoa tim mạch",
            stars: 5,
            imageURL: "https://icon-library.com/images/icon-avatar/icon-avatar-6.jpg"
        },
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
                                    <TouchableOpacity onPress={() => { navigation.navigate("Thông tin bác sĩ", { id: item.id }) }}>
                                        <DoctorBrief key={`doctor-${index}-${item.id}`} id={item.id} name={item.name} department={item.department} stars={item.stars} image={item.imageURL}/>
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

function DoctorBrief(props) {
    return (
        <>
        <View className="h-0.5 w-full bg-gray-200" />
        <View className="p-2 h-20 w-full flex-row items-center text-center rounded-lg">
            <View className="ml-2 bg-transparent h-16 w-16 rounded-full items-center justify-center">
                <Image src={props.image} className='object-scale-down h-16 w-16 rounded-full' />
            </View>
            <View className="left-3 w-full">
                <Text className="w-2/3 text-left break-normal font-semibold justify-center">{props.name}</Text>
                <View className="w-2/3 flex-row">
                    <MaterialIcons name={props.stars >= 1 ? "star" : "star-border"} size={25} style={props.stars >= 1 ? styles.starSelected : styles.starUnselected} />
                    <MaterialIcons name={props.stars >= 2 ? "star" : "star-border"} size={25} style={props.stars >= 2 ? styles.starSelected : styles.starUnselected} />
                    <MaterialIcons name={props.stars >= 3 ? "star" : "star-border"} size={25} style={props.stars >= 3 ? styles.starSelected : styles.starUnselected} />
                    <MaterialIcons name={props.stars >= 4 ? "star" : "star-border"} size={25} style={props.stars >= 4 ? styles.starSelected : styles.starUnselected} />
                    <MaterialIcons name={props.stars == 5 ? "star" : "star-border"} size={25} style={props.stars == 5 ? styles.starSelected : styles.starUnselected} />
                </View>
                <Text className="w-2/3 text-left break-normal font-normal justify-center">{props.department}</Text>
                <View className="w-1/5 absolute ml-60 mt-4">
                    <Ionicons name="caret-forward" size={24} color="#1ad1ff" />
                </View>
            </View>
        </View>
        <View style={{width: '1.2%'}}></View>
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