<script lang="ts">
    import {Input} from "$lib/shadcncomponents/ui/input/index";
    import {Button} from "$lib/shadcncomponents/ui/button/index";
    import {Textarea} from "$lib/shadcncomponents/ui/textarea/index";
    import {apply} from "$lib/controllers/applicationController";
    import {getSectors} from "$lib/controllers/sectorController";
    import {writable, type Writable} from "svelte/store";
    import type {Sector} from "$lib/models/sector";
    import type {Advertisement} from "$lib/models/advertisement";
    import {addAdvertisement, getAllAdvertisements} from "$lib/controllers/advertisementsController";

    export let company: string;

    let sectors: Writable<Sector[]> = writable([]);
    getSectors().then((data) => {
        $sectors = data ?? [];
    });

    function handleCreateAdvertisement(event: SubmitEvent){
        let formData = new FormData(event.target);
        let ad: Advertisement = {
            id: 0,
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            localization: formData.get("localization") as string,
            salary: formData.get("salary") as number,
            contract_type: formData.get("contract") as string,
            date: formData.get("date") as Date,
            company: company,
            short_description: formData.get("short") as string,
            sector: formData.get("sector") as string,
            working_time: formData.get("working_time") as number,
        }
        console.log("Advert created: ", JSON.stringify(ad));
        addAdvertisement(ad);
    }

</script>
<p class="text-xl ">Add new Advertisements : </p>
<form action="" class="flex flex-col gap-3 m-3 p-3" on:submit={handleCreateAdvertisement}>
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem ">
        <Input type="text" placeholder="Title" name="title"></Input>
        <Input type="text" placeholder="short_description" name="short"></Input>
        <Input type="text" placeholder="description" name="description"></Input>
        <Input type="number" placeholder="salary" name="salary"></Input>
        <Input type="date" placeholder="date" name="date"></Input>
        <Input type="number" placeholder="working_time" name="working_time"></Input>
        <Input type="text" placeholder="localization" name="localization"></Input>
        <select name="sector">
            {#each $sectors as sector }
                <option value="{sector.name}">{sector.name}</option>
            {/each}
        </select>
        <select name="contract">
            {#each ["fixed-term contract", "permanent contract", "internship", "freelance", "other"] as contract }
                <option value="{contract}">{contract}</option>
            {/each}
        </select>
    </div>
    <Button type="submit" variant="apply">Create Advertisement</Button>
</form>