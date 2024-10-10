<script>
    import LoginButton from "$lib/components/buttons/LoginButton.svelte";
    import SignUpButton from "$lib/components/buttons/SignUpButton.svelte";
    import DarkMode from "$lib/components/buttons/DarkMode.svelte";
    import {browser} from "$app/environment";
    import * as DropdownMenu from "$lib/shadcncomponents/ui/dropdown-menu";

    let width = 0;
    if (browser) {
        width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

        setTimeout(() => {
            console.log(width);
        }, 1000);

        window.addEventListener('resize',() => {
            width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
            console.log(width);
        });
    }
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
        <div class="flex gap-3">
            <LoginButton></LoginButton>
            <SignUpButton></SignUpButton>
            <DarkMode></DarkMode>
        </div>
    {:else}
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Group>
                    <DropdownMenu.Label>My Account</DropdownMenu.Label>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item> <LoginButton></LoginButton> </DropdownMenu.Item>
                    <DropdownMenu.Item> <SignUpButton></SignUpButton> </DropdownMenu.Item>
                    <DropdownMenu.Item> <DarkMode></DarkMode> </DropdownMenu.Item>
                </DropdownMenu.Group>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    {/if}
</header>