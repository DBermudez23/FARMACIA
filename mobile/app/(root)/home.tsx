import { View, Text, TouchableOpacity } from "react-native"
import { Toast } from "react-native-toast-notifications"


export const Home = () => {

    const logOutHandler = async () => {
        try {
            
        } catch (error: any) {
            Toast.show(error.message)
        }
    }

    return (
        <View>
            <Text>Hola mundo</Text>

                <TouchableOpacity>
                    <Text>Volver al login</Text>
                </TouchableOpacity>
        </View>
    )
}

export default Home;