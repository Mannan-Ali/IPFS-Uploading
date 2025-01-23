import { useState } from "react";
import "./App.css";
import axios from "axios";


function App() {
  const [file, setfiles] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(import.meta.env.VITE_PINATA_API_SECRET);
      
      //here we are adding the file data into fileData as the data is in formdata form hence new FormData
      const fileData = new FormData();
      fileData.append("file", file);

      //this will have a url of where our file is uploaded on pinata 
      const responseData = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        headers: {
          pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
          pinata_secret_api_key: import.meta.env.VITE_PINATA_API_SECRET,
          "Content-Type": "multipart/form-data",
        },
        data: fileData,
      });
      const fileUrl = "https://gateway.pinata.cloud/ipfs/" + responseData.data.IpfsHash;
      console.log(fileUrl);
      
    } catch (error) {
      console.log("Error occured while submitting: ", error);
    }
  };
  return (
    <>
      <h1>IPFS Tutorial - Upload your file </h1>
      <form action="#">
        <input
          type="file"
          onChange={(e) => {
            //here we are taking the first file of all the files uploaded basically only one file can be uploaded at a time.
            setfiles(e.target.files[0]);
          }}
        />
        <button type="submit" onClick={handleSubmit}>
          Upload
        </button>
      </form>
    </>
  );
}

export default App;
