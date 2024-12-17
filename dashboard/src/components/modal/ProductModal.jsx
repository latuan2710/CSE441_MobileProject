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

export default function ProductModal({
  modal,
  setModal,
  id,
  setSuccessMessage,
  setRefresh,
}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");

  const imageRef = useRef();

  // Fetch brands and categories on modal open
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const brandsData = await apiServices.getAllBrands();
        const categoriesData = await apiServices.getAllCategories();
        setBrands(brandsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching dropdown data:", error.message);
      }
    };

    fetchDropdownData();
  }, []);

  // Fetch product data if updating
  useEffect(() => {
    const fetchProduct = async () => {
      if (id !== null) {
        const data = await apiServices.getProductById(id);
        setName(data.name);
        setPreview(data.image);
        setBrandId(data.brandId);
        setCategoryId(data.categoryId);
        setPrice(data.price);
        setStockQuantity(data.stockQuantity);
      }
    };
    fetchProduct();
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreview("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("brandId", brandId);
    formData.append("categoryId", categoryId);
    formData.append("price", price);
    formData.append("stockQuantity", stockQuantity);

    try {
      if (id) {
        await apiServices.updateProduct({ id, ...Object.fromEntries(formData) });
        setSuccessMessage("Product updated successfully!");
      } else {
        await apiServices.addProduct(Object.fromEntries(formData));
        setSuccessMessage("Product added successfully!");
      }
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
      setModal(false);
      setRefresh((pre) => pre + 1);
    } catch (error) {
      console.error(
        `Error ${id ? "updating" : "adding"} product:`,
        error.message
      );
      alert(`An error occurred while ${id ? "updating" : "adding"} the product.`);
    }
  };

  return (
    <Modal isOpen={modal} toggle={() => setModal(false)} size="xl">
      <ModalHeader>{id ? "Update Product" : "Add Product"}</ModalHeader>
      <ModalBody>
        <Form encType="multipart/form-data" onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="image">Image</Label>
            <Input
              ref={imageRef}
              type="file"
              name="image"
              id="image"
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
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="brandId">Brand</Label>
            <Input
              type="select"
              name="brandId"
              id="brandId"
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
              required
            >
              <option value="">Select Brand</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="categoryId">Category</Label>
            <Input
              type="select"
              name="categoryId"
              id="categoryId"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="price">Price</Label>
            <Input
              type="number"
              name="price"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
            />
          </FormGroup>

          <FormGroup>
            <Label for="stockQuantity">In Stock Quantity</Label>
            <Input
              type="number"
              name="stockQuantity"
              id="stockQuantity"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              required
              min="0"
            />
          </FormGroup>

          <ModalFooter>
            <Button type="submit" color="primary">
              {id ? "Update Product" : "Add Product"}
            </Button>
            <Button color="secondary" onClick={() => setModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
  );
}
