<script lang="ts">
import {Input} from "$lib/shadcncomponents/ui/input/index";
import {Button} from "$lib/shadcncomponents/ui/button/index";
import {Textarea} from "$lib/shadcncomponents/ui/textarea/index";
import {apply} from "$lib/controllers/applicationController";


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
    const result = await apply(advertId, message);
    console.log("apply result : ", result);
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