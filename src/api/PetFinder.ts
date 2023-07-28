// Internal Import
import { getAcessToken } from "./Auth";

interface PetFinderResponse {
    animals: any[]
    pagination: any
}

export async function fetchPets(zipCode: string, petType: string, pageNumber: number): Promise<PetFinderResponse> {
    const { access_token } = await getAcessToken();

    const response = await fetch(`https://api.petfinder.com/v2/animals?type=${petType}&location=${zipCode}&page=${pageNumber}`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });

    if (!response.ok) {
        throw new Error ('Failed to fetch data')
    }
    
    return response.json()
}

