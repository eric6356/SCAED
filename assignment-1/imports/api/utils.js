import { Mongo } from 'meteor/mongo';

export const toMongo = ids => ids.map(id => new Mongo.ObjectID(id));
