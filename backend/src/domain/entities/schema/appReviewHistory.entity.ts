import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

import { App } from "@domain/entities";

import { BaseSoftDelete } from "../base";

@Entity()
export class AppReviewHistory extends BaseSoftDelete {
    @Column()
    public appId: string;

    @Column()
    public reviewer: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public reviewedAt: Date;

    @Column()
    public remark: string;

    @ManyToOne(() => App, (app) => app.id, { onDelete: "CASCADE" })
    @JoinColumn({ name: "appId" })
    app: App;
}
