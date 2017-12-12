export class Comment {
    constructor(private _id: string, private content: string, private user: string, private postId: string, private downCoins: Number,
                private upCoins: Number, private createdAt: Date, private updatedAt: Date) { }

    public getId(): string {
        return this._id;
    }
    public setId(v: string) {
        this._id = v;
    }
    public getContent(): string {
        return this.content;
    }
    public setContent(v: string) {
        this.content = v;
    }
    public getUser(): string {
        return this.user;
    }
    public setUser(v: string) {
        this.user = v;
    }
    public getCreatedAt(): Date {
        return this.createdAt;
    }
    public setCreatedAt(v: Date) {
        this.createdAt = v;
    }
    public getUpdatedAt(): Date {
        return this.updatedAt;
    }
    public setUpdatedAt(v: Date) {
        this.updatedAt = v;
    }
    public getUpCoins(): Number {
        return this.upCoins;
    }
    public setUpCoins(v: Number) {
        this.upCoins = v;
    }
    public getDownCoins(): Number {
        return this.downCoins;
    }
    public setDownCoins(v: Number) {
        this.downCoins = v;
    }
    public getPostId(): string {
        return this.postId;
    }
    public setPostId(v: string) {
        this.postId = v;
    }
}
