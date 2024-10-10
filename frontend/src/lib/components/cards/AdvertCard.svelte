<script lang="ts">
    import type {Advertisements} from "$lib/models/advertisements";
    import Backpack from "$lib/components/icons/Backpack.svelte";
    import Salary from "$lib/components/icons/Salary.svelte";
    import Location from "$lib/components/icons/Location.svelte";
    import LearnMoreButton from "$lib/components/buttons/LearnMoreButton.svelte";
    import ApplyButton from "$lib/components/buttons/ApplyButton.svelte";
    import {ContractType} from "$lib/models/contractType";
    import * as Card from "$lib/shadcncomponents/ui/card";

    export let smallAdvert : Advertisements = {
        title: "Software Developer",
        smallDescription: " We are looking for a software developer to join our team",
        localization: "Lagos",
        salary: 15000,
        contractType: ContractType.internship,
        company: "Gogoule",
    };
</script>

<Card.Root>
    <Card.Header>
        <Card.Title tag="h2" class="text-2xl">{smallAdvert.title}</Card.Title>
        <Card.Description>
            <div class="flex flex-col gap-2">
                <div class="text-xl">{smallAdvert.company}</div>
                <div class="flex flex-row gap-2">
                    <div class="flex flex-row"><Backpack></Backpack> {smallAdvert.contractType} </div>
                    <div class="flex flex-row"><Salary></Salary> {smallAdvert.salary} </div>
                    <div class="flex flex-row"><Location></Location> {smallAdvert.localization} </div>
                </div>
            </div>
        </Card.Description>
    </Card.Header>
    <Card.Content>
        <p>{smallAdvert.smallDescription}</p>
    </Card.Content>
    <Card.Footer>
        <div class="flex flex-row gap-3">
            <LearnMoreButton></LearnMoreButton>
            <ApplyButton></ApplyButton>
        </div>
    </Card.Footer>
</Card.Root>