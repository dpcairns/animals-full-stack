import { getAnimal } from './api-calls.js';

describe('api calls', () => {
    test('getAnimal', async () => {
        const animal = await getAnimal(2);

        expect(animal).toEqual({
            id: 2,
            name: 'country roads',
            artist: 'john denver',
            length: 2,
            user_id: 1,
            is_single: true
          });
    });

    test('addAnimal', async () => {
        const animal = await getAnimal(2);

        expect(animal).toEqual({
            id: 2,
            name: 'country roads',
            artist: 'john denver',
            length: 2,
            user_id: 1,
            is_single: true
          });
    });


    test('getAnimal', async () => {
        const animal = await getAnimal(2);

        expect(animal).toEqual({
            id: 2,
            name: 'country roads',
            artist: 'john denver',
            length: 2,
            user_id: 1,
            is_single: true
          });
    });

});