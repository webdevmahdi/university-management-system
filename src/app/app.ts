import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { notFoundRoute } from './middlewares/notFound';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import router from './routes';
const app: Application = express()


// parser
app.use(express.json());
app.use(cors())


app.use('/api/v1', router)

const getController = ((req: Request, res: Response) => {
  res.send("HELLO WORLD");
})
app.get('/', getController)

app.use(globalErrorHandler)
app.use(notFoundRoute)

export default app;