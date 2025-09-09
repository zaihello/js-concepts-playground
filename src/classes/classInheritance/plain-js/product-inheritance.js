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
    // 取得所有商品共有的 HTML 模板
    getHtml() {
        return `
            <p class="font-bold text-lg">${this.getDetails().name}</p>
            <p class="text-gray-700">價格: $${this.getDetails().price}</p>
        `            
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
    getHtml() {
        return `
            ${super.getHtml()}
            <p class="text-gray-700">重量: ${this.getDetails().weight}g</p>
            <p class="text-sm text-gray-500 mt-2">(${this.getDetails().type})</p>
        `
    }
}

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
    getHtml() {
        return `
            ${super.getHtml()}
            <a href="${this.getDetails().downloadUrl}" class="text-blue-500 hover:underline">下載連結</a>
            <p class="text-sm text-gray-500 mt-2">(${this.getDetails().type})</p>
        `
    }
}

function renderProductCard(product) {
    const card = document.createElement('div')
    card.className = 'w-full md:w-1/3 lg:w-1/4 p-4 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center text-center'
    card.innerHTML = product.getHtml()

    document.getElementById('product-list').appendChild(card)
}

const genericProduct = new Product('通用商品',100)
const chair = new PhysicalProduct('復古木椅',2500,15000)
const ebook = new DigitalProduct('JS教學電子書',500,'https://example.com/js-ebook.pdf')

renderProductCard(genericProduct)
renderProductCard(chair)
renderProductCard(ebook)