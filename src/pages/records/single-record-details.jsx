import React, { useState } from "react";
import { IconFileUpload, IconX } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import OpenAI from "openai";
import ReactMarkdown from "react-markdown";
const apiKey = import.meta.env.VITE_API_KEY;
const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});

const handleFileUpload = async () => {
    if (!file) return;
    setUploading(true);
  
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const response = await openai.files.create({
        purpose: "assistants",
        file: formData.get("file"),
      });
  
      const assistant = await openai.beta.assistants.create({
        name: "AI Treatment Planner",
        instructions: "Provide personalized treatment recommendations.",
        model: "gpt-4o",
        tools: [{ type: "file_search" }],
      });
  
      const thread = await openai.beta.threads.create({
        messages: [
          {
            role: "user",
            content: "Generate a detailed, structured treatment plan.",
            attachments: [{ file_id: response.id, tools: [{ type: "file_search" }] }],
          },
        ],
      });
  
      const stream = openai.beta.threads.runs.stream(thread.id, {
        assistant_id: assistant.id,
      }).on("messageDone", async (event) => {
        const resultText = event.content[0].text.value;
        console.log(resultText);
      });
  
      setUploadSuccess(true);
    } catch (error) {
      console.error("Upload failed", error);
      setUploadSuccess(false);
    } finally {
      setUploading(false);
    }
  };  

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
    <div>
    {uploadSuccess && <p className="text-green-600">Upload successful!</p>}
    <div className="analysis-container">
      <h2>AI Analysis Result</h2>
      {uploading ? <p>Processing...</p> : <ReactMarkdown>{analysisResult}</ReactMarkdown>}
    </div>
  </div>
  );
}
export default SingleRecordDetails;
