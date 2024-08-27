import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Text, View, StyleSheet, Dimensions } from 'react-native';

interface HistoryItem {
    iban: string;
    isValid: boolean;
    timestamp: string;
}

interface ValidationHistoryProps {
    history: HistoryItem[];
}

const ValidationHistory: React.FC<ValidationHistoryProps> = ({ history }) => {
    const renderItem = ({ item }: { item: HistoryItem }) => (
        <View style={[styles.historyItem, item.isValid ? styles.historyItemValid : styles.historyItemInvalid]}>
            <MaterialIcons
                name={item.isValid ? 'check-circle' : 'error-outline'}
                size={28}
                color={item.isValid ? 'green' : 'red'}
            />
            <View>
                <Text style={styles.iban}>{item.iban}</Text>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
        </View>
    );

    return (
        <FlatList
            data={history}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};

const styles = StyleSheet.create({
    historyItem: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: Dimensions.get('window').width * .9,
        margin: 'auto',
        marginBottom: 10,
        borderRadius: 8
    },
    historyItemInvalid: {
        backgroundColor: '#fcb8b3'
    },
    historyItemValid: {
        backgroundColor: '#e0ffe0',
    },
    iban: {
        textAlign: 'right',
        fontSize: 14,
        fontWeight: '700'
    },
    timestamp: {
        textAlign: 'right',
    }
});

export default ValidationHistory;
