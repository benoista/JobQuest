<script lang="ts">
    import {Input} from "$lib/shadcncomponents/ui/input";
    import {ContractType} from "$lib/models/contractType";
    import {Button} from "$lib/shadcncomponents/ui/button";
    import type {Advert} from "$lib/models/advert";
    import {Sectors} from "$lib/models/sectors";

    function handleSubmit(event: SubmitEvent){
        event.preventDefault();
        console.log("submitted search form");

    }
</script>
<div class="mx-3">
    <form action="" class="flex lg:flex-row gap-3 flex-col" on:submit={(e) => handleSubmit(e)}>
        <Input type="text" name="title" id="title" placeholder="Title"> </Input>
        <Input type="number" name="salary" id="salary" placeholder="Salary"> </Input>
        <Input type="text" name="location" id="location" placeholder="Location"> </Input>
        <Input type="text" name="company" id="company" placeholder="Company"> </Input>
        <select name="contract" id="contract">
            {#each Object.keys(ContractType) as key}
                <option value="{ContractType[key]}">{key}</option>
            {/each}
        </select>

        <select name="sector" id="sector-select">
            {#each Object.keys(Sectors) as key}
                <option value="{Sectors[key]}">{key}</option>
            {/each}
        </select>
        <Button type="submit"> Submit </Button>
    </form>
</div>
