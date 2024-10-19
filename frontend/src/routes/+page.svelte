<script lang="ts">
    import type {Advertisement} from "$lib/models/advertisement";
    import type {ContractType} from "$lib/models/contractType.ts";
    import {mockAdverts} from "$lib/mock-data/mock-adverts";
    import AdvertCard from "$lib/components/cards/AdvertCard.svelte";
    import SearchJobsForm from "$lib/components/forms/SearchJobsForm.svelte";
    import Header from "$lib/components/Header.svelte";
    import {writable} from "svelte/store";
    import {getContext, onMount, setContext} from "svelte";
    import {isAdmin} from "$lib/controllers/authentication";
    import {getCompanyByRecruter} from "$lib/controllers/recrutersController";
    import {buttonVariants} from "$lib/shadcncomponents/ui/button";
    import ApplyButton from "$lib/components/buttons/ApplyButton.svelte";
    import AddAdsButton from "$lib/components/buttons/AddAdsButton.svelte";



    const adverts: Advertisement[] = getContext('adverts');

    let isRecruter = writable([]);

    async function checkIsRecruter() {
        $isRecruter = await getCompanyByRecruter();
    }

    onMount(() => {
        checkIsRecruter();
    });

</script>

<Header></Header>


<SearchJobsForm></SearchJobsForm>

<div class="flex flex-col bg-[#315659]/10">
    <div id="search-engine-container"></div>
    {#if $isRecruter}
        <AddAdsButton company={$isRecruter.name}></AddAdsButton>
    {/if}
    <div id="adverts-grid-container">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-2 p-2">
            {#each $adverts as advert}
                <AdvertCard smallAdvert="{advert}"/>
            {/each}
        </div>
    </div>
</div>