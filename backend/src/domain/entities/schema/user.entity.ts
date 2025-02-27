import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  Unique,
} from "typeorm";

import { Role } from "@domain/common/enum/role";
import { Link, Rating } from "@domain/entities";

import { BaseSoftDelete } from "../base";

@Entity()
@Unique(["email"])
export class User extends BaseSoftDelete {
    @Column({ nullable: true, default: '' })
    public name: string | null;

    @Column()
    public email: string;

    @Column({ nullable: true, default: null })
    public password: string;

    @Column({ type: "enum", enum: Object.keys(Role), default: Role.DEVELOPER })
    public role: Role;

    @OneToMany(() => Rating, (rating) => rating.user)
    public ratings: Rating[];

    @Column({ nullable: true, default: null })
    public bio: string;

    @ManyToMany(() => Link, (link) => link.devs)
    @JoinTable()
    public socialLinks: Link[];
}