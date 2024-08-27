import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

interface ValidationResultProps {
    suggestedIban: string | null;
    handleIbanInput: (text: string) => void;
}

const ValidationResult: React.FC<ValidationResultProps> = ({ suggestedIban, handleIbanInput }) => {
    return (
        <>
            {suggestedIban && (
                <TouchableOpacity style={styles.validationTextContainer} onPress={() => handleIbanInput(suggestedIban)}>
                    <Text style={styles.suggestionText}>
                        Did you mean: {suggestedIban}?
                    </Text>
                </TouchableOpacity>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    suggestionText: {
        color: 'green',
        fontSize: 16,
    },
    validationTextContainer: {
        width: Dimensions.get('window').width * .9,
        margin: 'auto',
        marginTop: 10
    }
});

export default ValidationResult;
