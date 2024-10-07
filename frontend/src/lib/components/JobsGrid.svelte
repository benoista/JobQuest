<script lang="ts">
    import type {JobAdvert} from "../models/job-adverts";
    import JobAdvertCard from "./JobAdvertCard.svelte";

    export let adverts: JobAdvert[] = [];
</script>


<div id="jobs-grid">
    {#each adverts as advert}
        <div>
            <JobAdvertCard {advert}/>
        </div>
    {/each}
</div>


<style>
    #jobs-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1rem;
        align-content: center;
        justify-items: center;
        padding: 2rem;
    }
</style>