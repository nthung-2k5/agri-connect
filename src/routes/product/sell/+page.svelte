<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
    import { 
        Button, 
        Label, 
        Input, 
        Select, 
        Textarea, 
        Card, 
        Fileupload, 
        InputAddon,
        ButtonGroup,
        Drawer,
        CloseButton
    } from 'flowbite-svelte';
    
    // Drawer state
    let drawerHidden = $state(true);
    const toggleDrawer = () => drawerHidden = !drawerHidden;
    
    // Filter states
    let selectedRegion = $state("all");
    let selectedCategory = $state("all");
    let quantity = $state(1000);
    let quantityUnit = $state("kg"); // "kg" or "tons"
    let searchQuery = $state("");
    let priceCompare = $state("lg"); // ≥, =, ≤

    // Sample data for dropdowns
    const regions = [
        "Trung du và miền núi Bắc Bộ",
        "Đồng bằng sông Hồng",
        "Bắc Trung Bộ và duyên hải miền Trung",
        "Tây Nguyên",
        "Đông Nam Bộ",
        "Đồng bằng sông Cửu Long"
    ];

    const categories = ["Cây lương thực", "Cây công nghiệp", "Cây ăn quả", "Rau củ", "Khác"];
    
    // Mock products and filter logic remains the same
    const mockProducts = [
        // Mock data remains unchanged
        {
            id: 1,
            name: "Gạo Bắc Hương",
            description: "Gạo thơm ngon từ đồng bằng sông Hồng, hạt dài, ít bị cắt gãy khi nấu",
            price: 15000,
            priceUnit: "kg",
            category: "Cây lương thực",
            region: "Đồng bằng sông Hồng",
            image: "https://placehold.co/300x200?text=Gạo+Bắc+Hương",
            quantity: 5000,
            availableUnit: "kg"
        },
        {
            id: 2,
            name: "Cà phê Robusta",
            description: "Cà phê hạt Robusta chất lượng cao từ Tây Nguyên, hương vị đậm đà",
            price: 80000,
            priceUnit: "kg",
            category: "Cây công nghiệp",
            region: "Tây Nguyên",
            image: "https://placehold.co/300x200?text=Cà+phê+Robusta",
            quantity: 2,
            availableUnit: "tấn"
        },
        {
            id: 3,
            name: "Xoài cát Hòa Lộc",
            description: "Xoài cát Hòa Lộc thơm ngọt, màu vàng đẹp, đặc sản ĐBSCL",
            price: 60000,
            priceUnit: "kg",
            category: "Cây ăn quả",
            region: "Đồng bằng sông Cửu Long",
            image: "https://placehold.co/300x200?text=Xoài+cát",
            quantity: 500,
            availableUnit: "kg"
        },
        {
            id: 4,
            name: "Thanh Long ruột đỏ",
            description: "Thanh long ruột đỏ Bình Thuận, ngọt mát, giàu dinh dưỡng",
            price: 35000,
            priceUnit: "kg",
            category: "Cây ăn quả",
            region: "Bắc Trung Bộ và duyên hải miền Trung",
            image: "https://placehold.co/300x200?text=Thanh+Long",
            quantity: 1,
            availableUnit: "tấn"
        },
        {
            id: 5,
            name: "Nấm linh chi rừng",
            description: "Nấm linh chi rừng tự nhiên từ vùng núi Hoàng Liên Sơn",
            price: 800000,
            priceUnit: "kg",
            category: "Khác",
            region: "Trung du và miền núi Bắc Bộ",
            image: "https://placehold.co/300x200?text=Nấm+linh+chi",
            quantity: 50,
            availableUnit: "kg"
        }
    ];

    // Filter products based on criteria
    const filteredProducts = $derived(mockProducts.filter(product => {
        const matchesRegion = selectedRegion === "all" || product.region === selectedRegion;
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
        const matchesSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Price comparison
        let matchesPrice = true;
        if (priceCompare === "lg") matchesPrice = product.price >= quantity;
        else if (priceCompare === "eq") matchesPrice = product.price === quantity;
        else if (priceCompare === "lt") matchesPrice = product.price <= quantity;
        
        return matchesRegion && matchesCategory && matchesSearch && matchesPrice;
    }));
    
    function handleSubmit() {
        // Handle form submission logic here
        console.log({ selectedRegion, selectedCategory, quantity, quantityUnit, searchQuery });
    }
