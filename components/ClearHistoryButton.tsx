import React from 'react';
import { Button } from 'react-native';

interface ClearHistoryButtonProps {
    onClearHistory: () => void;
}

const ClearHistoryButton: React.FC<ClearHistoryButtonProps> = ({ onClearHistory }) => {
    return (
        <Button title="Clear" onPress={onClearHistory} />
    );
};

export default ClearHistoryButton;
