"use client";
import "./pageCreate.css";
import { useState, useEffect, useRef } from "react";
import CardCreate from "@/components/CardCreate/cardCreate";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CreateProduct() {
  const session = useSession();
  const router = useRouter();

  // if (
  //   session.status === "unauthenticated" ||
  //   session.data?.user.roll !== "ADMIN"
  // ) {
  //   router.push("/");
  // }
  const inputRef = useRef(null);
  const simpleInput = useRef(null);
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
    have_variations: false,
    color: {
      name: "",
      color: "",
    },
    size: [],
    images: [],
    background_card: "#80ed99",
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

  const handleDragSimple = (e) => {
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

  const handleDropSimple = async (e) => {
    e.preventDefault();

    const files = e.dataTransfer.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      await handleFileSimple(file);
    }
  };

  const handleFileSimple = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "shoe-shop");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dycpuotwh/image/upload",
        data
      );

      const fileCloudy = await res.data;

      setFormProduct((prevData) => ({
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

  const handleSimpleImagesInput = async (e) => {
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      await handleFileSimple(file);
    }
  };

  const addVariationToProduct = () => {
    if (
      !variationsData.name ||
      !variationsData.color ||
      variationsData.images.length === 0 ||
      variationsData.size.length === 0
    ) {
      return null;
    }

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

    if (name === "original_price" || name === "discount_price") {
      if (value) {
        setFormProduct({
          ...formProduct,
          [name]: parseFloat(value),
        });

        return;
      }
    }

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
      [name]: parseFloat(value),
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

  const handleRemoveVariation = (index) => {
    const newVariationArray = formProduct.variations.filter(
      (_, i) => i !== index
    );

    setFormProduct({
      ...formProduct,
      variations: newVariationArray,
    });
  };

  const handleSelectVariations = (e) => {
    const { name, value } = e.target;

    if (value === "yes") {
      setFormProduct({
        ...formProduct,
        [name]: true,
      });
    } else {
      setFormProduct({
        ...formProduct,
        [name]: false,
      });
    }
  };

  const handleChangeSimpleProduct = (e) => {
    const { name, value } = e.target;

    setFormProduct({
      ...formProduct,
      color: {
        ...formProduct.color,
        [name]: value,
      },
    });
  };

  const handleAddSizeSimpleProduct = () => {
    setFormProduct({
      ...formProduct,
      size: [...formProduct.size, sizeData],
    });

    setSizeData({
      size: "",
      stock: "",
    });
  };

  const handleRemoveSimpleSize = (index) => {
    const newSizeArray = formProduct.size.filter((_, i) => i !== index);

    setFormProduct({
      ...formProduct,
      size: newSizeArray,
    });
  };

  const handleRemoveSimpleImage = (index, e) => {
    e.preventDefault();
    e.stopPropagation();

    const newImagesArray = formProduct.images.filter((_, i) => i !== index);

    setFormProduct({
      ...formProduct,
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
                    type="number"
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
                    type="number"
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
                  type="number"
                  name="original_price"
                  id="original_price"
                />
              </div>
            )}
            <div
              className="one-input-container"
              style={{ alignSelf: "center", justifySelf: "center" }}
            >
              <label htmlFor="background_card">Card color</label>
              <input
                type="color"
                value={formProduct.background_card}
                name="background_card"
                onChange={(e) => {
                  const { name, value } = e.target;

                  setFormProduct({
                    ...formProduct,
                    [name]: value,
                  });
                }}
              />
              <span>
                Make sure the color of the card is not similar to the color of
                the shoe
              </span>
            </div>
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
                defaultValue={
                  formProduct.have_variations === true ? "yes" : "no"
                }
                name="have_variations"
                id="have_variations"
                onChange={handleSelectVariations}
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
                          <span>Name color</span>
                          <span>{v.name}</span>
                        </div>
                        <div>
                          <span>Color</span>
                          <div
                            className="variation-confirm-color-div"
                            style={{ backgroundColor: v.color }}
                          ></div>
                        </div>
                      </div>
                      {v?.size?.map((s, index) => (
                        <div
                          className="variation-confirm-size-container"
                          key={index}
                        >
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
                      <div className="variation-confirm-images-container">
                        {v?.images?.map((i, index) => (
                          <img
                            className="variation-confirm-images"
                            src={i}
                            key={index}
                            alt={`variation confirm ${index}`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={() => handleRemoveVariation(index)}
                        className="remove-variation-button"
                        type="button"
                      >
                        Remove variation
                      </button>
                    </div>
                  );
                })}

                <div className="two-inputs-container">
                  <div>
                    <label htmlFor="name">color name</label>
                    <input
                      onChange={handleChangeVariation}
                      type="text"
                      name="name"
                      value={variationsData.name}
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label htmlFor="color">color</label>
                    <input
                      onChange={handleChangeVariation}
                      type="color"
                      name="color"
                      value={variationsData.color}
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
            ) : (
              <>
                <div className="two-inputs-container">
                  <div>
                    <label htmlFor="name">color name</label>
                    <input
                      onChange={handleChangeSimpleProduct}
                      value={formProduct.color.name}
                      type="text"
                      name="name"
                      id="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="color">color</label>
                    <input
                      onChange={handleChangeSimpleProduct}
                      value={formProduct.color.color}
                      type="color"
                      name="color"
                      id="color"
                    />
                  </div>
                </div>
                {formProduct.size.map((s, index) => (
                  <div className="product-size-confirm" key={index}>
                    <div>
                      <span className="product-size-confirm-title">Size</span>
                      <span className="product-size-confirm-info">
                        {s.size}
                      </span>
                    </div>
                    <div>
                      <span className="product-size-confirm-title">
                        Size stock
                      </span>
                      <span className="product-size-confirm-info">
                        {s.stock}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveSimpleSize(index)}
                      type="button"
                    >
                      X
                    </button>
                  </div>
                ))}
                <div className="two-inputs-container">
                  <div>
                    <label htmlFor="size">Size</label>
                    <input
                      value={sizeData.size}
                      type="number"
                      name="size"
                      id="size"
                      onChange={handleSizeChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="stock">Size stock</label>
                    <input
                      value={sizeData.stock}
                      type="number"
                      name="stock"
                      id="stock"
                      onChange={handleSizeChange}
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddSizeSimpleProduct}
                  className="add-size-button"
                  type="button"
                >
                  Add size
                </button>
                <div
                  onDrop={handleDropSimple}
                  onDragOver={handleDragSimple}
                  onClick={() => simpleInput.current.click()}
                  className={
                    formProduct.images.length
                      ? "drag-drop-container-active"
                      : "drag-drop-container"
                  }
                >
                  {formProduct.images.length > 0 ? (
                    formProduct.images.map((i, index) => (
                      <div className="" key={index}>
                        <img src={i} alt={`product image ${index}`} />
                        <button
                          onClick={(e) => handleRemoveSimpleImage(index, e)}
                          type="button"
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
                  onChange={handleSimpleImagesInput}
                  accept="image/jpeg, image/png, image/webp"
                  multiple
                  ref={simpleInput}
                  type="file"
                  style={{ display: "none" }}
                />
              </>
            )}
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

      case 3: {
        return (
          <div className="confirm-product-form-container">
            <div className="confirm-product-two-info-container">
              <div className="one-span-info-container">
                <span>Name</span>
                <span>{formProduct.name}</span>
              </div>
              <div className="one-span-info-container">
                <span>Brand</span>
                <span>{formProduct.brand}</span>
              </div>
            </div>
            <div className="confirm-product-two-info-container">
              <div className="one-span-info-container">
                <span>Category</span>
                <span>{formProduct.category}</span>
              </div>
              <div className="one-span-info-container">
                <span>Gender</span>
                <span>{formProduct.gender}</span>
              </div>
            </div>
            <div className="confirm-product-two-info-container">
              <div className="one-span-info-container">
                <span>Material</span>
                <span>{formProduct.material}</span>
              </div>
              <div className="one-span-info-container">
                <span>In discount</span>
                <span>{formProduct.in_discount == true ? "Yes" : "No"}</span>
              </div>
            </div>

            <div>
              <div className="confirm-product-two-info-container">
                <div className="one-span-info-container">
                  <span>Original price</span>
                  <span>${formProduct.original_price}</span>
                </div>
                <div className="one-span-info-container">
                  <span>Discount price</span>
                  <span>${formProduct.discount_price}</span>
                </div>
              </div>
            </div>
            <div className="description-confirm-product-container">
              <span>Description</span>
              <div>
                <span>{formProduct.description}</span>
              </div>
            </div>
            <div className="features-confirm-product-container">
              <span>Features</span>
              <ul className="list-features-confirm-product">
                {formProduct.features.map((f, index) => {
                  return <li key={index}>{f}</li>;
                })}
              </ul>
            </div>
            {formProduct.have_variations === true ? (
              <>
                {formProduct.variations.map((v, index) => {
                  return (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                      key={index}
                    >
                      <div className="confirm-product-two-info-container">
                        <div className="one-span-info-container">
                          <span>Variation name</span>
                          <span>{v.name}</span>
                        </div>
                        <div className="one-span-info-container">
                          <span>Variation Color</span>
                          <span
                            style={{
                              backgroundColor: v.color,
                              width: "100px",
                              height: "20px",
                              marginTop: "6px",
                              borderRadius: "5px",
                            }}
                          ></span>
                        </div>
                      </div>
                      <div className="images-confirm-product-container">
                        <span>Images</span>
                        <div>
                          {v.images.map((i, index) => {
                            return (
                              <img
                                key={index}
                                src={i}
                                alt={`${formProduct.name} ${index}`}
                              />
                            );
                          })}
                        </div>
                      </div>
                      <div className="size-confirm-product-container">
                        <span>Size</span>
                        {v.size.map((s, index) => {
                          return (
                            <div
                              className="confirm-product-two-info-container"
                              key={index}
                            >
                              <div className="one-span-info-container">
                                <span>Size</span>
                                <span>{s.size}</span>
                              </div>
                              <div className="one-span-info-container">
                                <span>Size stock</span>
                                <span>{s.stock}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <div className="confirm-product-two-info-container">
                  <div className="one-span-info-container">
                    <span>Color name</span>
                    <span>{formProduct.color.name}</span>
                  </div>
                  <div className="one-span-info-container">
                    <span>Color</span>
                    <span
                      style={{
                        backgroundColor: formProduct.color.color,
                        width: "100%",
                        height: "20px",
                        marginTop: "6px",
                        borderRadius: "5px",
                      }}
                    ></span>
                  </div>
                </div>
                <div className="images-confirm-product-container">
                  <span>Images</span>
                  <div>
                    {formProduct.images.map((i, index) => {
                      return (
                        <img
                          src={i}
                          key={index}
                          alt={`${formProduct.name} ${index}`}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="size-confirm-product-container">
                  <span>Size</span>
                  {formProduct.size.map((s, index) => {
                    return (
                      <div
                        className="confirm-product-two-info-container"
                        key={index}
                      >
                        <div className="one-span-info-container">
                          <span>Size</span>
                          <span>{s.size}</span>
                        </div>
                        <div className="one-span-info-container">
                          <span>Size stock</span>
                          <span>{s.stock}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        );
      }
      default: {
      }
    }
  };

  const handleNavigation = (nav) => {
    if (nav === "next") {
      if (formPage < 3) {
        setFormPage(formPage + 1);
      }
    } else {
      if (formPage > 0) {
        setFormPage(formPage - 1);
      }
    }
  };

  const handleSubmit = async () => {
    const formToJson = JSON.stringify(formProduct);
    if (session.data.user.roll === "ADMIN") {
      try {
        const response = await axios.post(
          "https://shoe-shop-five.vercel.app/api/products",
          formToJson
        );

        if (response.status === 200) {
          toast.success("Product created!");
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <main className={`create-all-container ${poppins.className}`}>
      <div className="box-create-container">
        <div className="card-create-box">
          <CardCreate data={formProduct} />
        </div>
        <div className="form-create-box">
          <div className="bar-page-create-form">
            <span
              className={
                formPage === 0
                  ? "bar-page-create-form-active"
                  : "bar-page-create-form-inactive"
              }
            >
              1
            </span>
            <span
              className={
                formPage === 1
                  ? "bar-page-create-form-active"
                  : "bar-page-create-form-inactive"
              }
            >
              2
            </span>
            <span
              className={
                formPage === 2
                  ? "bar-page-create-form-active"
                  : "bar-page-create-form-inactive"
              }
            >
              3
            </span>
          </div>
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
            {formPage !== 3 ? (
              <button
                className="buttons-navigation"
                onClick={() => handleNavigation("next")}
              >
                Next
              </button>
            ) : (
              <button onClick={handleSubmit} className="buttons-navigation">
                Confirm
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
