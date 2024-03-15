<script lang="ts">
    import { AppBar, AppShell } from '@skeletonlabs/skeleton';
    import type { LayoutData } from './$types';
    
    export let data: LayoutData;
    let profileMenuVisible = false;
</script>


<AppShell>
    <svelte:fragment slot="header">
		<AppBar slotTrail="relative">
            <svelte:fragment slot="lead">
                <img class="mx-4 size-12" src="stonks.png" alt="logo">
            </svelte:fragment>
            <svelte:fragment slot="trail">
                <button on:click={() => profileMenuVisible = !profileMenuVisible}>
                    <span class="sr-only">Your profile</span>
                    <img
                        class="size-12 mx-4 rounded-full bg-white"
                        src="{'https://ui-avatars.com/api/?name=' + data.user.email}"
                        alt=""
                    />
                </button>

                <div
                    class="origin-top-right absolute top-full right-0 mt-2 w-48 btn-group-vertical variant-filled"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                    style="display: {profileMenuVisible ? 'block' : 'none'}"
                >
                    <a
                        href="/settings"
                        role="menuitem"
                        class="w-full"
                    >
                        Settings
                    </a>

                    <form action="/login?/logout" method="post" class="w-full">
                        <button
                            type="submit"
                            role="menuitem"
                            class="w-full"
                        >
                            Log Out
                        </button>
                    </form>
                </div>
            </svelte:fragment>
        </AppBar>
	</svelte:fragment>

    <slot />
</AppShell>