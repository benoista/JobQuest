<script lang="ts">

        import type {Advertisement} from "$lib/models/advertisement";
    import type {ContractType} from "$lib/models/contractType.ts";
    import {mockAdverts} from "$lib/mock-data/mock-adverts";
    import AdvertCard from "$lib/components/cards/AdvertCard.svelte";
    import SearchJobsForm from "$lib/components/forms/SearchJobsForm.svelte";
    import Header from "$lib/components/Header.svelte";
    import {writable} from "svelte/store";
    import {getContext, setContext} from "svelte";

    // export const adverts : Advert[] = mockAdverts;
    const adverts: Advertisement[] = getContext('adverts');
</script>

<Header></Header>


<SearchJobsForm></SearchJobsForm>


<div class="flex flex-col bg-[#315659]/10">
    <div id="search-engine-container"></div>
    <div id="adverts-grid-container">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-2 p-2">
            {#each $adverts as advert}
                <AdvertCard smallAdvert="{advert}"/>
            {/each}
        </div>
    </div>
</div>