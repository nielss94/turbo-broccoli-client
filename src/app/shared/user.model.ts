export class User {
    private id: Number;
    private email: string;
    private username: string;

    constructor(id: Number, email: string, username: string) {
        this.id = id;
        this.email = email;
        this.username = username;
    }

    public getId(): Number {
        return this.id;
    }
    public setId(v: Number) {
        this.id = v;
    }
    public getEmail(): string {
        return this.email;
    }
    public setEmail(v: string) {
        this.email = v;
    }
    public getUsername(): string {
        return this.username;
    }
    public setUsername(v: string) {
        this.username = v;
    }
}
