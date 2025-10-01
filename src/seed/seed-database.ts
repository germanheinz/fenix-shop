import { initialData } from "./seed.js";

import prisma  from "../lib/prisma.js";
import { countries } from "./seed-country.js";

 
async function main() {
 
  await Promise.all([

    await prisma.userAddress.deleteMany(),
    await prisma.user.deleteMany(),
    await prisma.country.deleteMany(),
    await prisma.productImage.deleteMany(),
    await prisma.product.deleteMany(),
    await prisma.category.deleteMany()
  ]);
  console.log("Deleted database");

  const { categories, products, users } = initialData;

  const categoriesData = categories.map( (name) => ({ name }));
  console.log(categoriesData);

  await prisma.category.createMany({ data: categoriesData });
  console.log("Seeded Categories!");

  await prisma.user.createMany({ data: users });
  console.log("Seeded Users!");

  // COUNTRIES    
  await prisma.country.createMany({ data: countries });
  console.log("Seeded Countries!");


  // CATEGORIES

  const categoriesDB = await prisma.category.findMany();
  
  // reduce is like for, iterating the array to lower case the names and asigning the id to it
  const categoriesMap = categoriesDB.reduce( (map, category) => {
    
    map[category.name.toLowerCase()] = category.id;
    return map;
    
  }, {} as Record<string, string>);



  // PRODUCTS
  //forEach product we destructure the type and images to not include them in the product creation\
  // an then we spread the rest of the product properties
  products.forEach( async product => {
    const { type, images, ...products } = product;
    const dbProduct = await prisma.product.create({
      data: {
        ...products,
        categoryId: categoriesMap[type]!,
      }
    })
  
    // IMAGES
    const imagesData = images.map( image => ({
      url: image,
      productId: dbProduct.id
    }));
    await prisma.productImage.createMany({ data: imagesData });
    console.log("Seeded product: ", product.title);
  });




  // prisma.category.create({ data: { name: 'Shirts' } });
  // prisma.category.create({ data: { name: 'Pants' } });
  // prisma.category.create({ data: { name: 'Hoodies' } });
  // prisma.category.create({ data: { name: 'Hats' } });



}


(() => {
  if (process.env.NODE_ENV === "production") return;
    
  main();
})();