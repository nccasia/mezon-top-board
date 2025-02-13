import { Entity, Column, Unique, OneToMany, ChildEntity, ManyToMany, TableInheritance, JoinTable } from "typeorm";

import { Role } from "@domain/common/enum/role";
import { Rating, Link } from "@domain/entities";

import { BaseSoftDelete } from "../base";

@Entity()
@Unique(["email"])
@TableInheritance({ column: { name: "role", type: "enum", enum: Role } })
export class User extends BaseSoftDelete {
    @Column()
    public name: string;

    @Column()
    public email: string;

    @Column()
    public password: string;

    @OneToMany(() => Rating, (rating) => rating.user)
    public ratings: Rating[];
}

@ChildEntity(Role.ADMIN)
export class Admin extends User { }

@ChildEntity(Role.DEVELOPER)
export class Developer extends User {
    @Column({ nullable: true })
    public bio: string;

    @ManyToMany(() => Link, (link) => link.devs)
    @JoinTable()
    public socialLinks: Link[];
}