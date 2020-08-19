const { Client } = require('pg');

class DBRepository{
  private connectionData = {
      connectionString: 'postgres://eqgkqehyildlkr:12c493cc5e5ac1ace711b97c092cd45063a637c3b5d00c913d99fedb4077daf7@ec2-34-251-118-151.eu-west-1.compute.amazonaws.com:5432/ddmc9vcorm2ocn',
      ssl: true
  };

  private dbClient: any;
  constructor(){
    this.dbClient = new Client(this.connectionData);
  }

  public connect(){
    this.dbClient.connect();
  }

  public disconnect(){
    this.dbClient.end();
  }

  public getOperations = async (from:any, to:any): Promise<any> => {
        await this.connect();
          var query: any = {
              text: 'select o.id, o.operation_type, o.detail, o.operation_date, o.concept, o.memberid, r.id as rid, r.category, r.mount from operations o inner join registers r on o.id = r.operationid where o.operation_date >= $1 and o.operation_date <= $2',
              values: [from, to]
          };

          return new Promise((resolve, reject) => {
            this.dbClient.query(query).then((result: any) => {
              this.dbClient.end();
              resolve(result);
            }).catch((error: any) => {
              this.dbClient.end();
              reject(error);
            });
          });
  }

  public getTotal = async (category: any): Promise<number> => {
      var total = 0;
      try{
          var query: any = {
              text: 'SELECT * FROM "organization"."operations"',
              values: [category]
          };
          var query = await this.dbClient.query(query);
          return total;
      }catch(e) { return Promise.reject(e); }
  }

  public registerOperation = () => {

  }

  public registerMember = () => {

  }

  public registerOrganization = () => {

  }

  public registerDeposit = () => {

  }

  public setGoal = () => {

  }

  public cancelOperation = () => {

  }
}

export {DBRepository};
