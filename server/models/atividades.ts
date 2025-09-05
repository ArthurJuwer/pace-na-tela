import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { User } from "./user";
import { Posts } from "./posts";
import { join } from "path";

@Entity("atividades")
export class Atividades {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type: "varchar", length: 255, nullable: false})
    titulo: string;

    @Column({type: "float", nullable: false})
    distancia_km: number;

    @Column({type: "time", nullable: false})
    tempo_percurso: string;

    @Column({type: "time", nullable: false})
    hora_inicio: string;

    @Column({type: "time", nullable: false})
    hora_fim: string;

    @Column({type: "float", nullable: false})
    pace_min_km: number

    @Column({type: "json", nullable: false})
    coordenadas_rota: string

    @ManyToOne(() => User, (user) => user.id)
    user:User

    @ManyToMany(() => Posts)
    @JoinTable({name: 'posts_atividade'})
    posts!:Posts[]
    
    constructor(titulo:string, distancia:number, tempo:string, inicio:string, fim:string, pace:number, coordenadas:string, user:User){
        this.titulo = titulo
        this.distancia_km = distancia
        this.tempo_percurso = tempo
        this.hora_inicio = inicio
        this.hora_fim = fim
        this.pace_min_km = pace
        this.coordenadas_rota = coordenadas
        this.user = user
    }
}