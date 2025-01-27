// import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { locations, users } from '../lib/placeholder-data';

const client = await db.connect();

async function clearDatabase() {
  // Drop tables if they exist
  await client.sql`DROP TABLE IF EXISTS locations`;
  await client.sql`DROP TABLE IF EXISTS users`;
}

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
        user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        locale TEXT NOT NULL,
        unit_of_temperature TEXT NOT NULL,
        unit_of_measurement TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      return client.sql`
        INSERT INTO users (user_id, locale, unit_of_temperature, unit_of_measurement)
        VALUES (${user.userId}, ${user.locale}, ${user.unitOfTemperature}, ${user.unitOfMeasurement})
        ON CONFLICT (user_id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedLocations() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS locations (
      location_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
      latitude FLOAT NOT NULL,
      longitude FLOAT NOT NULL
    );
  `;

  const insertedLocations = await Promise.all(
    locations.map(
      (location) => client.sql`
        INSERT INTO locations (user_id, latitude, longitude)
        VALUES (${location.userId}, ${location.latitude}, ${location.longitude})
        ON CONFLICT DO NOTHING;
      `,
    ),
  );

  return insertedLocations;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await clearDatabase();
    await seedUsers();
    await seedLocations();
    await client.sql`COMMIT`;

    return new Response(
      JSON.stringify({ message: 'Database seeded successfully' }),
      { status: 200 }
    );
  } catch (error) {
    await client.sql`ROLLBACK`;

    console.error('Error seeding database:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';

    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500 }
    );
  } finally {
    // Ensure connection is closed after the operation
    client.release();
  }
}
