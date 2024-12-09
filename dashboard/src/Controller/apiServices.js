import axios from "axios";

//admin
const getLogin = async (username, password) => {
  try {
    const response = await axios.post(`/api/auth/admin/login`, {
      usernameOrEmail: username,
      password: password,
    });
    return response;
  } catch (error) {
    console.error("Error login:", error.message);
    throw error;
  }
};

const getAllProducts = async () => {
  try {
    const response = await axios.get(`/api/service/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw error;
  }
};
const getProductById = async (id) => {
  try {
    const response = await axios.get(`/api/service/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error.message);
    throw error;
  }
};

const updateProduct = async (product) => {
  console.log(product);
};

// Brand
const getAllBrands = async () => {
  try {
    const respone = await axios.get(`/api/service/brands`);
    return respone.data;
  } catch (error) {
    console.error("Error fetching brands:", error.message);
    throw error;
  }
};

const getBrandById = async (id) => {
  try {
    const response = await axios.get(`/api/service/brands/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching brand by ID:", error.message);
    throw error;
  }
};

const getNameBrandById = async (id) => {
  try {
    const response = await axios.get(`/api/service/brands/${id}`);
    return response.data.name;
  } catch (error) {
    console.error("Error fetching brand by ID:", error.message);
    throw error;
  }
};

const updateBrand = async ({ id, name, logo }) => {
  try {
    let data = new FormData();
    data.append(
      "brand",
      new Blob([JSON.stringify({ name })], { type: "application/json" })
    );
    data.append("file", logo);
    const response = await axios.put(`/api/service/brands/${id}`, data);
    return response;
  } catch (error) {
    console.error("Error Update Brand by ID:", error.message);
    throw error;
  }
};

const addBrand = async ({ name, logo }) => {
  try {
    let data = new FormData();
    data.append(
      "brand",
      new Blob([JSON.stringify({ name })], { type: "application/json" })
    );
    data.append("file", logo);

    const respone = await axios.post(`/api/service/brands`, data);

    return respone;
  } catch (error) {
    console.error("Error add brand:", error.message);
    throw error;
  }
};

// Category
const getAllCategories = async () => {
  try {
    const respone = await axios.get(`/api/service/categories`);
    return respone.data;
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    throw error;
  }
};

const addCategory = async (newCategory) => {
  try {
    const respone = await axios.post(`/api/service/categories`, {
      name: newCategory?.name,
    });
    return respone;
  } catch (error) {
    console.error("Error add category:", error.message);
    throw error;
  }
};

const getCategogyById = async (id) => {
  try {
    const response = await axios.get(`/api/service/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Categorie by ID:", error.message);
    throw error;
  }
};

const getNameCategoryById = async (id) => {
  try {
    const response = await axios.get(`/api/service/categories/${id}`);
    return response.data.name;
  } catch (error) {
    console.error("Error fetching Categorie by ID:", error.message);
    throw error;
  }
};

const updateCategory = async (id, name) => {
  try {
    const response = await axios.put(`/api/service/categories/${id}`, {
      name: name,
    });
    console.log("Update Categorie By ID:", response);
    return response;
  } catch (error) {
    console.error("Error Update Categorie by ID:", error.message);
    throw error;
  }
};

// Staffs

const getAllStaffs = async () => {
  try {
    const response = await axios.get(`/api/admin`);
    console.log(response);
  } catch (error) {
    console.error("Error fetching staffs:", error.message);
    throw error;
  }
};
// Users

const getAllUsers = async () => {
  try {
    const response = await axios.get(`/api/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw error;
  }
};

// function of user
const API_BASE_URL = "http://localhost:5173/baki-admin";
// Enable user by ID
const enableUser = async (id) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/enable/${id}`, null, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error enabling user:", error);
    throw error;
  }
};

// Disable user by ID
const disableUser = async (id) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/disable/${id}`, null, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error disabling user:", error);
    throw error;
  }
};

// Bundle all the functions into an object and export as default
export default {
  getLogin,

  getAllProducts,
  getProductById,
  updateProduct,

  getAllBrands,
  getBrandById,
  getNameBrandById,
  addBrand,
  updateBrand,

  getAllCategories,
  getCategogyById,
  getNameCategoryById,
  addCategory,
  updateCategory,

  getAllStaffs,

  getAllUsers,
  enableUser,
  disableUser,
};
