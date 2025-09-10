<script setup>
import { ref,onMounted } from 'vue'

//定義Product 父類別
class Product {
    //使用new建立物件，被呼叫並只執行一次
    //設定資料
    constructor(name,price) {
        this.name = name
        this.price = price
    }
    //公開方法
    //讀取資料
    // 取得所有商品共有的詳細資訊
    getDetails() {
        return {
            name:this.name,
            price:this.price,
            type:'通用商品'
        }
    }
}
//建立 PhysicalProduct 子類別
class PhysicalProduct extends Product {
    constructor(name,price,weight) {
        //super是執行父類別的constructor,讓name 和 price 這兩個參數轉交給父類別 被正確初始化
        super(name,price)
        this.weight = weight
    } 
    getDetails() {
        //super呼叫父類別的方法
        const details = super.getDetails()
        return {
            ...details,
            weight:this.weight,
            type:'實體商品'
        }
    }   
}
// 建立 DigitalProduct 子類別
class DigitalProduct extends Product {
     constructor(name,price,downloadUrl) {
        super(name,price)
        this.downloadUrl = downloadUrl
    }
    getDetails() {
        const details = super.getDetails()
        return {
            ...details,
            downloadUrl:this.downloadUrl,
            type:'數位商品'
        }
    }    
}

const products = ref([])

onMounted(() => {
    products.value.push(
        new Product('通用商品',100),
        new PhysicalProduct('復古木椅',2500,15000),
        new DigitalProduct('JS教學電子書',500,'https://example.com/js-ebook.pdf')
    )
})

</script>
<template>
<div class="bg-gray-100 p-8">
    <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-2">商品類別繼承範例</h1>
      <p class="text-gray-600 mb-4">
        此範例展示如何使用類別繼承來定義不同種類的商品，並在畫面上顯示它們各自的獨特資訊。
      </p>
      <div id="product-list" class="flex flex-wrap gap-6 justify-center md:justify-start">
        <div
          v-for="(product,index) in products"
          :key="index"
          class="w-full md:w-1/3 lg:w-1/4 p-4 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center text-center"
        >
            <p class="font-bold tetx-lg">{{ product.name }}</p>
            <p class="text-gray-700">價格: ${{ product.price }}</p>

            <p v-if="product instanceof PhysicalProduct" class="text-gray-700">
                重量: {{ product.weight }}
            </p>
            <a 
              v-if="product instanceof DigitalProduct"
              :href="product.downloadUrl"
              class="text-blue-500 hover:underline"
            >
              下載連結
            </a>
            <p class="text-sm text-gray-500 mt-2">{{ product.getDetails().type}}</p>
        </div>
      </div>
     
    </div>
</div>    
</template>