<script lang="ts">
    import "../app.css";
    import {Appstate} from "$lib/models/appstate";
    import {writable} from "svelte/store";
    import {setContext} from "svelte";
    import {browser} from "$app/environment";

    let state = writable(new Appstate);
    setContext('state', state);

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