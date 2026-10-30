import { defineConfig } from 'drizzle-kit';

console.log("DATABASE_URL:", process.env.DATABASE_URL);



export default defineConfig({
  schema: './src/db/schema.ts', // Ajusta la ruta a tu archivo de esquema
  out: './drizzle', // Carpeta de salida para las migraciones y demás archivos generados
  dialect: 'postgresql', // Especifica el tipo de base de datos
  dbCredentials: {
    host: 'ep-icy-frog-a4vzo54x.us-east-1.aws.neon.tech',
    port: 5432, // El puerto de PostgreSQL
    user: 'neondb_owner',
    password: 'npg_3WdNiv6jZYUt',
    database: 'neondb',
    ssl: 'require', // Especifica que se necesita SSL
  },
});
