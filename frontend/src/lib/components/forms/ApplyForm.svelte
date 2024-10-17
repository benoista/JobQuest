<script lang="ts">
import {Input} from "$lib/shadcncomponents/ui/input/index";
import {Button} from "$lib/shadcncomponents/ui/button/index";
import {Textarea} from "$lib/shadcncomponents/ui/textarea/index";
import {apply, applyNoAccount} from "$lib/controllers/applicationController";
import {browser} from "$app/environment";


export let advertId: number;

export let userInfo = {
    name: "",
    firstName: "",
    email: "",
};

async function handleSubmit(e: Event) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const message = formData.get("message") as string;
    if (browser) {
        if (document.cookie == ""){
            const name = formData.get("name") as string;
            const firstName = formData.get("firstName") as string;
            const email = formData.get("email") as string;
            await applyNoAccount(name, firstName, email, message, advertId);
        } else {
            await apply(advertId, message);
        }
    }
}
</script>
<p class="text-xl ">Apply for the job : </p>
<form action="" on:submit={handleSubmit} class="flex flex-col gap-2 p-2">
    <Input name="name" placeholder="name" value="{userInfo.name}"/>
    <Input name="firstName" placeholder="first name" value="{userInfo.firstName}"/>
    <Input name="email" placeholder="email" value="{userInfo.email}"/>
    <Textarea name="message" placeholder="Message"></Textarea>
    <Button type="submit"> Confirm </Button>
</form>