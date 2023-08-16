"use client";
import "./pageCreate.css";
import { useState, useEffect, useRef } from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

import axios from "axios";

export default function CreateProduct() {
  const inputRef = useRef(null);
  const [formProduct, setFormProduct] = useState({
    name: "",
    brand: "",
    category: "",
    gender: "",
    material: "",
    description: "",
    in_stock: true,
    in_discount: null,
    original_price: 0,
    variations: [],
    discount_price: null,
    features: [],
    have_variations: true,
    color: {
      name: "",
      color: "",
    },
    size: [],
    images: [],
    background_card: "",
  });
  const [formPage, setFormPage] = useState(0);
  const [variationsData, setVariationsData] = useState({
    name: "",
    color: "",
    size: [],
    images: [],
    in_stock: true,
  });
  const [sizeData, setSizeData] = useState({
    size: "",
    stock: "",
  });
  const [features, setFeatures] = useState("");

  const handleDrag = (e) => {
    e.preventDefault();
  };

  const handleFile = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "shoe-shop");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dycpuotwh/image/upload",
        data
      );
      const fileCloudy = await res.data;

      setVariationsData((prevData) => ({
        ...prevData,
        images: [...prevData.images, fileCloudy.secure_url],
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();

    const files = e.dataTransfer.files;

    console.log(files);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      await handleFile(file);
    }
  };

  const handleFileInput = async (e) => {
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      await handleFile(file);
    }
  };

  const addVariationToProduct = () => {
    setFormProduct((prevData) => ({
      ...prevData,
      variations: [...prevData.variations, variationsData],
    }));
    setVariationsData({
      name: "",
      color: "",
      images: [],
      size: [],
      in_stock: true,
    });
  };

  const handleChangeVariation = (e) => {
    const { name, value } = e.target;

    setVariationsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputsChange = (e) => {
    const { name, value } = e.target;

    setFormProduct({
      ...formProduct,
      [name]: value,
    });
  };

  const handleSelectForm = (e) => {
    const { value } = e.target;

    if (value === "yes") {
      setFormProduct({
        ...formProduct,
        in_discount: true,
      });
    } else {
      setFormProduct({
        ...formProduct,
        in_discount: false,
      });
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      setFormProduct((prevData) => ({
        ...prevData,
        features: [...prevData.features, features],
      }));
      setFeatures("");
    }
  };

  const handleAddFeature = () => {
    setFormProduct({
      ...formProduct,
      features: [...formProduct.features, features],
    });

    setFeatures("");
  };

  const handleRemoveFeature = (feature) => {
    const features = formProduct.features.filter((f) => f !== feature);

    setFormProduct({
      ...formProduct,
      features: features,
    });
  };

  const handleSizeChange = (e) => {
    const { name, value } = e.target;

    setSizeData({
      ...sizeData,
      [name]: value,
    });
  };

  const handleAddSize = () => {
    if (!sizeData.size || !sizeData.stock) {
      return null;
    } else {
      setVariationsData({
        ...variationsData,
        size: [...variationsData.size, sizeData],
      });

      setSizeData({
        size: "",
        stock: "",
      });
    }
  };

  const handleDivDragDropClick = (e) => {
    e.stopPropagation();

    inputRef.current.click();
  };

  const handleRemoveSize = (index) => {
    const cleanArraySize = variationsData.size.filter((_, i) => i !== index);

    setVariationsData({
      ...variationsData,
      size: cleanArraySize,
    });
  };

  const handleDeleteVariationsImage = (index, e) => {
    e.preventDefault();
    e.stopPropagation();

    const newImagesArray = variationsData.images.filter((_, i) => i !== index);

    setVariationsData({
      ...variationsData,
      images: newImagesArray,
    });
  };

  const handleInputs = (page) => {
    switch (page) {
      case 0: {
        return (
          <>
            <div className="one-input-container">
              <label htmlFor="name">Name</label>
              <input
                autoComplete="off"
                value={formProduct.name}
                onChange={handleInputsChange}
                placeholder="Name"
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="one-input-container">
              <label htmlFor="brand">Brand</label>
              <input
                autoComplete="off"
                value={formProduct.brand}
                onChange={handleInputsChange}
                placeholder="Brand"
                type="text"
                name="brand"
                id="brand"
              />
            </div>
            <div className="one-input-container">
              <label htmlFor="category">Category</label>
              <input
                autoComplete="off"
                value={formProduct.category}
                onChange={handleInputsChange}
                placeholder="Category"
                type="text"
                name="category"
                id="category"
              />
            </div>
            <div className="two-inputs-container">
              <div>
                <label htmlFor="gender">Gender</label>
                <input
                  autoComplete="off"
                  value={formProduct.gender}
                  onChange={handleInputsChange}
                  placeholder="Gender"
                  type="text"
                  name="gender"
                  id="gender"
                />
              </div>
              <div>
                <label htmlFor="material">Material</label>
                <input
                  autoComplete="off"
                  value={formProduct.material}
                  onChange={handleInputsChange}
                  placeholder="Material"
                  type="text"
                  name="material"
                  id="material"
                />
              </div>
            </div>
            <div className="text-area-container">
              <label htmlFor="description">Description</label>
              <textarea
                autoComplete="off"
                value={formProduct.description}
                onChange={handleInputsChange}
                placeholder="Description"
                name="description"
                id="description"
              ></textarea>
            </div>
          </>
        );
      }
      case 1: {
        return (
          <>
            <div className="one-input-container">
              <label htmlFor="sale-product">Publish as a sale product?</label>
              <select
                onChange={handleSelectForm}
                name="sale-product"
                id="sale-product"
                defaultValue={formProduct.in_discount ? "yes" : "no"}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            {formProduct.in_discount ? (
              <div className="two-inputs-container">
                <div>
                  <label htmlFor="original_price">Original price</label>
                  <input
                    autoComplete="off"
                    value={formProduct.original_price}
                    onChange={handleInputsChange}
                    placeholder="Original Price"
                    type="text"
                    name="original_price"
                    id="original_price"
                  />
                </div>
                <div>
                  <label htmlFor="discount_price">Discount price</label>
                  <input
                    autoComplete="off"
                    onChange={handleInputsChange}
                    value={formProduct.discount_price}
                    placeholder="Discount Price"
                    type="text"
                    name="discount_price"
                    id="discount_price"
                  />
                </div>
              </div>
            ) : (
              <div className="one-input-container">
                <label htmlFor="original_price">Price</label>
                <input
                  onChange={handleInputsChange}
                  value={formProduct.original_price}
                  placeholder="Price"
                  type="text"
                  name="original_price"
                  id="original_price"
                />
              </div>
            )}
            <div className="one-input-container">
              <label htmlFor="features">Features</label>
              <input
                autoComplete="off"
                placeholder="Features"
                type="text"
                name="features"
                id="features"
                value={features}
                onChange={(e) => {
                  const { value } = e.target;

                  setFeatures(value);
                }}
                onKeyDown={handleEnterKeyPress}
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="add-feature-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  style={{ fill: "rgba(0, 0, 0, 1)" }}
                >
                  <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                </svg>
              </button>
            </div>
            <div className="one-input-container">
              <label htmlFor="features_list">Features</label>
              {formProduct.features.length > 0 && (
                <span>Tap each one to delete it</span>
              )}
              <div className="features-list-form">
                {formProduct.features.map((f, index) => (
                  <span onClick={() => handleRemoveFeature(f)} key={index}>
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </>
        );
      }

      case 2: {
        return (
          <>
            <div className="one-input-container">
              <label htmlFor="have_variation">
                Does this product have variations?
              </label>
              <select
                defaultValue={formProduct.have_variations ? "yes" : "no"}
                name="have_variations"
                id="have_variations"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            {formProduct.have_variations ? (
              <>
                {formProduct.variations.map((v, index) => {
                  return (
                    <div className="variation-confirm-container" key={index}>
                      <div className="variation-confirm-data">
                        <div>
                          <span>Name colour</span>
                          <span>{v.name}</span>
                        </div>
                        <div>
                          <span>Color</span>
                          <div style={{backgroundColor: v.color}}></div>
                        </div>
                      </div>
                      {v.size.map((s, index) => (
                        <div key={index}>
                          <div>
                            <span>Size</span>
                            <span>{s.size}</span>
                          </div>
                          <div>
                            <span>Size Stock</span>
                            <span>{s.stock}</span>
                          </div>
                        </div>
                      ))}
                      <div>
                        {v.images.map((i,index) => (
                          <img className="variation-confirm-images" src={i} key={index} alt={`variation confirm ${index}`}/>
                        ))}
                      </div>
                    </div>
                  );
                })}

                <div className="two-inputs-container">
                  <div>
                    <label htmlFor="name">Colour name</label>
                    <input
                      onChange={handleChangeVariation}
                      type="text"
                      name="name"
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label htmlFor="color">Colour</label>
                    <input
                      onChange={handleChangeVariation}
                      type="color"
                      name="color"
                      autoComplete="off"
                    />
                  </div>
                </div>
                {variationsData.size?.map((s, index) => {
                  return (
                    <div className="variation-product-size-confirm" key={index}>
                      <div>
                        <span className="variation-product-size-confirm-title">
                          Stock
                        </span>
                        <span className="variation-product-size-confirm-info">
                          {s.size}
                        </span>
                      </div>
                      <div>
                        <span className="variation-product-size-confirm-title">
                          Size stock
                        </span>
                        <span className="variation-product-size-confirm-info">
                          {s.stock}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveSize(index)}
                      >
                        X
                      </button>
                    </div>
                  );
                })}
                <div className="two-inputs-container">
                  <div>
                    <label htmlFor="size">Size</label>
                    <input
                      onChange={handleSizeChange}
                      type="number"
                      name="size"
                      autoComplete="off"
                      value={sizeData.size}
                    />
                  </div>
                  <div>
                    <label htmlFor="stock">Size stock</label>
                    <input
                      autoComplete="off"
                      onChange={handleSizeChange}
                      type="number"
                      name="stock"
                      value={sizeData.stock}
                    />
                  </div>
                </div>
                <button
                  className="add-size-button"
                  onClick={handleAddSize}
                  type="button"
                >
                  Add size
                </button>
                <div
                  onClick={handleDivDragDropClick}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={
                    variationsData.images.length
                      ? "drag-drop-container-active"
                      : "drag-drop-container"
                  }
                >
                  {variationsData.images.length > 0 ? (
                    variationsData.images.map((i, index) => (
                      <div key={index}>
                        <img src={i} alt={`variation image ${index}`} />
                        <button
                          type="button"
                          onClick={(e) => handleDeleteVariationsImage(index, e)}
                        >
                          X
                        </button>
                      </div>
                    ))
                  ) : (
                    <>
                      <p>
                        Drag & drop your images or click to select the images
                      </p>
                      <p>Make sure images have a background removed</p>
                    </>
                  )}
                </div>
                <input
                  onChange={handleFileInput}
                  ref={inputRef}
                  type="file"
                  style={{ display: "none" }}
                  accept="image/jpeg, image/png, image/webp"
                  multiple
                />
              </>
            ) : null}
            {formProduct.have_variations && (
              <button
                onClick={addVariationToProduct}
                className="add-variation-button"
                type="button"
              >
                Add variation
              </button>
            )}
          </>
        );
      }
      default: {
      }
    }
  };

  const handleNavigation = (nav) => {
    if (nav === "next") {
      setFormPage(formPage + 1);
    } else {
      setFormPage(formPage - 1);
    }
  };

  return (
    <main className={`create-all-container ${poppins.className}`}>
      <div className="box-create-container">
        <div className="card-create-box"></div>
        <div className="form-create-box">
          <div className="bar-page-create-form"></div>
          <form className="form-create-product" action="create">
            {handleInputs(formPage)}
          </form>
          <div className="buttons-navigation-container">
            <button
              className="buttons-navigation"
              onClick={() => handleNavigation("back")}
            >
              Back
            </button>
            <button
              className="buttons-navigation"
              onClick={() => handleNavigation("next")}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
