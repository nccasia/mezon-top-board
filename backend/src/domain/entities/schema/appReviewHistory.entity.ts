import { Entity, Column, ManyToOne } from "typeorm";

import { App } from "@domain/entities";

import { BaseSoftDelete } from "../base";

@Entity()
export class AppReviewHistory extends BaseSoftDelete {
    @Column()
    public appId: string;

    @Column()
    public reviewer: string;

    @Column()
    public reviewedAt: Date;

    @Column()
    public remark: string;

    @ManyToOne(() => App, (app) => app.id, { onDelete: "CASCADE" })
    app: App;
}
