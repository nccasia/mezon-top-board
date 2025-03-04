import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

import { App, User } from "@domain/entities";

import { BaseSoftDelete } from "../base";

@Entity()
export class AppReviewHistory extends BaseSoftDelete {
    @Column()
    public appId: string;

    @Column({ default: false })
    public isApproved: boolean;

    @Column()
    public reviewerId: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public reviewedAt: Date;

    @Column()
    public remark: string;

    @ManyToOne(() => App, (app) => app.id, { onDelete: "CASCADE" })
    @JoinColumn({ name: "appId" })
    app: App;

    @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
    @JoinColumn({ name: "reviewerId" })
    reviewer: User;
}
