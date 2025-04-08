// src/pages/api/records.js
import { db } from "../../utils/dbConfig"; // Import the db configuration
import { Records } from "../../utils/schema";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Handle record creation
    const { recordName, userId, analysisResult, kanbanRecords, createdBy } =
      req.body;

    try {
      // Insert the new record into the database
      const newRecord = await db
        .insert(Records)
        .values({
          recordName,
          userId,
          analysisResult,
          kanbanRecords,
          createdBy,
        })
        .returning();

      res.status(200).json(newRecord[0]); // Return the newly created record
    } catch (error) {
      console.error("Error creating record:", error);
      res.status(500).json({ message: "Error creating record", error });
    }
  } else if (req.method === "GET") {
    // Handle fetching records
    try {
      const records = await db.select().from(Records);
      res.status(200).json(records);
    } catch (error) {
      console.error("Error fetching records:", error);
      res.status(500).json({ message: "Error fetching records", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
