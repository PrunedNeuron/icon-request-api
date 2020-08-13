import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "icon_requests" })
export class IconRequest {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	component: string;

	@Column()
	url: string;

	@Column({ default: 1 })
	requesters: number;

	@Column({ default: "pending" })
	status: string;
}
