// Express
import express, { Application, Request, Response, NextFunction, application } from 'express';

// Swagger
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './config/swagger.json';

// Moment
import moment from 'moment';

// FileSystem
import fs from 'fs';

// Middlewares
import bodyParser from 'body-parser';
import morgan from 'morgan';

//Routes
import ApiRouter from './routes/api_routes';
import Router from './routes/api_routes';

class App {
  private httpServer: express.Express;

  constructor(){
    
    // App
    this.httpServer = express();

    //Settings

    this.httpServer.set('appName', 'AppNodeExpress');
    this.httpServer.set('staticFilesDir', __dirname + '/utils/static');
    this.httpServer.set('loggerDir', __dirname + '/utils/logs');
    this.httpServer.set('port', 3001);

    // Get Settings
    const appPort = this.httpServer.get('port');
    const loggerDir = this.httpServer.get('loggerDir');

    //Middlewares

    this.httpServer.use((req, res, next)=>{
      console.log('AppMiddleware functions here');
      next();
    });

    // Morgan
    this.httpServer.use(morgan('dev', {stream: fs.createWriteStream(`${loggerDir}/${moment().format('MMM-Do-YY')}.log`, {flags: 'a'})}));

    //BodyParser Middleware
    this.httpServer.use(bodyParser.json());
    this.httpServer.use(bodyParser.urlencoded({extended: true}));

    //Static HTML Renderer
    this.httpServer.use(express.static(this.httpServer.get('staticFilesDir')));

    //Router
    new ApiRouter(this.httpServer);
    //new Router(this.httpServer); MVC

    this.httpServer.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));     
  }

  public Start = (port: number):Promise<any> => {
    return new Promise((resolve, reject) => {
      this.httpServer.listen(
        port,
        () => {
          resolve(port)
        })
        .on('error', (err: object) => reject(err));
    })
  }

  }

  export default App;
