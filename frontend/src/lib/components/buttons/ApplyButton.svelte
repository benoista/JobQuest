<script lang="ts">
    import {Button, buttonVariants} from "$lib/shadcncomponents/ui/button";
    import * as Dialog from "$lib/shadcncomponents/ui/dialog";
    import ApplyForm from "$lib/components/forms/ApplyForm.svelte";
    import {getContext} from "svelte";
    import {type Writable, writable} from "svelte/store";
    import {getUserInfoWithToken} from "$lib/controllers/userController";
    import {goto} from "$app/navigation";
    import type {User} from "$lib/models/user";

    export let id: number;

    let userInfos:Writable<User> = writable<User>(
          {
            id: 0,
            name: "",
            firstname: "",
            email: "",
            password: "",
            is_admin: false,
            is_user:false,
        }
    );

    // On click : get the user information given the token stored as a cookie
    async function handleClick(){
        let res = await getUserInfoWithToken();
        if (res != undefined){
            $userInfos = res;
        }
        else{
            //alert("You need to be logged in to apply to a job");
            //await goto("/login");
            $userInfos = {
                id: 0,
                name: "",
                firstname: "",
                email: "",
                password: "",
                is_admin: false,
                is_user:false,
            }
        }
    }

</script>


<Dialog.Root>
    <Dialog.Trigger class={buttonVariants({ variant: "apply" })} on:click={handleClick}> Apply </Dialog.Trigger>

    <Dialog.Content class="w-full sm:w-full md:w-full lg:w-full max-w-[80%]">
        <ApplyForm advertId="{id}" userInfo="{ {name: $userInfos.name , firstName: $userInfos.firstname, email: $userInfos.email} }" ></ApplyForm>
    </Dialog.Content>
</Dialog.Root>