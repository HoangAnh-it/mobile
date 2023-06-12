import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import useAxios from "../../hooks/useAxios";
import { extractDate, extractDay } from "../../helpers/helpers";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { dictionary } from "../../helpers/helpers";
import { Ionicons } from "@expo/vector-icons";
import FilterMedicalRecord from "../components/FilterMedicalRecord";
import AppointmentItem from "./components/AppointmentItem";
import useSocket from "../../hooks/useSocket";

const toAppointment = (data) => {
    return {
        id: data.appointmentId,
        name: data.medicalRecord.name,
        gender: data.medicalRecord.gender,
        birthDay: extractDay(new Date(data.medicalRecord.birthDay)),
        date: extractDate(new Date(data.dateTime)),
        type: data.department !== null ? 'FACE_TO_FACE' : 'AT_HOME',
        phone: data.medicalRecord.phone,
        address: data.medicalRecord.address,
        status: data.status,
        result: data.medicalResult
    };
};

export default function Appointments({ navigation }) {
    const [appointments, setAppointments] = React.useState([]);
    const [search, setSearch] = React.useState({
        inputSearch: "",
        isSearch: false,
    });
    const [filter, setFilter] = React.useState({
        status: 'ALL',
        type: 'ALL'
    });
    const [loading, setLoading] = React.useState(false)
    const [showFilterForm, setShowFilterForm] = React.useState(false)
    const axios = useAxios();
    const socket = useSocket()

    const searchChange = (val) => {
        if (val.length != 0) {
            setSearch({
                inputSearch: val,
                isSearch: true,
            });
        } else {
            setSearch({
                inputSearch: val,
                isSearch: false,
            });
        }
    };

    const searchInfo = () => {
    }

    const filterSearch = (data) => {
        if (!search.inputSearch.trim()) return data
        return data.filter(d => d.name.toLowerCase().includes(search.inputSearch.toLowerCase().trim())
        )
    };

    const notification = () => {
        navigation.navigate("Thông báo");
    };

    const temporaryFilter = (data, _filter) => {
        if (_filter.status === 'ALL' && _filter.type === 'ALL') return data
        return data.filter(d => {
            return (_filter.status !== 'ALL' && _filter.status === d.status) || (_filter.type !== 'ALL' && d.type === _filter.type);
        })
    }

    React.useEffect(() => {
        if (loading) return
        console.log({ ...filter, search: search.inputSearch })
        setLoading(true)
        axios.get(`/doctor/appointment?status=${filter.status}&type=${filter.type}&search=${search.inputSearch}`)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data.data.length)
                    setAppointments(res.data.data.map(d => toAppointment(d)))
                    setTimeout(() => {
                        setLoading(false)
                    }, 300)
                }
            }).catch(err => {
                console.log(JSON.stringify(err))
                setLoading(false)
            })
    }, [filter]);

    React.useEffect(() => {
        const medicalResultListener = (data) => {
            setAppointments(prev => {
                const index = prev.findIndex(e => e.id === data.id)
                if (index >= 0) {
                    prev[index].status = data.status
                    prev[index].result = data.result
                }
                return [...prev]
              })
        }

        socket.on("medical result", medicalResultListener)
        
        return () => {
            socket.off("medical result", medicalResultListener)
        }
    }, [socket])

    return (
        <View className="">
            {/** Filter */}
            <FilterMedicalRecord
                value={filter}
                setValue={setFilter}
                isShow={showFilterForm}
                setIsShown={setShowFilterForm}
                role="DOCTOR"
            />
            <View className="flex flex-row p-2 bg-gray-100 shadow-lg z-40">
                <View className="px-1 fixed flex flex-row justify-items-end">
                    <TouchableOpacity
                        className="px-1 flex flex-row justify-items-center items-center py-2 mx-1 border-transparent bg-gray-300 rounded-lg"
                        style={{
                            borderWidth: 1,
                            borderBottomColor: "#ccc",
                        }}
                        onPress={() => setShowFilterForm(true)}
                    >
                        <Ionicons name="settings-outline" size={20} color={"gray"} />
                        <Text className="font-bold mx-1 text-sm">Tùy chọn:</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex flex-row items-center justify-items-center text-sm">
                    <Text className="ml-2.5">{dictionary[filter.type]}</Text>
                    <Text className="ml-2.5"> --- </Text>
                    <Text className="ml-2.5">{dictionary[filter.status]}</Text>
                    <Text className="ml-2.5"> --- </Text>
                    <Text className="ml-2.5">
                        {filterSearch(temporaryFilter(appointments, filter)).length} hồ sơ
                    </Text>
                </View>
            </View>

            <ScrollView className="m-4 mt-0">
                {
                    loading &&
                    <View className="flex-1 items-center justify-center" >
                        <ActivityIndicator size="large" />
                    </View>
                }
                {
                    !loading && appointments.length === 0 &&
                    <Text className="mt-2 text-center">Không có cuộc hẹn nào</Text>
                }
                {
                    !loading && appointments.map((a, index) => {
                        return <AppointmentItem
                            key={`AppointmentItem-${index}-${a.id}`}
                            data={a}
                        />
                    })
                }
            </ScrollView>
        </View>
    );
}

