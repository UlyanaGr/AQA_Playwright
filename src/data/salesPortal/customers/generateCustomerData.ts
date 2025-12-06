import { faker } from "@faker-js/faker";
import { ICustomer } from "data/types/customer.types";
import { getRandomEnumValue } from "utils/enum.utils";
import { COUNTRY } from "./countries";


export function generateCustomerData(params?: Partial<ICustomer>): ICustomer {
    return {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        country: getRandomEnumValue(COUNTRY),
        city: faker.location.city(),
        street: faker.location.street(),
        house: faker.number.int({ min: 1, max: 999 }),
        flat: faker.number.int({ min: 1, max: 9999 }),
        phone: faker.phone.number({ style: "international" }),
        notes: faker.string.alphanumeric({ length: 250 }),
        ...params
    };
}
