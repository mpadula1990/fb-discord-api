import * as express from 'express';
import {v4 as uuid} from 'uuid';
import cors from 'cors';
import { getOperations } from '../infrastructure/repository';

class ApiRouter {
    constructor(server: express.Express){
        const router = express.Router();

        this.loadRoutes(router);

        router.options('*', cors());
        server.use('/', router);
    }

    private loadRoutes = (router: express.Router) =>{
        router.get('/api', (req, res)=> {
            getOperations().then(r=> {
                res.json(r);
            }).catch(e=> res.json(e));
        });
    }
}

export default ApiRouter;