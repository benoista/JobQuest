<script lang="ts">


    import {type Writable, writable} from "svelte/store";
    import {Button} from "$lib/shadcncomponents/ui/button";
    import type {Advertisement} from "$lib/models/advertisement";
    import AdvertCard from "$lib/components/cards/AdvertCard.svelte";

    let page: Writable<number> = writable(1)
    let offset = 0
    let limit = 2;
    let adverts: Writable<Advertisement[]> = writable([]);

    async function handleClick(page: number) {
        try {
            const res = await fetch('http://localhost:3000/advertisements/all?page=' + page + "&limit=" + limit, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!res.ok) {
                switch (res.status) {
                    case 401:
                        console.log('Unauthorized');
                        break;
                    case 404:
                        console.log('Not found');
                        break;
                    default:
                        console.log('An error occurred');
                }
            }
            $adverts = await res.json();
        } catch (error) {
            console.error('Error:', error);
        }
    }

</script>

<div>
    <Button variant="apply" on:click={() => {$page ++; handleClick($page)}}> Next Page </Button>
    {#if $page > 1}
        <Button variant="outline" on:click={() => {$page --; handleClick($page)}}> Previous Page </Button>
    {/if}
    <h1> Page {$page} </h1>
</div>

{#each $adverts as advert}
  <AdvertCard smallAdvert="{advert}"></AdvertCard>
{/each}

