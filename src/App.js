import { useRef, useState } from "react";
import axios from "axios";

function App() {
  const inputRef = useRef();
  const [selectedFile, setSelectedFile] = useState();
  const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState(0);
  const inputClickedHandler = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };
  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const onUploadProgress = (event) => {
    setProgress(Math.round((100 * event.loaded) / event.total));
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("myFile", selectedFile);
    axios
      .post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-md d-flex flex-column justify-content-center mt-4">
      <div className="mb-4  align-self-center">
        <i className="fab fa-react"></i>
        <span className="display-4">React File Upload</span>
      </div>
      <div className="input-group mb-3">
        <input type="file" name="fileId" ref={inputRef} className="form-control bg-white d-none" placeholder="Choose File" onChange={onFileChange} />
        <input
          type="text"
          id="text-id"
          value={fileName}
          className="form-control bg-white"
          placeholder="Choose File"
          readOnly
          onClick={inputClickedHandler}
        />
        <div className="input-group-append" onClick={inputClickedHandler}>
          <span className="input-group-text" id="basic-addon">
            Browse
          </span>
        </div>
      </div>
      <div className="progress mb-3">
        <div className="progress-bar bg-success" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
          {progress} %
        </div>
      </div>
      <button type="button" className="btn btn-primary" onClick={onFileUpload}>
        Upload
      </button>
    </div>
  );
}

export default App;
