import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useAxios from '../../hooks/useAxios';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const AVATAR_DEFAULT = "https://static.vecteezy.com/system/resources/previews/001/223/214/original/female-doctor-wearing-a-medical-mask-vector.jpg"

const DoctorBrief = (props) => {
    const navigation = useNavigation()

    return (
        <>
            <View className="h-0.5 w-full bg-gray-200" />
            <TouchableOpacity onPress={() => navigation.navigate("Thông tin bác sĩ", {
                id: props.id
            })} className="p-2 h-20 w-full flex-row items-center text-center rounded-lg">
                <View className="ml-2 bg-transparent h-16 w-16 rounded-full items-center justify-center">
                    <Animatable.View className="bg-gray-100 h-16 w-16 rounded-full items-center justify-center" animation="fadeIn" easing="ease-in-out-quad" iterationCount={10}></Animatable.View>
                    <Image src={props.image} className='object-scale-down h-16 w-16 rounded-full absolute' />
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
                        <Ionicons name="caret-forward" size={24} color="#1AD1FF" />
                    </View>
                </View>
            </TouchableOpacity>
            <View style={{ width: '1.2%' }}></View>
        </>
    )
}

const DepartmentOption = ({department, choose, isChosen}) => {
    return (
        <>
            <TouchableOpacity onPress={() => choose(department.name)} style={isChosen ? styles.focus : styles.none} className="mt-2 p-2 h-20 w-40 flex-row items-center text-center rounded-lg border float-left">
                <View className="bg-gray-50 ml-1 h-16 w-16 rounded-full items-center justify-center">
                    <Animatable.View className="bg-gray-100 h-16 w-16 rounded-full items-center justify-center" animation="fadeIn" easing="ease-in-out-quad" iterationCount={10}></Animatable.View>
                    <Image source={{ uri: department.image }} className='object-scale-down h-16 w-16 rounded-full absolute ease-in' />
                </View>
                <Text style={isChosen ? styles.textColor : styles.none} className="left-1 w-16 text-left break-normal font-medium justify-center">{department.name}</Text>
            </TouchableOpacity>
            <View className="w-3.5"></View>
        </>
    )
}

export default function DoctorList({navigation}) {
    const [departmentChosen, chooseDepartment] = useState("Tất cả");
    const [departments, setDepartments] = useState([])
    const [doctors, setDoctors] = useState([])
    const axios = useAxios()
    
    const choose = (name) => {
        chooseDepartment(name);
    }
    
    const filterByDepartment = (docs) => {
        if(departmentChosen === 'Tất cả') return docs
        return docs.filter(d => d.department === departmentChosen)
    }

    React.useEffect(() => {
        axios.get("/department")
            .then(res => res.data.data)
            .then(d => {
                setDepartments([
                    {
                        name: 'Tất cả',
                        image: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/all.png?alt=media&token=255eb64c-6f1e-4a7b-ad7e-e6b2283ceb8a'
                    },
                    ...d.map(item => ({
                        name: item.name,
                        image: item.avatar
                    }))
                ])
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })
    }, [])

    React.useEffect(() => {
        axios.get(`/search-doctor/ `)
            .then(res => res.data.data.doctors)
            .then(d => {
                setDoctors(d.map(item => ({
                    id: item.userId,
                    name: item.name,
                    department: item.doctor.department.name,
                    imageURL: item.avatar,
                    star: 4
                })))
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <KeyboardAwareScrollView>
            <ScrollView pagingEnabled={true}>

                <View className="mt-2 mx-2 pt-2 bg-white rounded-xl w-fit max-w-s shadow-sm">
                    <Text style={styles.textColor} className="ml-2.5 text-slate-900 text-lg font-bold">
                        Chọn chuyên khoa
                    </Text>
                    <View className="h-0.5 w-full my-1 bg-gray-200" />

                    <ScrollView
                        className="w-fit p-2 -mb-3 h-56"
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View className="grid-rows-2 grid-flow-col">
                            <View className="flex-row mb-2">
                                {
                                    departments.slice(0, departments.length / 2).map((item, index) => {
                                        return <DepartmentOption key={`department-info-${index}-${item.name}`} department={item} choose={choose} isChosen={item.name === departmentChosen} />
                                    })
                                }
                            </View>
                            <View className="flex-row">
                                {
                                    departments.slice(departments.length / 2 + 1).map((item, index) => {
                                        return <DepartmentOption key={`department-info-${index}-${item.name}`} department={item} choose={choose} isChosen={item.name === departmentChosen} />
                                    })
                                }
                            </View>
                        </View>
                    </ScrollView>
                </View>
                
                <View className="mt-2 mx-2 pt-2 bg-white rounded-xl w-fit max-w-s shadow-sm">
                    <Text style={styles.textColor} className="ml-2.5 mb-1 text-slate-900 text-lg font-bold">
                        Danh sách bác sĩ
                    </Text>
                    {
                        filterByDepartment(doctors).length > 0 ?
                            filterByDepartment(doctors).map((item, index) => {
                                return <DoctorBrief key={`doctors-list=${index}`} id={item.id} name={item.name} department={item.department} stars={item.star} image={item.imageURL} />
                            })
                            :
                            <Text className="ml-2.5 mb-1">Không tìm thấy bác sĩ thuộc khoa "{departmentChosen}"</Text>
                    }
                </View>
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
    textColor: {
        color: "#1AD1FF",
        fontWeight: "bold"
    },
    bgColor: {
        backgroundColor: "#1AD1FF",
        borderColor: "#1AD1FF"
    },
    focus: {
        borderColor: "#1AD1FF",
        color: "#1AD1FF",
    },
    none: {
        fontWeight: "normal"
    },
  });