import { instance, mock, reset, when } from 'ts-mockito';
import ParserSchema from '../../src/lib/schema/parser-schema';
import DynamoDBSchema from '../../src/lib/dynamodb-schema';

describe('ParseSchemaBuilder', () => {
    let parserSchema: ParserSchema = new ParserSchema();
    let schema = ([

        {
            name: 'table1',
            attributtes: [
                { name: 'user',  type: 'String' },
                { name: 'name',  type: 'String' }
               // { name: 'name2', type: 'Boolean' },
               // { name: 'name3', type: 'Map' },
               // { name: 'name4', type: 'Number' }
            ],
            keys: [
                { name: 'user',  type: 'HASH' },
                { name: 'name', type: 'RANGE' }
            ],
            Throughput: {
                read: 5,
                write: 5
            }
        }
    ]);
    before(() => {
        console.log('init');
        DynamoDBSchema.schema(schema);
    
    });
    describe('Should parse', () => {
        it('Should create ', (done) => {
            DynamoDBSchema.createSchema();
            //let _schema = parserSchema.parse(schema);
            //console.log(_schema);
            done();
        });
    });

});