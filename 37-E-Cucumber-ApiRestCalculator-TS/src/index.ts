import express from 'express'

const app = express()
const port = 3000

app.get( "/helloworld", (req: express.Request, res: express.Response) => {
  res.send('Hello world!');
});

app.listen( port, () => {
  console.log(`server started at http://localhost:${ port }`);
});