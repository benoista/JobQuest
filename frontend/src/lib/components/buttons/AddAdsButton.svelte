<script lang="ts">
    import {Button, buttonVariants} from "$lib/shadcncomponents/ui/button";
    import * as Dialog from "$lib/shadcncomponents/ui/dialog";
    import {getContext} from "svelte";
    import {writable} from "svelte/store";
    import {getUserInfoWithToken} from "$lib/controllers/userController";
    import {goto} from "$app/navigation";
    import type {User} from "$lib/models/user";
    import AddAdsForm from "$lib/components/forms/AddAdsForm.svelte";

    export let company: string;
</script>


<Dialog.Root>
    <Dialog.Trigger class={buttonVariants({ variant: "apply" })}> Add </Dialog.Trigger>

    <Dialog.Content class="w-full sm:w-full md:w-full lg:w-full max-w-[80%]">
        <AddAdsForm company="{company}"></AddAdsForm>
    </Dialog.Content>
</Dialog.Root>