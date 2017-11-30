import * as http from 'http'
import * as path from 'path'
import * as finalhandler from 'finalhandler'
import * as serveStatic from 'serve-static'

const serve = serveStatic(path.join(__dirname, './example'))
const server = http.createServer((req: any, res: any) => {
  serve(req, res, finalhandler(req, res))
})
server.listen(8001)
