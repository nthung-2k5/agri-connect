<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import Button from 'flowbite-svelte/Button.svelte';
	import Fileupload from 'flowbite-svelte/Fileupload.svelte';
    
	let { data }: { data: PageData } = $props();

	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let name = $state('');
	let error = $state('');
	let userType: string | null = $state(null);
	let address = $state('');
	let productionScale = $state('small');
	let mainProduct = $state('');
	let citizenIdImage: File | null = null;
	let businessLicenseImage: File | null = null;

	let passwordMatch = $derived(password === confirmPassword);

	function validateForm(event) {
		event.preventDefault();
		if (!email || !password || !confirmPassword || !name) {
			error = 'All fields are required';
			return false;
		}

		if (!passwordMatch) {
			error = 'Passwords do not match';
			return false;
		}

		if (userType === 'farmer') {
			if (!address || !mainProduct || !citizenIdImage) {
				error = 'Please fill all farmer fields and upload your ID';
				return false;
			}
		} else if (userType === 'business' && !businessLicenseImage) {
			error = 'Please upload your business license';
			return false;
		}

		return true;
	}

	function handleFileChange(event: Event, type: 'citizenId' | 'businessLicense') {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			if (type === 'citizenId') {
				citizenIdImage = input.files[0];
			} else {
				businessLicenseImage = input.files[0];
			}
		}
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-50 p-4">
	<div class="w-full max-w-lg rounded-lg bg-white p-8 shadow-md">
		{#if !userType}
			<!-- User Type Selection Card -->
			<h2 class="mb-6 text-center text-2xl font-bold">Bạn là</h2>
			<div class="mb-6 flex justify-center space-x-8">
				<div class="text-center">
					<button
						onclick={() => userType = 'farmer'}
						class="flex h-32 w-32 items-center justify-center rounded-full border-2 {userType ===
						'farmer'
							? 'border-green-500'
							: 'border-gray-300'} mb-2 transition-all hover:border-green-500"
					>
						<img src="/farmer.svg" alt="Farmer" class="h-</div>20 w-20" />
					</button>
					<span class="mt-2 block font-medium">Nông dân</span>
				</div>

				<div class="text-center">
					<button
						onclick={() => userType = 'business'}
						class="flex h-32 w-32 items-center justify-center rounded-full border-2 {userType ===
						'business'
							? 'border-green-500'
							: 'border-gray-300'} mb-2 transition-all hover:border-green-500"
					>
						<img src="/businessman.svg" alt="Business" class="h-20 w-20" />
					</button>
					<span class="mt-2 block font-medium">Doanh nghiệp</span>
				</div>
			</div>
		{:else}
			<h1 class="mb-6 text-center text-2xl font-bold">Tạo tài khoản</h1>

			{#if error}
				<div class="mb-4 rounded-md bg-red-100 p-3 text-red-700">
					{error}
				</div>
			{/if}

			<form
				method="POST"
				use:enhance={() => {
					return async ({ result }) => {
						if (result.type === 'failure') {
							error = result.data?.message || 'Registration failed';
						}
					};
				}}
				onsubmit={validateForm}
			>
				<div class="mb-4">
					<label for="name" class="mb-2 block font-medium">{userType === 'farmer' ? 'Họ và tên' : 'Tên doanh nghiệp'}</label>
					<input
						type="text"
						id="name"
						bind:value={name}
						placeholder="Vui lòng nhập tên đầy đủ"
						class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
						required
					/>
				</div>

				<div class="mb-4">
					<label for="email" class="mb-2 block font-medium">Email</label>
					<input
						type="email"
						id="email"
						bind:value={email}
						placeholder="Vui lòng nhập địa chỉ email"
						class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
						required
					/>
				</div>

				<div class="mb-4">
					<label for="password" class="mb-2 block font-medium">Mật khẩu</label>
					<input
						type="password"
						id="password"
						bind:value={password}
						placeholder="Vui lòng nhập mật khẩu"
						class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
						required
					/>
				</div>

				<div class="mb-4">
					<label for="confirmPassword" class="mb-2 block font-medium">Nhập lại mật khẩu</label>
					<input
						type="password"
						id="confirmPassword"
						bind:value={confirmPassword}
						placeholder="Nhập lại mật khẩu"
						required
						class="w-full rounded-md border px-3 py-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none
                        {!passwordMatch && confirmPassword ? 'border-red-500' : 'border-gray-300'}"
					/>
					{#if !passwordMatch && confirmPassword}
						<span class="text-sm text-red-500">Mật khẩu không khớp</span>
					{/if}
				</div>

				{#if userType === 'farmer'}
					<div class="mb-4">
						<label for="address" class="mb-2 block font-medium">Địa chỉ</label>
						<input
							type="text"
							id="address"
							bind:value={address}
							placeholder="Vui lòng nhập địa chỉ"
							class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
						/>
					</div>

					<div class="mb-4">
						<label for="productionScale" class="mb-2 block font-medium">Quy mô sản xuất</label>
						<select
							id="productionScale"
							bind:value={productionScale}
							class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
						>
							<option value="small">Nhỏ</option>
							<option value="medium">Vừa</option>
							<option value="big">Lớn</option>
						</select>
					</div>

					<div class="mb-4">
						<label for="mainProduct" class="mb-2 block font-medium">Sản phẩm chủ yếu</label>
						<input
							type="text"
							id="mainProduct"
							bind:value={mainProduct}
							class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
						/>
					</div>

					<div class="mb-4">
						<label for="citizenId" class="mb-2 block font-medium">Căn cước công dân</label>
						<input
							type="file"
							id="citizenId"
							onchange={(e) => handleFileChange(e, 'citizenId')}
							accept="image/*"
							class="w-full rounded-md border border-gray-300 px-3 py-2"
						/>
						<p class="mt-1 text-xs text-gray-500">Tải ảnh chụp căn cước công dân</p>
					</div>
				{:else}
					<div class="mb-4">
						<label for="businessLicense" class="mb-2 block font-medium">Giấy xác nhận kinh doanh</label>
						<Fileupload accept="image/*" />
						<p class="mt-1 text-xs text-gray-500">Tải ảnh chụp giấy xác nhận kinh doanh</p>
					</div>
				{/if}

				<Button type="submit" class="w-full">Đăng ký</Button>
			</form>

			<div class="mt-4 text-center">
				<p>Đã có tài khoản? <a href="/login" class="text-green-600 hover:underline">Đăng nhập tại đây</a></p>
			</div>
		{/if}
	</div>
</div>
