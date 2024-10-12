/**
 * On page load,
 * request the server for the user's profile data
 * if the user is not logged in, redirect to the login page
 * if the user is logged in, display the user's profile data
 */
import type {PageLoad} from "../../../.svelte-kit/types/src/routes/login/$types";
import {getUserById, getUserInfoWithToken} from "$lib/controllers/userController";


export const load: PageLoad = () =>
{
    // fetch the user's profile data with the token in the request
    // if the user is not logged in, redirect to the login page
    let data = getUserInfoWithToken();

}