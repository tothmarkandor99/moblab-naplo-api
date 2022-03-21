"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bejegyzesGyar = void 0;
const faker_1 = require("@faker-js/faker");
const bejegyzesGyar = () => ({
    azonosito: faker_1.faker.datatype.number({ min: 1, max: 10000 }),
    datum: faker_1.faker.date.past(1).toISOString().substring(0, 10),
    felhasznaloAzonosito: faker_1.faker.datatype.uuid(),
    tartalom: faker_1.faker.lorem.paragraphs(),
});
exports.bejegyzesGyar = bejegyzesGyar;
