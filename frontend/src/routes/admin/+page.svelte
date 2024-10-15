<script lang="ts">
    import * as Tabs from "$lib/shadcncomponents/ui/tabs";
    import AdminAdvertCard from "$lib/components/admin/AdminAdvertCard.svelte";
    import * as Table from "$lib/shadcncomponents/ui/table";
    import type { User } from "$lib/models/user";
    import type {Company} from "$lib/models/company";
    import type {Application} from "$lib/models/applications";
    import type {Sector} from "$lib/models/sector";
    import type {Advertisement} from "$lib/models/advertisement";
    import {type Writable, writable} from "svelte/store";
    import {
        addAdvertisement,
        deleteAdvertisement,
        getAllAdvertisements,
        updateAdvertisement
    } from "$lib/controllers/advertisementsController";
    import {createUser, getAllUsers, updateUser} from "$lib/controllers/userController";
    import {createCompany, deleteCompany, getAllCompanies, updateCompany} from "$lib/controllers/companiesController";
    import {createSector, deleteSector, getAllSectors, updateSector} from "$lib/controllers/sectorController";
    import {
        adminCreateApplication, deleteApplication,
        getAllApplications,
        updateApplication
    } from "$lib/controllers/applicationController";
    import {Button} from "$lib/shadcncomponents/ui/button";
    import {Input} from "$lib/shadcncomponents/ui/input";
    import {Label} from "$lib/shadcncomponents/ui/label";
    import AdvertCard from "$lib/components/cards/AdvertCard.svelte";
    import {onMount} from "svelte";
    import {deleteUser} from "$lib/controllers/userController.js";
    import Header from "$lib/components/Header.svelte";

     let users : Writable<User[]> = writable([]);
     let companies: Writable<Company[]> = writable([]);
     let applications: Writable<Application[]> = writable([]);
     let sectors: Writable<Sector[]> = writable([]);
     let advertisements: Writable<Advertisement[]> = writable([]);

    onMount(async () => {

        getAllAdvertisements().then((data) => {
            $advertisements = data ?? [];
        });
        getAllUsers().then((data) => {
            $users = data ?? [];
        });
        getAllCompanies().then((data) => {
            $companies = data ?? [];
        });
        getAllApplications().then((data) => {
            $applications = data ?? [];
        });
        getAllSectors().then((data) => {
            $sectors = data ?? [];
        });
    });

