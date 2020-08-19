import * as express from 'express';
import {v4 as uuid} from 'uuid';
import cors from 'cors';


/*Router Example For MVC, SPA, Razor Applications*/

class Router {
    constructor(server: express.Express){
        const router = express.Router();

        this.loadRoutes(router);

        router.options('*', cors());
        server.use('/', router);
    }

    private loadRoutes = (router: express.Router) =>{
        router.get('/', (req, res)=>{
            //HTML rendering example (usefull for MVC apps, swagger, razor, ejs, etc)
            res.render('index.html');
        });
    }
}

export default Router;