<script lang="ts">
    import "../app.css";
    import {Appstate} from "$lib/models/appstate";
    import {writable} from "svelte/store";
    import {setContext} from "svelte";
    import {browser} from "$app/environment";
    import type {FullAdvert} from "$lib/models/full-advert";
    import type {Advertisements} from "$lib/models/advertisements";

    let state = writable(new Appstate(null,0));
    setContext('state', state);
    let adverts : Advertisements[] = writable([]);

    setContext('adverts', adverts);
    /**
     * Updates the window width on resize
     */
    if(browser){
         onresize = (()=>{
            $state.windowWidth = window.innerWidth;
            console.log("window width: ", $state.windowWidth)
        })
    }
</script>

<slot/>