import { AutoCompleteOption } from "../components/autocomplete/autocomplete";
import { CityInfoResponse } from "../types";


export const getCitiesOptions = (cities:CityInfoResponse[]): AutoCompleteOption[] => {
    const options = cities.map((c) => ({
		value: c.geonameid,
		label: c.name,
		subLabel: c.subcountry ? `${c.subcountry} - ${c.country}` : c.country,
	}));

    return options
}

export const seba = 1