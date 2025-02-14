import { Entity, Column, Unique } from "typeorm";

import { BaseSoftDelete } from "../base";

@Entity()
@Unique(["name"])
export class Media extends BaseSoftDelete {
  @Column()
  public name: string;
}
