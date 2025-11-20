import { obligatoryFieldsSchema, obligatoryRequredFields } from "../core.schema";
import { productSchema } from "data/schemas/products/product.schema";

  
  export const GetAllProductsResponseSchema = {
    type: "object",
    properties: {
      Products: {
        type: "array",
        items: productSchema,
      },
      ...obligatoryFieldsSchema,
    },
    required: ["Products", ...obligatoryRequredFields],
    additionalProperties: false,
  };
