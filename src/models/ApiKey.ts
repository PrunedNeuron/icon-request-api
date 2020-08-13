import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "api_keys" })
export class ApiKey {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "text", name: "api_key" })
	apiKey: string;
}
