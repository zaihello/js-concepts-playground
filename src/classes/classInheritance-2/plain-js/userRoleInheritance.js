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
//建立函式來動態渲染使用者卡片
function renderUserCard(user) {
    const info = user.getInfo()
    const card = document.createElement('div')

    card.className = 'w-full md:w-1/2 lg:w-1/3 p-4 bg-gray-50 rounded-lg shadow-sm'
    
    let uniqueContent = ''

    if(user instanceof Admin) {
        uniqueContent = `
            <p class="text-gray-700">部門: ${info.department}</p>
            <p class="text-sm text-green-600 font-bold mt-2">權限:可編輯產品與刪除使用者</p>
        `
    } else if (user instanceof VipCustomer) { 
        uniqueContent = `
            <p class="text-gray-700">專屬折扣: ${info.discountRate * 100}%</p>
            <p class="text-sm text-yellow-600 font-bold mt-2">會員: 可享有獨家優惠</p>
        `
    } else if (user instanceof Customer) {
        uniqueContent = `
            <p class="text-sm text-blue-600 font-bold mt-2">權限: 可購買商品</p>
        `
    }

    card.innerHTML = `
        <h3 class="font-bold text-lg">${info.name}</h3>
        <p class="text-gray-700 mb-2">信箱: ${info.email}</p>
        ${uniqueContent}
        <p class="text-sm text-gray-500 mt-2">(${info.role})</p>
    `

    document.getElementById('user-list').appendChild(card)
}

const adminUser = new Admin('陳經理','chen@example.com','IT部')
const customerUser = new Customer('李小胖','li@example.com')
const vipUesr = new VipCustomer('王VIP','wang@example.com',0.25)

renderUserCard(adminUser)
renderUserCard(customerUser)
renderUserCard(vipUesr)