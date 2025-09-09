//儲存私有資料
const _stock = new WeakMap()
//公開的 Product Class
class product {
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

const productDisplay = document.getElementById('productDisplay')
const logOutput = document.getElementById('logOutput')
const removeProductBtn = document.getElementById('removeProductBtn')

function logToPage(message) {
    logOutput.innerHTML += `<p class="text-sm my-1">${message}</p>`
}

function renderProduct(product) {
    const card = document.createElement('div')
    card.id = `product-${product.id}`
    card.className = 'product-card w-48 text-center'
    card.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}" class="rounded-lg shadow-md mb-2"></img>
        <p class="font-bold">${product.name}</p>
        <p>價格: $${product.price}</p>
        <p class="text-xs text-gray-500">公開資料</p>
    `
    productDisplay.appendChild(card)
}

//創建一個新的product實例
let chair = new product(
    'SKU101',
    '盤子',
    2500,
    10,
    'https://woodmart.xtemos.com/pottery/wp-content/uploads/sites/16/2023/08/w-hp-plate-11-1.jpg'
)

renderProduct(chair)
logToPage('--- 產品已載入 ---')
logToPage(`商品 "${chair.name}" 已顯示在頁面上。`)
logToPage(`檢查私有資料: 庫存數量為 ${chair.getInternalStock().stock}`)

removeProductBtn.addEventListener('click',() => {
    logToPage('--- 點擊「移除產品」按鈕 ---')

    const productAElement = document.getElementById(`product-${chair.id}`)
    if(productAElement) {
        productAElement.remove()
    }

    logToPage(`已從畫面上移除商品 "${chair.name}"。`)

    let oldChair = chair
    //將 chair 變數設為 null，斷開對原始物件的強引用
    chair = null

    logToPage('將 chair 變數設為 null...')

    setTimeout(() => {
        logToPage(`WeakMap 中是否還存在舊產品的資料？ <span class="text-red-500 font-bold">${_stock.has(oldChair)}</span>`)
        logToPage('這證明 WeakMap 已經知道物件不再被引用，並會自動清理相關資料。')
    },100);
})