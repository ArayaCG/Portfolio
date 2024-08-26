import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "contactMessages",
})
export class contactMessage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
    })
    email: string;

    @Column()
    message: string;

    @Column()
    created_at: Date

}
