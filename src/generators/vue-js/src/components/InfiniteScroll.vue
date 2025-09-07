<script setup>
import { ref,onMounted } from 'vue'
function* getProductsFromDatabase(){
    yield ["產品 A", "產品 B", "產品 C", "產品 D", "產品 E"];
    yield ["產品 F", "產品 G", "產品 H", "產品 I", "產品 J"];
    yield ["產品 K", "產品 L", "產品 M", "產品 N", "產品 O"];
}
const products = ref([])
const productGenerator = getProductsFromDatabase()

const loadProducts = () => {
    const result = productGenerator.next()
    if(!result.done) {
        products.value.push(...result.value)
    }
}

onMounted(()=>{
    loadProducts()
})

</script>
<template>
  <div class="bg-gray-100 h-screen p-8">
    <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-2">使用 Generator 實現分批載入</h1>
      <p class="tetx-gray-600 mb-4">點擊按鈕，分批載入產品資料。</p>
      <div v-for="product in products" :key="product">
        {{product}}
      </div>
      <button
        @click="loadProducts()"
        class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
      >
        載入產品
      </button>
    </div>
  </div>
    
</template>