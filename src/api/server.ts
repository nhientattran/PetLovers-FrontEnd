import { NewPet} from "../components";

let token = 'b2a33cc55e77175533ac0645d822e5c0f64cde7f8635c5f2'

export const serverCalls = {
    get: async() => {
        const response = await fetch(`https://petlovers2.glitch.me/api/pets`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data'), response.status
        }

        return await response.json()
    },

    create: async(data: NewPet) => {
        const response = await fetch(`https://petlovers2.glitch.me/api/pets`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },

            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to create data on Server'), response.status
        }
    },

    delete: async(id:string) => {
        const response = await fetch(`https://petlovers2.glitch.me/api/pets/${id}`, {
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete data'), response.status
        }
    }
}
