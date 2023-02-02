import express, {Express, Request, Response, urlencoded} from 'express'
import dotenv from 'dotenv'
import { RegisterRoutes } from '../dist/routes'
import {prepareErrorHandlers} from './errors'
import swaggerUI from 'swagger-ui-express'

dotenv.config()

const app: Express = express()
const port = process.env.PORT ?? 8000

app.listen(port, () => {
    console.info(`Server running on port ${port}`)
})

app.use(
    urlencoded({
        extended: true
    })
)
app.use(express.json())

app.use('/docs', swaggerUI.serve, async (_req: Request, res: Response) => {
    return res.send(
        swaggerUI.generateHTML(await import('../dist/swagger.json'))
    )
})

RegisterRoutes(app)
prepareErrorHandlers(app)