import { faker } from "@faker-js/faker";
import { IProduct } from "data/types/product.types";

interface IChecksData {
  title: string;
  value: Partial<IProduct>;
}

const createProductPositiveChecks: IChecksData[] = [
    {
      title: "Name should contain at least 3 alphanumerical characters",
      value: {
        name: faker.string.alphanumeric({ length: 3 })
      }
    },
    {
      title: "Name should contain maximum 40 alphanumerical characters",
      value: {
        name: faker.string.alphanumeric({ length: 40 })
      }
    },
    {
      title: "Name should contain one space between words",
      value: {
        name: `${faker.string.alphanumeric({ length: 5 })} ${faker.string.alphanumeric({ length: 7 })}`
      }
    },
    {
      title: "Price = 1",
      value: {
        price: 1
      }
    },
    {
      title: "Price = 99999",
      value: {
        price: 99999
      }
    },
    {
      title: "Amount is 0",
      value: {
        amount: 0
      }
    },
    {
      title: "Amount is 999",
      value: {
        amount: 999
      }
    },
    {
      title: "Notes contain 0 characters",
      value: {
        notes: faker.string.alphanumeric({ length: 0 })
      }
    },
    {
      title: "Notes contain 250 characters",
      value: {
        notes: faker.string.alphanumeric({ length: 250 })
      }
    },
    {
        title: "Notes contain various characters (but NOT < or >)",
        value: {
            // Генерируем текст с точками, запятыми, восклицательными знаками и т.д.
            notes: faker.lorem.sentence(8).replace(/[<>]/g, ''), 
        }
    }
  ];

  export default createProductPositiveChecks;
