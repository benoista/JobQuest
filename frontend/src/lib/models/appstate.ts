import type {User} from "$lib/models/user";

export class Appstate {
    userState: User;
    windowWidth: number;
    windowHeight: number;
}