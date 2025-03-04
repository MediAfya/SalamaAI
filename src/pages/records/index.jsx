import { createRecord } from "../../actions";

const createFolder = () => {
  createRecord({
    user_id: user.id,
    record_name: foldername,
    analysis_result: "",
    kanban_records: "",
  })
    .then(() => {
      getAllRecordData().then(({ documents }) => {
        const filteredRecords = documents.filter(
          (record) => record.user_id === user.id
        );
        setUserRecords(filteredRecords);
        localStorage.setItem("userRecords", JSON.stringify(filteredRecords));
        setFoldername("");
        handleCloseModal();
      });
    })
    .catch((e) => {
      console.log(e);
      setFoldername("");
      handleCloseModal();
    });
};
