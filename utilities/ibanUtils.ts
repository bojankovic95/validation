export const validateIban = (iban: string): boolean => {
    const cleanIban = iban.replace(/\s+/g, '').toUpperCase();
    if (cleanIban.length !== 22 || !cleanIban.startsWith('ME')) {
        return false;
    }
    const rearrangedIban = cleanIban.slice(4) + cleanIban.slice(0, 4);
    const numericIban = rearrangedIban.replace(/[A-Z]/g, (char) => (char.charCodeAt(0) - 55).toString());
    const ibanMod97 = numericIban.match(/\d{1,7}/g)?.reduce((acc, block) => (parseInt(acc + block) % 97).toString(), '0');
    return ibanMod97 === '1';
};

export const suggestCorrectIban = (enteredIban: string): string | null => {
    const cleanIban = enteredIban.replace(/\s+/g, '').toUpperCase();
    const validMontenegroIbans = [
        'ME25505000012345678951',
    ];
    let minDistance = Infinity;
    let suggestedIban: string | null = null;
    validMontenegroIbans.forEach((validIban) => {
        const distance = levenshteinDistance(cleanIban, validIban);
        if (distance < minDistance) {
            minDistance = distance;
            suggestedIban = validIban;
        }
    });
    return suggestedIban;
};

const levenshteinDistance = (a: string, b: string): number => {
    const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
        Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : i))
    );
    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }
    return matrix[a.length][b.length];
};
