<script lang="ts">
    import * as Tabs from "$lib/shadcncomponents/ui/tabs/index";
    import * as Card from "$lib/shadcncomponents/ui/card/index";
    import { Button } from "$lib/shadcncomponents/ui/button/index";
    import { Input } from "$lib/shadcncomponents/ui/input/index";
    import { Label } from "$lib/shadcncomponents/ui/label/index";
    import {updateUser} from "$lib/controllers/userController";
    import type {User} from "$lib/models/user";
    import {goto} from "$app/navigation";
    import {browser} from "$app/environment";
    import {redirect} from "@sveltejs/kit";



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
        console.log("Account modified");
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
    function handleModifyPassword(event: SubmitEvent) {
        event.preventDefault();
        console.log("Password modified");
    }

</script>

<Tabs.Root value="account" class="w-[400px]">
    <Tabs.List class="grid w-full grid-cols-2">
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="password">Password</Tabs.Trigger>
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
                        <Input id="name" value="{userInfo.name}" />
                    </div>
                    <div class="space-y-1">
                        <Label for="firstName">First Name</Label>
                        <Input id="firstName" value="{userInfo.firstname}" />
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
                        <Input id="current" type="password" />
                    </div>
                    <div class="space-y-1">
                        <Label for="new">New password</Label>
                        <Input id="new" type="password" />
                    </div>
                </Card.Content>
                <Card.Footer>
                    <Button>Save password</Button>
                </Card.Footer>
            </form>
        </Card.Root>
    </Tabs.Content>
</Tabs.Root>