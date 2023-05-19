import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import useAxios from "../../hooks/useAxios";
import * as Animatable from 'react-native-animatable';

const DepartmentOption = ({department, choose}) => {
    return (
        <>
            <TouchableOpacity
                onPress={() => choose(department)}
                className="m-2 p-2 h-20 w-2/5 flex-row items-center text-center rounded-lg float-left bg-white shadow-sm"
                style={(department.selected) ? styles.focus : styles.none}
            >
                <View className="ml-1 bg-slate-50 h-16 w-16 rounded-full items-center justify-center">
                    <Animatable.View className="bg-gray-100 h-16 w-16 rounded-full items-center justify-center" animation="fadeIn" easing="ease-in-out-quad" iterationCount={10}></Animatable.View>
                    <Image source={{
                        uri: department.image
                    }} className='object-scale-down h-16 w-16 rounded-full absolute' />
                </View>
                <Text
                    style={(department.selected) ? styles.textColor : styles.none}
                    className="left-2 w-16 text-left break-normal font-medium justify-center"
                    numberOfLines={3}
                >
                    {department.name}
                </Text>
            </TouchableOpacity>
        </>
    )
}

export default function ListDepartment({ route, navigation }) {
    const { profile, hospital } = route.params;
    const [departments, setDepartments] = React.useState([]);
    const [selected, setSelected] = React.useState({});
    const axios = useAxios()

    const choose = (department) => {
        setSelected(department)
    }

    React.useEffect(() => {
        axios.get(`/hospital/${hospital}/department`)
            .then(res => res.data.data)
            .then(data => {
                setDepartments(data.map(department => ({
                    id: department.departmentId,
                    name: department.name,
                    image: department.avatar
                })))
            }).catch(function (err) {
                console.error(err);
            })
    }, [])

    const departmentList = [];

    for (i = 0; i < departments.length; i += 2) {
        if (i + 1 < departments.length) {
            item1 = departments.at(i);
            item2 = departments.at(i + 1);
            departmentList.push(
                <View key={`DepartmentOption-1-${i}`} className="w-screen flex-row justify-center">
                    <DepartmentOption
                        key={item1.id}
                        department={{
                            id: item1.id,
                            name: item1.name,
                            image: item1.image,
                            selected: selected.id === item1.id,
                        }}
                        choose={choose} />
                    <DepartmentOption
                        key={item2.id}
                        department={{
                            id: item2.id,
                            name: item2.name,
                            image: item2.image,
                            selected: selected.id === item2.id,
                        }}
                        choose={choose} />
                </View>
            )
        } else {
            item = departments.at(i)
            departmentList.push(
                <View key={`DepartmentOption-2-${i}`} className="w-screen flex-row justify-center">
                    <DepartmentOption
                        key={item.id}
                        department={{
                            id: item.id,
                            name: item.name,
                            image: item.image,
                            selected: selected.id === item.id,
                        }}
                        choose={choose} />
                </View>
            )
        }
    }


    const chooseNext = () => {
        navigation.navigate("Đặt lịch", {
            profile: profile, hospital: hospital, department: selected
        })
    }

    return (
        <View className="items-center">
            <ScrollView className="w-screen mb-8">
                {
                    departments.length === 0 &&
                    <Text className="text-center mt-4">Không tìm thấy khoa nào</Text>
                }
                {
                    departmentList
                }
                {
                    Object.keys(selected).length > 0 &&
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

const styles = StyleSheet.create({
    textColor: {
        color: "white",
        fontWeight: "bold"
    },
    focus: {
        backgroundColor: "#1AD1FF",
    },
    none: {
        fontWeight: "normal"
    },
});