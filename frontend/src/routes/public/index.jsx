import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../screen/Auth/Login";
import Signup from "../../screen/Auth/Signup";

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator screenOptions={{headerMode: 'none'}}>
        <RootStack.Screen name="LoginScreen" component={Login} />
        <RootStack.Screen name="SignupScreen" component={Signup} />
    </RootStack.Navigator>
)

export default RootStackScreen;