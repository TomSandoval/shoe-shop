export const shoes = [
  {
    id: 1,
    name: "Nike React Infinity Run Flyknit",
    brand: "NIKE",
    gender: "MEN",
    category: "RUNNING",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil rem inventore est. Expedita animi laudantium beatae, adipisci soluta odio veniam ut voluptatibus magni unde, nemo, voluptate dolore? Tenetur, delectus porro?",
    in_stock: true,
    stock: 2,
    images: [
      "https://res.cloudinary.com/dycpuotwh/image/upload/v1690219670/shoe-shop/i1-665455a5-45de-40fb-945f-c1852b82400d-removebg-preview_vdam6o.png",
    ],
    slug: "nike-react-infinity-run-flyknit",
    in_discount: true,
    original_price: 180,
    discount_price: 120,
    have_varations: true,
    variations: [
      {
        name: "Grey",
        color: "rgb(141,141,141)",
        images: [
          "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/react-infinity-run-flyknit-mens-running-shoe-zX42Nc.jpg",
          "https://sportline.vtexassets.com/arquivos/ids/697198-1152-2048?v=638024844591630000&width=1152&height=2048&aspect=true",
        ],
        size: [
          { size: 4, stock: 1 },
          { size: 5, stock: 0 },
          { size: 11, stock: 0 },
        ],
        in_stock: true,
      },
      {
        name: "Black",
        color: "rgb(0,0,0)",
        images: [
          "https://nikearprod.vtexassets.com/arquivos/ids/407766/DH5392_001_A_PREM.jpg?v=638143134292370000",
          "https://nikearprod.vtexassets.com/arquivos/ids/415128/DH5392_001_F_PREM.jpg?v=638143268687300000",
        ],
        size: [
          { size: 6, stock: 0 },
          { size: 7, stock: 0 },
          { size: 8, stock: 4 },
        ],
        in_stock: true,
      },
    ],
    size: [5, 8, 11.4],
    features: ["Skibi", "Skibiribi"],
    material: "Mesh",
    color: {
      name: "Grey",
      color: "rgb(141,141,141)",
    },
    background_card: "#4082D0"
  },
  {
    id: 2,
    name: "FuelCell Prism v2",
    brand: "New Balance",
    gender: "ANY",
    category: "RUNNING",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil rem inventore est. Expedita animi laudantium beatae, adipisci soluta odio veniam ut voluptatibus magni unde, nemo, voluptate dolore? Tenetur, delectus porro?",
    in_stock: true,
    images: [
      "https://res.cloudinary.com/dycpuotwh/image/upload/v1689892477/shoe-shop/zapatillas-hombre-new-balance-fuelcell-prism-v2-mfcpzly2-4-min_1-removebg-preview_oxufnl.png",
      "https://res.cloudinary.com/dycpuotwh/image/upload/v1689892414/shoe-shop/zapatillas-hombre-new-balance-fuelcell-prism-v2-mfcpzly2-3-min_1-removebg-preview_wkw4i1.png",
      "https://res.cloudinary.com/dycpuotwh/image/upload/v1689892331/shoe-shop/zapatillas-hombre-new-balance-fuelcell-prism-v2-mfcpzly2-1-min_1-removebg-preview_pen8a9.png"
    ],
    slug: "new-balance-FuelCell-Prism-v2",
    in_discount: false,
    original_price: 110,
    discount_price: undefined,
    have_varations: false,
    variations: [],
    size: [{size:8, stock: 0}, {size: 10, stock: 5}, {size: 11, stock: 5}],
    features: ["Running", "Comfortable"],
    material: "Mesh",
    color: {
      name: "Green",
      color: "rgb(16, 122, 126)",
    },
    background_card: "#E57D7D"
  },
  {
    id: 3,
    name: "Nike Air Max Solo",
    brand: "NIKE",
    gender: "MEN",
    category: "RUNNING",
    description:
      "These sneakers are for the Air Max superfans. By combining elements from past Air Max models (like the AM90-inspired heel cup), we created a whole new look. The AM180 influences the textured Air unit, which delivers just the right amount of cushioning. Go ahead—Max out your look.",
    in_stock: true,
    stock: undefined,
    images: [],
    slug: "nike-air-max-solo",
    in_discount: true,
    original_price: 99,
    discount_price: 75,
    have_varations: true,
    variations: [
      {
        name: "Black",
        color: "rgb(0,0,0)",
        images: [
          "https://res.cloudinary.com/dycpuotwh/image/upload/v1689961011/shoe-shop/f3bb522b-adfc-441d-92cd-f25f855fa965-removebg-preview_zez6hq.png",
          "https://res.cloudinary.com/dycpuotwh/image/upload/v1689961532/shoe-shop/air-max-solo-mens-shoes-4SzqpT-removebg-preview_enkoad.png"
        ],
        size: [
          { size: 7, stock: 1 },
          { size: 10, stock: 3 },
          { size: 11, stock: 7 },
        ],
        in_stock: true,
      },
      {
        name: "White",
        color: "rgb(255,255,255)",
        images: [
          "https://res.cloudinary.com/dycpuotwh/image/upload/v1689964041/shoe-shop/air-max-solo-mens-shoes-4SzqpT-_1_-removebg-preview_bad6um.png",
          "https://res.cloudinary.com/dycpuotwh/image/upload/v1689965604/shoe-shop/fbd82bcf-9403-4c05-af3d-dba3d754d7d9__1_-removebg-preview_h2ups8.png",
        ],
        size: [
          { size: 6, stock: 3 },
          { size: 7, stock: 4 },
          { size: 8, stock: 4 },
        ],
        in_stock: true,
      },
    ],
    size: [],
    features: ["limited edition", "Running"],
    material: "Mesh",
    color: {},
    background_card: "#EDDB36"
  },
  {
    id: 4,
    name: "Ultraboost Light",
    brand: "ADIDAS",
    gender: "WOMEN",
    category: "RUNNING",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil rem inventore est. Expedita animi laudantium beatae, adipisci soluta odio veniam ut voluptatibus magni unde, nemo, voluptate dolore? Tenetur, delectus porro?",
    in_stock: true,
    stock: undefined,
    images: [],
    slug: "adidas-ultraboost-light",
    in_discount: false,
    original_price: 140,
    discount_price: undefined,
    have_varations: true,
    variations: [
      {
        name: "Cloud White",
        color: "rgb(223, 224, 240)",
        images: [
          "https://res.cloudinary.com/dycpuotwh/image/upload/v1689967440/shoe-shop/Zapatillas_Ultraboost_Light_Blanco_HQ6351_01_standard-removebg-preview_sqwwtz.png",
          "https://res.cloudinary.com/dycpuotwh/image/upload/v1689967736/shoe-shop/Zapatillas_Ultraboost_Light_Blanco_HQ6351_02_standard_hover-removebg-preview_fjmit7.png",
        ],
        size: [
          { size: 4, stock: 1 },
          { size: 5, stock: 0 },
          { size: 11, stock: 2 },
        ],
        in_stock: true,
      },
      {
        name: "Core Black",
        color: "rgb(0,0,0)",
        images: [
          "https://res.cloudinary.com/dycpuotwh/image/upload/v1689967868/shoe-shop/Zapatillas_Ultraboost_Light_Negro_HQ6339_01_standard-removebg-preview_lf240m.png",
          "https://res.cloudinary.com/dycpuotwh/image/upload/v1689967910/shoe-shop/Zapatillas_Ultraboost_Light_Negro_HQ6339_02_standard_hover-removebg-preview_vunfdx.png",
        ],
        size: [
          { size: 6, stock: 3 },
          { size: 7, stock: 5 },
          { size: 8, stock: 4 },
        ],
        in_stock: true,
      },
    ],
    size: [],
    features: ["Running", "Light"],
    material: "Mesh",
    color: {
      name: "Grey",
      color: "rgb(141,141,141)",
    },
    background_card: "#FDB851"
  },
  {
    id: 5,
    name: "57/40",
    brand: "New Balance",
    gender: "MEN",
    category: "RUNNING",
    description:
      "La 57/40 aporta a nuestra zapatilla emblemática 574 una renovación moderna y atrevida. Tomando elementos de la moda de los años 80 y 90, esta versátil zapatilla para hombre proporciona un estilo indefinible que se puede combinar prácticamente con cualquier tendencia. El diseño combina una silueta elegante inspirada en las carreras con una parte superior de cuero descarne, sintético y tejido, amortiguación suave en la planta y una suela resistente para disfrutar de un estilo desenfadado y confort durante todo el día",
    in_stock: true,
    stock: 2,
    images: [
      "https://res.cloudinary.com/dycpuotwh/image/upload/v1689968058/shoe-shop/zapatillas-hombre-new-balance-5740-m5740grm_nb_02_i-min_1-removebg-preview_swokrn.png",
      "https://res.cloudinary.com/dycpuotwh/image/upload/v1689968097/shoe-shop/zapatillas-hombre-new-balance-5740-m5740grm_nb_04_i-min_1-removebg-preview_cr02h2.png"
    ],
    slug: "new-balace-57/40",
    in_discount: true,
    original_price: 100,
    discount_price: 80,
    have_varations: false,
    variations: [],
    size: [{size: 10, stock: 2}],
    features: ["Reflective", "Patterned sole"],
    material: "Leather",
    color: {
      name: "Beige",
      color: "rgb(204, 193, 183)",
    },
    background_card: "#A151F0"
  },
  {
    id: 6,
    name: "Nike Phantom GX Elite",
    brand: "NIKE",
    gender: "MEN",
    category: "SOCCER",
    description:
      "Obsessed with perfecting your craft? We design Elite cleats for you and the world’s biggest stars to give you high-level quality, because you demand greatness from yourself and your footwear. Made with revolutionary Nike Gripknit, these cleats provide better touch on the ball in an intuitive design that helps enhance your precision both when striking and during close control. This version has a Dynamic Fit collar, which wraps your ankle in soft, stretchy fabric for a secure feel.",
    in_stock: true,
    stock: undefined,
    images: [],
    slug: "nike-phantom-gx-elite",
    in_discount: true,
    original_price: 250,
    discount_price: 220,
    have_varations: true,
    variations: [
      {
        name: "Black",
        color: "rgb(0,0,0)",
        images: [
          "https://res.cloudinary.com/dycpuotwh/image/upload/v1689968987/shoe-shop/0e041c64-840e-4a6b-8cd5-266524af5619-removebg-preview_ylskwb.png",
          "https://res.cloudinary.com/dycpuotwh/image/upload/v1689970429/shoe-shop/phantom-gx-elite-firm-ground-soccer-cleats-qC22Bz-removebg-preview_v70ogv.png",
        ],
        size: [
          { size: 4, stock: 1 },
          { size: 5, stock: 0 },
          { size: 11, stock: 0 },
        ],
        in_stock: true,
      },
      {
        name: "Orange",
        color: "rgb(255, 118, 92)",
        images: [
          "https://res.cloudinary.com/dycpuotwh/image/upload/v1689970624/shoe-shop/58c1712b-d428-4e6b-9aa4-1f14fa9a452c-removebg-preview_rs7ikk.png",
          "https://res.cloudinary.com/dycpuotwh/image/upload/v1689970914/shoe-shop/2f4a36fc-e531-4810-8899-beb86a8850d9-removebg-preview_yyqlwn.png",
        ],
        size: [
          { size: 6, stock: 0 },
          { size: 7, stock: 0 },
          { size: 8, stock: 4 },
        ],
        in_stock: true,
      },
    ],
    size: [5, 8, 11.4],
    features: ["Skibi", "Skibiribi"],
    material: "Mesh",
    color: {
      name: "Grey",
      color: "rgb(141,141,141)",
    },
    background_card: "#56D1CA"
  },
  {
    id: 7,
    name: "TRAIL RUNNING TRACEFINDER",
    brand: "ADIDAS",
    gender: "MEN",
    category: "RUNNING",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil rem inventore est. Expedita animi laudantium beatae, adipisci soluta odio veniam ut voluptatibus magni unde, nemo, voluptate dolore? Tenetur, delectus porro?",
    in_stock: true,
    stock: 2,
    images: [],
    slug: "adidas-trail-running-tracefinder",
    in_discount: false,
    original_price: 180,
    discount_price: undefined,
    have_varations: true,
    variations: [
      {
        name: "Black",
        color: "rgb(0,0,0)",
        images: [
          "https://res.cloudinary.com/dycpuotwh/image/upload/v1689971267/shoe-shop/Zapatillas_de_Trail_Running_Tracefinder_Negro_Q47235_01_standard-removebg-preview_zteiz3.png",
          "https://res.cloudinary.com/dycpuotwh/image/upload/v1689971933/shoe-shop/Zapatillas_de_Trail_Running_Tracefinder_Negro_Q47235_02_standard_hover__1_-removebg-preview_bmflfb.png",
        ],
        size: [
          { size: 4, stock: 1 },
          { size: 5, stock: 0 },
          { size: 11, stock: 0 },
        ],
        in_stock: true,
      },
      {
        name: "Metal Blue",
        color: "rgb(70, 92, 114)",
        images: [
          "https://res.cloudinary.com/dycpuotwh/image/upload/v1689972452/shoe-shop/Zapatillas_de_Trail_Running_Tracefinder_Azul_GX8684_01_standard__1_-removebg-preview_yta4do.png",
          "https://res.cloudinary.com/dycpuotwh/image/upload/v1689972463/shoe-shop/Zapatillas_de_Trail_Running_Tracefinder_Azul_GX8684_02_standard_hover-removebg-preview_f1xwpn.png",
        ],
        size: [
          { size: 6, stock: 0 },
          { size: 7, stock: 0 },
          { size: 8, stock: 4 },
        ],
        in_stock: true,
      },
    ],
    size: [],
    features: ["Running", "Light"],
    material: "Mesh",
    color: {},
    background_card: "#95F585"
  },
  {
    id: 8,
    name: "RUNNING ALPHABOUNCE + SUSTAINABLE BOUNCE",
    brand: "ADIDAS",
    gender: "WOMEN",
    category: "RUNNING",
    description:
      "Salí a dar una vuelta por la ciudad o dirigite al gimnasio con un par de zapatillas adidas Alphabounce+ en tus pies. El exterior de malla es suave y transpirable para brindar comodidad en el camino. La mediasuela Bounce le inyecta suavidad y elasticidad a tu pisada, mientras que la amortiguación Cloudfoam en el talón amortigua cada paso para que puedas enfrentarte a tu día con fluidez.",
    in_stock: true,
    stock: undefined,
    images: [],
    slug: "adidas-running-aplhabounce",
    in_discount: true,
    original_price: 120,
    discount_price: 90,
    have_varations: true,
    variations: [
      {
        name: "Violet Fusion",
        color: "rgb(170, 192, 217)",
        images: [
          "https://res.cloudinary.com/dycpuotwh/image/upload/v1689974199/shoe-shop/Zapatillas_de_Running_Alphabounce_Sustainable_Bounce_Azul_HP6148_01_standard-removebg-preview_1_jglqrr.png",
          "https://res.cloudinary.com/dycpuotwh/image/upload/v1689974211/shoe-shop/Zapatillas_de_Running_Alphabounce_Sustainable_Bounce_Azul_HP6148_02_standard_hover-removebg-preview_ywmn8d.png",
        ],
        size: [
          { size: 4, stock: 1 },
          { size: 5, stock: 0 },
          { size: 11, stock: 0 },
        ],
        in_stock: true,
      },
      {
        name: "Black",
        color: "rgb(0,0,0)",
        images: [
          "https://res.cloudinary.com/dycpuotwh/image/upload/v1690160228/shoe-shop/bad8c77597b448adbc52af3800d5ccbd_9366-removebg-preview_xfz9z6.png",
          "https://res.cloudinary.com/dycpuotwh/image/upload/v1690160471/shoe-shop/Zapatillas_de_Running_Alphabounce_Sustainable_Bounce_Negro_HP6149_02_standard-removebg-preview_nuoqed.png",
        ],
        size: [
          { size: 6, stock: 0 },
          { size: 7, stock: 0 },
          { size: 8, stock: 4 },
        ],
        in_stock: true,
      },
    ],
    size: [5, 8, 11.4],
    features: ["Skibi", "Skibiribi"],
    material: "Mesh",
    color: {
      name: "Grey",
      color: "rgb(141,141,141)",
    },
    background_card: "#FFB039"
  },
  {
    id: 9,
    name: "XC-72",
    brand: "New Balance",
    gender: "MEN",
    category: "LIFESTYLE",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil rem inventore est. Expedita animi laudantium beatae, adipisci soluta odio veniam ut voluptatibus magni unde, nemo, voluptate dolore? Tenetur, delectus porro?",
    in_stock: true,
    images: [
      "https://res.cloudinary.com/dycpuotwh/image/upload/v1690170644/shoe-shop/zapatillas-unisex-new-balance-xc-72-uxc72rb_nb_02_i_3-removebg-preview_hyqnsy.png",
      "https://res.cloudinary.com/dycpuotwh/image/upload/v1690170677/shoe-shop/zapatillas-unisex-new-balance-xc-72-uxc72rb_nb_04_i_3-removebg-preview_josnph.png"
    ],
    slug: "new-balance-xc-72",
    in_discount: false,
    original_price: 99,
    discount_price: undefined,
    have_varations: false,
    variations: [],
    size: [{size: 10.5, stock: 4},{size:8, stock: 3}],
    features: ["Skibi", "Skibiribi"],
    material: "Mesh",
    color: {
      name: "White",
      color: "rgb(255,255,255)",
    },
    background_card: "#56D1CA"
  },
  {
    id: 10,
    name: "Nike Air Force 1",
    brand: "NIKE",
    gender: "KIDS",
    category: "CASUAL",
    price: 90,
    is_in_inventory: true,
    items_left: 3,
    imageURL:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/178b2a46-3ee4-492b-882e-f71efdd53a36/air-force-1-big-kids-shoe-2zqp8D.jpg",
    slug: "nike-air-force-1",
    original_price: 150,
    discount_price: 100
  },
  {
    id: 11,
    name: "Nike Air Max 90",
    brand: "NIKE",
    gender: "KIDS",
    category: "CASUAL",
    price: 100,
    is_in_inventory: true,
    items_left: 3,
    imageURL:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8439f823-86cf-4086-81d2-4f9ff9a66866/air-max-90-big-kids-shoe-1wzwJM.jpg",
    slug: "nike-air-max-90",
  },
  {
    id: 12,
    name: "Nike Air Max 90 LTR",
    brand: "NIKE",
    gender: "KIDS",
    category: "CASUAL",
    price: 110,
    is_in_inventory: true,
    items_left: 3,
    imageURL:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-620aeb37-1b28-44b0-9b14-5572f8cbc948/air-max-90-ltr-big-kids-shoe-hdNLQ5.jpg",
    slug: "nike-air-max-90-ltr",
    original_price: 150,
    discount_price: 100
  },
  {
    id: 13,
    name: "Nike Joyride Dual Run",
    brand: "NIKE",
    gender: "KIDS",
    category: "RUNNING",
    price: 110,
    is_in_inventory: false,
    items_left: 3,
    imageURL:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/33888130-0320-41a1-ba53-a026decd8aa2/joyride-dual-run-big-kids-running-shoe-1HDJF8.jpg",
    slug: "nike-joyride-dual-run",
    original_price: 150,
    discount_price: 100
  },
  {
    id: 14,
    name: "Nike Renew Run",
    brand: "NIKE",
    gender: "KIDS",
    category: "RUNNING",
    price: 80,
    is_in_inventory: true,
    items_left: 3,
    imageURL:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-73e54c0b-11a6-478b-9f90-bd97fcde872d/renew-run-big-kids-running-shoe-5Bpz93.jpg",
    slug: "nike-renew-run",
    original_price: 150,
    discount_price: 100
  },
];
