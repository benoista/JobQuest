<script lang="ts">
    function handleClick(){
        console.log('Learn More clicked');
    }
</script>


<button class="btn btn-outline-info" on:click={() => handleClick()}>Learn More</button>