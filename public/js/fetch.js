export const APIkey_bit = "beb7023c8c9045d3b5df20c2a6ff9062";
export const Cityname_bit = 'Kyiv'
export const APIadress_bit = `https://api.weatherbit.io/v2.0/current?city=${Cityname_bit}&key=${APIkey_bit}`;

export const ApiKEY_api = '30ab744676074bcbbe4111140242407'
export let City_api = 'Ukraine'
export const ApiAdress_api = `https://api.weatherapi.com/v1/forecast.json?key=${ApiKEY_api}&q=${City_api}&days=7`;


export async function weatherapi(city) {
    let apiAdress = `https://api.weatherapi.com/v1/forecast.json?key=30ab744676074bcbbe4111140242407&q=${city}&days=7`;
    const fetcs = await fetch(apiAdress);
    const data = await fetcs.json()
    return data
}


export async function weatherbit(url) {
    const fetcz = await fetch(url)
    const data = await fetcz.json() // Обробка даних з fetch()
    return data
}
