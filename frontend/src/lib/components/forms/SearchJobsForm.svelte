<script lang="ts">
    import {Input} from "$lib/shadcncomponents/ui/input";
    import {ContractType} from "$lib/models/contractType";
    import {Button} from "$lib/shadcncomponents/ui/button";
    import {Sectors} from "$lib/models/sectors";
    import {getAdvertisements, getAllAdvertisements} from "$lib/controllers/advertisementsController";
    import {getContext} from "svelte";
    import {getSectors} from "$lib/controllers/sectorController";
    import type {Sector} from "$lib/models/sector";

    const advertsStore = getContext('adverts');
    let sectorsArray: Sector[] = [];
    getSectors().then((s) => sectorsArray = s);
    function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        getAdvertisements(event).then((adverts) => {
            $advertsStore = adverts;
        });
    }
</script>
<div class="mx-3">
    <form id="searchForm" action="" class="flex lg:flex-row gap-3 flex-col m-4 p-3" on:submit={(e) => handleSubmit(e)}>
        <Input type="text" name="title" id="title" placeholder="Title" class="bg-[#315659]/10 rounded"> </Input>
        <Input type="number" name="salary" id="salary" placeholder="Salary" class="bg-[#315659]/10 rounded"> </Input>
        <Input type="text" name="location" id="location" placeholder="Location" class="bg-[#315659]/10 rounded"> </Input>
        <Input type="text" name="company" id="company" placeholder="Company" class="bg-[#315659]/10 rounded"> </Input>
        <select name="contract_type" id="contract_type" class="border p-2 bg-[#315659]/10 rounded">
            <option value="">Select Contract Type</option>
            <option value="fixedTerm">fixed-term contract</option>
            <option value="permanent">permanent contract</option>
            <option value="internship">internship</option>
            <option value="freelance">freelance</option>
            <option value="other">other</option>
        </select>

        <select name="sector" id="sector-select" class="border p-2 bg-[#315659]/10 rounded">
            <option value="">Select sector</option>
            {#each sectorsArray as sector}
                <option value="{sector['id']}">{sector["name"]}</option>
            {/each}
        </select>
        <button type="submit" class="bg-[#90BC81] text-black p-2 rounded"> Submit </button>
    </form>
</div>
