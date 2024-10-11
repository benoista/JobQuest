<script lang="ts">
import {Input} from "$lib/shadcncomponents/ui/input/index";
import {Button} from "$lib/shadcncomponents/ui/button/index";
import {Textarea} from "$lib/shadcncomponents/ui/textarea/index";



export const userInfo = {
    name: 'yayoo',
    firstName: 'yayoo',
    email:"aya",
}
function handleSubmit(e: Event) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
}
</script>

<form action="" on:submit={handleSubmit}>
    <Input name="name" placeholder="name" value="{userInfo.name}"/>
    <Input name="firstName" placeholder="first name" value="{userInfo.firstName}"/>
    <Input name="email" placeholder="email" value="{userInfo.email}"/>
    <Textarea name="message" placeholder="Message"></Textarea>
    <Button type="submit"> Confirm </Button>
</form>