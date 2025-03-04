import {
    IconChevronRight,
    IconCirclePlus,
    IconFolder,
    IconX,
  } from "@tabler/icons-react";
  
  const handleNavigate = (name) => {
    const filteredRecords = userRecords.filter(
      (record) => record.record_name === name
    );
    navigate(`/medical-records/${name}`, { state: filteredRecords[0] });
  };
  
  return (
    <div className="flex flex-wrap gap-[26px]">
      <button onClick={handleOpenModal} className="py-2 px-4 mt-6 bg-blue-600 text-white rounded-full">
        <IconCirclePlus />
        Create Record
      </button>
  
      {/* Modal */}
      <div id="hs-modal-recover-account" className="hidden fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg">
          <h2>Create Records</h2>
          <input value={foldername} onChange={(e) => setFoldername(e.target.value)} />
          <button onClick={createFolder} className="bg-blue-600 text-white">Create</button>
          <button onClick={handleCloseModal} className="text-red-500">Cancel</button>
        </div>
      </div>
  
      {/* Record List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {userRecords?.map((record) => (
          <div key={record.record_name} className="bg-white p-4 rounded-lg">
            <IconFolder size={70} className="text-green-500" />
            <button onClick={() => handleNavigate(record.record_name)} className="text-blue-600">
              {record.record_name}
              <IconChevronRight />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
  