import request from 'superagent';

const URL = 'http://localhost:3000';

export const getAnimal = async (someId) => {
    console.log('=============================\n')
    console.log('|| someId', someId)
    console.log('\n=============================')
    const data = await request.get(`${URL}/animal/${someId}`)

    return data.body;
}

export const getAnimals = async () => {
    const data = await request.get(`${URL}/animals/`)

    return data.body;
}

export const addAnimal = async (animal) => {
    const data = await request.post(`${URL}/animals/`, animal)

    return data.body;
}