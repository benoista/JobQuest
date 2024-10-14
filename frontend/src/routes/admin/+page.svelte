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
    import {getAllAdvertisements, updateAdvertisement} from "$lib/controllers/advertisementsController";
    import {createUser, getAllUsers} from "$lib/controllers/userController";
    import {createCompany, getAllCompanies} from "$lib/controllers/companiesController";
    import {createSector, getAllSectors} from "$lib/controllers/sectorController";
    import {adminCreateApplication, getAllApplications} from "$lib/controllers/applicationController";
    import {Button} from "$lib/shadcncomponents/ui/button";
    import {Input} from "$lib/shadcncomponents/ui/input";
    import {Label} from "$lib/shadcncomponents/ui/label";
    import AdvertCard from "$lib/components/cards/AdvertCard.svelte";

    export let users : User[] = [];
    export let companies: Company[] = [];
    export let applications: Application[] = [];
    export let sectors: Sector[] = [];
    export let advertisements: Advertisement[] = [];

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

            getAllApplications().then((data) => {
                applications = data ?? [];
            });

            break;
        case "sectors":
            getAllSectors().then((data) => {
                sectors = data ?? [];
            });
            break;
    }


    async function handleCreateSector(event: SubmitEvent) {
        let formData = new FormData(event.target);
        let name = formData.get("name") as string;
        await createSector(name);
    }
    async function handleCreateCompany(event: SubmitEvent) {
        let formData = new FormData(event.target);
        let name = formData.get("name") as string;
        let website = formData.get("website") as string;
        await createCompany(name, website);
    }


    async function handleCreateApplication(event: SubmitEvent) {
        let formData = new FormData(event.target);
        let idAdvert = formData.get("idadvert") as number;
        let idUser = formData.get("iduser") as number;
        let message = formData.get("message") as string;
        await adminCreateApplication(idAdvert, idUser, message);
    }

    async function handleCreateUser(event: SubmitEvent){
        let formData = new FormData(event.target);
        let email = formData.get("email") as string;
        let firstname =  formData.get("firstname") as string;
        let name = formData.get("name") as string;
        await createUser(name, firstname, email);
    }

     function handleUpdateAdvert(id:number){
        let title = document.getElementById(`${id}-title`)?.textContent;
        let description = document.getElementById(`${id}-description`)?.textContent;
        let localization = document.getElementById(`${id}-localization`)?.textContent;
        let salary = document.getElementById(`${id}-salary`)?.textContent;
        let contract = document.getElementById(`${id}-contract`)?.textContent;
        let date = document.getElementById(`${id}-date`)?.textContent;
        let short = document.getElementById(`${id}-short`)?.textContent;
        let sector = document.getElementById(`${id}-sector`)?.textContent;
        let company = document.getElementById(`${id}-company`)?.textContent;
        let working_time = document.getElementById(`${id}-working`)?.textContent;
        console.log(title, description, localization, salary, contract, date, short, sector, company);
        let advert = {
            id: id,
            title: title,
            description: description,
            localization: localization,
            salary: salary,
            contract_type: contract,
            date: date,
            short_description: short,
            id_sector: sector,
            company: company,
            working_time: working_time,
        }
        updateAdvertisement(id, advert);
    }

</script>


<header>
    <h1>ADMIN PAGE</h1>
    <a href="/"> Home page </a>
    <div>

    </div>
</header>


