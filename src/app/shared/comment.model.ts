export class Comment {
    constructor(private _id: string, private content: string, private user: string, private postId: string, private downCoins: Number,
                private upCoins: Number, private createdAt: Date, private updatedAt: Date) { }

    public get Id(): string {
        return this._id;
    }
    public set Id(v: string) {
        this._id = v;
    }
    public get Content(): string {
        return this.content;
    }
    public set Content(v: string) {
        this.content = v;
    }
    public get User(): string {
        return this.user;
    }
    public set User(v: string) {
        this.user = v;
    }
    public get CreatedAt(): Date {
        return this.createdAt;
    }
    public set CreatedAt(v: Date) {
        this.createdAt = v;
    }
    public get UpdatedAt(): Date {
        return this.updatedAt;
    }
    public set UpdatedAt(v: Date) {
        this.updatedAt = v;
    }
    public get UpCoins(): Number {
        return this.upCoins;
    }
    public set UpCoins(v: Number) {
        this.upCoins = v;
    }
    public get PostId(): string {
        return this.postId;
    }
    public set PostId(v: string) {
        this.postId = v;
    }
}
