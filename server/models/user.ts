import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Posts } from "./posts";
import { Atividades } from "./atividades";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  name!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  password!: string;

  @Column({ type: "varchar", length: 11, nullable: false, unique: true })
  cpf_number!: string;

  @Column({ type: "boolean", nullable: false, default: false})
  status!: Boolean;

  @Column({ type: "date", default: "current_timestamp" })
  criado_em!: Date;

  @OneToMany(() => Atividades, (atividade) => atividade.id)
  atividades!:Atividades []

  @OneToMany(() => Posts, (post) => post.id)
  posts!:Posts []

  constructor(nome:string, emaiL:string, password:string, cpf:string){
    this.name = nome
    this.email = emaiL
    this.password = password
    this.cpf_number = cpf
  }
}
