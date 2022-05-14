import express, {response} from 'express'
import * as bodyParser from 'body-parser'
import {Bejegyzes} from './model/bejegyzes'
import mysql from 'mysql2'
import {BejegyzesDb} from './model/bejegyzesDb'

const app = express()

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'moblab',
  password: 'moblab',
  database: 'moblab',
})

app.use(bodyParser.json())
app.get('/bejegyzesek/:felhasznaloAzonosito', (req, res) => {
  if (req.params.felhasznaloAzonosito.length > 100) {
    return res.status(400).send('Hibás azonosító')
  }
  connection.query<BejegyzesDb[]>(
    'SELECT * FROM bejegyzes WHERE felhasznaloAzonosito = ? ORDER BY datum DESC',
    [req.params.felhasznaloAzonosito],
    (hiba, rekordok) => {
      if (hiba) {
        console.log('Ismeretlen hiba történt')
      }
      const valasz: Bejegyzes[] = rekordok.map(rekord => ({
        azonosito: rekord.azonosito,
        felhasznaloAzonosito: rekord.felhasznaloAzonosito,
        datum: rekord.datum,
        tartalom: rekord.tartalom,
      }))
      res.json(valasz)
    },
  )
})

app.put('/bejegyzes', (req, res) => {
  const {felhasznaloAzonosito, tartalom} = req.body
  if (!felhasznaloAzonosito || felhasznaloAzonosito.length > 100) {
    return res.status(400).send('Hibás felhasználó azonosító')
  }
  if (!tartalom || tartalom.length > 100000) {
    return res.status(400).send('Hibás tartalom')
  }
  const datum = new Date().toISOString().substring(0, 10)
  connection.query<BejegyzesDb[]>(
    'SELECT azonosito FROM bejegyzes WHERE felhasznaloAzonosito = ? AND datum = ?',
    [felhasznaloAzonosito, datum],
    (hiba, rekordok) => {
      if (hiba) {
        console.log('Ismeretlen hiba történt')
      }
      if (rekordok.length !== 0) {
        connection.execute(
          'UPDATE bejegyzes SET tartalom = ? WHERE felhasznaloAzonosito = ? AND datum = ?',
          [tartalom, felhasznaloAzonosito, datum],
          (hiba, eredmeny) => {
            if (hiba) {
              console.log('Ismeretlen hiba történt')
            }
            return res.status(200).send()
          },
        )
      } else {
        connection.execute(
          'INSERT INTO bejegyzes (felhasznaloAzonosito, datum, tartalom) VALUES (?, ?, ?)',
          [felhasznaloAzonosito, datum, tartalom],
          (hiba, eredmeny) => {
            if (hiba) {
              console.log('Ismeretlen hiba történt')
            }
            return res.status(201).send()
          },
        )
      }
    },
  )
})

app.delete('/bejegyzes', (req, res) => {
  const {felhasznaloAzonosito} = req.body
  if (!felhasznaloAzonosito || felhasznaloAzonosito.length > 100) {
    return res.status(400).send('Hibás felhasználó azonosító')
  }
  const datum = new Date().toISOString().substring(0, 10)
  connection.query<BejegyzesDb[]>(
    'SELECT azonosito FROM bejegyzes WHERE felhasznaloAzonosito = ? AND datum = ?',
    [felhasznaloAzonosito, datum],
    (hiba, rekordok) => {
      if (hiba) {
        console.log('Ismeretlen hiba történt')
      }
      if (rekordok.length === 0) {
        return res.status(404).send()
      }
      connection.execute(
        'DELETE FROM bejegyzes WHERE felhasznaloAzonosito = ? AND datum = ?',
        [felhasznaloAzonosito, datum],
        (hiba, eredmeny) => {
          if (hiba) {
            console.log('Ismeretlen hiba történt')
          }
          return res.status(204).send()
        },
      )
    },
  )
})

app.listen(28084, () => {
  console.log('Elindult az API')
})
