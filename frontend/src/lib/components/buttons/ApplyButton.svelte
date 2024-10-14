<script lang="ts">
    import {Button, buttonVariants} from "$lib/shadcncomponents/ui/button";
    import * as Dialog from "$lib/shadcncomponents/ui/dialog";
    import ApplyForm from "$lib/components/forms/ApplyForm.svelte";
    import {getContext} from "svelte";

    const state = getContext('state');
    let userInfos = {name: "", firstName: "", email: ""};
    $: if ($state.userState != null) {
        userInfos = {
            name: $state.userState.name ?? "",
            firstName: $state.userState.firstName ?? "",
            email: $state.userState.email ?? ""
        }
    }
    else {
        userInfos = {name: "", firstName: "", email: ""};
    }

</script>


<Dialog.Root>
    <Dialog.Trigger class={buttonVariants({ variant: "apply" })}> Apply </Dialog.Trigger>

    <Dialog.Content class="w-full">
        <ApplyForm userInfo="{userInfos}" ></ApplyForm>
    </Dialog.Content>
</Dialog.Root>