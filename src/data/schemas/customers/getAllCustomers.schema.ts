import { obligatoryFieldsSchema, obligatoryRequredFields } from "../core.schema";
import { customerSchema } from "./customer.schema";

export const getAllCustomersResponseSchema = {
    type: "object",
    properties: {
      Products: {
        type: "array",
        items: customerSchema,
      },
      ...obligatoryFieldsSchema,
    },
    required: ["Customers", ...obligatoryRequredFields],
    additionalProperties: false,
  };