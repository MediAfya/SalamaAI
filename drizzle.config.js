export default {
    dialet: 'postgresql',
    schema: './src/utils/schema.jsx',
    out: './drizzle',

    dbCredentials: {
        url: process.env.DATABASE_URL,
        connectionString: process.env.DATABASE_URL,
        // host: '',
        // port: '',
        // database: '',
        // user: '',
        // password: '',
    },
}