/*
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
    }*/


    function handleCreateAdvertisement(event: SubmitEvent){
        let formData = new FormData(event.target);
        let ad: Advertisement = {
            id: 0,
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            localization: formData.get("localization") as string,
            salary: formData.get("salary") as number,
            contract_type: formData.get("contract") as string,
            date: formData.get("date") as Date,
            short_description: formData.get("short") as string,
            sector: formData.get("sector") as string,
            company: formData.get("company") as string,
            working_time: formData.get("working_time") as number,
        }
        console.log("Advert created: ", JSON.stringify(ad));
        addAdvertisement(ad);
        getAllAdvertisements().then((data) => {
            $advertisements = data ?? [];
        });
    }

    async function handleCreateSector(event: SubmitEvent) {
        let formData = new FormData(event.target);
        let name = formData.get("name") as string;
        await createSector(name);
        getAllSectors().then((data) => {
            $sectors = data ?? [];
        });
    }
    async function handleCreateCompany(event: SubmitEvent) {
        let formData = new FormData(event.target);
        let name = formData.get("name") as string;
        let website = formData.get("website") as string;
        await createCompany(name, website);
        $companies = await getAllCompanies();
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
        let advert:Advertisement = {
            id: id,
            title: title,
            description: description,
            localization: localization,
            salary: salary,
            contract_type: contract,
            date: date,
            short_description: short,
            sector: sector,
            company: company,
            working_time: working_time,
        }
        updateAdvertisement(id, advert);
    }

    function handleDeleteAdvert(id:number){
        deleteAdvertisement(id);
    }

    function handleUpdateUser(id:number){
        let name = document.getElementById(`user${id}-name`)?.textContent;
        let firstname = document.getElementById(`user${id}-firstname`)?.textContent;
        let email = document.getElementById(`user${id}-email`)?.textContent;
        updateUser(id, firstname, name, email);
        getAllUsers().then((data) => {
            $users = data ?? [];
        });
    }

    function handleDeleteUser(id:number){
        deleteUser(id);
        getAllUsers().then((data) => {
            $users = data ?? [];
        });
    }

    function handleUpdateCompany(id:number) {
        let name = document.getElementById(`company${id}-name`)?.textContent;
        let website = document.getElementById(`company${id}-website`)?.textContent;
        console.log(name, website);
        updateCompany(id, name, website);
        getAllCompanies().then((data) => {
            $companies = data ?? [];
        });
    }

    function handleDeleteCompany(id:number) {
        deleteCompany(id);
        getAllCompanies().then((data) => {
            $companies = data ?? [];
        });
    }

    function handleUpdateSector(id:number) {
        let name = document.getElementById(`sector${id}-name`)?.textContent;
        console.log(name);
        updateSector(id, name);
        getAllSectors().then((data) => {
            $sectors = data ?? [];
        });
    }

    function handleDeleteSector(id: number) {
        deleteSector(id).then(() => {
            getAllSectors().then((data) => {
                $sectors = data ?? [];
            });
        });
    }

    function handleUpdateApplication(id_ads: number, id_people: number) {
        let message = document.getElementById(`application{id_ads}-{id_people}-message`)?.textContent;
        updateApplication(id_ads, id_people, message);
        getAllApplications().then((data) => {
            $applications = data ?? [];
        });
    }

    function handleDeleteApplication(id_ads:number, id_people:number) {
        deleteApplication(id_ads, id_people);
        getAllApplications().then((data) => {
            $applications = data ?? [];
        });
    }

</script>


<Header>

    <Button href="/" variant="apply">Home</Button>
</Header>


