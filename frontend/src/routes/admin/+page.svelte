<script lang="ts">
    import * as Tabs from "$lib/shadcncomponents/ui/tabs";
    import AdminAdvertCard from "$lib/components/admin/AdminAdvertCard.svelte";
    import * as Table from "$lib/shadcncomponents/ui/table";
    import type { User } from "$lib/models/user";
    import type {Company} from "$lib/models/company";
    import type {Application} from "$lib/models/applications";
    import type {Sector} from "$lib/models/sector";
    import type {Advertisement} from "$lib/models/advertisement";
    import {writable} from "svelte/store";
    import {getAllAdvertisements} from "$lib/controllers/advertisementsController";
    import type {FullAdvert} from "$lib/models/full-advert";
    import {getAllUsers} from "$lib/controllers/userController";
    import {getAllCompanies} from "$lib/controllers/companiesController";
    import {getAllSectors} from "$lib/controllers/sectorController";

    export let users : User[] = [];
    export let companies: Company[] = [];
    export let applications: Application[] = [];
    export let sectors: Sector[] = [];
    export let advertisements: FullAdvert[] = [];

    let selectedTab = writable("advertisements");
    $: switch ($selectedTab) {
        case "advertisements":
            console.log($selectedTab);
            getAllAdvertisements().then((data) => {
                advertisements = data ?? [];
            });
            break;
        case "users":
            getAllUsers().then((data) => {
                users = data ?? [];
            });
            break;
        case "companies":
            getAllCompanies().then((data) => {
                companies = data ?? [];
            });
            break;
        case "applications":
            /*
            getAllApplications().then((data) => {
                applications = data ?? [];
            });*/
            break;
        case "sectors":
            getAllSectors().then((data) => {
                sectors = data ?? [];
            });
            break;
    }
</script>


<header>
    <h1>ADMIN PAGE</h1>
    <a href="/"> Home page </a>
    <div>

    </div>
</header>


<div class="flex items-center justify-center">
    <Tabs.Root bind:value={$selectedTab} class="">

        <Tabs.List>
            <Tabs.Trigger value="advertisements">Advertisements</Tabs.Trigger>
            <Tabs.Trigger value="users">Users</Tabs.Trigger>
            <Tabs.Trigger value="companies">Companies</Tabs.Trigger>
            <Tabs.Trigger value="applications">Applications</Tabs.Trigger>
            <Tabs.Trigger value="sectors">Sectors</Tabs.Trigger>
        </Tabs.List>

        <!-- ADVERTISEMENTS PAGE Display advertisements and the possibility to create/update/delete any advertisement -->
        <Tabs.Content value="advertisements">
            {#each advertisements as advert}
                <AdminAdvertCard smallAdvert="{advert}"  />
            {/each}
        </Tabs.Content>

        <!-- USERS PAGE Display users and the possibility to create/update/delete any user -->
        <Tabs.Content value="users">
            <Table.Root>
                <Table.Caption>Users list</Table.Caption>
                <Table.Header>
                    <Table.Row class="text-center">
                        <Table.Head class="text-center">ID</Table.Head>
                        <Table.Head class="text-center">Name</Table.Head>
                        <Table.Head class="text-center">Firstname</Table.Head>
                        <Table.Head class="text-center">Email</Table.Head>
                        <Table.Head class="text-center">isAdmin</Table.Head>
                        <Table.Head class="text-center">isUser</Table.Head>

                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {#each users as user}
                    <Table.Row>
                        <Table.Cell class="text-center">{user.id}</Table.Cell>
                        <Table.Cell class="text-center">{user.name}</Table.Cell>
                        <Table.Cell class="text-center">{user.firstName}</Table.Cell>
                        <Table.Cell class="text-center">{user.email}</Table.Cell>
                        <Table.Cell class="text-center">{user.isAdmin}</Table.Cell>
                        <Table.Cell class="text-center">{user.isUser}</Table.Cell>
                    </Table.Row>
                    {/each}
                </Table.Body>
            </Table.Root>
        </Tabs.Content>

        <!-- COMPANIES PAGE Display companies and the possibility to create/update/delete any company -->
        <Tabs.Content value="companies">
            <Table.Root>
                <Table.Caption>Companies list</Table.Caption>
                <Table.Header>
                    <Table.Row>
                        <Table.Head class="text-center">ID</Table.Head>
                        <Table.Head class="text-center">Name</Table.Head>
                        <Table.Head class="text-center">Website</Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {#each companies as company}
                        <Table.Row>
                            <Table.Cell class="text-center">{company.id}</Table.Cell>
                            <Table.Cell class="text-center">{company.name}</Table.Cell>
                            <Table.Cell class="text-center">{company.website}</Table.Cell>
                        </Table.Row>
                    {/each}
                </Table.Body>
            </Table.Root>
        </Tabs.Content>

        <!-- APPLICATIONS PAGE Display applications and the possibility to create/update/delete any application -->
        <Tabs.Content value="applications">
            <Table.Root>
                <Table.Caption>Applications list</Table.Caption>
                <Table.Header>
                    <Table.Row class="text-center">
                        <Table.Head class="text-center">Id Company</Table.Head>
                        <Table.Head class="text-center">Id User</Table.Head>
                        <Table.Head class="text-center">Message sent</Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {#each applications as application}
                        <Table.Row>
                            <Table.Cell class="text-center">{application.idAdvert}</Table.Cell>
                            <Table.Cell class="text-center">{application.idUser}</Table.Cell>
                            <Table.Cell class="text-center">{application.message}</Table.Cell>
                        </Table.Row>
                    {/each}
                </Table.Body>
            </Table.Root>
        </Tabs.Content>

        <!-- SECTORS PAGE Display sectors and the possibility to create/update/delete any sector -->
        <Tabs.Content value="sectors">
            <Table.Root>
                <Table.Caption>Sectors list</Table.Caption>
                <Table.Header>
                    <Table.Row class="text-center">
                        <Table.Head class="text-center">Id</Table.Head>
                        <Table.Head class="text-center">Name</Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {#each sectors as sector}
                        <Table.Row>
                            <Table.Cell class="text-center">{sector.id}</Table.Cell>
                            <Table.Cell class="text-center">{sector.name}</Table.Cell>
                        </Table.Row>
                    {/each}
                </Table.Body>
            </Table.Root>
        </Tabs.Content>

    </Tabs.Root>
</div>



