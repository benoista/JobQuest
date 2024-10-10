import type {User} from "$lib/models/user";
import type {Advertisement} from "$lib/models/advertisement";

export class Appstate {
    public userState: User | null;
    public windowWidth: number;
    public adverts: Advertisement[] | null;

    constructor() {
        this.userState = null;
        this.windowWidth = 0;
        this.adverts = null;
    }
}