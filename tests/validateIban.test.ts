import { validateIban } from '../utilities/ibanUtils';

describe('validateIban', () => {
    test('validates correct IBAN', () => {
        expect(validateIban('ME25505000012345678951')).toBe(true);
    });

    test('validates incorrect IBAN', () => {
        expect(validateIban('ME25505000012345678900')).toBe(false);
    });

    test('validates IBAN with incorrect length', () => {
        expect(validateIban('ME25505000012345')).toBe(false);
    });

    test('validates IBAN without correct prefix', () => {
        expect(validateIban('XX25505000012345678951')).toBe(false);
    });
});
