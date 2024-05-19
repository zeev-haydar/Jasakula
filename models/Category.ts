export default class Category {
    title: string;
    description: string;
    image: any;
    constructor(title: string, description: string, image:any) {
        this.title = title;
        this.description = description;
        this.image = image;
      }
}