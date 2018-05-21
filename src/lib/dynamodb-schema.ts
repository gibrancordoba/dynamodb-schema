import Config from './config/config'
import TableBuilder, { CreateType } from "./table/table-builder"
import ParserSchema from './schema/parser-schema' 

import Schema from '../lib/schema/Schema'

export class SchemaBuilder {
    
    private static tableBuilder: TableBuilder = new TableBuilder();

    public schema(schema: Schema[]): void {
        const newC = {
            schema: schema
        }
        Config.setConfig((<any>Object).assign({}, Config.getConfig().schema, newC));
    }

    public config(config: Config): void{
        Config.setConfig((<any>Object).assign({}, Config.getConfig(), config));
    }

    constructor(){
        
    }

    public createSchema(){
        console.log('Creating new schema...');
        console.log('Schema information: ', Config.getConfig());
        const schema = ParserSchema.parse(Config.getConfig().schema);
        console.log('SchemaBuilder.tableBuilder', SchemaBuilder.tableBuilder);
        SchemaBuilder.tableBuilder.create(CreateType.IGNORE, schema[0]).then(data => {
            console.log(data);
        }).catch(err => {
            console.log('err', err);
        });
    }
}

const sb = new SchemaBuilder();


export default {
    config: sb.config,
    schema: sb.schema,
    createSchema: sb.createSchema
};