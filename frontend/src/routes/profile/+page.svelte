<script lang="ts">
    import UserAccount from "$lib/components/UserAccount.svelte";
    import {getContext} from "svelte";
    import {getUserInfoWithToken} from "$lib/controllers/userController";
    import type {User} from "$lib/models/user";
    import {goto} from "$app/navigation";
    const state = getContext('state');

    /**
     * On page load,
     * request the server for the user's profile data
     * if the user is not logged in, redirect to the login page
     * if the user is logged in, display the user's profile data
     */
    let userInfos: User;
    getUserInfoWithToken().then((userInfo) => {
        if (userInfo == null) {
            goto("/login");
        } else {
            userInfos = userInfo;
        }
    });


</script>


<a href="/" class="text-3xl">Home</a>
<div class="flex flex-col justify-center items-center">
    <UserAccount userInfo="{userInfos}"></UserAccount>
</div>


