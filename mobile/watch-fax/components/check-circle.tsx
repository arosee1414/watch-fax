import {
    Pressable,
    StyleProp,
    StyleSheet,
    TextStyle,
    ViewStyle,
} from 'react-native';
import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { navyColor } from '@/assets/default-styles';

export interface ICheckBoxProps {
    isChecked: boolean;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    iconStyle?: StyleProp<TextStyle>;
}

const CheckCircle = (props: ICheckBoxProps) => {
    // const iconName = props.isChecked
    //     ? 'checkbox-marked'
    //     : 'checkbox-blank-outline';
    const iconName = props.isChecked
        ? 'checkbox-marked-circle'
        : 'checkbox-blank-circle-outline';

    return (
        <Pressable onPress={props.onPress} style={props.style}>
            <MaterialCommunityIcons
                style={[{ color: navyColor }, props.iconStyle]}
                name={iconName}
                size={24}
            />
        </Pressable>
    );
};

export default CheckCircle;
