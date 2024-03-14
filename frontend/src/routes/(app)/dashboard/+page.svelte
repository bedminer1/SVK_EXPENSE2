<script lang="ts">
    export let data
</script>

<p>{data.user.email}</p>
<form action="/login?/logout" method="post">
    <button class="btn variant-filled">Log Out</button>
</form>