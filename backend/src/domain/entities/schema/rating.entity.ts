import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

import { App, User } from "@domain/entities";

import { BaseSoftDelete } from "../base";

@Entity()
export class Rating extends BaseSoftDelete {
    @Column()
    public appId: string;

    @Column()
    public userId: string;

    @Column()
    public score: number;

    @Column({ nullable: true })
    public comment: string;

    @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user: User;

    @ManyToOne(() => App, (app) => app.id, { onDelete: "CASCADE" })
    @JoinColumn({ name: "appId" })
    app: App;
}
