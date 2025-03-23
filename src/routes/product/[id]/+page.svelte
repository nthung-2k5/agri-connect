<script lang="ts">
    import type { PageData } from './$types';
    import { 
        Button,
        Card,
        Badge,
        Breadcrumb,
        BreadcrumbItem,
        Rating,
        Tabs,
        TabItem
    } from 'flowbite-svelte';
    import { 
        CheckCircle,
        MapPin,
        ShoppingCart,
        Star,
        Calendar,
    } from 'svelte-heros-v2';

    import {
        MessageCircle,
        Package,
        Info
    } from 'lucide-svelte';

    let { data }: { data: PageData } = $props();
    const { product } = data;
</script>

<div class="mx-auto p-5 max-w-7xl">
    <!-- Breadcrumb navigation -->
    <Breadcrumb class="mb-6">
        <BreadcrumbItem href="/">Trang chủ</BreadcrumbItem>
        <BreadcrumbItem href="/product/sell">Nông sản</BreadcrumbItem>
        <BreadcrumbItem>{product.category}</BreadcrumbItem>
        <BreadcrumbItem>{product.name}</BreadcrumbItem>
    </Breadcrumb>

    <!-- Product details -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left column: Product image -->
        <div class="lg:col-span-1">
            <Card class="overflow-hidden">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    class="w-full h-96 object-cover rounded-t-lg"
                />
                <div class="mt-4">
                    <Badge color="green" class="mr-2">{product.category}</Badge>
                    <Badge color="dark">{product.region}</Badge>
                </div>
            </Card>
        </div>

        <!-- Right column: Product info -->
        <div class="lg:col-span-2">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                
                <!-- Seller information -->
                <div class="flex items-center mt-3 mb-6">
                    <div class="flex items-center">
                        {#if product.seller.verified}
                            <CheckCircle class="w-5 h-5 text-green-600 mr-1" />
                        {/if}
                        <span class="font-medium">{product.seller.name}</span>
                    </div>
                    <div class="mx-4 text-gray-300">|</div>
                    <div class="flex items-center">
                        <Rating total={5} rating={product.seller.rating} size={16} />
                        <span class="ml-1 text-sm text-gray-600">{product.seller.rating}</span>
                    </div>
                    <div class="mx-4 text-gray-300">|</div>
                    <div class="flex items-center text-gray-600">
                        <MapPin class="w-4 h-4 mr-1" />
                        <span class="text-sm">{product.seller.location}</span>
                    </div>
                </div>

                <!-- Price and availability -->
                <div class="mb-6">
                    <p class="text-3xl font-bold text-green-600 mb-2">
                        {product.price.toLocaleString()} đ/{product.priceUnit}
                    </p>
                    <p class="text-gray-600">
                        Số lượng có sẵn: <span class="font-semibold">{product.quantity} {product.availableUnit}</span>
                    </p>
                </div>
                
                <!-- Description -->
                <div class="mb-6">
                    <h2 class="text-xl font-semibold mb-2">Mô tả sản phẩm</h2>
                    <p class="text-gray-700">{product.description}</p>
                </div>

                <!-- Product details -->
                <div class="mb-8">
                    <h2 class="text-xl font-semibold mb-3">Chi tiết</h2>
                    <ul class="space-y-2">
                        {#each product.details as detail}
                            <li class="flex items-start">
                                <Info class="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                                <span>{detail}</span>
                            </li>
                        {/each}
                    </ul>
                </div>

                <!-- Action buttons -->
                <div class="flex flex-col sm:flex-row gap-4">
                    <Button size="xl" color="green" class="flex-1" href="/chat">
                        <MessageCircle class="w-5 h-5 mr-2" />
                        Liên hệ người bán
                    </Button>
                </div>
            </div>
        </div>
    </div>

    <!-- Additional information tabs -->
    <div class="mt-12">
        <Tabs style="underline">
            <TabItem open title="Thông tin chi tiết">
                <div class="p-4">
                    <h3 class="text-xl font-semibold mb-3">Về {product.name}</h3>
                    <p class="mb-4">
                        {product.description} Đây là sản phẩm nông nghiệp chất lượng cao được trồng và thu hoạch 
                        tại {product.region}. Sản phẩm được đảm bảo về chất lượng và an toàn thực phẩm.
                    </p>
                    <p>
                        Quý khách có thể liên hệ trực tiếp với người bán để biết thêm thông tin chi tiết về 
                        sản phẩm hoặc thương lượng về giá cả và số lượng.
                    </p>
                </div>
            </TabItem>
            <TabItem title="Hướng dẫn mua hàng">
                <div class="p-4">
                    <h3 class="text-xl font-semibold mb-3">Cách thức mua hàng</h3>
                    <ol class="list-decimal ml-5 space-y-2">
                        <li>Nhấn vào nút "Liên hệ người bán" để bắt đầu cuộc trò chuyện</li>
                        <li>Trao đổi và thống nhất về số lượng, giá cả và phương thức giao hàng</li>
                        <li>Xác nhận đơn hàng và thanh toán theo hướng dẫn</li>
                        <li>Nhận hàng và đánh giá sản phẩm</li>
                    </ol>
                </div>
            </TabItem>
            <TabItem title="Chính sách giao hàng">
                <div class="p-4">
                    <h3 class="text-xl font-semibold mb-3">Thông tin vận chuyển</h3>
                    <p class="mb-3">
                        Chúng tôi hỗ trợ vận chuyển toàn quốc với nhiều phương thức khác nhau tùy thuộc 
                        vào số lượng và khoảng cách.
                    </p>
                    <p>
                        Chi phí vận chuyển sẽ được tính toán dựa trên khối lượng đơn hàng và địa điểm giao hàng. 
                        Vui lòng liên hệ với người bán để biết thêm chi tiết.
                    </p>
                </div>
            </TabItem>
        </Tabs>
    </div>
</div>