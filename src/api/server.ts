import { Pet } from "../components";

let token = 'bd8599d97dad6f96062cd8d4e6579a0d4bd502fcd5bd8e41'

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

    create: async(data: Pet) => {
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

    delete: async(name:string) => {
        const response = await fetch(`https://petlovers2.glitch.me/api/pets/${name}`, {
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
