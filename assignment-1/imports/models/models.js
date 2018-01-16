import * as c from './collections';

class Account extends c.Account {
    constructor(username, firstName, lastName) {
        super();
        this.username = username;
        this.person = new Person(this, firstName, lastName);
        this.roles = [];
    }

    addRole(role) {
        if (this.roles.indexOf(role) === -1) {
            this.roles.push(role);
        }
    }

    removeRole(role) {
        const i = this.roles.indexOf(role);
        if (i >= 0) {
            this.roles.splice(i, 1);
        }
    }
}

class Person extends c.Person {
    constructor(account, firstName, lastName) {
        super();
        this.account = account;
        this.firstName = firstName;
        this.lastName = lastName;
        this.jobProfile = null;
        this.manager = null;
        this.contact = null;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

class Contact extends c.Contact {
    constructor(person, email, address, phone) {
        super();
        this.person = person;
        this.email = email;
        this.address = address;
        this.phone = phone;
    }
}

class JobProfile extends c.JobProfile {
    constructor(title, description, baseSalary) {
        super();
        this.title = title;
        this.description = description;
        this.baseSalary = baseSalary;
    }
}

class Role extends c.Role {
    constructor(name) {
        super();
        this.name = name;
        this.accessMap = {};
    }

    hasAccess(accessCode) {
        return this.accessMap[accessCode] ? true : false;
    }

    grantAccess(access) {
        this.accessMap[access.code] = access;
    }

    removeAccess(accessCode) {
        delete this.accessMap[accessCode];
    }
}

class Access extends c.Access {
    constructor(code, description = '') {
        super();
        this.code = code;
        this.description = description;
    }
}
