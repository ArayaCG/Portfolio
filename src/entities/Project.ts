import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "projects",
})
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 36,
    })
    name: string;

    @Column()
    description: string;

    @Column()
    url: string;

    @Column()
    image_url: string;
}
