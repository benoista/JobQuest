<script lang="ts">
  import JobAdvertCard from "./lib/components/JobAdvertCard.svelte";
  import Header from "./lib/components/Header.svelte";
  import type {JobAdvert} from "./lib/models/job-adverts";
  import JobsGrid from "./lib/components/JobsGrid.svelte";
  import LoginForm from "./lib/components/forms/LoginForm.svelte";
  import SearchJobs from "./lib/components/SearchJobs.svelte";

  let adverts: JobAdvert[] = [
    {
      title: "Software Engineer",
      smallDescription: "We are looking for a software engineer to join our team.",
      company: "Google",
    },
    {
      title: "Software Engineer",
      company: "Facebook",
      smallDescription: "We are looking for a software engineer to join our team.",
    },
    {
      title: "Software Engineer",
      company: "Facebook",
      smallDescription: "We are looking for a software engineer to join our team.",
    },
    {
      title: "Software Engineer",
      smallDescription: "We are looking for a software engineer to join our team.",
      company: "Google",
    },
    {
      title: "Software Engineer",
      company: "Facebook",
      smallDescription: "We are looking for a software engineer to join our team.",
    },
    {
      title: "Software Engineer",
      company: "Facebook",
      smallDescription: "We are looking for a software engineer to join our team.",
    },
    {
      title: "Software Engineer",
      smallDescription: "We are looking for a software engineer to join our team.",
      company: "Google",
    },
    {
      title: "Software Engineer",
      company: "Facebook",
      smallDescription: "We are looking for a software engineer to join our team.",
    },
    {
      title: "Software Engineer",
      company: "Facebook",
      smallDescription: "We are looking for a software engineer to join our team.",
    },
  ];
</script>


<Header></Header>
<main>
  <SearchJobs></SearchJobs>
  <JobsGrid {adverts}></JobsGrid>
</main>

<style>
</style>
