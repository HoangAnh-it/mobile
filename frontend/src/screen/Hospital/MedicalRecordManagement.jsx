import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  ActivityIndicator
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import useAxios from "../../hooks/useAxios";
import MedicalRecordItem from "./components/MedicalRecordItem";
import useAuth from "../../hooks/useAuth";
import useSocket from "../../hooks/useSocket";
import { extractDate, extractDay, extractTime } from "../../helpers/helpers";

import { dictionary } from "../../helpers/helpers";

const toAppointment = (data) => {
  return {
    id: data.appointmentId,
    fullname: data.medicalRecord.name,
    sex: data.medicalRecord.gender,
    dateOfBirth:  extractDay(new Date(data.medicalRecord.birthDay)),
    relationship: data.medicalRecord.relationship,
    numberphone: data.medicalRecord.phone,
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
    return data.filter(d => d.fullname.toLowerCase().includes(search.inputSearch.toLowerCase().trim())
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
    console.log({...filter, search: search.inputSearch})
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
      <View className="flex-row pt-10 pb-2 px-5 space-x-2 bg-white">
        <FilterForm
          value={filter}
          setValue={setFilter}
          isShow={showFilterForm}
          setIsShown={setShowFilterForm}
        />
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
      </View>

      {/** Filter */}
      <View className="flex flex-row">

        <View className="fixed flex flex-row justify-items-end">
          <TouchableOpacity
            className="flex flex-row justify-items-center items-center py-2 mx-1 border-transparent bg-gray-300 rounded-lg"
            style={{
              borderWidth: 1,
              borderBottomColor: '#ccc',
            }}
            onPress={() => setShowFilterForm(true)}
          >
            <Ionicons name="settings-outline" size={20} color={"gray"} />
            <Text
              className="font-bold mx-1 text-sm "
            >Tùy chọn:</Text>
          </TouchableOpacity>
        </View>

        <View className="flex flex-row items-center justify-items-center text-sm">
          <Text className="">{dictionary[filter.type]}</Text>
          <Text> --- </Text>
          <Text className="">{dictionary[filter.status]}</Text>
          <Text> --- </Text>
          <Text className="">{filterSearch(temporaryFilter(appointments, filter)).length} hồ sơ</Text>
        </View>

      </View>

      {/** body */}
      <ScrollView className="m-h-screen">
        <LinearGradient
          colors={['#ffffff', 'rgba(36, 220, 226, 0.5)']}
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

const FilterForm = ({ value, setValue, isShow, setIsShown }) => {
  const [data, setData] = React.useState(value)

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isShow}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setIsShown(false);
      }}>
      <View className="w-screen h-screen items-center justify-center">
        <View className="w-screen h-screen bg-black opacity-25 absolute">
        </View>
        <View className="bg-white items-center w-2/3 p-4 shadow-sm">
          <Text className="font-bold text-lg">Loại:</Text>
          <Picker
            className=""
            selectedValue={data.type}
            onValueChange={(itemValue, itemIndex) => setData(prev => ({ ...prev, type: itemValue }))}
            style={{
              width: "100%",
            }}
          >
            <Picker.Item label="Tất cả" value="ALL" />
            <Picker.Item label="Trực tiếp" value="FACE_TO_FACE" />
            <Picker.Item label="Xét nghiệm tại nhà" value="AT_HOME" />
          </Picker>

          <Text className="font-bold text-lg">Trạng thái:</Text>
          <Picker
            className=""
            selectedValue={data.status}
            onValueChange={(itemValue, itemIndex) => setData(prev => ({ ...prev, status: itemValue }))}
            style={{
              width: "100%",
            }}
          >
            <Picker.Item className="text-sm" label="Tất cả" value="ALL" />
            <Picker.Item className="text-sm" label="Đang chờ" value="PENDING" />
            <Picker.Item className="text-sm" label="Đã nhận" value="ACCEPTED" />
            <Picker.Item className="text-sm" label="Đã xong" value="DONE" />
            <Picker.Item className="text-sm" label="Đã hủy" value="CANCELED" />
            <Picker.Item className="text-sm" label="Từ chối" value="REJECTED" />
          </Picker>

          <View className="flex flex-row justify-center items-center">
            <TouchableOpacity
              onPress={() => {
                setValue(data)
                setIsShown(false)
              }}
            >
              <Text className="p-2 bg-teal-200 mx-2">Áp dụng</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setIsShown(false)
                setData(value)
              }}
            >
              <Text className="p-2 bg-neutral-400 mx-2">Bỏ qua</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
