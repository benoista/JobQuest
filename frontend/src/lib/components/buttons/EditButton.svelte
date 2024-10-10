<script lang="ts">
    import {buttonVariants} from "$lib/shadcncomponents/ui/button/index.js";
    import Edit from "$lib/components/icons/Edit.svelte";
    import CreateAdvert from "$lib/components/admin/CreateAdvert.svelte";
    import type {Advertisements} from "$lib/models/advertisements";
    import {ContractType} from "$lib/models/contractType";
    import * as Dialog from "$lib/shadcncomponents/ui/dialog";

    export let advert: Advertisements;
</script>

<Dialog.Root>
    <Dialog.Trigger class={buttonVariants({ variant: "outline" })}
    > <Edit></Edit> Edit </Dialog.Trigger
    >
    <Dialog.Content class="w-full sm:w-full md:w-full lg:w-full max-w-[80%]">
        <CreateAdvert advert="{advert}"></CreateAdvert>
    </Dialog.Content>
</Dialog.Root>