<div class="">

    <Tabs.Root bind:value={$selectedTab} class="flex flex-col items-center justify-center">

        <Tabs.List>
            <Tabs.Trigger value="advertisements">Advertisements</Tabs.Trigger>
            <Tabs.Trigger value="users">Users</Tabs.Trigger>
            <Tabs.Trigger value="companies">Companies</Tabs.Trigger>
            <Tabs.Trigger value="applications">Applications</Tabs.Trigger>
            <Tabs.Trigger value="sectors">Sectors</Tabs.Trigger>
        </Tabs.List>


        <!-- ADVERTISEMENTS PAGE Display advertisements and the possibility to create/update/delete any advertisement -->
        <Tabs.Content value="advertisements">

            <Button>Create</Button>


            <Table.Root>
                <Table.Caption>Applications list</Table.Caption>
                <Table.Header>
                    <Table.Row class="text-center">
                        <Table.Head class="text-center">id</Table.Head>
                        <Table.Head class="text-center">title</Table.Head>
                        <Table.Head class="text-center">company</Table.Head>
                        <Table.Head class="text-center">id_sector</Table.Head>
                        <Table.Head class="text-center">description</Table.Head>
                        <Table.Head class="text-center">localization</Table.Head>
                        <Table.Head class="text-center">salary</Table.Head>
                        <Table.Head class="text-center">contract_type</Table.Head>
                        <Table.Head class="text-center">date</Table.Head>
                        <Table.Head class="text-center">short_description</Table.Head>
                        <Table.Head class="text-center">working_time</Table.Head>
                        <Table.Head class="text-center">Actions</Table.Head>


                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {#each advertisements as advert}
                        <Table.Row>
                            <Table.Cell class="text-center" id="{advert.id}-id">{advert.id}</Table.Cell>
                            <Table.Cell class="text-center" id="{advert.id}-title">{advert.title}</Table.Cell>
                            <Table.Cell class="text-center" id="{advert.id}-company">{advert.company}</Table.Cell>
                            <Table.Cell class="text-center" id="{advert.id}-sector">{advert.sector}</Table.Cell>
                            <Table.Cell contenteditable="true" class="text-center" id="{advert.id}-description">{advert.description}</Table.Cell>
                            <Table.Cell class="text-center" id="{advert.id}-localization">{advert.localization}</Table.Cell>
                            <Table.Cell class="text-center" id="{advert.id}-salary">{advert.salary}</Table.Cell>
                            <Table.Cell class="text-center" id="{advert.id}-contract">{advert.contract_type}</Table.Cell>
                            <Table.Cell class="text-center" id="{advert.id}-date">{advert.date}</Table.Cell>
                            <Table.Cell class="text-center" id="{advert.id}-short">{advert.short_description}</Table.Cell>
                            <Table.Cell class="text-center" id="{advert.id}-working">{advert.working_time}</Table.Cell>
                            <Table.Cell class="text-center">
                                <Button variant="ghost" on:click={handleUpdateAdvert(advert.id)}>Update</Button>
                                <Button variant="destructive">Delete</Button>
                            </Table.Cell>
                        </Table.Row>
                    {/each}
                </Table.Body>
            </Table.Root>
        </Tabs.Content>

        <!-- USERS PAGE Display users and the possibility to create/update/delete any user -->
        <Tabs.Content value="users">

            <form action="" class="flex flex-row" on:submit={handleCreateUser}>
                <Input type="text" name="name" placeholder="name"></Input>
                <Input type="text" name="firstname" placeholder="firstname"></Input>
                <Input type="email" name="email" placeholder="email"></Input>
                <Input type="password" name="password" placeholder="password"></Input>

                <Label for="isadmin">isAdmin</Label>
                <Input id="isadmin" name="isadmin" type="checkbox" placeholder="is_admin"></Input>
                <Label for="isuser" >isUser</Label>
                <Input id="isuser" name="isuser" type="checkbox" placeholder="is_user"></Input>
                <Button type="submit">Submit</Button>
            </form>


            <Table.Root>
                <Table.Caption>Users list</Table.Caption>
                <Table.Header>
                    <Table.Row class="text-center">
                        <Table.Head class="text-center">ID</Table.Head>
                        <Table.Head class="text-center">Name</Table.Head>
                        <Table.Head class="text-center">Firstname</Table.Head>
                        <Table.Head class="text-center">Email</Table.Head>
                        <Table.Head class="text-center">is_admin</Table.Head>
                        <Table.Head class="text-center">is_user</Table.Head>
                        <Table.Head class="text-center">Actions</Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>

                    {#each users as user}
                    <Table.Row>
                        <Table.Cell class="text-center">{user.id}</Table.Cell>
                        <Table.Cell class="text-center">{user.name}</Table.Cell>
                        <Table.Cell class="text-center">{user.firstname}</Table.Cell>
                        <Table.Cell class="text-center">{user.email}</Table.Cell>
                        <Table.Cell class="text-center">{user.is_admin}</Table.Cell>
                        <Table.Cell class="text-center">{user.is_user}</Table.Cell>
                        <Table.Cell class="text-center">
                            <button class="btn btn-primary">Update</button>
                            <button class="btn btn-danger">Delete</button>
                        </Table.Cell>
                    </Table.Row>
                    {/each}
                </Table.Body>
            </Table.Root>
        </Tabs.Content>

        <!-- COMPANIES PAGE Display companies and the possibility to create/update/delete any company -->
        <Tabs.Content value="companies">

            <form action="" class="flex flex-row" on:submit={handleCreateCompany}>
                <Input name="name" type="text" placeholder="name"></Input>
                <Input name="website" type="text" placeholder="website"></Input>
                <Button type="submit">Submit</Button>
            </form>

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

            <form action="" class="flex flex-row" on:submit={handleCreateApplication}>
                <Input type="number" name="idadvert" placeholder="idAdvert"></Input>
                <Input type="number" name="iduser" placeholder="idUser"></Input>
                <Input type="text" name="message" placeholder="message"></Input>
                <Button type="submit">Submit</Button>
            </form>


            <Table.Root>
                <Table.Caption>Applications list</Table.Caption>
                <Table.Header>
                    <Table.Row class="text-center">
                        <Table.Head class="text-center">Id Advert</Table.Head>
                        <Table.Head class="text-center">Id User</Table.Head>
                        <Table.Head class="text-center">Message sent</Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {#each applications as application}
                        <Table.Row>
                            <Table.Cell class="text-center">{application.id_ads}</Table.Cell>
                            <Table.Cell class="text-center">{application.id_people}</Table.Cell>
                            <Table.Cell class="text-center">{application.message}</Table.Cell>
                        </Table.Row>
                    {/each}
                </Table.Body>
            </Table.Root>
        </Tabs.Content>

        <!-- SECTORS PAGE Display sectors and the possibility to create/update/delete any sector -->
        <Tabs.Content value="sectors">
            <form action="" class="flex flex-row" on:submit={handleCreateSector}>
                <Input type="text" name="name" placeholder="sector name"></Input>
                <Button type="submit">Create</Button>
            </form>

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



