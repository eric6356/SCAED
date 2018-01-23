import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';

import * as c from './collections';

export const initFixture = () => {
    let homeAccess = c.Access.findOne({ code: 'HOME' });
    if (homeAccess === undefined) {
        homeAccess = new c.Access();
        homeAccess.set({
            code: 'HOME',
            endpoint: '/',
            description: 'can access home'
        });
        homeAccess.save();
        console.log('[Access: all] created');
    }

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

    let rbacAccess = c.Access.findOne({ code: 'ADMIN' });
    if (rbacAccess === undefined) {
        rbacAccess = new c.Access();
        rbacAccess.set({
            code: 'ADMIN',
            endpoint: '/rbac/*',
            description: 'can access access control system'
        });
        rbacAccess.save();
        console.log('[Access: ADMIN] created');
    }

    let jiraAccess = c.Access.findOne({ code: 'JIRA' });
    if (jiraAccess === undefined) {
        jiraAccess = new c.Access();
        jiraAccess.set({
            code: 'JIRA',
            endpoint: '/jira/*',
            description: 'can access jira'
        });
        jiraAccess.save();
        console.log('[Access: JIRA] created');
    }

    let wikiAccess = c.Access.findOne({ code: 'WIKI' });
    if (wikiAccess === undefined) {
        wikiAccess = new c.Access();
        wikiAccess.set({
            code: 'WIKI',
            endpoint: '/wiki/*',
            description: 'can access wiki'
        });
        wikiAccess.save();
        console.log('[Access: WIKI] created');
    }

    let superRole = c.Role.findOne({ name: 'Super Admin' });
    if (superRole == undefined) {
        superRole = new c.Role();
        superRole.set({
            name: 'Super Admin',
            accessIDs: [allAccess._id]
        });
        superRole.save();
        console.log('[Rold: Super Admin] created');
    }

    let adminRole = c.Role.findOne({ name: 'Admin' });
    if (adminRole === undefined) {
        adminRole = new c.Role();
        adminRole.set({
            name: 'Admin',
            accessIDs: [rbacAccess._id, homeAccess._id]
        });
        adminRole.save();
        console.log('[Rold: Admin] created');
    }

    let docWriterRole = c.Role.findOne({ name: 'Doc Writer' });
    if (docWriterRole === undefined) {
        docWriterRole = new c.Role();
        docWriterRole.set({
            name: 'Doc Writer',
            accessIDs: [wikiAccess._id, homeAccess._id]
        });
        docWriterRole.save();
        console.log('[Rold: Admin] created');
    }

    let devRole = c.Role.findOne({ name: 'Developer' });
    if (devRole === undefined) {
        devRole = new c.Role();
        devRole.set({
            name: 'Developer',
            accessIDs: [wikiAccess._id, jiraAccess._id, homeAccess._id]
        });
        devRole.save();
        console.log('[Rold: Dev] created');
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

    let superAccount = c.Account.findOne({ username: 'super' });
    if (superAccount === undefined) {
        superAccount = Accounts.createUser({
            username: 'super',
            password: 'super',
            profile: {
                roleIDs: [superRole._id]
            }
        });
        console.log('[Account: super] created');
    }
};
