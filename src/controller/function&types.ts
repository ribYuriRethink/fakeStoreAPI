const makeProductOutput = (products: any[]) => {
  return products.map((item) => {
    return {
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.name,
      image: item.image,
      rating: {
        rate: item.rate,
        count: item.count,
      },
    };
  });
};

type Category = {
  id?: number;
  name: string;
};

type DatabaseProduct = {
  id?: number;
  title: string;
  price: number;
  description: string;
  category_id: number;
  image: string;
  rate: number;
  count: number;
};

type Product = {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export { Category, Product, DatabaseProduct, makeProductOutput };
