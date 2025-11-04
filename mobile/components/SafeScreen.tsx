import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SafeScreenProps } from '@/interfaces/SafeScreenProps.interface';
import { FC } from 'react';

const SafeScreen: FC<SafeScreenProps> = ({ children, style }) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[{paddingTop:insets.top, flex:1}, style]}>
            {children}
        </View>
    )
}

export default SafeScreen