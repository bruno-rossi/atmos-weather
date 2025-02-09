'use client';

import { FormState } from "../lib/definitions";
import { useActionState } from "react";
import { createLocation } from "../lib/actions";
import { Location } from "../lib/definitions";
import { useTranslations } from "next-intl";

export default function LocationForm({ setLocations }: { setLocations: React.Dispatch<React.SetStateAction<Location[]>> }) {

    const initialState: FormState = { message: null, errors: {} };
    const t = useTranslations('form');

    const actionHandler = async (prevState: FormState, formData: FormData) => {
    
        const newState = await createLocation(prevState, formData);

        if (newState.newLocation) {
            setLocations((prevLocations: Location[]) => [...prevLocations, newState.newLocation!]);
        }

        return newState;
    };


    const [state = initialState, formAction] = useActionState(actionHandler, initialState);

    const hardcodedUserId = "123e4567-e89b-12d3-a456-426614174000";
    const hardcodedLocationName = "Brooklyn";

    return (
        <form id="location-form" 
            action={formAction}
            aria-describedby="location-form-error">

            {/* Form fields */}
            <div className="flex md:flex-row flex-col items-center mx-auto gap-4 p-4 w-full ">
            
                {/* <input type="text" placeholder="Search for a location..." /> */}

                {/* Hidden userId input field to hardcode userId (temporary). */}
                <input type="hidden" name="userId" value={hardcodedUserId} />

                {/* Hidden userId input field to hardcode location name (temporary). */}
                {/* <input type="hidden" name="locationName" value={hardcodedLocationName} /> */}
                {/* Fieldset for location_name. */}
                <fieldset className="">
                    <label htmlFor="location-name-input" className="sr-only">{t('location_name_input_label')}</label>
                    <input 
                        id="location-name-input"
                        name="locationName"
                        className="block min-w-0 py-2 px-4 text-l/8 placeholder:text-cadet placeholder:text-l/8 border-2 focus:outline-capri rounded-xl"
                        type="text" 
                        placeholder={t('location_name_input_placeholder')} 
                        aria-describedby="location-name-input-error"
                        required
                    />
                </fieldset>


                {/* Fieldset for latitude. */}
                <fieldset className="">
                    <label htmlFor="latitude-input" className="sr-only">{t('latitude_input_label')}</label>
                    <input 
                        id="latitude-input"
                        name="latitude"
                        className="block min-w-0 py-2 px-4 text-l/8 placeholder:text-cadet placeholder:text-l/8 border-2 focus:outline-capri rounded-xl"
                        type="text" 
                        placeholder={t('latitude_input_placeholder')}
                        aria-describedby="latitude-error"
                        required
                    />
                </fieldset>

                {/* Fieldset for longitude. */}
                <fieldset className="">
                    <label htmlFor="longitude-input" className="sr-only">{t('longitude_input_label')}</label>
                    <input 
                        id="longitude-input"
                        name="longitude"
                        className="block min-w-0 py-2 px-4 text-l/8 placeholder:text-cadet placeholder:text-l/8 focus:outline-capri border-2 rounded-xl"
                        type="text" 
                        placeholder={t('longitude_input_placeholder')} 
                        aria-describedby="longitude-error"
                        required
                    />
                </fieldset>
                <button className="bg-capri text-white font-bold px-4 py-2 rounded-xl" type="submit">{t('button_label')}</button>
            </div>
            
            {/* Error messages */}
            <div>
                <div id="location-form-error" aria-live="polite" aria-atomic="true">
                            {
                            state.errors?.form &&
                                state.errors.form.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                </div>
                <div id="location-name-input-error" aria-live="polite" aria-atomic="true">
                            {
                            state.errors?.location_name &&
                                state.errors.location_name.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                </div>
                <div id="latitude-error" aria-live="polite" aria-atomic="true">
                            {
                            state.errors?.latitude &&
                                state.errors.latitude.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                </div>
                <div id="longitude-error" aria-live="polite" aria-atomic="true">
                    {
                    state.errors?.longitude &&
                        state.errors.longitude.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </div>
        </form>
    )
}