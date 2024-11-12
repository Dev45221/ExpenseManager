import { useState } from "react"
import { StyleSheet, Image } from "react-native"
import { TextInput } from "react-native-paper"
import { winWid } from "../constants/Constants"

//@ts-ignore
const InputText = ({ value, label, keyboardType, setValue }) => {
    const [show, setShow] = useState(false)

    if (keyboardType === "password") {
        return (
            <TextInput
                value={value}
                label={label}
                mode="flat"
                secureTextEntry={show ? false : true}
                onChangeText={(val) => setValue(val)}
                right={<TextInput.Icon icon={() => <Image source={show ? require('../images/show.png') : require('../images/hide.png')} style={{ width: 25, height: 25 }} />} onPress={() => setShow(!show)} />}
                style={Styling.inpStyle}
            />
        )
    }

    return (
        <TextInput
            value={value}
            label={label}
            mode="flat"
            keyboardType={keyboardType}
            onChangeText={(val) => setValue(val)}
            // right={<TextInput.Affix text="/50" />}
            style={Styling.inpStyle}
        />
    )
}

const Styling = StyleSheet.create({
    inpStyle: {
        width: winWid / 1.5,
        height: 60,
        backgroundColor: 'white',
        fontSize: 18,
        margin: 15
    }
})

export default InputText