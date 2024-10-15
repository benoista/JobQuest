<script lang="ts">
    import type {Advertisement} from "$lib/models/advertisement";
    import Backpack from "$lib/components/icons/Backpack.svelte";
    import Salary from "$lib/components/icons/Salary.svelte";
    import Location from "$lib/components/icons/Location.svelte";
    import LearnMoreButton from "$lib/components/buttons/LearnMoreButton.svelte";
    import ApplyButton from "$lib/components/buttons/ApplyButton.svelte";
    import {ContractType} from "$lib/models/contractType";
    import * as Card from "$lib/shadcncomponents/ui/card";
    import Calendar from "$lib/components/icons/Calendar.svelte";
    import Clock from "$lib/components/icons/clock.svelte";
    import Sector from "$lib/components/icons/sector.svelte";

    export let smallAdvert : Advertisement;

</script>

<Card.Root class="transition-transform duration-300 hover:scale-105">
    <Card.Header>
        <Card.Title tag="h2" class="text-2xl">
        <p class="text-xl group relative w-max flex justify-center">
            <span class="px-1 relative z-10 group-hover:text-white">{smallAdvert.title}</span>
            <span class="absolute left-0 bottom-0 w-full h-0.5 transition-all bg-[#90BC81]/80 z-0 group-hover:h-full "></span>
        </p>
        </Card.Title>
        <Card.Description>
            <div class="flex flex-col gap-2">
                <div class="text-xl font-bold">{smallAdvert.company}</div>
                <div class="flex flex-row gap-2 flex-wrap">
                    <div class="flex flex-row"><Backpack></Backpack> {smallAdvert.contract_type} </div>
                    <div class="flex flex-row"><Salary></Salary> {smallAdvert.salary} </div>
                    <div class="flex flex-row"><Location></Location> {smallAdvert.localization} </div>
                    <div class="flex flex-row"><Calendar></Calendar> {smallAdvert.date} </div>
                    <div class="flex flex-row"><Sector></Sector> {smallAdvert.sector} </div>
                    <div class="flex flex-row"><Clock></Clock>{smallAdvert.working_time} </div>
                </div>
            </div>
        </Card.Description>
    </Card.Header>
    <Card.Content>
        <p>{smallAdvert.short_description}</p>
    </Card.Content>
    <Card.Footer>
        <div class="flex flex-row gap-3">
            <LearnMoreButton id="{smallAdvert.id}"></LearnMoreButton>
            <ApplyButton id="{smallAdvert.id}"></ApplyButton>
        </div>
    </Card.Footer>
</Card.Root>