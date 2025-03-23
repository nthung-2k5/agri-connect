<script lang="ts">
	import Button from 'flowbite-svelte/Button.svelte';
	import '../app.css';
	let { children } = $props();
	let isMenuOpen = $state(false);
	
	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<header class="bg-white shadow-md">
	<nav class="container mx-auto px-4 py-3 flex items-center justify-between">
		<div class="flex items-center">
			<!-- Logo -->
			<a href="/" class="flex items-center">
				<!-- <img src="/logo.png" alt="Nông Trade Logo" class="h-10 w-auto" /> -->
				<span class="ml-2 text-xl font-bold text-green-700">Nông Trade</span>
			</a>
		</div>
		
		<!-- Navigation Links (Desktop) -->
		<div class="hidden lg:flex space-x-4">
			<a href="/" class="px-3 py-2 text-gray-700 hover:text-green-600">Trang chủ</a>
			<a href="/about" class="px-3 py-2 text-gray-700 hover:text-green-600">Giới thiệu</a>
			<a href="/product/sell" class="px-3 py-2 text-gray-700 hover:text-green-600">Bán nông sản</a>
			<a href="/product/buy" class="px-3 py-2 text-gray-700 hover:text-green-600">Mua nông sản</a>
			<a href="/privacy" class="px-3 py-2 text-gray-700 hover:text-green-600">Điều khoản</a>
			<a href="/chat" class="px-3 py-2 text-gray-700 hover:text-green-600">Chatbox</a>
			<a href="/contact" class="px-3 py-2 text-gray-700 hover:text-green-600">Liên hệ</a>
			<Button href="/login">Đăng nhập</Button>
		</div>
		
		<!-- Mobile Menu Button -->
		<button class="lg:hidden" onclick={toggleMenu} aria-label="Toggle Menu">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
			</svg>
		</button>
	</nav>
	
	<!-- Mobile Menu -->
	{#if isMenuOpen}
		<div class="lg:hidden bg-white border-t py-2">
			<div class="container mx-auto px-4 flex flex-col space-y-2">
				<a href="/" class="px-3 py-2 text-gray-700 hover:text-green-600">Trang chủ</a>
				<a href="/about" class="px-3 py-2 text-gray-700 hover:text-green-600">Giới thiệu</a>
				<a href="/publish" class="px-3 py-2 text-gray-700 hover:text-green-600">Đăng bài</a>
				<a href="/privacy" class="px-3 py-2 text-gray-700 hover:text-green-600">Điều khoản</a>
				<a href="/chat" class="px-3 py-2 text-gray-700 hover:text-green-600">Chatbox</a>
				<a href="/contact" class="px-3 py-2 text-gray-700 hover:text-green-600">Liên hệ</a>
				<a href="/signin" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 inline-block w-fit">Đăng nhập</a>
			</div>
		</div>
	{/if}
</header>
{@render children()}
<footer class="bg-gray-800 text-white text-center py-5">
    <p>© {new Date().getFullYear()} Nông Trade. Mọi quyền được bảo lưu.</p>
</footer>
