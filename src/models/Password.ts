import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "passwords" })
export class Password {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "text", name: "username" })
	username: string;

	@Column({ type: "text", name: "password" })
	password: string;
}
