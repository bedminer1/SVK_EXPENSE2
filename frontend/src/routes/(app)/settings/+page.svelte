<script lang="ts">
    import { FileButton } from "@skeletonlabs/skeleton";

    export let data

    let avatarFiles: FileList
    let email: string = data.user.email
    let oldPassword: string
    let password: string

    $: changes = avatarFiles?.length > 0 || email !== data.user.email || oldPassword && password
</script>

<form class="h-[80vh] w-full items-center flex justify-center" method="POST" enctype="multipart/form-data" >
    <div>
        <label for="avator" class="label">
            <span>Avatar:</span>
            <FileButton name="avatar" bind:files={avatarFiles}>Upload</FileButton>
        </label>

        <label class="label">
            <span>Email: </span>
            <input type="email" class="input" placeholder="mail@example.com" bind:value={email}>
        </label>
        <label class="label">
            <span>Old password: </span>
            <input type="password" class="input" name="oldPassword" placeholder="*****" bind:value={oldPassword}>
        </label>
        <label class="label">
            <span>Password: </span>
            <input type="password" class="input" name="password" placeholder="*****" bind:value={password}>
            <input type="hidden" name="passwordConfirm" class="input" placeholder="*****" bind:value={password} />
        </label>
    </div>
    {#if changes}
        <footer class="fixed left-0 bottom-0 h-16 w-full bg-surface-900 flex flex-row drop-shadow p-2">
            <button class="ml-auto btn variant-filled-primary" type="submit">Save</button>
        </footer>
    {/if}
</form>