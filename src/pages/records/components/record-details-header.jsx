// src/pages/records/components/record-details-header.jsx
import React, { useState, useEffect } from "react";
import { IconFolderOpen } from "@tabler/icons-react";

const RecordDetailsHeader = ({ recordName }) => {
  const [userRecords, setUserRecords] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch user records
  const fetchUserRecords = async () => {
    const response = await fetch("/api/records");
    const records = await response.json();
    setUserRecords(records);
  };

  // Create a new record
  const handleCreateRecord = async () => {
    const response = await fetch("/api/records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recordName, // Use the record name passed as prop
        userId: 1, // Adjust to the logged-in user's ID
        analysisResult: "Pending", // Example value
        kanbanRecords: "In Progress", // Example value
        createdBy: "system", // Example value
      }),
    });

    const data = await response.json();

    if (data) {
      setSuccessMessage("Record created successfully!");
      fetchUserRecords(); // Refresh the list of records
    } else {
      setSuccessMessage("Failed to create record.");
    }
  };

  useEffect(() => {
    fetchUserRecords(); // Fetch records on component mount
  }, []);

  return (
    <div>
      <div className="grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        <div className="flex flex-col rounded-xl border bg-white shadow-sm dark:border-neutral-800 dark:bg-[#13131a]">
          <div className="flex justify-between gap-x-3 p-4 md:p-5">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-white dark:text-blue-200">
              <IconFolderOpen size={70} className="text-green-500" />
            </div>
          </div>
          <a
            className="inline-flex items-center justify-between rounded-b-xl border-t border-gray-200 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 md:px-5 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800"
            href="#"
            onClick={handleCreateRecord} // Trigger record creation
          >
            {recordName}
          </a>
        </div>
      </div>
      {successMessage && (
        <div className="mt-2 text-green-500">{successMessage}</div>
      )}{" "}
      {/* Display success message */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Created Records:</h2>
        <ul>
          {userRecords.map((record) => (
            <li key={record.id} className="mt-2">
              {record.recordName} - {record.analysisResult}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecordDetailsHeader;
