import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import useAxios from "../../hooks/useAxios";
import MedicalRecordItem from "./components/MedicalRecordItem";
import useAuth from "../../hooks/useAuth";
import useSocket from "../../hooks/useSocket";
import {  extractDay, extractTime } from "../../helpers/helpers";

import { dictionary } from "../../helpers/helpers";
import FilterMedicalRecord from "../components/FilterMedicalRecord";

const toAppointment = (data) => {
  return {
    id: data.appointmentId,
    name: data.medicalRecord.name,
    gender: data.medicalRecord.gender,
    birthDay:  extractDay(new Date(data.medicalRecord.birthDay)),
    relationship: data.medicalRecord.relationship,
    phone: data.medicalRecord.phone,
    department: {
      id: data.department?.departmentId || data.testPackage.department.departmentId,
      name: data.department?.name || data.testPackage.department.name
    },
    date: extractDay(new Date(data.dateTime)),
    hour: extractTime(new Date(data.dateTime)),
    status: data.status,
    type: data.department !== null ? 'FACE_TO_FACE' : 'AT_HOME',
    package: {
      id: data.testPackage?.testPackageId,
      name: data.testPackage?.name
    },
    doctor: data.doAppointment?.user.name
  }
}
  
export default function MedicalRecordManagement({ navigation }) {
  const [search, setSearch] = React.useState({
    inputSearch: "",
    isSearch: false,
  });
  const [filter, setFilter] = React.useState({
    status: 'ALL',
    type: 'ALL'
  })
  const [showFilterForm, setShowFilterForm] = React.useState(false)
  const [appointments, setAppointments] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const axios = useAxios()
  const { auth } = useAuth()._j
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
    if(!search.inputSearch.trim()) return data
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

  const fetch = () => {
    if (loading) return 
    setLoading(true)
    axios.get(`/hospital/${auth.user.id}/appointment?status=${filter.status}&type=${filter.type}&search=${search.inputSearch}`)
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
  }

  React.useEffect(() => {
    fetch()
  }, [filter])

  React.useEffect(() => {
    const statusAppointmentListener = (data) => {
      console.log(data)
      setAppointments(prev => {
        const index = prev.findIndex(e => e.id === data.id)
        if (index >= 0) {
          prev[index].status = data.status
          if (data.status === 'ACCEPTED') {
            prev[index].doctor = data.doctor
          }
        }
        return [...prev]
      })
    }

    socket.on('status appointment', statusAppointmentListener)
    return () => {
      socket.off('status appointment', statusAppointmentListener)
    }
  }, [socket])

  return (
    <>
      <StatusBar />
      <View className="flex-row pt-10 pb-2 px-4 space-x-2 bg-white">
        <View className="bg-gray-200 rounded-full px-3 py-2 w-11/12 flex-row items-center">
          {search.isSearch ? (
            <Ionicons name="search" size={20} color="black" />
          ) : (
            <Ionicons name="search" size={20} color="gray" />
          )}
  
          <TextInput
            className="pl-2" placeholder='Nhập tên bệnh nhân'
            onChangeText={(val) => searchChange(val)}
            onEndEditing={() => searchInfo(search)}
          />
        </View>
        <TouchableOpacity
          className="w-1/12 justify-center items-center"
          onPress={() => notification()}>
          <Ionicons name="notifications-outline" size={28} />
        </TouchableOpacity>
        <FilterMedicalRecord
          value={filter}
          setValue={setFilter}
          isShow={showFilterForm}
          setIsShown={setShowFilterForm}
          role="HOSPITAL"
        />
      </View>

      {/** Filter */}
      <View className="flex flex-row">

        <View className="px-1 fixed flex flex-row justify-items-end">
          <TouchableOpacity
            className="px-1 flex flex-row justify-items-center items-center py-2 mx-1 border-transparent bg-gray-300 rounded-lg"
            style={{
              borderWidth: 1,
              borderBottomColor: '#ccc',
            }}
            onPress={() => setShowFilterForm(true)}
          >
            <Ionicons name="settings-outline" size={20} color={"gray"} />
            <Text
              className="font-bold mx-1 text-sm"
            >Tùy chọn:</Text>
          </TouchableOpacity>
        </View>

        <View className="flex flex-row items-center justify-items-center text-sm">
          <Text className="ml-2.5">{dictionary[filter.type]}</Text>
          <Text className="ml-2.5"> --- </Text>
          <Text className="ml-2.5">{dictionary[filter.status]}</Text>
          <Text className="ml-2.5"> --- </Text>
          <Text className="ml-2.5">{filterSearch(temporaryFilter(appointments, filter)).length} hồ sơ</Text>
        </View>

      </View>

      {/** body */}
      <ScrollView className="m-h-screen">
        <LinearGradient
          colors={['#ffffff', '#66e0ff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="min-h-screen"
        >
          <View
            className="flex-1 flex-column justify-items-center w-full"
          >
            {
              loading &&
              <View className="flex-1 items-center justify-center" >
                <ActivityIndicator size="large" />
              </View>
            }
            {
              !loading && filterSearch(temporaryFilter(appointments, filter)).length === 0 &&
                <Text className="mt-2 text-center">Không có cuộc hẹn nào</Text>
            }
            {
              !loading && filterSearch(temporaryFilter(appointments, filter)).map((appo, index) => {
                return <MedicalRecordItem key={`MedicalRecordItem-${index}-${appo.id}`} className="flex-1" data={appo} />
              })
            }
          </View>
  
        </LinearGradient>
      </ScrollView>
    </>
  );
}