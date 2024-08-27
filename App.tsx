import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, Alert, Button, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IbanInput from './components/IbanInput';
import ValidationResult from './components/ValidationResult';
import ValidationHistory from './components/ValidationHistory';
import ClearHistoryButton from './components/ClearHistoryButton';
import { validateIban, suggestCorrectIban } from './utilities/ibanUtils';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const STORAGE_KEY = '@iban_validation_history';

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green' }}
      contentContainerStyle={{ paddingHorizontal: 50 }}
      text1Style={{
        fontSize: 20,
        fontWeight: '400'
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      contentContainerStyle={{ paddingHorizontal: 50 }}
      text1Style={{
        fontSize: 20,
        fontWeight: '400'
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  )
};

const App: React.FC = () => {
  const [iban, setIban] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [suggestedIban, setSuggestedIban] = useState<string | null>(null);
  const [validationHistory, setValidationHistory] = useState<any[]>([]);

  const showInvalidToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Invalid',
      text2: 'IBAN you provided is invalid',
      topOffset: 70,
      visibilityTime: 1000
    });
  }

  const showValidToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Valid',
      text2: 'IBAN you provided is valid',
      topOffset: 70,
      visibilityTime: 1000
    });
  }

  useEffect(() => {
    const loadValidationHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedHistory) {
          setValidationHistory(JSON.parse(storedHistory));
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load validation history.');
      }
    };
    loadValidationHistory();
  }, []);

  const saveValidationHistory = async (history: any[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      Alert.alert('Error', 'Failed to save validation history.');
    }
  };

  const handleIbanInput = (text: string) => {
    setIban(text);
    const result = validateIban(text);
    setIsValid(result);

    if (!result) {
      const suggestion = suggestCorrectIban(text);
      setSuggestedIban(suggestion);
    } else {
      setSuggestedIban(null);
    }
  };

  const handleValidate = () => {
    const isValidIban = validateIban(iban);
    setIsValid(isValidIban);

    const timestamp = new Date().toLocaleString();
    const newHistory = { iban, isValid: isValidIban, timestamp };
    const updatedHistory = [newHistory, ...validationHistory];
    setValidationHistory(updatedHistory);

    try {
      saveValidationHistory(updatedHistory);
    } catch (error) {
      console.error("Error saving validation history:", error);
    }

    if (isValidIban) {
      showValidToast()
    }

    if (!isValidIban) {
      showInvalidToast()
    }
  };

  const handleClearHistory = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setValidationHistory([]);
    } catch (error) {
      Alert.alert('Error', 'Failed to clear validation history.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Montenegro IBAN Validator</Text>

      <View style={styles.inputContainer}>
        <IbanInput iban={iban} onChangeText={handleIbanInput} isValid={isValid} />
        <TouchableOpacity disabled={iban.length == 0} onPress={handleValidate} style={[styles.button, iban.length == 0 ? styles.disabledButton : styles.enabledButton]}>
          <Text style={styles.buttonText}>VALIDATE</Text>
        </TouchableOpacity>
      </View>

      {iban.length > 0 && <ValidationResult handleIbanInput={handleIbanInput} suggestedIban={suggestedIban} />}

      {validationHistory.length > 0 && <View style={styles.validationHistoryHeader}>
        <Text style={styles.historyTitle}>Validation History</Text>
        <ClearHistoryButton onClearHistory={handleClearHistory} />
      </View>}

      <ValidationHistory history={validationHistory} />
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#e0e0e0'
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 50,
    color: '#140309',
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: '300',
    marginTop: 20,
    marginBottom: 10,
    height: 38,
  },
  button: {
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    height: 45,
    marginLeft: 10
  },

  disabledButton: {
    backgroundColor: '#a3a3a3',
  },
  enabledButton: {
    backgroundColor: '#0071EB',
  },
  buttonText: {
    fontWeight: '700',
    color: 'white',

  },
  inputContainer: {
    flexDirection: 'row',
    margin: 'auto',
    marginTop: 40,
    width: Dimensions.get('window').width * .9
  },
  validationHistoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * .9,
    margin: 'auto',
    marginTop: 50

  }
});

export default App;

