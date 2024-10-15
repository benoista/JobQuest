<script lang="ts">
    import * as Tabs from "$lib/shadcncomponents/ui/tabs/index";
    import * as Card from "$lib/shadcncomponents/ui/card/index";
    import { Button } from "$lib/shadcncomponents/ui/button/index";
    import { Input } from "$lib/shadcncomponents/ui/input/index";
    import { Label } from "$lib/shadcncomponents/ui/label/index";
    import {Updatepwd, updateUser} from "$lib/controllers/userController";
    import type {User} from "$lib/models/user";
    import {goto} from "$app/navigation";
    import {browser} from "$app/environment";
    import {redirect} from "@sveltejs/kit";
    import {myapplication} from "$lib/controllers/applicationController";
    import type {Advertisement} from "$lib/models/advertisement";
    import {getContext} from "svelte";
    import type {Application} from "$lib/models/applications";
    import { onMount } from 'svelte';
    import { removeMyApp } from '$lib/controllers/applicationController';
    import {getAdvertisementsbyID} from "$lib/controllers/advertisementsController"



    export let userInfo: User = {
        id: 0,
        name: "",
        firstname: "",
        email: "",
        is_admin: false,
        is_user: false,
        password: ""
    };

    // TODO implement this function
    async function handleModifyAccount(event: SubmitEvent) {
        event.preventDefault();
        const formData = new FormData(event.target);
        let name = formData.get("name") as string;
        let firstname = formData.get("firstName") as string;

        //  try to update user in the database
        if (await updateUser(userInfo.id, firstname, name , userInfo.email) == true){
            console.log("User updated");
        } else {
            console.log("User not updated");
        }
    }

    // TODO implement this function
    async function handleModifyPassword(event: SubmitEvent) {
        event.preventDefault();
        const formData = new FormData(event.target);
        let current = formData.get("current") as string;
        let newPassword = formData.get("new") as string;
        //  try to update user in the database
        try {
            await Updatepwd(userInfo.id, current, newPassword , userInfo.email);
        }catch(error){
            console.log(error);
        }
        }

        let apps: Application[] = [];

        onMount(async () => {
            try {
                apps = await myapplication();
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        });

        function handleRemove(id: number) {
            removeMyApp(id);
        }

</script>

<Tabs.Root value="account">
    <Tabs.List class="grid w-full grid-cols-3">
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="password">Password</Tabs.Trigger>
        <Tabs.Trigger value="applications">Applications</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="account">
        <Card.Root>
            <Card.Header>
                <Card.Title>Account</Card.Title>
                <Card.Description>
                    Make changes to your account here. Click save when you're done.
                </Card.Description>
            </Card.Header>
            <form action="" on:submit={handleModifyAccount}>
                <Card.Content class="space-y-2">
                    <div class="space-y-1">
                        <Label for="name">Name</Label>
                        <Input name="name" value="{userInfo.name}" />
                    </div>
                    <div class="space-y-1">
                        <Label for="firstName">First Name</Label>
                        <Input name="firstName" value="{userInfo.firstname}" />
                    </div>
                </Card.Content>
                <Card.Footer>
                    <Button type="submit">Save changes</Button>
                </Card.Footer>
            </form>
        </Card.Root>
    </Tabs.Content>
    <Tabs.Content value="password">
        <Card.Root>
            <Card.Header>
                <Card.Title>Password</Card.Title>
                <Card.Description>
                    Change your password here. After saving, you'll be logged out.
                </Card.Description>
            </Card.Header>
            <form action="" on:submit={handleModifyPassword}>
                <Card.Content class="space-y-2">
                    <div class="space-y-1">
                        <Label for="current">Current password</Label>
                        <Input name="current" type="password" />
                    </div>
                    <div class="space-y-1">
                        <Label for="new">New password</Label>
                        <Input name="new" type="password" />
                    </div>
                </Card.Content>
                <Card.Footer>
                    <Button type="submit">Save password</Button>
                </Card.Footer>
            </form>
        </Card.Root>
    </Tabs.Content>
    <Tabs.Content value="applications" class="w-max">
        <Card.Root class="w-full">
            <Card.Header>
                <Card.Title>All your applications</Card.Title>
                <Card.Description>
                    Here you will find all your applications to job offer
                </Card.Description>
            </Card.Header>
            <Card.Content class="flex justify-center w-full">
                <div class="flex flex-col p-2 gap-2 w-full">
                    {#if apps.length > 0}
                        {#each apps as app}
                            <div class="border p-2 flex flex-col w-full">
                                <div class="w-42">
                                    <p class="font-bold text-center underline">{app.ads}</p>
                                    <p class="w-8">{app.message}</p>
                                </div>
                                <div>
                                    <Button variant="destructive" on:click={() => handleRemove(app.id_ads)}>Delete</Button>
                                    <Button variant="apply">Modify</Button>
                                </div>
                            </div>
                        {/each}
                    {:else}
                        <p>No applications found.</p>
                    {/if}
                </div>
            </Card.Content>
        </Card.Root>
    </Tabs.Content>
</Tabs.Root>