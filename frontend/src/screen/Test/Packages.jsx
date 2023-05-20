import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useAxios from "../../hooks/useAxios";
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

PackageBrief = ({ _package }) => {
    const { description, ...other } = _package
    const navigation = useNavigation()

    const goToPackageDetails = (pack) => {
        console.log(pack)
        navigation.navigate("Chi tiết gói khám", pack);
    };

    const goToSchedulings = (pack) => {
        navigation.navigate("Hồ sơ xét nghiệm", { testPackage: pack });
    };

    return (
        <Animatable.View animation='fadeInRight' className="mt-2 mx-2 bg-white rounded-xl w-fit max-w-s shadow-sm">
            <View className="w-fit m-2 -mb-4 h-56">
                <Image
                    source={_package.image}
                    className="object-cover w-full rounded-xl"
                    alt={_package.title}
                />
            </View>
            <View className="m-3 mt-0 mb-2 flex">
                <Text className="text-slate-900 text-lg font-bold">
                    {_package.title}
                </Text>
                <Text className="text-slate-900 mt-1 font-normal">
                    Giá đặt khám: {_package.price}đ
                </Text>
                <Text className="text-slate-900 font-normal">
                    Bệnh viện: {_package.hospital}
                </Text>
                <View className="flex-row">
                    <TouchableOpacity style={styles.borderColor} className="mt-2 p-2 text-center rounded-lg border float-left"
                        onPress={() => goToPackageDetails(_package)}
                    >
                        <Text style={styles.textColor} className="text-center text-base font-bold">Xem chi tiết</Text>
                    </TouchableOpacity>
                    <View style={{ width: '4%' }}></View>
                    <TouchableOpacity style={styles.bgColor} className="mt-2 p-2 text-center rounded-lg border float-right"
                        onPress={() => goToSchedulings(_package)}
                    >
                        <Text className="text-white text-base text-center font-bold">Đặt lịch hẹn</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Animatable.View>
    )
}

export default function Packages({ navigation }) {
    const axios = useAxios();
    const [packages, setPackages] = React.useState([]);

    React.useEffect(() => {
        axios.get("/test_package")
            .then(res => res.data.data)
            .then(data => {
                setPackages(data.map(pk => ({
                    id: pk.testPackageId,
                    title: pk.name,
                    address: pk.hospital.user.address,
                    image: require("./../../assets/demo-img/hospital.jpg"),
                    price: pk.price,
                    description: pk.description,
                    hospital: pk.hospital?.user?.name
                })))
            })
    }, [])

    

    const packageList = [];
    packages.forEach((pack) => {
        packageList.push(<PackageBrief key={`PackageBrief-${pack.id}`} _package={pack}/>)
    })


    return (
        <KeyboardAwareScrollView>
            <ScrollView pagingEnabled={true}>
                <View className="items-center">

                    {packageList}

                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}


const styles = StyleSheet.create({
    textColor: {
        color: "#1AD1FF"
    },
    bgColor: {
        backgroundColor: "#1AD1FF",
        borderColor: "#1AD1FF",
        width: "48%"
    },
    borderColor: {
        borderColor: "#1AD1FF",
        width: "48%"
    },
});