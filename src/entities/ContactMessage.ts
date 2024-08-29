import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "contactMessages",
})
export class ContactMessage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
    })
    name: string;
    @Column({
        length: 100,
    })
    email: string;

    @Column()
    message: string;

    @CreateDateColumn()
    created_at: Date

}
