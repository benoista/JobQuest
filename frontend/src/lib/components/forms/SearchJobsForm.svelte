<script lang="ts">
    import {Input} from "$lib/shadcncomponents/ui/input";
    import {ContractType} from "$lib/models/contractType";
    import {Button} from "$lib/shadcncomponents/ui/button";
    import {Sectors} from "$lib/models/sectors";
    import {getAdvertisements, getAllAdvertisements} from "$lib/controllers/advertisementsController";
    import {getContext} from "svelte";
    import {getSectors} from "$lib/controllers/sectorController";

    const advertsStore = getContext('adverts');
    let sectorsArray = [];
    getSectors().then((s) => sectorsArray = s);
    function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        getAdvertisements(event).then((adverts) => {
            $advertsStore = adverts
            console.log(adverts);
        });
    }
</script>
<div class="mx-3">
    <form action="" class="flex lg:flex-row gap-3 flex-col" on:submit={(e) => handleSubmit(e)}>
        <Input type="text" name="title" id="title" placeholder="Title"> </Input>
        <Input type="number" name="salary" id="salary" placeholder="Salary"> </Input>
        <Input type="text" name="location" id="location" placeholder="Location"> </Input>
        <Input type="text" name="company" id="company" placeholder="Company"> </Input>
        <select name="contract_type" id="contract_type">
            <option value="">Select Contract Type</option>
            <option value="fixedTerm">fixed-term contract</option>
            <option value="permanent">permanent contract</option>
            <option value="internship">internship</option>
            <option value="freelance">freelance</option>
            <option value="other">other</option>

        </select>

        <select name="sector" id="sector-select">
            <option value="">Select sector</option>
            {#each sectorsArray as sector}
                <option value="{sector['id']}">{sector["name"]}</option>
            {/each}
        </select>
        <Button type="submit"> Submit </Button>
    </form>
</div>
