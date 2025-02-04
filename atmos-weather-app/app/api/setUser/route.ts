import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@vercel/postgres';

export async function POST(req: Request) {
    
    const { locale, unit_of_temperature, unit_of_measurement } = await req.json();

    // Generate or retrieve existing user_id
    let user_id = req.headers.get('cookie')?.match(/user_id=([^;]+)/)?.[1];
    if (!user_id) {
        user_id = uuidv4(); // Generate a new UUID if not set
    }
    
    const response = NextResponse.json({ message: 'User data saved!' });

    response.cookies.set({
        name: 'user_id',
        value: user_id,
        httpOnly: true, // More secure
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 365, // 1-year expiration
        path: '/',
    });

    response.cookies.set({
        name: 'user_data',
        value: JSON.stringify({ locale, unit_of_temperature, unit_of_measurement }),
        httpOnly: false, // Accessible on the client side
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30, // Expires in 30 days
        path: '/',
    });

    const client = await db.connect();

    try {
        const databaseResponse = client.sql`
          INSERT INTO users (user_id, locale, unit_of_temperature, unit_of_measurement)
          VALUES (${user_id}, ${locale}, ${unit_of_temperature}, ${unit_of_measurement})
        `;

    } catch (error) {
        // If a database error occurs, return a more specific error.
        console.error("Database error:", error);
        return {
          message: 'Database error: Failed to create user.',
        };
    }

    return response;
}