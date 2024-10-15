<script lang="ts">
    import DarkMode from "$lib/components/buttons/DarkMode.svelte";
    import {browser} from "$app/environment";
    import * as DropdownMenu from "$lib/shadcncomponents/ui/dropdown-menu";
    import {getContext} from "svelte";
    import {Button} from "$lib/shadcncomponents/ui/button/index.js";
    import type {User} from "$lib/models/user";
    import LogoutButton from "$lib/components/buttons/LogoutButton.svelte";
    import img from "$lib/images/logoJobQuest.png";
    import {goto} from "$app/navigation";

</script>

<header class="p-5 flex items-center bg-[#315659]/10">
    <div class="w-1/6">
        <a href="/">
            <img src="{img}" alt="JobQuest Logo" class="w-2/4">
        </a>
    </div>
    <div class="w-5/6 flex">
        <div class="hidden lg:flex justify-end items-center w-full gap-2">
            <div class="flex gap-3 w-2/6 justify-center">
                <a href="/login" class="bg-[#90BC81] text-black p-2 rounded">Sign in</a>
                <a href="/signup" class="bg-[#90BC81] text-black p-2 rounded">Sign up</a>
                <DarkMode></DarkMode>
            </div>
        </div>

        <div class="lg:hidden flex justify-end items-center w-full">
            <!-- Hamburger Button -->
            <div class="relative">
                <button id="menu-btn" class="block focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                    </svg>
                </button>

                <!-- Dropdown Menu -->
                <div id="menu" class="hidden absolute w-max bg-white right-0">
                    <a href="/admin" class="block px-4 py-2 text-black hover:bg-gray-100">Admin</a>
                    <a href="/login" class="block px-4 py-2 text-black hover:bg-gray-100">Login</a>
                    <a href="/testing" class="block px-4 py-2 text-black hover:bg-gray-100">Testing</a>
                </div>

            </div>
        </div>

        <script>
            // JavaScript to toggle the dropdown menu
            const menuBtn = document.getElementById('menu-btn');
            const menu = document.getElementById('menu');

            menuBtn.addEventListener('click', () => {
                // Toggle hidden class
                menu.classList.toggle('hidden');

                // Check if the menu is visible
                if (!menu.classList.contains('hidden')) {
                    // Remove the hidden class, then add opacity
                    menu.classList.remove('opacity-0');
                    menu.classList.add('opacity-100');
                } else {
                    // If hidden, set opacity back to 0
                    menu.classList.remove('opacity-100');
                    menu.classList.add('opacity-0');
                }
            });
        </script>


        <div class="hidden">
            <div class="flex gap-3">
                <a href="profile">Profile</a>
                <LogoutButton></LogoutButton>
                <DarkMode></DarkMode>
            </div>


        </div>
    </div>

</header>