import { ICreatedOn, ID, IResponseFields } from "./core.types";

export interface ICustomer {
    email: string;
    name: string;
    country: Country;
    city: string;
    street: string;
    house: number;
    flat: number;
    phone: string;
    notes: string;
}

export type Country = "USA" | "Canada" | "Belarus" | "Ukraine" | "Germany" | "France" | "Great Britain" | "Russia";

export type CustomersTableHeader = "Email" | "Name" | "Country" | "Created On";

export interface ICustomerInTable extends Pick<ICustomer, "email" | "name" | "country">, ICreatedOn {}

export interface ICustomerFromResponse extends Required<ICustomer>, ICreatedOn, ID {}

export interface ICustomerResponse extends IResponseFields {
  Customer: ICustomerFromResponse;
}