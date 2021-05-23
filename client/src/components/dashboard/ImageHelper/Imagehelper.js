import React, { useState, useEffect } from "react";

const Imagehelper = ({ project }) => {
  const [image, setImage] = useState("");

  const arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  const getImage = () => {
    var base64Flag = "data:image/jpeg;base64,";
    var imageStr = arrayBufferToBase64(project.photo.data.data);
    setImage(base64Flag + imageStr);
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <>
      <img
        alt="photo"
        style={{ maxHeight: "75%", maxWidth: "100%" }}
        className="mb-3 rounded"
        src={image}
      />
    </>
  );
};

export default Imagehelper;
