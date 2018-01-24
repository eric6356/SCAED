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
            menus: ['Home'],
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
            menus: ['All'],
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
            menus: ['Access', 'Role', 'Account'],
            description: 'can access AC system'
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
            menus: ['Jira'],
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
            menus: ['Wiki'],
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
        console.log('[Role: Super Admin] created');
    }

    let adminRole = c.Role.findOne({ name: 'Admin' });
    if (adminRole === undefined) {
        adminRole = new c.Role();
        adminRole.set({
            name: 'Admin',
            accessIDs: [rbacAccess._id, homeAccess._id]
        });
        adminRole.save();
        console.log('[Role: Admin] created');
    }

    let docWriterRole = c.Role.findOne({ name: 'Doc Writer' });
    if (docWriterRole === undefined) {
        docWriterRole = new c.Role();
        docWriterRole.set({
            name: 'Doc Writer',
            accessIDs: [wikiAccess._id, homeAccess._id]
        });
        docWriterRole.save();
        console.log('[Role: Admin] created');
    }

    let devRole = c.Role.findOne({ name: 'Developer' });
    if (devRole === undefined) {
        devRole = new c.Role();
        devRole.set({
            name: 'Developer',
            accessIDs: [wikiAccess._id, jiraAccess._id, homeAccess._id]
        });
        devRole.save();
        console.log('[Role: Dev] created');
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

    let aliceAccount = c.Account.findOne({ username: 'alice' });
    if (aliceAccount === undefined) {
        aliceAccount = Accounts.createUser({
            username: 'alice',
            password: 'alice',
            profile: {
                roleIDs: [devRole._id]
            }
        });
        console.log('[Account: alice] created');
    }

    let bobAccount = c.Account.findOne({ username: 'bob' });
    if (bobAccount === undefined) {
        bobAccount = Accounts.createUser({
            username: 'bob',
            password: 'bob',
            profile: {
                roleIDs: [adminRole._id, docWriterRole._id]
            }
        });
        console.log('[Account: bob] created');
    }
};
