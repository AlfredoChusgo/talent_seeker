import { ResourceItem } from "../data/models";

export class ResourceHelper {

    static EmptyModel(): ResourceItem {
        return {
            id: "",
            name: "",
            lastName: "",
            biography: "",
            birthDate: "",
            locality: "",
            occupation: "",
            role: {
                id: "",
                name: ""
            },
            skills: []
        };
    }
}