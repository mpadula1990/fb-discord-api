const { Client } = require('pg');

const connectionData = {
    user: 'eqgkqehyildlkr',
    host: 'ec2-34-251-118-151.eu-west-1.compute.amazonaws.com',
    database: 'ddmc9vcorm2ocn',
    password: '12c493cc5e5ac1ace711b97c092cd45063a637c3b5d00c913d99fedb4077daf7',
    port: 5432,
}

const dbClient = new Client(connectionData);

const getOperations = async (from:any, to:any, type: any) => {
    dbClient.connect();
    try{
        var query: any = {
            text: 'SELECT * FROM "organization"."operations"',
            values: [from, to, type]
        };
        var query = await dbClient.query(query);
        return query.rows;
    }catch(e) { return Promise.reject(e); }
}

const getTotal = async (category: any): Promise<number> => {
    dbClient.connect();
    var total = 0;
    try{
        var query: any = {
            text: 'SELECT * FROM "organization"."operations"',
            values: [category]
        };
        var query = await dbClient.query(query);
        return total;
    }catch(e) { return Promise.reject(e); }
}

const registerOperation = () => {

}

const registerMember = () => {

}

const registerOrganization = () => {

}

const registerDeposit = () => {

}

const setGoal = () => {

}

const cancelOperation = () => {
    
}

export {getOperations}