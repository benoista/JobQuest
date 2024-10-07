<script lang="ts">
    import LoginForm from "../forms/LoginForm.svelte";

    function handleClick(){
        console.log("Login clicked");
    }
</script>

<button class="btn btn-primary" id="login-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" on:click={() => handleClick()}> Login </button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <LoginForm></LoginForm>
            </div>
        </div>
    </div>
</div>