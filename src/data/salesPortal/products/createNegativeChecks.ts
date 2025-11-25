import { faker } from "@faker-js/faker";
import { IProduct } from "data/types/product.types";

interface IChecksData {
  title: string;
  value: Partial<IProduct>;
}

const createProductNegativeChecks: IChecksData[] = [
  {
    title: "Name contains 2 alphanumerical characters",
    value: {
      name: faker.string.alphanumeric({ length: 2 }),
    },
  },
  {
    title: "Name contains 41 alphanumerical characters",
    value: {
      name: faker.string.alphanumeric({ length: 41 }),
    },
  },
  {
    title: "Name with two spaces between two words",
    value: {
      name: `${faker.string.alphanumeric({
        length: 5,
      })}  ${faker.string.alphanumeric({ length: 10 })}`,
    },
  },
  {
    title: "Name with space at the beginning",
    value: {
      name: ` ${faker.string.alphanumeric({
        length: 10,
      })} ${faker.string.alphanumeric({ length: 20 })}`,
    },
  },
  {
    title: "Name with space at the end",
    value: {
      name: `${faker.string.alphanumeric({
        length: 10,
      })} ${faker.string.alphanumeric({ length: 10 })} `,
    },
  },
  {
    title: "Name without space between words",
    value: {
      name: `${faker.string.alphanumeric({
        length: 5,
      })}${faker.string.alphanumeric({ length: 10 })} `,
    },
  },

  {
    title: "Name is empty",
    value: {
      name: "",
    },
  },
  {
    title: "Price = 0 (LT 1)",
    value: {
      price: 0,
    },
  },
  {
    title: "Price is 100000 (GT 99999)",
    value: {
      price: 100000,
    },
  },

  {
    title: "Amount is 1000 (GT 999)",
    value: {
      amount: 1000,
    },
  },
  {
    title: "Notes value length is over 250",
    value: {
      notes: faker.string.alphanumeric({ length: 251 }),
    },
  },

  {
    title: "Notes contain forbidden character '>' (GT symbol)",
    value: {
      notes: `${faker.lorem.word(5)} > ${faker.lorem.word(5)}`,
    },
  },
  {
    title: "Notes contain forbidden character '<' (LT symbol)",
    value: {
      notes: `${faker.lorem.word(5)} < ${faker.lorem.word(5)}`,
    },
  },
  {
    title: "Notes contain both forbidden characters '<>'",
    value: {
      notes: `${faker.lorem.word(5)} <> ${faker.lorem.word(5)}`,
    },
  },
];

export default createProductNegativeChecks;
