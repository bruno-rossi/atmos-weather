"use server";

import { z } from 'zod';
import { sql } from '@vercel/postgres';

const FormSchema = z.object({
    userId: z.string().uuid(),
    locationId: z.string().uuid(),
    latitude: z.coerce
        .number({
            required_error: "Latitude is required.",
            invalid_type_error: "Latitude must be a number.",
        })
        .gte(-90, { message: "Please enter a latitude greater than -90." })
        .lte(90, { message: "Please enter a latitude lower than 90." }),
    longitude: z.coerce
        .number()
        .gte(-180, { message: "Please enter a longitude greater than -180."})
        .lte(180, { message: "Please enter a longitude lower than 180."}),
})

export type State = {
    errors?: {
      latitude?: string[];
      longitude?: string[];
      [key: string]: string[] | undefined;
    };
    message?: string | null;
};

const CreateLocation = FormSchema.omit({ locationId: true });

export async function createLocation(prevState: State, formData: FormData): Promise<State> {
    // Validate form using zod
    const validatedFields = CreateLocation.safeParse({
        userId: formData.get('userId'),
        latitude: formData.get('latitude'),
        longitude: formData.get('longitude'),
    })

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Validation failed. Please correct the errors and try again. Failed to create location.',
        };
    }

    // Prepare data for insertion into the database
    const { userId, latitude, longitude } = validatedFields.data;

    // Insert data into the database
    try {
        await sql`
          INSERT INTO locations (user_id, latitude, longitude)
          VALUES (${userId}, ${latitude}, ${longitude})
        `;
        return {
            message: "Location successfully created.",
        };
      } catch (error) {
        // If a database error occurs, return a more specific error.
        console.error("Database error:", error);
        return {
          message: 'Database error: Failed to create location.',
        };
      }
    
}