import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import { getAllRecordData } from "../../actions";

function Index() {
  const navigate = useNavigate();
  const { user } = usePrivy();
  const [foldername, setFoldername] = useState("");
  const [userRecords, setUserRecords] = useState([]);

  useEffect(() => {
    const cachedRecords = localStorage.getItem("userRecords");
    if (cachedRecords) {
      setUserRecords(JSON.parse(cachedRecords));
    }

    getAllRecordData()
      .then(({ documents }) => {
        const filteredRecords = documents.filter(
          (record) => record.user_id === user.id
        );
        setUserRecords(filteredRecords);
        localStorage.setItem("userRecords", JSON.stringify(filteredRecords));
      })
      .catch((e) => {
        console.log(e);
      });
  }, [user]);

  return <div>Loading records...</div>;
}

export default Index;