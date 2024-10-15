<script lang="ts">
    import {Button, buttonVariants} from "$lib/shadcncomponents/ui/button/index";
import {getContext} from "svelte";

const state = getContext('state');


function logout() {
    console.log("logging out, deleting token");
    $state.userState = null;
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = '/';
}


</script>

<Button class={buttonVariants({ variant: "destructive" })} on:click={logout}>Logout</Button>