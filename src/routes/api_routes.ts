import * as express from 'express';
import {v4 as uuid} from 'uuid';
import cors from 'cors';
import { getOperations } from '../infrastructure/repository';
import moment from 'moment';

class ApiRouter {
    constructor(server: express.Express){
        const router = express.Router();

        this.loadRoutes(router);

        router.options('*', cors());
        server.use('/', router);
    }

    private loadRoutes = (router: express.Router) => {
        router.get('/api/operations/:from/:to', (req, res) => {
            if(!req.params.from || !req.params.to){
              res.status(400).send('Bad Request!')
            }
            console.log(req.params);
            var from = moment(req.params.from, 'YYYYMMDD').format();
            var to = moment(req.params.to, 'YYYYMMDD').format();
            console.log(from, to);
            getOperations(from, to).then(r=> {
                res.json(r);
            }).catch(e=> {
              res.status(500).send('Something broke! -> ' + e);
            });
        });
    }
}

export default ApiRouter;
