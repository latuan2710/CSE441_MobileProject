import axios from "axios";

export const getLogin = async (username, password) => {
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

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`/api/service/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`/api/service/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error.message);
    throw error;
  }
};

export const addProduct = async ({ name, image }) => {
  try {
    let data = new FormData();
    data.append(
      "product",
      new Blob([JSON.stringify({ name })], { type: "application/json" })
    );
    data.append("file", image);

    const respone = await axios.post(`/api/service/products`, data);

    return respone;
  } catch (error) {
    console.error("Error add products:", error.message);
    throw error;
  }
};

export const updateProduct = async ({ id, name, image }) => {
  try {
    let data = new FormData();
    data.append(
      "product",
      new Blob([JSON.stringify({ name })], { type: "application/json" })
    );
    data.append("file", image);
    const response = await axios.put(`/api/service/products/${id}`, data);
    return response;
  } catch (error) {
    console.error("Error Update Product by ID:", error.message);
    throw error;
  }
};

export const getAllBrands = async () => {
  try {
    const respone = await axios.get(`/api/service/brands`);
    return respone.data;
  } catch (error) {
    console.error("Error fetching brands:", error.message);
    throw error;
  }
};

export const getBrandById = async (id) => {
  try {
    const response = await axios.get(`/api/service/brands/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching brand by ID:", error.message);
    throw error;
  }
};

export const getNameBrandById = async (id) => {
  try {
    const response = await axios.get(`/api/service/brands/${id}`);
    return response.data.name;
  } catch (error) {
    console.error("Error fetching brand by ID:", error.message);
    throw error;
  }
};

export const updateBrand = async ({ id, name, logo }) => {
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

export const addBrand = async ({ name, logo }) => {
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

export const getAllCategories = async () => {
  try {
    const respone = await axios.get(`/api/service/categories`);
    return respone.data;
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    throw error;
  }
};

export const addCategory = async (newCategory) => {
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

export const getCategogyById = async (id) => {
  try {
    const response = await axios.get(`/api/service/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Categorie by ID:", error.message);
    throw error;
  }
};

export const getNameCategoryById = async (id) => {
  try {
    const response = await axios.get(`/api/service/categories/${id}`);
    return response.data.name;
  } catch (error) {
    console.error("Error fetching Categorie by ID:", error.message);
    throw error;
  }
};

export const updateCategory = async (id, name) => {
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

export const getAllStaffs = async () => {
  try {
    const response = await axios.get(`/api/admin`);
    return response.data;
  } catch (error) {
    console.error("Error fetching staffs:", error.message);
    throw error;
  }
};

export const getStaffById = async (id) => {
  try {
    const response = await axios.get(`/api/admin/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching brand by ID:", error.message);
    throw error;
  }
};

export const addStaff = async ({ name, avatar }) => {
  try {
    let data = new FormData();
    data.append(
      "admin",
      new Blob([JSON.stringify({ name })], { type: "application/json" })
    );
    data.append("file", avatar);

    const respone = await axios.post(`/api/admin`, data);

    return respone;
  } catch (error) {
    console.error("Error add user:", error.message);
    throw error;
  }
};

export const updateStaff = async ({ id, name, avatar }) => {
  try {
    let data = new FormData();
    data.append(
      "admin",
      new Blob([JSON.stringify({ name })], { type: "application/json" })
    );
    data.append("file", avatar);
    const response = await axios.put(`/api/admin/${id}`, data);
    return response;
  } catch (error) {
    console.error("Error Update User by ID:", error.message);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`/api/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching brand by ID:", error.message);
    throw error;
  }
};

export const addUser = async (request, avatar) => {
  try {
    let data = new FormData();
    data.append(
      "request",
      new Blob([JSON.stringify(request)], { type: "application/json" })
    );

    if (avatar) {
      data.append("file", avatar);
    }

    const respone = await axios.post(`/api/users`, data);

    return respone;
  } catch (error) {
    console.error("Error add user:", error.message);
    throw error;
  }
};

export const updateUser = async (id, userDTO, avatar) => {
  try {
    let data = new FormData();
    data.append("file", avatar);
    data.append(
      "userDTO",
      new Blob([JSON.stringify(userDTO)], { type: "application/json" })
    );

    const response = await axios.put(`/api/users/${id}`, data);
    return response;
  } catch (error) {
    console.error("Error Update User by ID:", error.message);
    throw error;
  }
};

// Enable user by ID
export const enableUser = async (id) => {
  try {
    const response = await axios.put(`/enable/${id}`, null, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error enabling user:", error);
    throw error;
  }
};

// Disable user by ID
export const disableUser = async (id) => {
  try {
    const response = await axios.put(`/disable/${id}`, null, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error disabling user:", error);
    throw error;
  }
};
