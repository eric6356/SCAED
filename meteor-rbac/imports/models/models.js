class Account {
    constructor(username, firstName, lastName) {
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

class Person {
    constructor(account, firstName, lastName) {
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

class Contact {
    constructor(person, email, address, phone) {
        this.person = person;
        this.email = email;
        this.address = address;
        this.phone = phone;
    }
}

class JobProfile {
    constructor(title, description, baseSalary) {
        this.title = title;
        this.description = description;
        this.baseSalary = baseSalary;
    }
}

class Role {
    constructor(name) {
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

class Access {
    constructor(code, endpoint, description = '') {
        this.code = code;
        this.endpoint = endpoint;
        this.description = description;
    }
}