<div class="mt-5">

    <Tabs.Root class="flex flex-col items-center justify-center">

        <Tabs.List>
            <Tabs.Trigger value="advertisements">Advertisements</Tabs.Trigger>
            <Tabs.Trigger value="users">Users</Tabs.Trigger>
            <Tabs.Trigger value="companies">Companies</Tabs.Trigger>
            <Tabs.Trigger value="applications">Applications</Tabs.Trigger>
            <Tabs.Trigger value="sectors">Sectors</Tabs.Trigger>
        </Tabs.List>


        <!-- ADVERTISEMENTS PAGE Display advertisements and the possibility to create/update/delete any advertisement -->
        <Tabs.Content value="advertisements">

            <form action="" class="flex flex-col gap-3 m-3 p-3" on:submit={handleCreateAdvertisement}>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem ">
                    <Input type="text" placeholder="Title" name="title"></Input>
                    <Input type="text" placeholder="short_description" name="short"></Input>
                    <Input type="text" placeholder="description" name="description"></Input>
                    <Input type="number" placeholder="salary" name="salary"></Input>
                    <Input type="date" placeholder="date" name="date"></Input>
                    <Input type="number" placeholder="working_time" name="working_time"></Input>
                    <Input type="text" placeholder="localization" name="localization"></Input>
                    <select name="sector">
                        {#each $sectors as sector }
                            <option value="{sector.name}">{sector.name}</option>
                        {/each}
                    </select>
                    <select name="company">
                        {#each $companies as company }
                            <option value="{company.name}">{company.name}</option>
                        {/each}
                    </select>
                    <select name="contract">
                        {#each ["CDI", "CDD", "Stage", "Alternance"] as contract }
                            <option value="{contract}">{contract}</option>
                        {/each}
                    </select>
                </div>
                <Button type="submit" variant="apply">Create Advertisement</Button>
            </form>

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
                    {#each $advertisements as advert}
                        <Table.Row>
                            <Table.Cell class="text-center" id="{advert.id}-id">{advert.id}</Table.Cell>
                            <Table.Cell contenteditable="true" class="text-center" id="{advert.id}-title">{advert.title}</Table.Cell>
                            <Table.Cell class="text-center" id="{advert.id}-company">{advert.company}</Table.Cell>
                            <Table.Cell class="text-center" id="{advert.id}-sector">{advert.sector}</Table.Cell>
                            <Table.Cell contenteditable="true" class="text-center" id="{advert.id}-description">{advert.description}</Table.Cell>
                            <Table.Cell contenteditable="true" class="text-center" id="{advert.id}-localization">{advert.localization}</Table.Cell>
                            <Table.Cell contenteditable="true" class="text-center" id="{advert.id}-salary">{advert.salary}</Table.Cell>
                            <Table.Cell class="text-center" id="{advert.id}-contract">{advert.contract_type}</Table.Cell>
                            <Table.Cell class="text-center" id="{advert.id}-date">{advert.date}</Table.Cell>
                            <Table.Cell contenteditable="true" class="text-center" id="{advert.id}-short">{advert.short_description}</Table.Cell>
                            <Table.Cell contenteditable="true" class="text-center" id="{advert.id}-working">{advert.working_time}</Table.Cell>
                            <Table.Cell class="text-center">
                                <Button variant="apply" on:click={ () => handleUpdateAdvert(advert.id) }>Update</Button>
                                <Button variant="destructive" on:click={ () => handleDeleteAdvert(advert.id) }>Delete</Button>
                            </Table.Cell>
                        </Table.Row>
                    {/each}
                </Table.Body>
            </Table.Root>
        </Tabs.Content>

        <!-- USERS PAGE Display users and the possibility to create/update/delete any user -->
        <Tabs.Content value="users">

            <form action="" class="flex flex-col gap-3 m-3 p-3" on:submit={handleCreateUser}>
                <Input type="text" name="name" placeholder="name"></Input>
                <Input type="text" name="firstname" placeholder="firstname"></Input>
                <Input type="email" name="email" placeholder="email"></Input>
                <Button type="submit" variant="apply">Create User</Button>
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

                    {#each $users as user}
                    <Table.Row>
                        <Table.Cell class="text-center">{user.id}</Table.Cell>
                        <Table.Cell contenteditable="true" class="text-center" id="user{user.id}-name">{user.name}</Table.Cell>
                        <Table.Cell contenteditable="true" class="text-center" id="user{user.id}-firstname">{user.firstname}</Table.Cell>
                        <Table.Cell contenteditable="true" class="text-center" id="user{user.id}-email">{user.email}</Table.Cell>
                        <Table.Cell class="text-center" id="user{user.id}-is_admin">{user.is_admin}</Table.Cell>
                        <Table.Cell class="text-center" id="user{user.id}-is_user">{user.is_user}</Table.Cell>
                        <Table.Cell class="text-center">
                            <Button variant="apply" on:click={() => handleUpdateUser(user.id)}>Update</Button>
                            <Button variant="destructive" on:click={() => handleDeleteUser(user.id)}>Delete</Button>
                        </Table.Cell>
                    </Table.Row>
                    {/each}
                </Table.Body>
            </Table.Root>
        </Tabs.Content>

        <!-- COMPANIES PAGE Display companies and the possibility to create/update/delete any company -->
        <Tabs.Content value="companies">

            <form action="" class="flex flex-col gap-3 m-3 p-3" on:submit={handleCreateCompany}>
                <Input name="name" type="text" placeholder="name"></Input>
                <Input name="website" type="text" placeholder="website"></Input>
                <Button type="submit" variant="apply">Create Company</Button>
            </form>

            <Table.Root>
                <Table.Caption>Companies list</Table.Caption>
                <Table.Header>
                    <Table.Row>
                        <Table.Head class="text-center">ID</Table.Head>
                        <Table.Head class="text-center">Name</Table.Head>
                        <Table.Head class="text-center">Website</Table.Head>
                        <Table.Head class="text-center">Actions</Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {#each $companies as company}
                        <Table.Row>
                            <Table.Cell class="text-center" >{company.id}</Table.Cell>
                            <Table.Cell contenteditable="true" class="text-center" id="company{company.id}-name">{company.name}</Table.Cell>
                            <Table.Cell contenteditable="true" class="text-center" id="company{company.id}-website">{company.website}</Table.Cell>
                            <Table.Cell class="text-center">
                                <Button variant="apply" on:click={() => handleUpdateCompany(company.id)}>Update</Button>
                                <Button variant="destructive" on:click={() => handleDeleteCompany(company.id)}>Delete</Button>
                            </Table.Cell>
                        </Table.Row>
                    {/each}
                </Table.Body>
            </Table.Root>
        </Tabs.Content>

        <!-- APPLICATIONS PAGE Display applications and the possibility to create/update/delete any application -->
        <Tabs.Content value="applications">

            <form action="" class="flex flex-col gap-3 m-3 p-3" on:submit={handleCreateApplication}>
                <Input type="number" name="idadvert" placeholder="idAdvert"></Input>
                <Input type="number" name="iduser" placeholder="idUser"></Input>
                <Input type="text" name="message" placeholder="message"></Input>
                <Button type="submit" variant="apply">Create Application</Button>
            </form>


            <Table.Root>
                <Table.Caption>Applications list</Table.Caption>
                <Table.Header>
                    <Table.Row class="text-center">
                        <Table.Head class="text-center">Id Advert</Table.Head>
                        <Table.Head class="text-center">Id User</Table.Head>
                        <Table.Head class="text-center">Message sent</Table.Head>
                        <Table.Head class="text-center">Actions</Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {#each $applications as application}
                        <Table.Row>
                            <Table.Cell class="text-center">{application.id_ads}</Table.Cell>
                            <Table.Cell class="text-center">{application.id_people}</Table.Cell>
                            <Table.Cell class="text-center" contenteditable="true" id="application{application.id_ads}-{application.id_people}-message">{application.message}</Table.Cell>
                            <Table.Cell class="text-center">
                                <Button variant="apply" on:click={() => handleUpdateApplication(application.id_ads, application.id_people)}>Update</Button>
                                <Button variant="destructive" on:click={() => handleDeleteApplication(application.id_ads,application.id_people)}>Delete</Button>
                            </Table.Cell>
                        </Table.Row>
                    {/each}
                </Table.Body>
            </Table.Root>
        </Tabs.Content>

        <!-- SECTORS PAGE Display sectors and the possibility to create/update/delete any sector -->
        <Tabs.Content value="sectors">
            <form action="" class="flex flex-col gap-3 m-3 p-3" on:submit={handleCreateSector}>
                <Input type="text" name="name" placeholder="sector name"></Input>
                <Button type="submit" variant="apply">Create Sector</Button>
            </form>

            <Table.Root>
                <Table.Caption>Sectors list</Table.Caption>
                <Table.Header>
                    <Table.Row class="text-center">
                        <Table.Head class="text-center">Id</Table.Head>
                        <Table.Head class="text-center">Name</Table.Head>
                        <Table.Head class="text-center">Actions</Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {#each $sectors as sector}
                        <Table.Row>
                            <Table.Cell class="text-center">{sector.id}</Table.Cell>
                            <Table.Cell class="text-center" id="sector{sector.id}-name">{sector.name}</Table.Cell>
                            <Table.Cell class="text-center">
                                <Button variant="apply" on:click={() => handleUpdateSector(sector.id)}>Update</Button>
                                <Button variant="destructive" on:click={() => handleDeleteSector(sector.id)}>Delete</Button>
                            </Table.Cell>
                        </Table.Row>
                    {/each}
                </Table.Body>
            </Table.Root>
        </Tabs.Content>
    </Tabs.Root>
</div>



