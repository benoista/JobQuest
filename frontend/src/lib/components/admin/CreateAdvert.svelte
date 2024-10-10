<script lang="ts">
    import PublishButton from "$lib/components/buttons/PublishButton.svelte";
    import Salary from "$lib/components/icons/Salary.svelte";
    import Backpack from "$lib/components/icons/Backpack.svelte";
    import Location from "$lib/components/icons/Location.svelte";
    import {Input} from "$lib/shadcncomponents/ui/input";
    import type {Advert} from "$lib/models/advert";
    import {ContractType} from "$lib/models/contractType";
    import * as Card from "$lib/shadcncomponents/ui/card";


    /**
     * Property of the form, set the form fields if an advert is passed else set the default values
     * @type {Advert}
     */
    export let advert: Advert ={
        title: "",
        company: "",
        contractType: ContractType.none,
        salary: 0,
        location: "",
        smallDescription: ""
    };

    /**
     * TODO send a Post request to publish the advert
     * @param event
     */
    function handlePublish(event: FormDataEvent){
        event.preventDefault();
        const formData = event.formData;
        console.log(advert);
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }
    }


</script>

<form action="" on:formdata={(e) => handlePublish(e)}>
    <Card.Root>
        <Card.Header>
            <Card.Title tag="h2" class="text-2xl">
                <Input type="text" name="title" id="title" value="{advert.title}" />
            </Card.Title>
            <Card.Description>

                <div class="flex flex-col gap-2">
                    <div class="text-xl">

                        <Input class="h-7" type="text" name="company" id="company" value="{advert.company}" />
                    </div>

                    <div class="flex flex-row gap-2 flex-wrap">
                        <div class="flex flex-row">
                            <Backpack></Backpack>
                            <select name="contract" id="contract">
                                {#each Object.keys(ContractType) as key}
                                    <option value="{ContractType[key]}">{key}</option>
                                {/each}
                            </select>
                        </div>
                        <div class="flex flex-row">
                            <Salary></Salary>
                            <Input class="h-5" type="number" name="salary" id="salary" value="{advert.salary}" />
                        </div>
                        <div class="flex flex-row">
                            <Location></Location>
                            <Input class="h-5" type="text" name="location" id="location" value="{advert.location}" />
                        </div>
                    </div>
                </div>

            </Card.Description>
        </Card.Header>
        <Card.Content>
                <Input type="text" name="smallDescription" id="smallDescription" placeholder="small description" />
        </Card.Content>
        <Card.Footer>
            <PublishButton></PublishButton>
        </Card.Footer>
    </Card.Root>
</form>