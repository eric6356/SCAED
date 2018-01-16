class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.accounts = [];
        this.jobProfile = null;
        this.manager = null;
        this.contact = null;
    }

    createAccount(accountName) {
        const account = new Account(this, accountName);
        this.addAccount(account);
    }

    addAccount(account) {
        const i = this.accounts.push(account);
    }

    removeAccount(account) {
        account.person = null; // TODO: delete account
        this.accounts.indexOf(account);
        this.accounts.splice(i, 1);
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

class Account {
    constructor(person, name) {
        this.name = name;
        this.person = person;
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
    constructor(code, description) {
        this.code = code;
        this.description = description;
    }
}
