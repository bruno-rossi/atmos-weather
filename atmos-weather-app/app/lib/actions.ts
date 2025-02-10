"use server";

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { Location } from './definitions';
import { FormState } from './definitions';
import { getTranslations } from 'next-intl/server';

const t = await getTranslations('form');

const FormSchema = z.object({
    userId: z.string().uuid(),
    locationId: z.string().uuid(),
    locationName: z.string(),
    latitude: z.coerce
        .number({
            required_error: t("latitude_required_error"),
            invalid_type_error: t("latitude_invalid_type_error"),
        })
        .gte(-90, { message: t("latitude_too_low_error") })
        .lte(90, { message: t("latitude_too_high_error") }),
    longitude: z.coerce
        .number({
          required_error: t("longitude_required_error"),
          invalid_type_error: t("longitude_invalid_type_error"),
      })
        .gte(-180, { message: t("longitude_too_low_error") })
        .lte(180, { message: t("longitude_too_high_error") }),
})

const CreateLocation = FormSchema.omit({ locationId: true });

export async function createLocation(prevState: FormState, formData: FormData): Promise<FormState> {
    // Validate form using zod
    const validatedFields = CreateLocation.safeParse({
        userId: formData.get('userId'),
        locationName: formData.get('locationName'),
        latitude: formData.get('latitude'),
        longitude: formData.get('longitude'),
    })

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {

      const validationErrorMessage = t('validation_failed_error');

        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: validationErrorMessage,
        };
    }

    // Prepare data for insertion into the database
    const { userId, locationName, latitude, longitude } = validatedFields.data;

    // Insert data into the database
    try {
        const response = await sql`
          INSERT INTO locations (user_id, location_name, latitude, longitude)
          VALUES (${userId}, ${locationName}, ${latitude}, ${longitude})
          RETURNING *;
        `;

        const newLocation = response.rows[0];
        const location: Location = {
          location_id: newLocation.location_id,
          location_name: newLocation.location_name,
          user_id: newLocation.user_id,
          latitude: newLocation.latitude,
          longitude: newLocation.longitude,
        };

        const successMessage = t('location_created_success')

        return {
            newLocation: location,
            message: successMessage,
        };
    } catch (error) {
        // If a database error occurs, return a more specific error.
        console.error("Database error:", error);
        const errorMessage = t('database_error');
        return {
          message: errorMessage,
        };
    }
    
}

export type ResponseMessage = {
  status: number,
  message: string,
}

export async function deleteLocation(locationId: string): Promise<ResponseMessage> {

  try {

    const response = await sql`DELETE FROM locations WHERE location_id = ${locationId}`;
    const successMessage = t('location_deleted_success');

    return { 
      status: 204,
      message: successMessage,
    };

  } catch (error) {
    console.log("Database error", error);
    const errorMessage = t('location_deleted_failed_error');
    return {
      status: 400,
      message: errorMessage,
    }
  }
}