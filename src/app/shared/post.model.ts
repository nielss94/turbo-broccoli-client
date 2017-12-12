import { Comment } from './comment.model';


export class Post {
    private _id: string;
    private title: string;
    private content: string;
    private user: string;
    private page: string;
    private tags: string[];
    private comments: Comment[];
    private createdAt: Date;
    private updatedAt: Date;
    private upCoins: Number;
    private downCoins: Number;

    constructor(_id: string, title: string, content: string, user: string, page: string, tags: string[], comments: Comment[],
                    createdAt: Date, updatedAt: Date, upCoins: Number, downCoins: Number) {
        this._id = _id;
        this.title = title;
        this.content = content;
        this.user = user;
        this.page = page;
        this.tags = tags;
        this.comments = comments;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.upCoins = upCoins;
        this.downCoins = downCoins;
    }

    public getId(): string {
        return this._id;
    }
    public setId(v: string) {
        this._id = v;
    }
    public getTitle(): string {
        return this.title;
    }
    public setTitle(v: string) {
        this.title = v;
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
    public getPage(): string {
        return this.page;
    }
    public setPage(v: string) {
        this.page = v;
    }
    public getTags(): string[] {
        return this.tags;
    }
    public setTags(v: string[]) {
        this.tags = v;
    }
    public getComments(): Comment[] {
        return this.comments;
    }
    public setComments(v: Comment[]) {
        this.comments = v;
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
}
