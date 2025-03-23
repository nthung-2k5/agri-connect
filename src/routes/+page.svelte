<script>
import Button from 'flowbite-svelte/Button.svelte';
import Card from 'flowbite-svelte/Card.svelte';
let features = [
    { title: 'Kết nối', description: 'Kết nối nông dân với người mua hàng', icon: '🤝' },
    { title: 'Giao dịch', description: 'Bán và mua nông sản một cách dễ dàng', icon: '🔄' }
];
</script>

<svelte:head>
    <title>Nông Trade</title>
</svelte:head>

<main class="w-full mb-10">
    <section class="bg-[url('/homeImage.jpg')] bg-cover bg-center text-white text-center py-24 px-5">
        <div class="max-w-3xl mx-auto p-8 rounded-lg shadow-lg bg-green-600/60">
            <h1 class="text-5xl font-bold mb-2">Nông Trade</h1>
            <p class="mb-6">Kết nối nông dân, người mua hàng, và thị trường cho một nền nông nghiệp bền vững</p>
            <Button size="lg" color="yellow">Đăng ký tại đây</Button>
        </div>
    </section>

    <section class="py-16 px-5 max-w-6xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-10">Cách Nông Trade hoạt động</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {#each features as feature}
            <Card padding="md" size="lg" class="bg-gray-50 shadow hover:shadow-md hover:-translate-y-1 transition-transform duration-300">
                <div class="text-5xl mb-4">{feature.icon}</div>
                <h3 class="text-gray-900 text-xl font-semibold mb-2">{feature.title}</h3>
                <p class="text-gray-500">{feature.description}</p>
            </Card>
            {/each}
        </div>
    </section>
</main>
