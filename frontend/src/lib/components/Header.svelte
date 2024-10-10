<script lang="ts">
    import DarkMode from "$lib/components/buttons/DarkMode.svelte";
    import {browser} from "$app/environment";
    import * as DropdownMenu from "$lib/shadcncomponents/ui/dropdown-menu";
    import {getContext} from "svelte";
    import {Button} from "$lib/shadcncomponents/ui/button/index.js";
    import type {User} from "$lib/models/user";


     const  aa :  User = {
        id: 1,
        name: "Admingee",
        firstName: "Admingee",
        email: "    ",
        isAdmin: true,
        isUser: false,
     }

    let width = 0;
    if (browser) {
        width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

        window.addEventListener('resize',() => {
            width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        });
    }

    const state = getContext('state');
    $: console.log("State change : " + JSON.stringify($state));

</script>

<header class="p-3 gap-2 " style="display: grid; grid-template-columns: 3fr 6fr 3fr; justify-items: center; align-items: center">
    <div>
        <div> logo </div>
        <div> JobBoard</div>
    </div>
    <div class="text-3xl">
        <a href="admin">admin</a>
        <a href="login">login</a>
        <a href="testing">testing</a>
    </div>
    {#if width > 768}
        {#if $state.userState == null}
            <div class="flex gap-3">
                <Button> <a href="/login">Sign in</a> </Button>
                <Button> <a href="/signup">Sign up</a> </Button>
                <DarkMode></DarkMode>
                <Button on:click={() => $state.userState = {aa}}>Admingee</Button>
            </div>
        {:else}
            <div class="flex gap-3">
                <a href="profile">Profile</a>
                <a href="logout">Logout</a>
                <DarkMode></DarkMode>
            </div>
        {/if}

    {:else}
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Group>
                    <DropdownMenu.Item> <Button> <a href="/login">Sign in</a> </Button> </DropdownMenu.Item>
                    <DropdownMenu.Item> <Button> <a href="/signup">Sign up</a> </Button> </DropdownMenu.Item>
                    <DropdownMenu.Item> <DarkMode></DarkMode> </DropdownMenu.Item>
                </DropdownMenu.Group>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    {/if}
</header>