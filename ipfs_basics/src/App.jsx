import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [file, setfiles] = useState("");
  const [description, setSnapDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(import.meta.env.VITE_PINATA_API_SECRET);
    //here we are adding the image file into fileData as pinata accpets multiform data request
    const fileData = new FormData();
    fileData.append("file", file); //appending image file to new form data

    //adding meta data to the file 
    const metadata = JSON.stringify({
      name: "Image Description",
      keyvalues: {
        description: description, //description we get from frontend
      },
    });
    fileData.append("pinataMetadata", metadata);
    //this will have a url of where our file is uploaded on pinata
    try {
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
      console.log(responseData);
      const fileUrl =
        "https://gateway.pinata.cloud/ipfs/" + responseData.data.IpfsHash;
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
        <div>
          <label htmlFor="fname">Enter Description</label>
          <input
            type="text"
            name="fname"
            id="fname"
            onChange={(e) => {
              setSnapDescription(e.target.value);
            }}
            value={description}
            placeholder="describe the event/img"
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Upload
        </button>
      </form>
    </>
  );
}

export default App;
