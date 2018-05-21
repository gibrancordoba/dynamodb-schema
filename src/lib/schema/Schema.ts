import Config from "../config/config";


export interface Atribute {
    name: String,
    type: String

}

export interface KeySchema {
    name: String,
    type: String
}

export interface Throughput {
    read: Number,
    write: Number
}


export default interface Schema {
    name: String,
    attributtes: Atribute[],
    keys: KeySchema[],
    throughput?: Throughput,
    stream?: Boolean
}
