<script setup>
import {ref,onMounted} from 'vue'

const _stock = new WeakMap()

class Product {
    constructor(id,name,price,internalStock,imageUrl) {
        this.id = id
        this.name = name
        this.price = price
        this.imageUrl = imageUrl
        //私有屬性：使用 WeakMap 將內部庫存與當前實例 (this) 關聯起來
        _stock.set(this,{
            stock:internalStock,
            lastUpdated:new Date()
        })
    }

    getInternalStock() {
        return _stock.get(this)
    }
}

const products = ref([])
const logs = ref([])

const logToPage = (message) => {
    logs.value.push(message)
}

const chair = new Product(
    'SKU101',
    '盤子',
    2500,
    10,
    'https://woodmart.xtemos.com/pottery/wp-content/uploads/sites/16/2023/08/w-hp-plate-11-1.jpg'
)

const simulateRemoval = () => {
    logToPage('--- 點擊「移除產品」按鈕 ---')

    const index = products.value.findIndex(p => p.id === chair.id)
    if(index !== -1) {
        products.value.splice(index,1)
    }
    logToPage(`已從畫面上移除商品 "${chair.name}"。`)

    const oldChair = chair
    const chairToNull = () => {
        return null 
    }
    chairToNull()

    logToPage('將 chair 變數設為 null...')

    setTimeout(() => {
        logToPage(`WeakMap 中是否還存在舊產品的資料？ <span class="text-red-500 font-bold">${_stock.has(oldChair)}</span>`)
        logToPage('這證明 WeakMap 已經知道物件不再被引用，並會自動清理相關資料。')
    },100);

}

onMounted(() => {
    products.value.push(chair)
    logToPage('--- 產品已載入 ---')
    logToPage(`商品 "${chair.name}" 已顯示在頁面上。`)
    logToPage(`檢查私有資料: 庫存數量為 ${chair.getInternalStock().stock}`)
})

</script>
<template>
<div class="bg-gray-100 p-8">
    <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-2">Class + WeakMap 隱藏庫存範例</h1>
      <p class="text-gray-600 mb-4">
        這個 Vue 範例使用 <code>WeakMap</code> 在 Class 中儲存私有資料，並在物件被移除時自動清理。
      </p>
      <button
        @click="simulateRemoval"
        class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
      >
        移除產品
      </button>
      <div id="productDisplay" class="flex justify-start gap-6 mt-6">
        <div v-for="product in products" :key="product.id" class="product-card w-48 text-center">
            <img :src="product.imageUrl" :alt="product.name" class="rounded-lg shadow-md mb-2 object-cover h-40 w-full">
            <p class="font-bold">{{ product.name }}</p>
            <p>價格: ${{ product.price }} </p>
            <p class="text-xs text-gray-500">公開資料</p>

        </div>
      </div>
      <div id="logOutput" class="border border-gray-300 p-4 mt-6 rounded bg-gray-50 min-h-[100px] text-gray-800">
        <h2 class="font-bold mb-2">操作日誌</h2>
        <p v-for="(log,index) in logs" :key="index" class="text-sm my-1" v-html="log"></p>
      </div>
    </div>
</div>
</template>