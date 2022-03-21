import express from 'express'
import * as bodyParser from 'body-parser'
import {Bejegyzes} from './model/bejegyzes'
import {intervallum} from './helper/intervallum'
import {bejegyzesGyar} from './helper/bejegyzesGyar'

const app = express()

app.use(bodyParser.json())
app.get('/:felhasznaloAzonosito/bejegyzes', (req, res, next) => {
  let valasz: Bejegyzes[] = intervallum(0, 10).map(() => ({
    ...bejegyzesGyar(),
    felhasznaloAzonosito: req.params.felhasznaloAzonosito,
  }))
  valasz = valasz.filter(
    bejegyzes =>
      valasz.filter(masikBejegyzes => masikBejegyzes.datum === bejegyzes.datum)
        .length === 1,
  )
  res.json(valasz)
})

app.listen(3000, () => {
  console.log('Elindult az API')
})
