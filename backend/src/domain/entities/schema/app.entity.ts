import { Column, Entity, JoinTable, ManyToMany, OneToMany, Unique } from "typeorm";

import { AppStatus } from "@domain/common/enum/appStatus";
import { Link, AppReviewHistory, Rating, Tag } from "@domain/entities";

import { BaseSoftDelete } from "../base";

@Entity()
@Unique(["name"])
export class App extends BaseSoftDelete {
    @Column()
    public name: string;

    @Column({
        type: "enum",
        enum: AppStatus,
        default: AppStatus.PENDING,
    })
    public status: AppStatus;

    @Column({ default: false })
    public isAutoPublished: boolean;

    @Column({ nullable: true })
    public installLink: string;

    @Column({ nullable: true })
    public headline: string;

    @Column({ nullable: true })
    public description: string;

    @Column({ nullable: true })
    public prefix: string;

    @Column({ nullable: true })
    public featuredImage: string;

    @Column()
    public ownerId: string;

    @Column({ nullable: true })
    public supportUrl: string;

    @Column({ nullable: true })
    public remark: string;

    @ManyToMany(() => Tag, (tag) => tag.apps)
    @JoinTable()
    public tags: Tag[];

    @ManyToMany(() => Link, (link) => link.apps)
    @JoinTable()
    public socialLinks: Link[];

    @OneToMany(() => AppReviewHistory, (review) => review.app)
    reviewHistories: AppReviewHistory[];

    @OneToMany(() => Rating, (rating) => rating.app)
    ratings: Rating[];
}
