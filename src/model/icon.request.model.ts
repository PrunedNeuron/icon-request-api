class IconRequest {
	public name: string;
	public component: string;
	public url: string;

	constructor(name: string, component: string, url: string) {
		this.name = name;
		this.component = component;
		this.url = url;
	}
}

export default IconRequest;
