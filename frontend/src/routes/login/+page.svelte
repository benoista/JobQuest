<script lang="ts">
    import AuthenticationLight from "$lib/images/background.jpg";
    import AuthenticationDark from "$lib/images/background.jpg";
    import {Input} from "$lib/shadcncomponents/ui/input";
    import {load} from "./+page";
    import {onMount} from "svelte";
    import * as Card from "$lib/shadcncomponents/ui/card";
    import { browser } from '$app/environment';
    import  { handleSignIn } from "$lib/controllers/authentication.js";
    import Salary from "$lib/components/icons/Salary.svelte";
    import ApplyButton from "$lib/components/buttons/ApplyButton.svelte";
    import Backpack from "$lib/components/icons/Backpack.svelte";
    import LearnMoreButton from "$lib/components/buttons/LearnMoreButton.svelte";
    import Location from "$lib/components/icons/Location.svelte";
    import {Button} from "$lib/shadcncomponents/ui/button";
    import {handleSignUp} from "$lib/controllers/authentication";

    let width = 0;
    if (browser) {
        width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

        setTimeout(() => {
        }, 1000);

        window.addEventListener('resize',() => {
            width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        });
    }



</script>

<div class="md:hidden">
    <enhanced:img src={AuthenticationDark} alt="Authentication" class="hidden dark:block" />
</div>

{#if (width >= 1024)}
    <div
        class="container h-[100vh] justify-center px-0 items-center lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
    >

    <!-- Left side -->
        <div class=" bg-muted w-full relative h-full flex-col lg:flex dark:border-r max-lg:blur-sm">
            <div class="absolute inset-0 bg-cover" style="background-image: url('/images/background.jpg')"></div>
        </div>


            <!-- Right side -->
            <div class="lg:p-8">
                <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div class="flex flex-col space-y-2 text-center">
                        <h1 class="text-2xl font-semibold tracking-tight">Sign In</h1>
                    </div>
                    <form on:submit={(e) => handleSignIn(e)} class="text-black flex flex-col gap-4">
                        <Input type="email" name="email" placeholder="Email" required />
                        <Input type="password" name="password" placeholder="Password" required />
                        <Button type="submit">Sign In</Button>
                    </form>
                </div>
            </div>
        </div>
{:else}
    <div class="flex items-center justify-center h-[100vh]" style="background-image: url('/images/background.jpg')">
        <div class="flex flex-col" style="backdrop-filter: blur(10px)">
                <Card.Root class="bg-opacity-20 text-white">
                    <Card.Header>
                        <Card.Title tag="h2" class="text-2xl"> Sign In </Card.Title>
                        <Card.Description>

                        </Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <form on:submit={handleSignIn} class="text-black flex flex-col gap-2">
                            <Input type="email" name="email" placeholder="Email" required />
                            <Input type="password" name="password" placeholder="Password" required />
                            <Button type="submit">Sign In</Button>
                        </form>
                    </Card.Content>
                </Card.Root>
        </div>
    </div>
{/if}
