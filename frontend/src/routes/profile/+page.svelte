<script lang="ts">
    import UserAccount from "$lib/components/UserAccount.svelte";
    import {getContext, onMount} from "svelte";
    import {getUserInfoWithToken} from "$lib/controllers/userController";
    import type {User} from "$lib/models/user";
    import {goto} from "$app/navigation";
    import {browser} from "$app/environment";
    import {writable} from "svelte/store";
    import {redirect} from "@sveltejs/kit";


    const state = getContext('state');

    /**
     * On page load,
     * request the server for the user's profile data
     * if the user is not logged in, redirect to the login page
     * if the user is logged in, display the user's profile data
     */

    onMount(async () => {
        if (browser) {

            let data = await getUserInfoWithToken();
            if ( data == null || data == undefined) {
                await goto("/login");
            }
            console.log(data);
            $state.userState = data;
            console.log("state :" + JSON.stringify($state.userState));
        }
    });
</script>


<a href="/" class="text-3xl">Home</a>
<div class="flex flex-col justify-center items-center">
    {#if $state.userState != null}
        <h1 class="text-3xl">Welcome, {$state.userState.firstname} {$state.userState.name}</h1>
        <UserAccount userInfo="{$state.userState}"></UserAccount>
    {/if}
</div>


