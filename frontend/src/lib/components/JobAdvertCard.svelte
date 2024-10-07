<script lang="ts">
import type {JobAdvert} from "../models/job-adverts";
import LearnMoreButton from "./buttons/LearnMoreButton.svelte";
import ApplyButton from "./buttons/ApplyButton.svelte";

export let advert: JobAdvert = {
    title: "Software Engineer",
    smallDescription: "We are looking for a software engineer to join our team.",
    company: "Google",
};
</script>


<div class="card" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title">{advert.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{advert.company}</h6>
        <p class="card-text">{advert.smallDescription}</p>
        <LearnMoreButton></LearnMoreButton>
        <ApplyButton></ApplyButton>
    </div>
</div>