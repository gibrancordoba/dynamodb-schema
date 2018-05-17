import DynamoDBConnector from "../connector/dynamo-connector";
import { PromiseResult } from "aws-sdk/lib/request";

export enum CreateType{
    OVERRIDE = 'OVERRIDE',
    IGNORE = 'IGNORE',

}

export default class TableBuilder {

    dbConnector: AWS.DynamoDB;

    constructor(){
        this.dbConnector = new DynamoDBConnector().connect();
    }

    create(typeCreration: CreateType, tableSchema: AWS.DynamoDB.CreateTableInput): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log("Creando tabla " + tableSchema.TableName);
            if (typeCreration === CreateType.OVERRIDE) {
                console.log("Override tables if exist");

                this.describe(tableSchema.TableName).then( table => {
                    console.log("table does exists, deleting table...");
                    this.delete(tableSchema.TableName).then(deleted => {
                        console.log("table deleted, creating table");
                        this.dbConnector.createTable(tableSchema, resolve);
                    }).catch(err => {
                        reject(new Error("Error deleting table " + tableSchema.TableName));
                    });
                }).catch(err => {
                    console.log("table doesnt exists, creating table");
                    this.dbConnector.createTable(tableSchema, resolve);
                });
            }else{
                console.log("keep tables if exist");
                this.describe(tableSchema.TableName).catch( (err: Error) => {
                    this.dbConnector.createTable(tableSchema, resolve);
                });
            }
        });
                   

            
    }

    delete(tableName: string): Promise<any> {
        console.log("deleting table " + tableName);
        const params: AWS.DynamoDB.DeleteTableInput = { TableName: tableName };
        return this.dbConnector.deleteTable(params).promise();
    }

    describe(tableName: string): Promise<any> {
        let params: AWS.DynamoDB.DescribeTableInput = { TableName: tableName };
        return this.dbConnector.describeTable(params).promise();
    }
}

