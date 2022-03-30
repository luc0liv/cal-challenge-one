import { Product } from "@/interfaces/products";
import axios from "axios";

export async function getProducts(searchTerm: string) {
  const request = await axios
    .get(
      `https://mystique-v2-americanas.juno.b2w.io/autocomplete?content=${searchTerm
        .normalize("NFD")
        .replace(/[^a-zA-Zs ]/g, "")}&source=nanook`
    )
    .then((response) => {
      return response.data.products.map((product: Product) => product.name);
    })
    .catch((error) => {
      console.error(error);
    });
  return request;
}
