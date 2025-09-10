<script setup>
import { ref,onMounted} from 'vue' 
//定義User父類別
class User {
    constructor(name,email) {
        this.name = name
        this.email = email
    }
    getInfo() {
        return {
            name:this.name,
            email:this.email,
            role:'一般使用者'
        }
    }
} 
//建立Admin子類別
class Admin extends User {
    constructor(name,email,department) {
        super(name,email)
        this.department = department
    }
    getInfo() {
        const info = super.getInfo()
        return {
            ...info,
            department:this.department,
            role:'管理員'
        }
    }
    canEditProducts() { return true }
    canDeleteUsers() { return true }
}
//建立Customer子類別
class Customer extends User {
    constructor(name,email) {
        super(name,email)
    }
    getInfo() {
        const info = super.getInfo()
        return {
            ...info,
            role:'客戶'
        }
    }
    canPurchase() { return true }
}
//建立 VipCustomer子類別
class VipCustomer extends Customer {
    constructor(name,email,discountRate) {
        super(name,email)
        this.discountRate = discountRate
    }
    getInfo() {
        const info = super.getInfo()
        return {
            ...info,
            discountRate:this.discountRate,
            role:'VIP 客戶'
        }
    }
    getDiscountRate() { return this.discountRate }
}

const users = ref([])

onMounted(() => {
    users.value.push(
        new Admin('陳經理','chen@example.com','IT部'),
        new Customer('李小胖','li@example.com'),
        new VipCustomer('王VIP','wang@example.com',0.25)
    )
})

</script>
<template>
<div class="bg-gray-100 p-8">
    <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-2">使用者角色繼承範例</h1>
      <p class="text-gray-600 mb-4">
        此範例展示如何使用類別繼承來定義不同權限的使用者角色，並在畫面上顯示它們各自的獨特資訊與行為。
      </p>
      
      <div  class="flex flex-wrap gap-6 justify-center md:justify-start">
        <div 
          v-for="(user,index) in users" 
          :key="index" 
          class="w-full md:w-1/2 lg:w-1/3 p-4 bg-gray-50 rounded-lg shadow-sm">
            <h3 class="font-bold text-lg">{{ user.getInfo().name }}</h3>
            <p class="text-gray-700 mb-2">信箱: {{ user.getInfo().email }}</p>

            <div v-if="user instanceof Admin">
                <p class="text-gray-700">部門: {{ user.getInfo().department }}</p>
                <p class="text-sm text-green-600 font-bold mt-2">權限:可編輯產品與刪除使用者</p>
            </div>
            <div v-else-if="user instanceof VipCustomer">
                <p class="text-gray-700">專屬折扣: {{ user.getInfo().discountRate * 100 }}%</p>
                <p class="text-sm text-yellow-600 font-bold mt-2">會員: 可享有獨家優惠</p>
            </div>
            <div v-else-if="user instanceof Customer">
                 <p class="text-sm text-blue-600 font-bold mt-2">權限: 可購買商品</p>                
            </div>
            <p class="text-sm text-gray-500 mt-2">({{ user.getInfo().role }})</p>
        </div>


      </div>
     
    </div>
</div>    
</template>