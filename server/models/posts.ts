import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { User } from "./user";
import { Atividades } from "./atividades";

@Entity("posts")
export class Posts{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "varchar", length: 255, nullable: false})
    texto_post!: string;

    @Column({type: "text", nullable: true})
    imagem!: string;

    @Column({type: "datetime", nullable:false,})
    criado_em!: Date

    @ManyToOne(() => User, (user) => user.id)
    user!:User

    @ManyToMany(() => Atividades)
    @JoinTable({name: 'atividades_posts'})
    atividades!:Atividades[]

    constructor(texto:string, imagem:string, criado_em:Date){
        this.texto_post = texto
        this.imagem = imagem
        this.criado_em = criado_em
    }
}