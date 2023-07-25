import { shoes } from "./shoes";

export function getAllVariations() {
  const shoesWithVariations = shoes.filter((s) => s.have_varations === true);
  const shoesWithoutVariations = shoes.filter(
    (s) => s.have_varations === false
  );

  const allVariations = [];

  shoesWithoutVariations.forEach((s) => {
    allVariations.push(s.color);
  });
  shoesWithVariations.forEach((s) => {
    s.variations.forEach((v) => {
      allVariations.push(v);
    });
  });

  const uniqueNames = {};

  const variatons = [];

  for (let i = 0; i < allVariations.length; i++) {
    if (!uniqueNames[allVariations[i].name]) {
      variatons.push(allVariations[i]);
      uniqueNames[allVariations[i].name] = true;
    }
  }

  return variatons;
}
