<script lang="ts">

    import type {Advertisements} from "$lib/models/advertisements";
    import type {ContractType} from "$lib/models/contractType.ts";
    import {mockAdverts} from "$lib/mock-data/mock-adverts";
    import AdvertCard from "$lib/components/cards/AdvertCard.svelte";
    import SearchJobsForm from "$lib/components/forms/SearchJobsForm.svelte";
    import Header from "$lib/components/Header.svelte";
    import {writable} from "svelte/store";
    import type {FullAdvert} from "$lib/models/full-advert.js";
    import {getContext, setContext} from "svelte";

    // export const adverts : Advert[] = mockAdverts;
    const adverts: Advertisements[] = getContext('adverts');
</script>

<Header></Header>


<SearchJobsForm></SearchJobsForm>


<div class="flex flex-col">
    <div id="search-engine-container"></div>
    <div id="adverts-grid-container">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 m-2">
            {#each $adverts as advert}
                <AdvertCard smallAdvert="{advert}" />
            {/each}
        </div>
    </div>
</div>