const { Client } = require('pg');

const connectionData = {
    connectionString: 'postgres://eqgkqehyildlkr:12c493cc5e5ac1ace711b97c092cd45063a637c3b5d00c913d99fedb4077daf7@ec2-34-251-118-151.eu-west-1.compute.amazonaws.com:5432/ddmc9vcorm2ocn'
};

const dbClient = new Client(connectionData);

const getOperations = async (from:any, to:any) => {
    try{
      dbClient.connect();
        var query: any = {
            text: 'select o.id, o.operation_type, o.detail, o.operation_date, o.concept, o.memberid, r.id as rid, r.category, r.mount from operations o inner join registers r on o.id = r.operationid where o.operation_date >= $1 and o.operation_date <= $2',
            values: [from, to]
        };
        var query = await dbClient.query(query);
        return query.rows;
    }catch(e) { console.log("asdasdasdAAAAAAA"); Promise.reject(e); }
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
