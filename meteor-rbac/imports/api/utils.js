import { Mongo } from 'meteor/mongo';

export const ensureMongo = ids =>
    ids.map(id => (id instanceof Mongo.ObjectID ? id : new Mongo.ObjectID(id)));

export const ensureString = ids =>
    ids.map(id => {
        if (id instanceof Mongo.ObjectID) {
            return id._str;
        } else if (id instanceof String) {
            return id;
        } else {
            throw new Error('unknow id type');
        }
    });

<<<<<<< HEAD
export const getStringID = item => (typeof item._id === 'string' ? item._id : item._id._str);
=======
export const getStringID = item => (item._id instanceof String ? item._id : item._id._str);
>>>>>>> 79bafd0574bf853bb6a14de3c8567e9714892234