</script>

<div class="mx-auto p-5 min-h-screen">
    
    <!-- Filter drawer -->
    <Drawer placement="right" width="w-96" bind:hidden={drawerHidden} id="filter-drawer">
        <div class="flex justify-between items-center p-4 border-b">
            <h5 class="text-lg font-semibold">Bộ lọc tìm kiếm</h5>
            <CloseButton on:click={toggleDrawer} class="mb-4" />
        </div>
        <div class="p-4 space-y-4">
            <ButtonGroup class="flex mb-4">
                <Input placeholder="Tìm kiếm nông sản..." bind:value={searchQuery} />
                <Button color="green">Tìm</Button>
            </ButtonGroup>
            <div>
                <Label for="region" class="mb-2">Vùng</Label>
                <Select id="region" bind:value={selectedRegion}>
                    <option value="all">Tất cả vùng</option>
                    {#each regions as region}
                        <option value={region}>{region}</option>
                    {/each}
                </Select>
            </div>
            
            <div>
                <Label for="category" class="mb-2">Loại nông sản</Label>
                <Select id="category" bind:value={selectedCategory}>
                    <option value="all">Tất cả loại</option>
                    {#each categories as category}
                        <option value={category}>{category}</option>
                    {/each}
                </Select>
            </div>
            
            <div>
                <Label for="quantity" class="mb-2">Đơn giá</Label>
                <div class="flex w-full">
                    <Select class="w-1/4 rounded-none rounded-l-lg" bind:value={priceCompare}>
                        <option value="lg">≥</option>
                        <option value="eq">=</option>
                        <option value="lt">≤</option>
                    </Select>
                    <Input id="quantity" type="number" bind:value={quantity} min="1000" step="1000" class="rounded-none border-0 border-y w-5/12"/>
                    <Select bind:value={quantityUnit} class="rounded-none rounded-r-lg w-1/3">
                        <option value="kg">đồng/kg</option>
                        <option value="tons">đồng/tấn</option>
                    </Select>
                </div>
            </div>
            
            <Button color="green" class="w-full mt-4">Áp dụng</Button>
        </div>
    </Drawer>
    
    <!-- Product listings -->
    <div class="mb-8">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Nông sản hiện có</h1>
            <Button color="green" on:click={toggleDrawer}>Bộ lọc</Button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {#each filteredProducts as product}
                <Card class="h-full flex flex-col">
                    <img src={product.image} alt={product.name} class="w-full h-48 object-cover rounded-t-lg">
                    <div class="p-4 pb-0 flex-grow">
                        <h3 class="text-lg font-semibold">{product.name}</h3>
                        <p class="text-gray-600 text-sm mb-2">{product.category} • {product.region}</p>
                        <p class="text-gray-700 mb-3 line-clamp-2">{product.description}</p>
                        <div class="flex justify-between items-center mt-auto">
                            <span class="text-xl font-bold text-green-600">{product.price.toLocaleString()} đ/{product.priceUnit}</span>
                            <span class="text-sm text-gray-500">Có sẵn: {product.quantity} {product.availableUnit}</span>
                        </div>
                    </div>
                </Card>
            {/each}
        </div>
        
        {#if filteredProducts.length === 0}
            <div class="text-center py-8 bg-gray-50 rounded-lg">
                <p class="text-gray-500">Không tìm thấy nông sản phù hợp với điều kiện tìm kiếm</p>
            </div>
        {/if}
    </div>
</div>
