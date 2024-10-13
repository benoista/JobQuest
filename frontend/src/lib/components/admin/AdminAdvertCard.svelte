<script lang="ts">
    import type {Advertisement} from "$lib/models/advertisement";
    import Backpack from "$lib/components/icons/Backpack.svelte";
    import Salary from "$lib/components/icons/Salary.svelte";
    import Location from "$lib/components/icons/Location.svelte";
    import EditButton from "$lib/components/buttons/EditButton.svelte";
    import {Button} from "$lib/shadcncomponents/ui/button";
    import {ContractType} from "$lib/models/contractType";
    import * as Card from "$lib/shadcncomponents/ui/card";
    export let smallAdvert : Advertisement;

    /**
     * TODO this function deletes the current advert by sending a delete request to the server
     */
    function handleDelete() {
        console.log("Delete");
    }

    /**
     * TODO this functions opens a modal with the create Advert component with the current advert passed as a prop
     */
    function handleEdit() {
        console.log("Edit");
    }


</script>

<Card.Root>
    <Card.Header>
        <Card.Title tag="h2" class="text-2xl">{smallAdvert.title}</Card.Title>
        <Card.Description>
            <div class="flex flex-col gap-2">
                <div class="text-xl">{smallAdvert.company}</div>
                <div class="flex flex-row gap-2">
                    <div class="flex flex-row"><Backpack></Backpack> {smallAdvert.contract_type} </div>
                    <div class="flex flex-row"><Salary></Salary> {smallAdvert.salary} </div>
                    <div class="flex flex-row"><Location></Location> {smallAdvert.localization} </div>
                </div>
            </div>
        </Card.Description>
    </Card.Header>
    <Card.Content>
        <p>{smallAdvert.short_description}</p>
    </Card.Content>
    <Card.Footer>
        <div class="flex flex-row gap-3">
            <EditButton advert="{smallAdvert}"></EditButton>
            <Button variant="destructive"> Delete</Button>
        </div>
    </Card.Footer>
</Card.Root>