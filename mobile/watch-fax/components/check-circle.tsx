import {
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface ICheckBoxProps {
    isChecked: boolean;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    iconStyle?: StyleProp<TextStyle>;
}

const CheckBox = (props: ICheckBoxProps) => {
    const iconName = props.isChecked
        ? 'checkbox-marked'
        : 'checkbox-blank-outline';

    return (
        <Pressable onPress={props.onPress} style={props.style}>
            <MaterialCommunityIcons
                style={[{ color: 'black' }, props.iconStyle]}
                name={iconName}
                size={24}
            />
        </Pressable>
    );
};

export default CheckBox;

const styles = StyleSheet.create({});
