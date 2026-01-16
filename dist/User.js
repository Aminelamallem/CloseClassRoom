class User {
    id;
    username;
    email;
    password;
    admin;
    constructor(id, username, email, password, admin) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.admin = admin;
    }
    getUser() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            admin: this.admin
        };
    }
}
new User(1, "john_doe", "6iM9s@example.com", "password123", true);
export {};
//# sourceMappingURL=User.js.map