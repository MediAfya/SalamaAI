import React, { useState } from "react";
import { IconFileUpload, IconX } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import OpenAI from "openai";
const apiKey = import.meta.env.VITE_API_KEY;
const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});

function SingleRecordDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleOpenModal = () => {
    document.getElementById("upload-modal").classList.remove("hidden");
  };

  const handleCloseModal = () => {
    document.getElementById("upload-modal").classList.add("hidden");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFilename(selectedFile.name);
    setFile(selectedFile);
  };

  return (
    <div>
      <button onClick={handleOpenModal} className="upload-btn">
        <IconFileUpload />
        Upload Reports
      </button>
      <div id="upload-modal" className="hidden modal">
        <div className="modal-content">
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleCloseModal}>
            <IconX />
          </button>
        </div>
      </div>
    </div>
  );
}
export default SingleRecordDetails;
