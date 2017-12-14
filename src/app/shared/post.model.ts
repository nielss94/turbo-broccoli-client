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

    constructor(_id: string, title: string, content: string, user: string, page: string, tags: string[], comments: Comment[],
                    createdAt: Date, updatedAt: Date, upCoins: Number) {
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
    }

    public get Id(): string {
        return this._id;
    }
    public set Id(v: string) {
        this._id = v;
    }
    public get Title(): string {
        return this.title;
    }
    public set Title(v: string) {
        this.title = v;
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
    public get Page(): string {
        return this.page;
    }
    public set Page(v: string) {
        this.page = v;
    }
    public get Tags(): string[] {
        return this.tags;
    }
    public set Tags(v: string[]) {
        this.tags = v;
    }
    public get Comments(): Comment[] {
        return this.comments;
    }
    public set Comments(v: Comment[]) {
        this.comments = v;
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
}
