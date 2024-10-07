<script lang="ts">

    let dark = false;
    function handleClick(){
        dark = !dark;
        if(dark) {
            document!.querySelector("html")!.classList.add("data-bs-theme:dark");
        }
        else{
            document!.querySelector("html")!.classList.remove("data-bs-theme:dark");
        }
    }

</script>


<button class="btn btn-outline-info" on:click={() => handleClick()}> Dark </button>