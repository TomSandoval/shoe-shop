"use client";
import "./pageDashboard.css";
import React, { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import { faker } from "@faker-js/faker/locale/af_ZA";
import axios, { all } from "axios";
import { toast } from "react-hot-toast";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });
const poppinsBold = Poppins({ subsets: ["latin"], weight: "800" });

export default function Dashboard() {
  const [optionSelected, setOptionSelected] = useState("dashboard");
  const [allProducts, setAllProducts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [nameProduct, setNameProduct] = useState();
  const [userEmail, setUserEmail] = useState();
  const [productSelect, setProductSelect] = useState();
  const [orderSelect, setOrderSelect] = useState();
  const [sizePrototypeVariation, setsizePrototypeVariation] = useState([]);
  const [feature, setFeature] = useState();
  const [variationPrototype, setVariationPrototype] = useState({
    name: "",
    color: "#000000",
    images: [],
    size: [],
  });
  const [sizePrototype, setSizePrototype] = useState({
    size: "",
    stock: "",
  });

  const getProducts = async () => {
    try {
      const response = await axios.get(
        "https://shoe-shop-five.vercel.app/api/dashboard/products"
      );
      setAllProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(
        "https://shoe-shop-five.vercel.app/api/dashboard/users"
      );

      setAllUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getOrders = async () => {
    try {
      const response = await axios.get(
        "https://shoe-shop-five.vercel.app/api/dashboard/orders"
      );

      setAllOrders(response.data);
    } catch (error) {
      console.error(error, "Error to get orders");
    }
  };

  useEffect(() => {
    getProducts();
    getUsers();
    getOrders();
  }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );

  const handleOptions = (e) => {
    const value = e.target.getAttribute("value");

    setOptionSelected(value);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Agoust",
    "September",
    "October",
    "November",
    "December",
  ];

  const labelsPie = ["Running", "Lifestyle", "Casual", "Soccer"];

  const dataEarnings = {
    labels,
    datasets: [
      {
        label: "Earnings in $USD",
        data: labels.map(() => faker.number.int({ min: 400, max: 2000 })),
        backgroundColor: "rgba(34, 87, 122, 1)",
      },
    ],
  };

  const dataUsers = {
    labels,
    datasets: [
      {
        label: "Total Users",
        data: [20, 45, 50, 65, 70, 120, 180, 245, 300, 370, 400, 480],
        borderColor: "rgb(0, 0, 0)",
        backgroundColor: "rgba(255, 255, 255, 1)",
      },
    ],
  };

  const dataProducts = {
    labels: labelsPie,
    datasets: [
      {
        label: "Products",
        data: [12, 12, 12, 12],
        backgroundColor: [
          "rgb(0,195,238)",
          "rgb(74,72,130)",
          "rgb(235,255,0)",
          "rgb(77,148,92)",
        ],
      },
    ],
  };

  const handleSelectProduct = (id) => {
    const product = allProducts.find((product) => product._id === id);

    setProductSelect(product);
  };

  const handleChangeSize = (event, indexVariation) => {
    const { name, value } = event.target;

    let auxArray = [...sizePrototypeVariation];

    auxArray[indexVariation] = {
      ...auxArray[indexVariation],
      [name]: parseInt(value),
    };

    setsizePrototypeVariation(auxArray);
  };

  const handleAddSize = (indexVariation) => {
    if (
      sizePrototypeVariation[indexVariation].size &&
      sizePrototypeVariation[indexVariation].stock
    ) {
      const auxProduct = Object.assign({}, productSelect);

      auxProduct.variations[indexVariation].size.push(
        sizePrototypeVariation[indexVariation]
      );

      setProductSelect(auxProduct);
    }
  };

  const handleRemoveSize = (indexVariation, indexSize) => {
    const auxProduct = Object.assign({}, productSelect);

    auxProduct.variations[indexVariation].size = auxProduct.variations[
      indexVariation
    ].size.filter((_, index) => index !== indexSize);

    setProductSelect(auxProduct);
  };

  const handleChangeSimple = (event) => {
    const { name, value } = event.target;

    setProductSelect({
      ...productSelect,
      [name]: value,
    });
  };

  const handleChangeSelect = (event) => {
    const { name, value } = event.target;

    if (value === "yes") {
      setProductSelect({
        ...productSelect,
        [name]: true,
      });
    } else {
      setProductSelect({
        ...productSelect,
        [name]: false,
      });
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      if (feature) {
        setProductSelect((prevData) => ({
          ...prevData,
          features: [...prevData.features, feature],
        }));
        setFeature("");
      }
    }
  };

  const handleRemoveFeature = (indexFeature) => {
    const newFeatures = productSelect.features.filter(
      (_, index) => index !== indexFeature
    );

    setProductSelect({
      ...productSelect,
      features: newFeatures,
    });
  };

  const handleChangeSizeVariation = (event, indexVariation, indexSize) => {
    const { name, value } = event.target;

    const auxProduct = Object.assign({}, productSelect);

    if (!value) {
      auxProduct.variations[indexVariation].size[indexSize][name] = "";
    } else {
      auxProduct.variations[indexVariation].size[indexSize][name] =
        parseInt(value);
    }

    setProductSelect(auxProduct);
  };

  const handleDrag = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, indexVariation) => {
    e.preventDefault();

    const files = e.dataTransfer.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      await handleFile(file, indexVariation);
    }
  };

  const handleFile = async (file, indexVariation) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "shoe-shop");

    const auxProduct = Object.assign({}, productSelect);

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dycpuotwh/image/upload",
        data
      );
      const fileCloudy = await res.data;

      auxProduct.variations[indexVariation].images.push(fileCloudy.secure_url);

      setProductSelect(auxProduct);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleDropNewVariation = async (e) => {
    e.preventDefault();

    const files = e.dataTransfer.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      await handleFileNewVariation(file);
    }
  };

  const handleFileNewVariation = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "shoe-shop");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dycpuotwh/image/upload",
        data
      );

      const fileCloudy = await res.data;

      setVariationPrototype({
        ...variationPrototype,
        images: [...variationPrototype.images, fileCloudy.secure_url],
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleRemoveVariation = (indexVariation) => {
    const newVariations = productSelect.variations.filter(
      (_, index) => index !== indexVariation
    );

    setProductSelect({
      ...productSelect,
      variations: newVariations,
    });
  };

  const handleRemoveImageVariation = (indexImage, indexVariation) => {
    const auxProduct = Object.assign({}, productSelect);

    const newImages = auxProduct.variations[indexVariation].images.filter(
      (_, index) => index !== indexImage
    );

    auxProduct.variations[indexVariation].images = newImages;

    setProductSelect(auxProduct);
  };

  const handleChangeSizeNewVariation = (event) => {
    const { name, value } = event.target;

    if (!value) {
      setSizePrototype({
        ...sizePrototype,
        [name]: "",
      });
    } else {
      setSizePrototype({
        ...sizePrototype,
        [name]: parseInt(value),
      });
    }
  };

  const handleChangeVariation = (event) => {
    const { name, value } = event.target;

    setVariationPrototype({
      ...variationPrototype,
      [name]: value,
    });
  };

  const handleAddSizeToNewVariation = () => {
    if (sizePrototype.size && sizePrototype.stock) {
      setVariationPrototype({
        ...variationPrototype,
        size: [...variationPrototype.size, sizePrototype],
      });
      setSizePrototype({
        size: "",
        stock: "",
      });
    }
  };

  const handleRemoveSizeNewVariation = (indexSize) => {
    const newSize = variationPrototype.size.filter(
      (_, index) => index !== indexSize
    );

    setVariationPrototype({
      ...variationPrototype,
      size: newSize,
    });
  };

  const handleChangeSizeOfNewVariation = (event, indexSize) => {
    const { name, value } = event.target;

    const auxVariation = Object.assign({}, variationPrototype);

    auxVariation.size[indexSize][name] = isNaN(parseInt(value))
      ? ""
      : parseInt(value);

    setVariationPrototype(auxVariation);
  };

  const handleRemoveImageNewVariation = (indexImage) => {
    const newImages = variationPrototype.images.filter(
      (_, index) => index !== indexImage
    );

    setVariationPrototype({
      ...variationPrototype,
      images: newImages,
    });
  };

  const handleAddVariation = () => {
    if (
      variationPrototype.name &&
      variationPrototype.color &&
      variationPrototype.images.length > 0 &&
      variationPrototype.size.length > 0
    ) {
      setProductSelect({
        ...productSelect,
        variations: [...productSelect.variations, variationPrototype],
      });

      setVariationPrototype({
        name: "",
        color: "#00000",
        images: [],
        size: [],
      });
    }
  };

  const handleChangeDataVariation = (event, indexVariation) => {
    const { name, value } = event.target;

    const auxProduct = Object.assign({}, productSelect);

    auxProduct.variations[indexVariation][name] = value;

    setProductSelect(auxProduct);
  };

  const handleChangeDataSimpleProduct = (event) => {
    const { name, value } = event.target;

    setProductSelect({
      ...productSelect,
      [name]: value,
    });
  };

  const handleChangeSizeSimpleProduct = (event, indexSize) => {
    const { name, value } = event.target;

    const auxProduct = Object.assign({}, productSelect);

    auxProduct.size[indexSize][name] = isNaN(parseInt(value))
      ? ""
      : parseInt(value);

    setProductSelect(auxProduct);
  };

  const handleRemoveSizeSimpleProduct = (indexSize) => {
    const newSize = productSelect.size.filter(
      (_, index) => index !== indexSize
    );

    setProductSelect({
      ...productSelect,
      size: newSize,
    });
  };

  const handleAddSizeSimpleProduct = () => {
    if (sizePrototype.size && sizePrototype.stock) {
      setProductSelect({
        ...productSelect,
        size: [...productSelect.size, sizePrototype],
      });
      setSizePrototype({
        size: "",
        stock: "",
      });
    }
  };

  const handleDropSimpleProduct = async (e) => {
    e.preventDefault();

    const files = e.dataTransfer.files;

    console.log(files);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      await handleFileSimpleProduct(file);
    }
  };

  const handleFileSimpleProduct = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "shoe-shop");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dycpuotwh/image/upload",
        data
      );

      const fileCloudy = await res.data;

      console.log(productSelect);

      setProductSelect({
        ...productSelect,
        images: [...productSelect.images, fileCloudy.secure_url],
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleRemoveImageSimpleProduct = (indexImage) => {
    const newImages = productSelect.images.filter(
      (_, index) => index !== indexImage
    );

    setProductSelect({
      ...productSelect,
      images: newImages,
    });
  };

  const handleSubmitUpdate = async (event) => {
    event.preventDefault();

    if (
      productSelect.name &&
      productSelect.brand &&
      productSelect.category &&
      productSelect.gender &&
      productSelect.material &&
      productSelect.background_card &&
      productSelect.description
    ) {
      try {
        const res = await axios.put(
          `https://shoe-shop-five.vercel.app/api/products/${productSelect._id}`,
          productSelect
        );

        toast.success("Product Update!");
      } catch (error) {
        console.error("error to update", error);
      }
    }
  };

  const handleUpdateProduct = () => {
    return (
      <>
        <form
          onSubmit={handleSubmitUpdate}
          className={`form-edit-product ${poppins.className}`}
          action="update"
        >
          <div className="dashboard-form-product-two-input-container">
            <div>
              <label htmlFor="name">Name</label>
              <input
                onChange={handleChangeSimple}
                value={productSelect.name}
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div>
              <label htmlFor="brand">Brand</label>
              <input
                onChange={handleChangeSimple}
                value={productSelect.brand}
                type="text"
                name="brand"
                id="brand"
              />
            </div>
          </div>
          <div className="dashboard-form-product-two-input-container">
            <div>
              <label htmlFor="gender">Gender</label>
              <input
                onChange={handleChangeSimple}
                value={productSelect.gender}
                type="text"
                name="gender"
                id="gender"
              />
            </div>
            <div>
              <label htmlFor="material">Material</label>
              <input
                onChange={handleChangeSimple}
                value={productSelect.material}
                type="text"
                name="material"
                id="material"
              />
            </div>
          </div>
          <div className="dashboard-form-product-two-input-container">
            <div>
              <label htmlFor="category">Category</label>
              <input
                onChange={handleChangeSimple}
                value={productSelect.category}
                type="text"
                name="category"
                id="category"
              />
            </div>
            <div>
              <label htmlFor="background_card">Background card</label>
              <input
                onChange={handleChangeSimple}
                value={productSelect.background_card}
                type="color"
                name="background_card"
                id="background_card"
              />
            </div>
          </div>
          <div className="dashboard-form-product-one-input-container">
            <label htmlFor="description">Description</label>
            <textarea
              onChange={handleChangeSimple}
              value={productSelect.description}
              name="description"
              id="description"
            />
          </div>
          <div className="dashboard-form-product-one-input-container">
            <label htmlFor="in_discount">Product in discount?</label>
            <select
              onChange={handleChangeSelect}
              defaultValue={productSelect.in_discount == true ? "yes" : "no"}
              name="in_discount"
              id="in_discount"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          {productSelect.in_discount ? (
            <div className="dashboard-form-product-two-input-container">
              <div>
                <label htmlFor="discount_price">Discount price</label>
                <input
                  onChange={handleChangeSimple}
                  value={productSelect.discount_price}
                  type="number"
                  id="discount_price"
                  name="discount_price"
                />
              </div>
              <div>
                <label htmlFor="discount_price">Original price</label>
                <input
                  onChange={handleChangeSimple}
                  value={productSelect.original_price}
                  type="number"
                  id="discount_price"
                  name="original_price"
                />
              </div>
            </div>
          ) : (
            <div className="dashboard-form-product-one-input-container">
              <label htmlFor="original_price">Price</label>
              <input
                onChange={handleChangeSimple}
                value={productSelect.original_price}
                type="number"
                name="original_price"
                id="original_price"
              />
            </div>
          )}
          <div className="dashboard-form-product-one-input-container">
            <label htmlFor="features">Features</label>
            <input
              value={feature}
              onChange={(e) => setFeature(e.target.value)}
              onKeyDown={handleEnterKeyPress}
              type="text"
              name="features"
              id="features"
            />
          </div>
          <div className="dashboard-form-product-one-input-container">
            <label htmlFor="features">Features</label>
            <div className="features-container">
              {productSelect.features?.map((feature, index) => (
                <span onClick={() => handleRemoveFeature(index)} key={index}>
                  {feature}
                </span>
              ))}
            </div>
          </div>
          <div className="dashboard-form-product-one-input-container">
            <label htmlFor="have_variations">
              This product have variations?
            </label>
            <select
              defaultValue={productSelect.have_variations ? "yes" : "no"}
              onChange={handleChangeSelect}
              name="have_variations"
              id="have_variations"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          {productSelect.have_variations ? (
            <>
              {productSelect.variations?.map((variation, indexVariation) => {
                return (
                  <div style={{ width: "100%" }} key={indexVariation}>
                    <span style={{ textDecoration: "underline" }}>
                      Variation {indexVariation + 1}
                    </span>
                    <div className="variation-data-container">
                      <div className="dashboard-form-product-two-input-container">
                        <div>
                          <label htmlFor="name">Color name</label>
                          <input
                            onChange={(e) =>
                              handleChangeDataVariation(e, indexVariation)
                            }
                            value={variation.name}
                            type="text"
                            name="name"
                            id="name"
                          />
                        </div>
                        <div>
                          <label htmlFor="color">Color</label>
                          <input
                            onChange={(e) =>
                              handleChangeDataVariation(e, indexVariation)
                            }
                            value={variation.color}
                            type="color"
                            name="color"
                            id="color"
                          />
                        </div>
                      </div>
                      {variation?.size?.map((size, indexSize) => {
                        return (
                          <div
                            className="dashboard-size-data-container"
                            key={indexSize}
                          >
                            <div className="dashboard-form-product-two-input-container">
                              <div>
                                <label htmlFor="size">Size</label>
                                <input
                                  onChange={(e) =>
                                    handleChangeSizeVariation(
                                      e,
                                      indexVariation,
                                      indexSize
                                    )
                                  }
                                  value={size.size}
                                  type="number"
                                  name="size"
                                  id="size"
                                />
                              </div>
                              <div>
                                <label htmlFor="stock">Size stock</label>
                                <input
                                  onChange={(e) =>
                                    handleChangeSizeVariation(
                                      e,
                                      indexVariation,
                                      indexSize
                                    )
                                  }
                                  value={size.stock}
                                  type="number"
                                  name="stock"
                                  id="stock"
                                />
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveSize(indexVariation, indexSize)
                              }
                            >
                              Remove size
                            </button>
                          </div>
                        );
                      })}
                      <div className="dashboard-hr"></div>
                      <div className="dashboard-form-product-two-input-container">
                        <div>
                          <label htmlFor="size">Size</label>
                          <input
                            value={sizePrototypeVariation[indexVariation]?.size}
                            onChange={(e) =>
                              handleChangeSize(e, indexVariation)
                            }
                            type="number"
                            name="size"
                          />
                        </div>
                        <div>
                          <label htmlFor="stock">Size stock</label>
                          <input
                            value={
                              sizePrototypeVariation[indexVariation]?.stock
                            }
                            onChange={(e) =>
                              handleChangeSize(e, indexVariation)
                            }
                            type="number"
                            name="stock"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddSize(indexVariation)}
                        className="button-add-size-dashboard"
                        type="button"
                      >
                        Add size
                      </button>
                      <div
                        onDragOver={handleDrag}
                        onDrop={(e) => handleDrop(e, indexVariation)}
                        className="dashboard-form-product-variations-images-container"
                      >
                        {variation.images?.map((image, indexImage) => {
                          return (
                            <div key={indexImage}>
                              <img
                                src={image}
                                alt={`${productSelect.name} ${indexImage}`}
                              />
                              <button
                                onClick={() =>
                                  handleRemoveImageVariation(
                                    indexImage,
                                    indexVariation
                                  )
                                }
                                type="button"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  style={{ fill: "rgba(255, 255, 255, 1)" }}
                                >
                                  <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                                </svg>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                      <button
                        onClick={() => handleRemoveVariation(indexVariation)}
                        className="button-remove-variation-dashboard"
                        type="button"
                      >
                        Remove variation
                      </button>
                    </div>
                  </div>
                );
              })}
              <div className="dashboard-add-variation-container">
                <div className="dashboard-form-product-two-input-container">
                  <div>
                    <label htmlFor="name">Color name</label>
                    <input
                      onChange={handleChangeVariation}
                      value={variationPrototype.name}
                      type="text"
                      name="name"
                      id="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="color">Color </label>
                    <input
                      onChange={handleChangeVariation}
                      value={variationPrototype.color}
                      type="color"
                      name="color"
                      id="color"
                    />
                  </div>
                </div>
                {variationPrototype.size?.map((size, index) => {
                  return (
                    <div className="dashboard-size-data-container" key={index}>
                      <div className="dashboard-form-product-two-input-container">
                        <div>
                          <label htmlFor="size">Size</label>
                          <input
                            onChange={(e) =>
                              handleChangeSizeOfNewVariation(e, index)
                            }
                            value={size.size}
                            type="number"
                            name="size"
                            id="size"
                          />
                        </div>
                        <div>
                          <label htmlFor="stock">Size stock</label>
                          <input
                            onChange={(e) =>
                              handleChangeSizeOfNewVariation(e, index)
                            }
                            value={size.stock}
                            type="number"
                            name="stock"
                            id="stock"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveSizeNewVariation(index)}
                        type="button"
                      >
                        Remove size
                      </button>
                    </div>
                  );
                })}
                {variationPrototype.size.length > 0 && (
                  <div className="dashboard-hr"></div>
                )}
                <div className="dashboard-form-product-two-input-container">
                  <div>
                    <label htmlFor="size">Size</label>
                    <input
                      value={sizePrototype.size}
                      onChange={handleChangeSizeNewVariation}
                      type="number"
                      name="size"
                      id="size"
                    />
                  </div>
                  <div>
                    <label htmlFor="stock">Size stock</label>
                    <input
                      value={sizePrototype.stock}
                      onChange={handleChangeSizeNewVariation}
                      type="number"
                      name="stock"
                      id="stock"
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddSizeToNewVariation}
                  className="button-add-size-dashboard"
                  type="button"
                >
                  Add size
                </button>

                <div
                  onDrop={handleDropNewVariation}
                  onDragOver={handleDrag}
                  className={
                    variationPrototype.images.length > 0
                      ? "dashboard-form-product-variations-images-container"
                      : "dashboard-form-product-variations-images-container-text"
                  }
                >
                  {variationPrototype.images?.length === 0 ? (
                    <span>Drag and drop images</span>
                  ) : (
                    variationPrototype.images?.map((image, indexImage) => {
                      return (
                        <div key={indexImage}>
                          <img
                            src={image}
                            alt={`${productSelect.name} ${indexImage}`}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveImageNewVariation(indexImage)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              style={{ fill: "rgba(255, 255, 255, 1)" }}
                            >
                              <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                            </svg>
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
                <button
                  onClick={handleAddVariation}
                  type="button"
                  className="button-add-variation-dashboard"
                >
                  Add variation
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="dashboard-form-product-two-input-container">
                <div>
                  <label htmlFor="name">Name color</label>
                  <input
                    onChange={handleChangeDataSimpleProduct}
                    value={productSelect.color.name}
                    type="text"
                    name="name"
                    id="name"
                  />
                </div>
                <div>
                  <label htmlFor="color">Color</label>
                  <input
                    onChange={handleChangeDataSimpleProduct}
                    value={productSelect.color.color}
                    type="color"
                    name="color"
                    id="color"
                  />
                </div>
              </div>
              {productSelect.size?.map((size, index) => {
                return (
                  <div className="dashboard-size-data-container" key={index}>
                    <div className="dashboard-form-product-two-input-container">
                      <div>
                        <label htmlFor="size">Size</label>
                        <input
                          onChange={(e) =>
                            handleChangeSizeSimpleProduct(e, index)
                          }
                          value={size.size}
                          type="number"
                          name="size"
                          id="size"
                        />
                      </div>
                      <div>
                        <label htmlFor="stock">Size stock</label>
                        <input
                          onChange={(e) =>
                            handleChangeSizeSimpleProduct(e, index)
                          }
                          value={size.stock}
                          type="number"
                          name="stock"
                          id="stock"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveSizeSimpleProduct(index)}
                      type="button"
                    >
                      Remove size
                    </button>
                  </div>
                );
              })}
              {productSelect.size.length > 0 && (
                <div className="dashboard-hr"></div>
              )}
              <div className="dashboard-form-product-two-input-container">
                <div>
                  <label htmlFor="size">Size</label>
                  <input
                    value={sizePrototype.size}
                    onChange={handleChangeSizeNewVariation}
                    type="number"
                    name="size"
                    id="size"
                  />
                </div>
                <div>
                  <label htmlFor="stock">Size stock</label>
                  <input
                    value={sizePrototype.stock}
                    onChange={handleChangeSizeNewVariation}
                    type="number"
                    name="stock"
                    id="stock"
                  />
                </div>
              </div>
              <button
                onClick={handleAddSizeSimpleProduct}
                className="button-add-size-dashboard"
                type="button"
              >
                Add size
              </button>
              <div
                onDragOver={handleDrag}
                onDrop={handleDropSimpleProduct}
                className={
                  productSelect.images?.length > 0
                    ? "dashboard-form-product-variations-images-container"
                    : "dashboard-form-product-variations-images-container-text"
                }
              >
                {productSelect.images.length <= 0 ? (
                  <span>Drag and drop images</span>
                ) : (
                  productSelect.images?.map((image, indexImage) => {
                    return (
                      <div key={indexImage}>
                        <img
                          src={image}
                          alt={`${productSelect.name} ${indexImage}`}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveImageSimpleProduct(indexImage)
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            style={{ fill: "rgba(255, 255, 255, 1)" }}
                          >
                            <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                          </svg>
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </>
          )}
          <button className="dashboard-button-update" type="submit">
            Update Product
          </button>
        </form>
      </>
    );
  };

  const handleProducts = (name) => {
    if (name) {
      const productsMatch = allProducts.filter((p) =>
        p.name.toLowerCase().includes(name.toLowerCase())
      );
      return productsMatch.map((p) => {
        return (
          <div
            className={`dashboard-product-card ${poppins.className}`}
            key={p._id}
          >
            <div className="dashboard-product-card-image-container">
              <img
                src={p.images[0] || p.variations[0]?.images[0]}
                alt={p.name}
              />
            </div>

            <div className="dashboard-product-card-info-container">
              <div className="dashboard-product-card-title-container">
                <h4>{p.name}</h4>
                <span>{p.brand}</span>
              </div>
              <p>{p.description}</p>
              <div className="dashboard-product-card-features-container">
                <span>Category: {p.category}</span>
                <span>
                  Colors: {p.variations.length === 0 ? 1 : p.variations.length}
                </span>
                {p.in_discount ? (
                  <>
                    <span>Discount price: ${p.discount_price}</span>
                    <span>Price: ${p.original_price}</span>
                  </>
                ) : (
                  <span>Price: ${p.original_price}</span>
                )}
              </div>
              <div className="dashboard-product-card-buttons-container">
                <button onClick={() => handleSelectProduct(p._id)}>
                  Edit product
                </button>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return allProducts.map((p) => {
        return (
          <div
            className={`dashboard-product-card ${poppins.className}`}
            key={p._id}
          >
            <div className="dashboard-product-card-image-container">
              <img
                src={p.images[0] || p.variations[0]?.images[0]}
                alt={p.name}
              />
            </div>

            <div className="dashboard-product-card-info-container">
              <div className="dashboard-product-card-title-container">
                <h4>{p.name}</h4>
                <span>{p.brand}</span>
              </div>
              <p>{p.description}</p>
              <div className="dashboard-product-card-features-container">
                <span>Category: {p.category}</span>
                <span>
                  Colors: {p.variations.length === 0 ? 1 : p.variations.length}
                </span>
                {p.in_discount ? (
                  <>
                    <span>Discount price: ${p.discount_price}</span>
                    <span>Price: ${p.original_price}</span>
                  </>
                ) : (
                  <span>Price: ${p.original_price}</span>
                )}
              </div>
              <div className="dashboard-product-card-buttons-container">
                <button onClick={() => handleSelectProduct(p._id)}>
                  Edit product
                </button>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  const handleUsers = (email) => {
    if (email) {
      const usersMatch = allUsers.filter((user) =>
        user.email.toLowerCase().includes(email.toLowerCase())
      );

      return usersMatch.map((user) => {
        return (
          <div className="dashboard-product-card" key={user._id}>
            <div className="dashboard-product-card-image-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="145"
                height="145"
                viewBox="0 0 24 24"
                style={{ fill: "rgba(0, 0, 0, 1)" }}
              >
                <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
              </svg>
            </div>
            <div className="dashboard-product-card-info-container">
              <h3>Username: {user.name}</h3>
              <h3>Email: {user.email}</h3>
              <h3>Roll: {user.roll}</h3>
              <div className="dashboard-user-buttons-container">
                {user.status ? (
                  <button>Suspend User</button>
                ) : (
                  <button className="button-user-suspended">
                    Remove suspension
                  </button>
                )}
                <button>Send Email</button>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return allUsers.map((user) => {
        return (
          <div className="dashboard-product-card" key={user._id}>
            <div className="dashboard-product-card-image-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="145"
                height="145"
                viewBox="0 0 24 24"
                style={{ fill: "rgba(0, 0, 0, 1)" }}
              >
                <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
              </svg>
            </div>
            <div className="dashboard-product-card-info-container">
              <h3>Username: {user.name}</h3>
              <h3>Email: {user.email}</h3>
              <h3>Roll: {user.roll}</h3>
              <div className="dashboard-user-buttons-container">
                {user.status ? (
                  <button>Suspend User</button>
                ) : (
                  <button className="button-user-suspended">
                    Remove suspension
                  </button>
                )}
                <button>Send Email</button>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  const handleOrderProducts = (productDetail, index) => {
    let variationFound;

    if (productDetail.product.have_variations === true) {
      variationFound = productDetail.product.variations.find(
        (variation) => variation.name === productDetail.colorSelected
      );
    }

    return (
      <div className="order-product-card" key={index}>
        <div className="order-product-card-image-container">
          <img
            src={
              productDetail.product.have_variations
                ? variationFound.images[0]
                : productDetail.product.images[0]
            }
            alt={productDetail.product.name}
          />
        </div>
        <div>
          <h4 className="order-product-card-title">{productDetail.product.name}</h4>
        </div>
        <div>
          <span className="order-product-card-price">
            Price: $
            {productDetail.product.discount_price ||
              productDetail.product.original_price}
          </span>
        </div>
        <div className="order-product-card-options-container">
          <span>Size selected: {productDetail.sizeSelected}</span>
          <span>Color Selected: {productDetail.colorSelected}</span>
        </div>
      </div>
    );
  };

  const handleName = (e) => {
    setNameProduct(e.target.value);
  };

  const handleEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handleCase = (option) => {
    switch (option) {
      case "dashboard": {
        return (
          <>
            <div className={`analytics-container ${poppins.className}`}>
              <h3>Earnings</h3>
              <Bar options={options} data={dataEarnings} />
            </div>
            <div className={`analytics-container ${poppins.className}`}>
              <h3>Total Users</h3>
              <Line options={options} data={dataUsers} />
            </div>
            <div className={`analytics-container ${poppins.className}`}>
              <h3>Products</h3>
              <div>
                <Pie data={dataProducts} />
              </div>
            </div>
          </>
        );
      }

      case "products": {
        return (
          <section className="section-products">
            {!productSelect && (
              <input
                autoComplete="no"
                className="search-product-input"
                type="text"
                placeholder="Search Product"
                name="name"
                id="name"
                onChange={handleName}
              />
            )}
            {productSelect && (
              <button
                onClick={() => setProductSelect()}
                className={`dashboard-product-button-back ${poppinsBold.className}`}
              >
                &lt;
              </button>
            )}
            {productSelect
              ? handleUpdateProduct()
              : handleProducts(nameProduct)}
          </section>
        );
      }
      case "users": {
        return (
          <section className="section-products">
            <input
              autoComplete="no"
              className="search-product-input"
              type="text"
              name="email"
              id="email"
              onChange={handleEmail}
              placeholder="User Email"
            />
            {handleUsers(userEmail)}
          </section>
        );
      }
      case "orders": {
        return (
          <section className={`section-orders ${poppins.className}`}>
            {orderSelect ? (
              <>
                <div className="order-general-information-container">
                  <div className="order-user-information-container">
                    <h3>User information</h3>
                    <div className="order-user-information-data-container">
                      <div>
                        <span className="order-user-information-data-title">
                          User email
                        </span>
                        <span>{orderSelect.userEmail}</span>
                      </div>
                      <div>
                        <span className="order-user-information-data-title">
                          State
                        </span>
                        <span>{orderSelect.address.state}</span>
                      </div>
                      <div>
                        <span className="order-user-information-data-title">
                          City
                        </span>
                        <span>{orderSelect.address.city}</span>
                      </div>
                      <div>
                        <span className="order-user-information-data-title">
                          Postal code
                        </span>
                        <span>{orderSelect.address.postalCode}</span>
                      </div>
                      <div>
                        <span className="order-user-information-data-title">
                          Street
                        </span>
                        <span>{orderSelect.address.street}</span>
                      </div>
                    </div>
                  </div>
                  <div className="order-select-information-container">
                    <h3>Order information</h3>
                    <div className="order-information-data-container">
                      <div>
                        <span className="order-user-information-data-title">
                          Products total
                        </span>
                        <span>{orderSelect.products.length}</span>
                      </div>
                      <div>
                        <span className="order-user-information-data-title">
                          Order state
                        </span>
                        <span>
                          {orderSelect.pending === true
                            ? "Pending"
                            : "Complete"}
                        </span>
                      </div>
                      <div>
                        <span className="order-user-information-data-title">
                          In shipping
                        </span>
                        <span>
                          {orderSelect.in_shipping === true ? "True" : "False"}
                        </span>
                      </div>
                      <div>
                        <span className="order-user-information-data-title">
                          Date of purchase
                        </span>
                        <span>{orderSelect.date}</span>
                      </div>
                      <div>
                        <button>Send Product</button>
                        <button>Complete purchase</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-select-products-container">
                  <h3>Products</h3>
                  <div className="order-select-products-map-container">
                    {orderSelect.products.map((productDetail, index) => {
                      return handleOrderProducts(productDetail, index);
                    })}
                  </div>
                </div>
              </>
            ) : (
              allOrders.map((order, index) => {
                return (
                  <div className="order-card-container" key={index}>
                    <div className="order-card-svg-container">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="200"
                        height="200"
                        viewBox="0 0 24 24"
                        style={{ fill: "rgba(0, 0, 0, 1)" }}
                      >
                        <path d="M21.993 7.95a.96.96 0 0 0-.029-.214c-.007-.025-.021-.049-.03-.074-.021-.057-.04-.113-.07-.165-.016-.027-.038-.049-.057-.075-.032-.045-.063-.091-.102-.13-.023-.022-.053-.04-.078-.061-.039-.032-.075-.067-.12-.094-.004-.003-.009-.003-.014-.006l-.008-.006-8.979-4.99a1.002 1.002 0 0 0-.97-.001l-9.021 4.99c-.003.003-.006.007-.011.01l-.01.004c-.035.02-.061.049-.094.073-.036.027-.074.051-.106.082-.03.031-.053.067-.079.102-.027.035-.057.066-.079.104-.026.043-.04.092-.059.139-.014.033-.032.064-.041.1a.975.975 0 0 0-.029.21c-.001.017-.007.032-.007.05V16c0 .363.197.698.515.874l8.978 4.987.001.001.002.001.02.011c.043.024.09.037.135.054.032.013.063.03.097.039a1.013 1.013 0 0 0 .506 0c.033-.009.064-.026.097-.039.045-.017.092-.029.135-.054l.02-.011.002-.001.001-.001 8.978-4.987c.316-.176.513-.511.513-.874V7.998c0-.017-.006-.031-.007-.048zm-10.021 3.922L5.058 8.005 7.82 6.477l6.834 3.905-2.682 1.49zm.048-7.719L18.941 8l-2.244 1.247-6.83-3.903 2.153-1.191zM13 19.301l.002-5.679L16 11.944V15l2-1v-3.175l2-1.119v5.705l-7 3.89z"></path>
                      </svg>
                    </div>
                    <div className="order-information-container">
                      <h3>User: {order.userEmail}</h3>
                      <div className="secondary-info-orders">
                        <span>Total products: {order.products.length}</span>
                        <span>Date of purchase: {order.date}</span>
                      </div>
                      <button onClick={() => setOrderSelect(order)}>
                        Detail
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </section>
        );
      }
      default:
        break;
    }
  };

  return (
    <main className={`dashboard-all-container ${poppinsBold.className}`}>
      <div className="dashboard-right-panel">
        <div className="dashboard-title-container">
          <h1>Shoe Shop</h1>
        </div>
        <div
          className={`dashboard-right-panel-options-container ${poppins.className}`}
        >
          <div
            className={
              optionSelected === "dashboard"
                ? "dashboard-right-panel-active"
                : "dashboard-right-panel-option-container"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              style={{ fill: "rgba(0, 0, 0, 1)" }}
            >
              <path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"></path>
            </svg>{" "}
            <span onClick={handleOptions} value={"dashboard"}>
              Dashboard
            </span>
          </div>
          <div
            className={
              optionSelected === "products"
                ? "dashboard-right-panel-active"
                : "dashboard-right-panel-option-container"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              style={{ fill: "rgba(0, 0, 0, 1)" }}
            >
              <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8 8a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828l-8-8zM7 9a2 2 0 1 1 .001-4.001A2 2 0 0 1 7 9z"></path>
            </svg>
            <span onClick={handleOptions} value={"products"}>
              Products
            </span>
          </div>
          <div
            className={
              optionSelected === "users"
                ? "dashboard-right-panel-active"
                : "dashboard-right-panel-option-container"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              style={{ fill: "rgba(0, 0, 0, 1)" }}
            >
              <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
            </svg>
            <span onClick={handleOptions} value={"users"}>
              Users
            </span>
          </div>
          <div
            className={
              optionSelected === "orders"
                ? "dashboard-right-panel-active"
                : "dashboard-right-panel-option-container"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              style={{ fill: "rgba(0, 0, 0, 1)" }}
            >
              <path d="M21.993 7.95a.96.96 0 0 0-.029-.214c-.007-.025-.021-.049-.03-.074-.021-.057-.04-.113-.07-.165-.016-.027-.038-.049-.057-.075-.032-.045-.063-.091-.102-.13-.023-.022-.053-.04-.078-.061-.039-.032-.075-.067-.12-.094-.004-.003-.009-.003-.014-.006l-.008-.006-8.979-4.99a1.002 1.002 0 0 0-.97-.001l-9.021 4.99c-.003.003-.006.007-.011.01l-.01.004c-.035.02-.061.049-.094.073-.036.027-.074.051-.106.082-.03.031-.053.067-.079.102-.027.035-.057.066-.079.104-.026.043-.04.092-.059.139-.014.033-.032.064-.041.1a.975.975 0 0 0-.029.21c-.001.017-.007.032-.007.05V16c0 .363.197.698.515.874l8.978 4.987.001.001.002.001.02.011c.043.024.09.037.135.054.032.013.063.03.097.039a1.013 1.013 0 0 0 .506 0c.033-.009.064-.026.097-.039.045-.017.092-.029.135-.054l.02-.011.002-.001.001-.001 8.978-4.987c.316-.176.513-.511.513-.874V7.998c0-.017-.006-.031-.007-.048zm-10.021 3.922L5.058 8.005 7.82 6.477l6.834 3.905-2.682 1.49zm.048-7.719L18.941 8l-2.244 1.247-6.83-3.903 2.153-1.191zM13 19.301l.002-5.679L16 11.944V15l2-1v-3.175l2-1.119v5.705l-7 3.89z"></path>
            </svg>
            <span onClick={handleOptions} value={"orders"}>
              Orders
            </span>
          </div>
        </div>
      </div>
      <div className="dashboard-left-panel">{handleCase(optionSelected)}</div>
    </main>
  );
}
