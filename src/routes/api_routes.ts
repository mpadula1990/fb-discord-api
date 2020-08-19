import * as express from 'express';
import {v4 as uuid} from 'uuid';
import cors from 'cors';
import { DBRepository } from '../infrastructure/repository';
import moment from 'moment';

class ApiRouter {
  private repository: DBRepository;
    constructor(server: express.Express){
        const router = express.Router();

        this.loadRoutes(router);

        router.options('*', cors());
        server.use('/', router);
        this.repository = new DBRepository();
    }

    private loadRoutes = (router: express.Router) => {
        router.get('/api/operations/:from/:to', (req, res) => {
            if(!req.params.from || !req.params.to){
              res.status(400).send('Bad Request!')
            }
            this.repository.getOperations(moment(req.params.from, 'YYYYMMDD').format(), moment(req.params.to, 'YYYYMMDD').format()).then(r=> {
              console.log(r, "r")
                res.json(r);
            }).catch(e=> {
              res.status(500).send('Something broke! -> ' + e);
            });
        });
    }
}

export default ApiRouter;
