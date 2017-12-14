export class User {
    private id: Number;
    private email: string;
    private username: string;

    constructor(id: Number, email: string, username: string) {
        this.id = id;
        this.email = email;
        this.username = username;
    }

    public get Id(): Number {
        return this.id;
    }
    public set Id(v: Number) {
        this.id = v;
    }
    public get Email(): string {
        return this.email;
    }
    public set Email(v: string) {
        this.email = v;
    }
    public get Username(): string {
        return this.username;
    }
    public set Username(v: string) {
        this.username = v;
    }
}
