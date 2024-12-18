import { useEffect, useState } from "react";
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
import { addCategory, getCategogyById, updateCategory } from "../../Controller/apiServices";

export default function CategoryModal({
  id,
  modal,
  setModal,
  setRefresh,
  setSuccessMessage,
}) {
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      if (id !== null) {
        setName("...Loading");
        const data = await getCategogyById(id);
        setName(data.name);
      }
    };
    fetchCategory();
  }, [id]);

  const handleAdd = async () => {
    try {
      const response = await addCategory({ name });
      if (response.status === 201 || response.status === 200) {
        setSuccessMessage("Category added successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
        setModal(false);
        setRefresh((pre) => pre + 1);
      } else {
        console.error("Unexpected response status:", response.status);
        alert("Failed to add the category. Please try again.");
      }
    } catch (error) {
      console.error("Error adding category:", error.message);
      alert("An error occurred while adding the category. Please try again.");
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await updateCategory(id, name);
      if (response.status === 201 || response.status === 200) {
        setSuccessMessage("Category updated successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
        setModal(false);
        setRefresh((pre) => pre + 1);
      } else {
        console.error("Unexpected response status:", response.status);
        alert("Failed to update the category. Please try again.");
      }
    } catch (error) {
      console.error("Error adding category:", error.message);
      alert("An error occurred while updating the category. Please try again.");
    }
  };

  return (
    <Modal isOpen={modal} toggle={() => setModal(false)} size="xl">
      <ModalHeader>{id ? "Category Details" : "Add Category"}</ModalHeader>
      <ModalBody>
        <Form>
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
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={id ? handleUpdate : handleAdd}>
          {id ? "Update Category" : "Add Category"}
        </Button>
        <Button color="secondary" onClick={() => setModal(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
