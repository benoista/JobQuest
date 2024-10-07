<script lang="ts">

import LoginButton from "./buttons/LoginButton.svelte";
import DarkModeButton from "./buttons/DarkModeButton.svelte";

export let header = {
    title: "Title",
    logo: "Logo",
}
</script>


<header class="mb-4">
    <div class="container text-center">
        <div class="row">
            <div class="col align-content-center">
                {header.logo}
            </div>

            <div class="col-6 align-content-center">
                <h1 class="text-center">{header.title}</h1>
            </div>
            <nav class="col align-content-center">
                    <DarkModeButton></DarkModeButton>
                    <LoginButton />
            </nav>


        </div>
    </div>
</header>