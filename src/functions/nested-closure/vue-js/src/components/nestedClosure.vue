<script setup>
import { ref,computed}  from 'vue'  

const DISCOUNT_RATE = 0.15

const cartItems = ref([])

const products = [
    {name:'智慧型手機',price:500},
    {name:'藍芽耳機',price:120},
    {name:'筆記型電腦',price:1200},
]
//使用 computed 屬性，取代手動的 calculateTotal 和 updateCartDisplay
const cartTotal = computed(() => {
    let subtotal = 0
    for(const item of cartItems.value) {
        subtotal += item.price * item.quantity
    }
    const discountedTotal = subtotal * (1 - DISCOUNT_RATE)
    return discountedTotal
})

function addItem(product) {
    const existingItem = cartItems.value.find(i => i.name === product.name)
    if (existingItem) {
        existingItem.quantity += 1
    } else {
        cartItems.value.push({...product,quantity: 1 })
    }
}
</script>
<template>
<div class="bg-gray-100 p-8">
    <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-2">電商購物車的折扣計算 範例</h1>
      <p class="text-gray-600 mb-4">此範例展示了如何使用 <b>巢狀函式</b> 和 <b>閉包</b> 來封裝購物車的資料。</p>
      <p class="text-gray-600 mb-4">點擊按鈕，將產品加入購物車並計算總價。</p>
      <div class="mb-8 border border-gray-200 p-6 rounded-lg">
        <h2>商品列表</h2>
        <div 
          v-for="product in products"
          class="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-md">
            <span class="text-lg">{{ product.name }}</span>
            <span class="text-lg font-medium text-gray-700">${{ product.price }}</span>
            <button 
                @click="addItem(product)"
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-200">加入購物車</button>
        </div>
      </div>

      <div class="border border-gray-200 p-6 rounded-lg bg-gray-50">
        <h2 class="text-2xl font-semibold mb-4 text-blue-600">購物車摘要</h2>
        <p class="text-lg mb-2">折扣率 : <span class="font-semibold text-red-500">{{(DISCOUNT_RATE * 100).toFixed(0)}}%</span></p>
        <p class="text-xl font-bold">購物車總價 (已折扣) : <span class="text-red-600">${{ cartTotal.toFixed(0) }}</span></p>
      </div>
      
    </div>
</div>    
</template>