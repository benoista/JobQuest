<script>
    import {Button, buttonVariants} from "$lib/shadcncomponents/ui/button";
    import * as Dialog from "$lib/shadcncomponents/ui/dialog";
    import ApplyForm from "$lib/components/forms/ApplyForm.svelte";
</script>


<Dialog.Root>
    <Dialog.Trigger class={buttonVariants({ variant: "outline" })}> Apply </Dialog.Trigger>

    <Dialog.Content class="w-full sm:w-full md:w-full lg:w-full max-w-[80%]">
        <ApplyForm></ApplyForm>
    </Dialog.Content>
</Dialog.Root>