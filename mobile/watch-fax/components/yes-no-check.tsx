import React from 'react';
import {
    StyleProp,
    StyleSheet,
    TextStyle,
    View,
    ViewStyle,
    Text,
} from 'react-native';
import CheckCircle from './check-circle';

export interface IYesNoCheckProps {
    isYesChecked: boolean;
    onPress: (isYesChecked: boolean) => void;
    style?: StyleProp<ViewStyle>;
    iconStyle?: StyleProp<TextStyle>;
}

const YesNoCheck = (props: IYesNoCheckProps) => {
    const [isYesChecked, setIsYesChecked] = React.useState(props.isYesChecked);

    const onCheckYes = () => {
        setIsYesChecked(true);
    };

    const onCheckNo = () => {
        setIsYesChecked(false);
    };

    return (
        <View
            style={[
                { flexDirection: 'row', alignItems: 'center' },
                props.style,
            ]}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckCircle
                    iconStyle={props.iconStyle}
                    isChecked={isYesChecked}
                    onPress={() => {
                        onCheckYes();
                        props.onPress(true);
                    }}
                />
                <Text style={{ marginLeft: 5 }}>Yes</Text>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <CheckCircle
                    iconStyle={props.iconStyle}
                    isChecked={!isYesChecked}
                    onPress={() => {
                        onCheckNo();
                        props.onPress(false);
                    }}
                />
                <Text style={{ marginLeft: 5 }}>No</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({});

export default YesNoCheck;
