import { useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import apiServices from "../../Controller/apiServices";

export default function BrandModal({
  modal,
  setModal,
  id,
  setSuccessMessage,
  setRefresh,
}) {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState("");

  const nameRef = useRef();
  const logoRef = useRef();

  const updateBrand = async () => {
    try {
      const response = await apiServices.updateBrand({ name, logo });
      if (response.status === 201 || response.status === 200) {
        setSuccessMessage("Brand updated successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
        setModal(false);
        setRefresh((pre) => pre + 1);
      } else {
        console.error("Unexpected response status:", response.status);
        alert("Failed to updat the brand. Please try again.");
      }
    } catch (error) {
      console.error("Error adding brand:", error.message);
      alert("An error occurred while adding the brand. Please try again.");
    }
  };

  const addBrand = async () => {
    try {
      const response = await apiServices.addBrand({ name, logo });
      if (response.status === 201 || response.status === 200) {
        setSuccessMessage("Brand added successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
        setModal(false);
        setRefresh((pre) => pre + 1);
      } else {
        console.error("Unexpected response status:", response.status);
        alert("Failed to add the brand. Please try again.");
      }
    } catch (error) {
      console.error("Error adding brand:", error.message);
      alert("An error occurred while adding the brand. Please try again.");
    }
  };

  // const handleAddOrUpdate = async (id) => {
  //   if (id) {
  //     await updateBrand();
  //   } else {
  //     await addBrand();
  //   }
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setLogo(null);
      setPreview("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const name = formData.get("name");
    const logo = formData.get("logo");

    console.log("logo: ", logo);

    try {
      if (id) {
        await apiServices.updateBrand({ id,name, logo });
        setSuccessMessage("Brand updated successfully!");
      } else {
        await apiServices.addBrand({ name, logo });
        setSuccessMessage("Brand added successfully!");
      }
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
      setModal(false);
      setRefresh((pre) => pre + 1);
    } catch (error) {
      if (id) {
        console.error("Error updating brand:", error.message);
        alert("An error occurred while updating the brand. Please try again.");
      } else {
        console.error("Error adding brand:", error.message);
        alert("An error occurred while adding the brand. Please try again.");
      }
    }
  };

  useEffect(() => {
    const fetchBrand = async () => {
      if (id !== null) {
        setName("...Loading");
        const data = await apiServices.getBrandById(id);
        setName(data.name);
        setPreview(data.logo);
      }
    };
    fetchBrand();
  }, [id]);

  return (
    <Modal isOpen={modal} toggle={() => setModal(false)} size="xl">
      <ModalHeader>{id ? "Update Brand" : "Add Brand"}</ModalHeader>
      <ModalBody>
        <Form encType="multipart/form-data" onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="logo">Logo</Label>
            <Input
              ref={logoRef}
              type="file"
              name="logo"
              id="logo"
              onChange={handleFileChange}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="img-thumbnail mt-3"
                width="100"
              />
            )}
          </FormGroup>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          <ModalFooter>
            <Button color="primary">{id ? "Update Brand" : "Add Brand"}</Button>
            <Button color="secondary" onClick={() => setModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
  );
}
