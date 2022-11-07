import express from 'express'
import { Server } from 'http'

import { Calculator } from './Calculator'

const app = express()
const port = 3000

// ////////////////////////////////////////////////////////////////////////////
// Routes
// ////////////////////////////////////////////////////////////////////////////

app.get('/helloworld', (req: express.Request, res: express.Response) => {
  res.send('Hello world!');
});


app.get('/sum', (req: express.Request, res: express.Response) => {

  // console.log(`---> query: ${JSON.stringify(req.query)}`)
  const a = req.query.a
  const b = req.query.b

  // console.log(`--> a: ${a}, b: ${b}`)

  const myCalculator = new Calculator()
  const result = myCalculator.sum(Number(a), Number(b))
  // console.log(`--> result: ${result}`)

  res.json({ result })
});

app.get('/substract', (req: express.Request, res: express.Response) => {

  const a = req.query.a
  const b = req.query.b

  const myCalculator = new Calculator()
  const result = myCalculator.substract(Number(a), Number(b))

  res.json({ result })
});

app.get('/multiply', (req: express.Request, res: express.Response) => {

  const a = req.query.a
  const b = req.query.b

  const myCalculator = new Calculator()
  const result = myCalculator.multiply(Number(a), Number(b))

  res.json({ result })
});

app.get('/divide', (req: express.Request, res: express.Response) => {

  const a = req.query.a
  const b = req.query.b

  const myCalculator = new Calculator()
  
  try {
    const result = myCalculator.divide(Number(a), Number(b))
    res.json({ result })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        code: 400,
        message: 'Can not divide by zero'
      })
    }
  }

});

// ////////////////////////////////////////////////////////////////////////////
// Application init
// ////////////////////////////////////////////////////////////////////////////

let initiated = false
let server: Server | undefined

export async function init() {
  if (!initiated) {
    server = app.listen( port, () => {
      console.log(`server started at http://localhost:${ port }`);
      initiated = true
    });
  }
}

export async function stop() {
  return new Promise((resolve) => {
    if (server) {
      server.close(() => {
        console.log(`--> Server closed`)
        // process.exit(err ? 1: 0)
        resolve(true)
      })
    } else {
      console.log(`--> There is no server running to close`)
      resolve(false)
    }
  })
}
