import Schema, { Atribute, KeySchema } from "./Schema";

enum TABLE_BUILDER {
    TableName =  'TableName',
    AttributeDefinitions = 'AttributeDefinitions',
    KeySchema = 'KeySchema'
}
enum TABLE_ATTRIBUTE_BUILDER {
    AttributeName =  'AttributeName',
    AttributeType = 'AttributeType'
}

export default class ParserSchema {
    
    static parse(schema: Schema[] | undefined): any {
        if (schema == undefined) {
            return null;
        }
        let tables:  Array<Object> = new Array<Map<string, any>>();
        schema.forEach(it => {


            // let params:  Map<string, any> = new Map<string, any>();
            // params.set(TABLE_BUILDER.TableName, it.name);
            // params.set(TABLE_BUILDER.AttributeDefinitions, this.getAtrribute(it.attributtes));
            // params.set(TABLE_BUILDER.KeySchema, this.getKeySchema(it.keys));
            tables.push({
                AttributeDefinitions: this.getAtrribute(it.attributtes),
                KeySchema: this.getKeySchema(it.keys),
                TableName: it.name
            });
        });
        return tables;

    }

    private static getKeySchema(atributes: KeySchema[]): Array<any> {
        const _atributes: Array<any> = new Array<any>();
        atributes.forEach(it => {
            let attributeLocal = {
                AttributeName: it.name,
                KeyType: this.getValueOfKey(it.type)
            };
            _atributes.push(attributeLocal);
        });
        //console.log('getKeySchema [ ',  _atributes);
        return _atributes;
    }


    private static getAtrribute(atributes: Atribute[]): Array<any> {
        const _atributes: Array<any> = new Array<any>();
        atributes.forEach(it => {
            let attributeLocal = {
                AttributeName: it.name,
                AttributeType: this.getValueOfAtribute(it.type)
            };
            _atributes.push(attributeLocal);
        });
        //console.log('getAtrribute [ ', _atributes);
        return _atributes;
    }

    private static getValueOfKey(type: String): String {
        let attribute = 'HASH';
        switch(type.toLowerCase().trim()) {
            case 'hash': 
                attribute = 'HASH';
            break;
            case 'range': 
                attribute = 'RANGE';
            break;
        }
        return attribute;
    }
    private static getValueOfAtribute(type: String): String {
        let attribute = 'S';
        switch(type.toLowerCase().trim()) {
            case 'string': 
                attribute = 'S';
            break;
            case 'boolean': 
                attribute = 'BOOL';
            break;
            case 'number': 
                attribute = 'N';
            break;
            case 'list': 
                attribute = 'SS';
            break;
        }
        return attribute;
    }

    
}