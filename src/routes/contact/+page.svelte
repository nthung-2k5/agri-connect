<script lang="ts">
import Button from 'flowbite-svelte/Button.svelte';
import Input from 'flowbite-svelte/Input.svelte';
import Label from 'flowbite-svelte/Label.svelte';
import Textarea from 'flowbite-svelte/Textarea.svelte';
import type { PageData } from './$types';

let name = $state('');
let email = $state('');
let message = $state('');
let submitted = $state(false);

</script>

<div class="flex flex-col md:flex-row">
    <!-- Green background section (hidden on mobile) -->
    <div class="hidden md:block md:w-1/2 bg-green-800"></div>
    
    <!-- Contact form section -->
    <div class="w-full md:w-1/2 max-w-3xl mx-auto p-8">
        <h1 class="text-3xl font-bold mb-4">Liên hệ</h1>
        <p class="mb-8">Hãy gửi cho chúng tôi một tin nhắn nếu bạn cần hỗ trợ hoặc có bất kỳ câu hỏi nào.</p>
        
        {#if submitted}
            <div class="bg-green-100 text-green-800 p-4 mb-4 rounded">
                Thank you for your message! We'll get back to you soon.
            </div>
        {/if}
        
        <form class="mb-8">
            <div class="mb-6">
                <Label for="name" class="block mb-2 font-medium">Họ và tên <span class="required"></span></Label>
                <Input type="text" id="name" bind:value={name} required class="w-full p-3 border border-gray-300 rounded"/>
            </div>
            
            <div class="mb-6">
                <Label for="email" class="block mb-2 font-medium">Email <span class="required"></span></Label>
                <Input type="email" id="email" bind:value={email} required class="w-full p-3 border border-gray-300 rounded"/>
            </div>

            <div class="mb-6">
                <Label for="phone" class="block mb-2 font-medium">Số điện thoại <span class="required"></span></Label>
                <Input type="text" id="phone" class="w-full p-3 border border-gray-300 rounded"/>
            </div>
            
            <div class="mb-6">
                <Label for="message" class="block mb-2 font-medium">Tin nhắn</Label>
                <Textarea id="message" bind:value={message} rows="5" required class="w-full p-3 border border-gray-300 rounded"/>
            </div>
            
            <Button type="submit">Gửi</Button>
        </form>
        
        <div class="mt-12 pt-8 border-t border-gray-300">
            <h2 class="text-xl font-bold mb-4">Thông tin liên lạc</h2>
            <p class="mb-2">Email: info@agriconnect.com</p>
            <p class="mb-2">Số điện thoại: +84 123 456 789</p>
            <p>Địa chỉ: Khu II Trường Đại học Cần Thơ, Đ. 3 Tháng 2, Xuân Khánh, Ninh Kiều, Cần Thơ</p>
        </div>
    </div>
</div>

<style>
    .required::after {
        content: '*';
        color: red;
    }
</style>