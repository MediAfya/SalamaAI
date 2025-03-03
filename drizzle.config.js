export default {
    dialect: "postgresql", // Ensure this is defined!
    schema: "./src/utils/schema.jsx",
    out: "./drizzle",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL, 
        url: process.env.DATABASE_URL,
    },
};
