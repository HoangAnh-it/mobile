import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import useAxios from '../../hooks/useAxios'

export default function Search({navigation, route}) {
    const [search, setSearch] = React.useState(route.params?.search || {})

    const [doctorList, setDoctorList] = React.useState([])
    const [hospitalList, setHospitalList] = React.useState([])
    const [packageList, setPackageList] = React.useState([])

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
        navigation.navigate("Tìm kiếm");
    }

    const goToDoctorDetails = (id) => {
        navigation.navigate("Thông tin bác sĩ", {id});
    };

    const goToHospitalDetails = (id) => {
        navigation.navigate("Thông tin bệnh viện", {id});
    };

    const goToPackageDetails = (id) => {
        navigation.navigate("Chi tiết gói khám", {id});
    };

    React.useEffect(() => {
        if (!search.inputSearch || !search.inputSearch.trim())
            return;
        axios.get(`/search-preview/${search.inputSearch.trim()}`)
            .then(res => res.data.data)
            .then(data => {
                setDoctorList(data.doctors.map(d => ({
                    id: d.userId,
                    name: d.name,
                    department: d.doctor.department.name,
                    stars: 4,
                    imageURL: d.avatar || "https://static.vecteezy.com/system/resources/previews/001/223/214/original/female-doctor-wearing-a-medical-mask-vector.jpg"
                })) || [])

                setHospitalList(data.hospitals.map(h => ({
                    id: h.userId,
                    name: h.name,
                    address: h.address,
                    imageURL: h.avatar || "https://insmart.com.vn/wp-content/uploads/2021/05/BV-108-2.jpg",
                })) || [])

                setPackageList(data.testPackages.map(p => ({
                    id: p.testPackageId,
                    title: p.name,
                    image: require("./../../assets/demo-img/hospital.jpg"),
                    price: p.price,
                    hospital: p.hospital
                })) || [])

            }).catch(err => {
                console.log(JSON.stringify(err))
            })
    }, [search.inputSearch])

    const DoctorBrief = (props) => {
        return (
            <>
            <View className="h-0.5 w-full bg-gray-200" />
            <TouchableOpacity onPress={() => goToDoctorDetails(props.id)} className="p-2 h-20 w-full flex-row items-center text-center rounded-lg">
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
                        <Ionicons name="caret-forward" size={24} color="#1AD1FF" />
                    </View>
                </View>
            </TouchableOpacity>
            <View style={{width: '1.2%'}}></View>
            </>
        )
    }

    const HospitalBrief = (props) => {
        return (
            <>
            <View className="h-0.5 w-full bg-gray-200" />
            <TouchableOpacity onPress={() => goToHospitalDetails(props.id)} className="p-2 h-20 w-full flex-row items-center text-center rounded-lg">
                <View className="ml-2 bg-transparent h-16 w-16 rounded-lg items-center justify-center">
                    <Image src={props.image} className='object-scale-down h-16 w-16 rounded-lg' />
                </View>
                <View className="left-3 w-full">
                    <Text className="w-2/3 text-left break-normal font-semibold justify-center">{props.name}</Text>
                    <Text className="w-2/3 text-left break-normal font-normal justify-center">{props.address}</Text>
                    <View className="w-1/5 absolute ml-60 mt-5">
                        <Ionicons name="caret-forward" size={24} color="#1AD1FF" />
                    </View>
                </View>
            </TouchableOpacity>
            <View style={{width: '1.2%'}}></View>
            </>
        )
    }
    
    const PackageBrief = (props) => {
        return (
            <>
            <View className="h-0.5 w-full bg-gray-200" />
            <TouchableOpacity onPress={() => goToPackageDetails(props.id)} className="p-2 h-20 w-full flex-row items-center text-center rounded-lg">
                <View className="ml-2 bg-transparent h-16 w-16 rounded-lg items-center justify-center">
                    <Image source={props.image} className='object-scale-down h-16 w-16 rounded-lg' />
                </View>
                <View className="left-3 w-full">
                    <Text className="w-2/3 text-left break-normal font-semibold justify-center">{props.name}</Text>
                    <Text className="w-2/3 text-left break-normal font-normal justify-center">{props.price}</Text>
                    <Text className="w-2/3 text-left break-normal font-normal justify-center">{props.hospital.name}</Text>
                    <View className="w-1/5 absolute ml-60 mt-1">
                        <Ionicons name="caret-forward" size={24} color="#1AD1FF" />
                    </View>
                </View>
            </TouchableOpacity>
            <View style={{width: '1.2%'}}></View>
            </>
        )
    }

    return (
        <>
        <View className="flex-row pt-10 pb-2 px-5 space-x-2 bg-white">
            <View className='bg-gray-200 rounded-full px-3 py-2 w-11/12 flex-row items-center'>
                {search.isSearch ?
                    <Ionicons name='search' size={20} color="black" />
                    : <Ionicons name='search' size={20} color="gray" />
                }

                <TextInput
                    className="pl-2" placeholder='Nhập tên bác sĩ/bệnh viện'
                    defaultValue={search.inputSearch}
                    onChangeText={(val) => searchChange(val)}
                    onEndEditing={() => searchInfo()}
                />
            </View>
            <TouchableOpacity 
                className="w-1/12 justify-center items-center"
                onPress={() => {navigation.navigate("Thông báo")}}>
                <Ionicons name="notifications-outline" size={28} />
            </TouchableOpacity>
        </View>
        <KeyboardAwareScrollView>
            <ScrollView pagingEnabled={true}>
                
                <View className="my-2 mx-2 pt-2 bg-white rounded-xl w-fit max-w-s shadow-sm">
                    <Text style={styles.textColor} className="ml-2.5 mb-1 text-slate-900 text-lg font-bold">
                        Bác sĩ
                    </Text>
                        {
                            doctorList.map((item, index) => {
                                return <DoctorBrief key={`doctor-${index}-${item.id}`} id={item.id} name={item.name} department={item.department} stars={item.stars} image={item.imageURL}/>
                            })
                        }                    
                </View>
                
                <View className="mb-2 mx-2 pt-2 bg-white rounded-xl w-fit max-w-s shadow-sm">
                    <Text style={styles.textColor} className="ml-2.5 mb-1 text-slate-900 text-lg font-bold">
                        Bệnh viện
                    </Text>
                        {
                            hospitalList.map((item, index) => {
                                return <HospitalBrief key={`hospital-${index}-${item.id}`} id={item.id} name={item.name} address={item.address} image={item.imageURL}/>
                            })
                        }                    
                </View>
                
                <View className="mb-2 mx-2 pt-2 bg-white rounded-xl w-fit max-w-s shadow-sm">
                    <Text style={styles.textColor} className="ml-2.5 mb-1 text-slate-900 text-lg font-bold">
                        Gói khám
                    </Text>
                        {
                            packageList.map((item, index) => {
                                return <PackageBrief key={`package-${index}-${item.id}`} id={item.id} name={item.title} price={item.price} image={item.image} hospital={item.hospital} />
                            })
                        }                    
                </View>

            </ScrollView>
        </KeyboardAwareScrollView>  
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