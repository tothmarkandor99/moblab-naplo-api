import {faker} from "@faker-js/faker"
import { Bejegyzes } from "../model/bejegyzes";

export const bejegyzesGyar = (): Bejegyzes => ({
    azonosito: faker.datatype.number({min: 1, max: 10000}),
    datum: faker.date.past(1).toISOString().substring(0, 10),
    felhasznaloAzonosito: faker.datatype.uuid(),
    tartalom: faker.lorem.paragraphs(),
})