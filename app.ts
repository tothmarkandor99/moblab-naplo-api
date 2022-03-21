import express from "express";
import * as bodyParser from "body-parser";
import { Bejegyzes } from "./model/bejegyzes";

const app = express();

app.use(bodyParser.json());
app.get("/:felhasznaloAzonosito/bejegyzes", (req, res, next) => {
    const valasz: Bejegyzes[] = [
        
    ]
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
   });

app.listen(3000, () => {
    console.log("Elindult az API");
});