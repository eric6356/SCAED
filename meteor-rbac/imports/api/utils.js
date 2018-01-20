import { Mongo } from 'meteor/mongo';

export const toMongo = ids => ids.map(id => (id instanceof Mongo.ObjectID ? id : new Mongo.ObjectID(id)));
