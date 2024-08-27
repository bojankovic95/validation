import { suggestCorrectIban } from '../utilities/ibanUtils'; // Adjust the import path based on your file structure

describe('suggestCorrectIban', () => {
    test('suggests the closest valid IBAN', () => {
        expect(suggestCorrectIban('ME25505000012345678950')).toBe('ME25505000012345678951');
    });

    test('returns null for a valid IBAN', () => {
        expect(suggestCorrectIban('ME25505000012345678951')).toBe(null);
    });

    test('returns null for an invalid IBAN with no close match', () => {
        expect(suggestCorrectIban('ME00000000000000000000')).toBe(null);
    });
});
