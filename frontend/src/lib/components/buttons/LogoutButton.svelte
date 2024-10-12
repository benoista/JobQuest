<script lang="ts">
import {Button} from "$lib/shadcncomponents/ui/button/index";
import {getContext} from "svelte";

const state = getContext('state');


function logout() {
    console.log("logging out, deleting token");
    $state.userState = null;
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}


</script>

<Button on:click={logout}>Logout</Button>