import { View, Text } from 'react-native';

interface SettingsScreenProps {
    navigation: any;
};

export const SettingsScreen = ({}: SettingsScreenProps) => {
    return <View>
        <Text>This is the settings screen</Text>
    </View>
}