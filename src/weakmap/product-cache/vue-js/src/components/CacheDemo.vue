<script setup>
import {ref,onMounted} from 'vue'

// Create an Object
const productA = ref({id:101,name:'產品A'})
const productB = ref({id:102,name:'產品B'})

const products = ref([])
//Create a WeakMap
const imageCache = new WeakMap()

const cacheA = {url:'https://woodmart.xtemos.com/pottery/wp-content/uploads/sites/16/2023/07/w-hp-bowl-3-1.jpg',size:'200KB'}
const cacheB = {url:'https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1.jpg',size:'300KB'}
//參數(鍵,值)
//鍵必須是物件
imageCache.set(productA.value,cacheA)
imageCache.set(productB.value,cacheB)

const simulateGarbageCollection = () => {
    const index = products.value.findIndex(p => p.id === productA.value.id)
    if(index !== -1){
        products.value.splice(index,1)
        //重點 在程式中沒有被引用，被垃圾收集。
        productA.value = null
    }
}

onMounted(() => {
    products.value.push(productA.value,productB.value)
})

</script>
<template>
<div class="bg-gray-100 h-screen p-8">
    <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-2">WeakMap 產品快取範例</h1>
      <p class="text-gray-600 mb-4">
        這個範例展示了 <code>WeakMap</code> 如何為物件（產品）建立一個「快取」，
        並且在物件被垃圾回收時，自動清除相關的快取資料。
      </p>
      <button
        @click="simulateGarbageCollection"
        class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
      >
        模擬產品從頁面移除
      </button>
      <div 
        id="output" 
        class="border border-gray-300 p-4 mt-6 rounded bg-gray-50 min-h-[100px]"
      >
        <div v-for="product in products" :key="product.id" class="w-1/2 p-2 text-center">
            <img 
                :src="imageCache.get(product)?.url" 
                :alt="product.name"
                class="w-full mb-2 rounded shadow-md"
            >
            <p class="text-lg font-semibold">{{ product.name }}</p>
        </div>

      </div>
    </div>
</div>
</template>
