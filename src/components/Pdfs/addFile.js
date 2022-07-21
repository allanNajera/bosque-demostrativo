import React, { useState, useEffect } from "react";
import { db, storage, storageRef } from "../../firebase";

import { useAuth } from "../../contexts/AuthContext";

import { Modal } from "react-bootstrap";

import { Button } from "react-bootstrap";

import { ProgressBar } from "react-bootstrap";

import { useHistory } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const AddFile = () => {
  const { currentUser, logout } = useAuth();

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const history = useHistory();
  const handleReturn = () => {
    history.push("/ManageFiles");
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onFileUpload = (e) => {
    console.log(e.target.files[0]);

    console.log(e.target.files[0].name);

    // I've kept this example simple by using the first file instead of multiple
    setSelectedFile(e.target.files[0]);
    setfile(e.target.files[0]);
  };

  const [fileData, setInputs] = useState({});
  const [file, setfile] = useState("");

  const [fileURL, setfileUrl] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [showError, setError] = useState(false);

  const handleCloseError = () => setError(false);

  // create a preview as a side effect, whenever selected file is changed

  const handleShow = () => setShow(true);

  function handleSelecType(e) {}

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    console.log(fileData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //llenar el archivo
    if (file == "") {
      
      return;
    }
    console.log(file.name);

    var uploadTask = storageRef.child("files/pdfs" + file.name).put(file);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        var displayProgress= (Math.round(progress * 100) / 100).toFixed(2);
        setShowProgress(true);
        setProgress(displayProgress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          const URL = "fileUrl";

          setfileUrl(downloadURL);

          setInputs((values) => ({ ...values, [URL]: downloadURL }));

          db.collection("pdfs")
            .add({
              ...fileData,
              fileUrl: downloadURL,
            })
            .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
              setShow(true);
            })
            .catch((error) => {
              setError(true);
              console.error("Error adding document: ", error);
            });
        });
      }
    );
  };


  return (
    <div>
      <div
        id="card"
        className="ml-5 mt-3 card mx-auto border-info"
        style={{ width: "60rem" }}
      >
        <form id="form" autocomplete="off" onSubmit={handleSubmit}>
          <div>
            <label id="tittle" for="tittle">
              Agregar archivo{" "}
            </label>
          </div>

          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="height">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={fileData.name || ""}
                onChange={handleChange}
              ></input>
            </div>

            <div class="form-group col-md-8">
              <label for="metabolicAge">Archivo</label>

              <input
                className="form-control"
                type="file"
                onChange={onFileUpload}
              />
            </div>

            <div style={{ fontWeight: "bold" }} className="m-1">
              <input
                style={{ fontWeight: "bold" }}
                type="radio"
                value="Guía didáctica"
                name="type"
                onChange={handleChange}
              />{" "}
              Guía didáctica{" "}
            </div>
            <div style={{ fontWeight: "bold" }} className="m-1">
              {" "}
              <div></div>
              <input
                type="radio"
                value="Artículo"
                name="type"
                onChange={handleChange}
              />{" "}
              Artículo{" "}
            </div>
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>¡Elemento agregado con exito!</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <Button variant="success" onClick={handleReturn}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showError} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                ¡Hubo un problema agregando el elemento !
              </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <Button variant="danger" onClick={handleCloseError}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>

         


          {showProgress ==false ? <div>  </div> :   
          <div >  
          <div className="centrar-contenedor col-md-4" >    
              ¡Subiendo archivo!
              </div>
         
        <div  className="col-md-4">
             <ProgressBar now={progress} label={`${progress}%`} />;
           </div>
        </div>
                 }

          <div class="contenedor-botones">
            <button className="btn-sm mr-2 btn-Add " type="submit">
              Añadir
            </button>

            <button
              type="button"
              className="btn-sm btn-Delete "
              onClick={handleReturn}
            >
              Regresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFile;
