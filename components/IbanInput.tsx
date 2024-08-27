import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, View } from 'react-native';

interface IbanInputProps {
    iban: string;
    onChangeText: (text: string) => void;
    isValid: boolean | null;
}

const IbanInput: React.FC<IbanInputProps> = ({ iban, onChangeText, isValid }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleClear = () => {
        onChangeText('');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    styles.input,
                    isValid === false && iban.length > 0 && styles.invalidInput,
                    isValid === true && iban.length > 0 && styles.validInput,
                ]}
                placeholder="Enter IBAN"
                value={iban}
                onChangeText={onChangeText}
                autoCapitalize="characters"
                maxLength={22}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            {isFocused && iban.length > 0 && (
                <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
                    <MaterialIcons name="clear" size={24} color="gray" />
                </TouchableOpacity>
            )}
        </View>

    );
};

const styles = StyleSheet.create({
    input: {
        borderRadius: 8,
        padding: 10,
        fontSize: 18,
        marginBottom: 20,
        height: 45,
        backgroundColor: 'white'
    },
    invalidInput: {
        backgroundColor: '#fcb8b3',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'red'
    },
    validInput: {
        backgroundColor: '#e0ffe0',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'green'
    },
    container: {
        flex: 1,
        position: 'relative',
        height: 45,
    },
    clearButton: {
        padding: 5,
        position: 'absolute',
        right: 0,
        top: 8
    }
});

export default IbanInput;
