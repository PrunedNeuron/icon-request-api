class IconRequestResponse {
	public id: number;
	public name: string;
	public component: string;
	public url: string;
	public status: string;

	constructor(
		id: number,
		name: string,
		component: string,
		url: string,
		status: string
	) {
		this.id = id;
		this.name = name;
		this.component = component;
		this.url = url;
		this.status = status;
	}
}

export default IconRequestResponse;
