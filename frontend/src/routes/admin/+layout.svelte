<script lang="ts">
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import {isAdmin} from "$lib/controllers/authentication.js";


/**
* On load get the authorization from server 200 or 401
* 401 redirects to /login and alerts the user
*/

onMount(async () => {
        if ( !await isAdmin() ) {
            await goto("/croissant");
        }
});

</script>

<slot></slot>