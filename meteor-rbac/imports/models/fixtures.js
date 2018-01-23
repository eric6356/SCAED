import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';

import * as c from './collections';

export const initFixture = () => {
    let allAccess = c.Access.findOne({ code: 'ALL' });
    if (allAccess === undefined) {
        allAccess = new c.Access();
        allAccess.set({
            code: 'ALL',
            endpoint: '*',
            description: 'all access'
        });
        allAccess.save();
        console.log('[Access: all] created');
    }

    // let allAccess = c.Access.findOne({ code: 'ALL' });
    // if (allAccess === undefined) {
    //     allAccess = new c.Access();
    //     allAccess.set({
    //         code: 'ALL',
    //         endpoint: '*',
    //         description: 'all access'
    //     });
    //     allAccess.save();
    //     console.log('[Access: all] created');
    // }

    // let allAccess = c.Access.findOne({ code: 'ALL' });
    // if (allAccess === undefined) {
    //     allAccess = new c.Access();
    //     allAccess.set({
    //         code: 'ALL',
    //         endpoint: '*',
    //         description: 'all access'
    //     });
    //     allAccess.save();
    //     console.log('[Access: all] created');
    // }

    // let allAccess = c.Access.findOne({ code: 'ALL' });
    // if (allAccess === undefined) {
    //     allAccess = new c.Access();
    //     allAccess.set({
    //         code: 'ALL',
    //         endpoint: '*',
    //         description: 'all access'
    //     });
    //     allAccess.save();
    //     console.log('[Access: all] created');
    // }

    let adminRole = c.Role.findOne({ name: 'admin' });
    if (adminRole === undefined) {
        adminRole = new c.Role();
        adminRole.set({
            name: 'admin',
            accessIDs: [allAccess._id]
        });
        adminRole.save();
        console.log('[Rold: admin] created');
    }

    let adminAccount = c.Account.findOne({ username: 'admin' });
    if (adminAccount === undefined) {
        adminAccount = Accounts.createUser({
            username: 'admin',
            password: 'admin',
            profile: {
                roleIDs: [adminRole._id]
            }
        });
        console.log('[Account: admin] created');
    }
};
