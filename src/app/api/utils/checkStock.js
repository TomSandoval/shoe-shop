import Shoe from "@/Models/Product";
import connect from "@/Utils/db";

export const checkStock = async (id, buyWithVariation) => {
  await connect();

  const shoe = await Shoe.findById(id);


  if (buyWithVariation) {
    let sizeInStock = [];

    shoe?.variations.forEach((v) => {
      const value = checkStockVariation(v);

      sizeInStock.push(value);
    });

    sizeInStock.forEach(async (value, index) => {
      if (value) {
        await Shoe.findByIdAndUpdate(
          id,
          { $set: { [`variations.${index}.in_stock`]: true } },
          { new: true }
        )
          .then((shoe) => checkGeneralStock(id, shoe))
          .catch((error) => {
            throw new Error(error);
          });
      } else {
        await Shoe.findByIdAndUpdate(
          id,
          { $set: { [`variations.${index}.in_stock`]: false } },
          { new: true }
        )
          .then((shoe) => checkGeneralStock(id, shoe))
          .catch((error) => {
            throw new Error(error);
          });
      }
    });
  } else {
    const sizeInStock = shoe.size.find((s) => s.stock > 0);
    if (sizeInStock) {
      await Shoe.findByIdAndUpdate(
        id,
        { $set: { in_stock: true } },
        { new: true }
      )
        .then((s) => console.log("Product updated"))
        .catch((error) => console.log(error));
    } else {
      await Shoe.findByIdAndUpdate(
        id,
        { $set: { in_stock: false } },
        { new: true }
      )
        .then((s) => console.log("Product updated"))
        .catch((error) => console.log(error));
    }
  }
};

const checkGeneralStock = async (id, shoe) => {
  let variationsInStock = shoe?.variations.find((v) => v.in_stock === true);

  if (variationsInStock) {
    await Shoe.findByIdAndUpdate(
      id,
      { $set: { in_stock: true } },
      { new: true }
    )
      .then((shoe) => console.log("Product updated sucessfully"))
      .catch((error) => {
        throw new Error(error);
      });
  } else {
    await Shoe.findByIdAndUpdate(
      id,
      { $set: { in_stock: false } },
      { new: true }
    )
      .then((shoe) => console.log("Product updated sucessfully"))
      .catch((error) => {
        throw new Error(error);
      });
  }
};

const checkStockVariation = (variation) => {
  const sizeFound = variation.size.find((s) => s.stock > 0);

  return sizeFound ? true : false;
};
