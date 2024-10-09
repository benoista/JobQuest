<script lang="ts">
    import {
        Button,
        buttonVariants
    } from "$lib/shadcncomponents/ui/button/index.js";
    import * as Dialog from "$lib/shadcncomponents/ui/dialog";
    import { Input } from "$lib/shadcncomponents/ui/input/index.js";
    import { Label } from "$lib/shadcncomponents/ui/label/index.js";
    import type {User} from "$lib/models/user";

    /**
     * TODO - Fetch the full data and displays it in the Dialog
     */
    function handleClick() {
        console.log("clicked");
    }

</script>

<Dialog.Root>
    <Dialog.Trigger class={buttonVariants({ variant: "outline" })}> Learn More </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
            <Dialog.Title></Dialog.Title>
            <Dialog.Description>
            </Dialog.Description>
        </Dialog.Header>

        fullCARD

        <Dialog.Footer>
            <Button type="submit"> Apply </Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>