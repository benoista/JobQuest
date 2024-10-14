<script lang="ts">
    import {
        Button,
        buttonVariants
    } from "$lib/shadcncomponents/ui/button/index.js";
    import * as Dialog from "$lib/shadcncomponents/ui/dialog";
    import { Input } from "$lib/shadcncomponents/ui/input/index.js";
    import { Label } from "$lib/shadcncomponents/ui/label/index.js";
    import type {User} from "$lib/models/user";
    import ApplyButton from "$lib/components/buttons/ApplyButton.svelte";
    import {getAdvertisementDescription} from "$lib/controllers/advertisementsController";
    import {writable} from "svelte/store";

    export let id: number;

    let description = writable("");
    async function handleClick() {
        let res = await getAdvertisementDescription(id) ?? "";
        $description = res[0]["description"];
    }

</script>

<Dialog.Root>
    <Dialog.Trigger class={buttonVariants({ variant: "outline" })} on:click={handleClick}> Learn More </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
            <Dialog.Title></Dialog.Title>
            <Dialog.Description>
            </Dialog.Description>
        </Dialog.Header>

        {$description}

        <Dialog.Footer>
            <ApplyButton></ApplyButton>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>