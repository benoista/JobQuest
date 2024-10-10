<script lang="ts">
    import "../app.css";
    import {Appstate} from "$lib/models/appstate";
    import {writable} from "svelte/store";
    import {setContext} from "svelte";
    import {browser} from "$app/environment";
    import type {FullAdvert} from "$lib/models/full-advert";

    let state = writable(new Appstate);
    setContext('state', state);
    let adverts : FullAdvert[] = writable([]);

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