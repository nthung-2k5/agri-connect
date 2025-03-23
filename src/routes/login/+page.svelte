<script lang="ts">
    import Button from 'flowbite-svelte/Button.svelte';
    import Input from 'flowbite-svelte/Input.svelte';
    import Label from 'flowbite-svelte/Label.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
    let email = '';
    let password = '';
    
    function handleLogin() {
        // Add login logic here
        console.log('Logging in with', email);
    }
</script>

<div class="flex justify-center items-center min-h-screen p-4 bg-gray-50">
    <div class="flex w-full max-w-4xl bg-white rounded-lg overflow-hidden shadow-md">
        <div class="flex-1 md:block hidden">
            <img src="/images/login.jpg" alt="Login" class="w-full h-full object-cover" />
        </div>
        <div class="flex-1 p-8">
            <h2 class="mb-6 text-center text-xl font-semibold text-green-800">Chào mừng trở lại</h2>
            <form on:submit|preventDefault={handleLogin}>
                <div class="mb-4">
                    <Label for="email" class="block mb-2 text-sm">Email</Label>
                    <Input type="email" id="email" bind:value={email} required placeholder="Vui lòng nhập địa chỉ email"
                        class="w-full p-3 border border-gray-300 focus:border-green-500 rounded-md"/>
                </div>
                
                <div class="mb-4">
                    <Label for="password" class="block mb-2 text-sm">Mật khẩu</Label>
                    <Input type="password" id="password" bind:value={password} required placeholder="Vui lòng nhập mật khẩu"
                        class="w-full p-3 border border-gray-300 focus:border-green-500 rounded-md"/>
                </div>
                
                <Button type="submit" class="w-full mt-3 mb-6 text-white">
                    Đăng nhập
                </Button>
                
                <div class="flex justify-between text-sm">
                    <a href="/forgot-password" class="text-green-500 hover:text-green-700">Quên mật khẩu?</a>
                    <a href="/register" class="text-green-500 hover:text-green-700">Đăng ký tài khoản</a>
                </div>
            </form>
        </div>
    </div>
</div>
