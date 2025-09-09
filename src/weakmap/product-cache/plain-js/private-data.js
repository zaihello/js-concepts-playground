
let productA = {id:101,name:'產品A'}
let productB = {id:102,name:'產品B'}

const imageCache = new WeakMap()

const outputDiv = document.getElementById('output')

function logToPage(message){
    outputDiv.innerHTML += `<p>${message}</p>`
    console.log(message)
}

function displayProduct(product,cache){
    const productContainer = document.createElement('div')
    productContainer.id = `product-${product.id}`
    productContainer.className = 'w-1/2 p-2 text-center'

    const img = document.createElement('img')
    img.src = cache.url
    img.alt = product.name
    img.className = 'w-full mb-2 rounded shadow-md'

    const name = document.createElement('p')
    name.textContent = product.name
    name.className = 'text-lg font-semibold'

    productContainer.appendChild(img)
    productContainer.appendChild(name)
    outputDiv.appendChild(productContainer)

}

logToPage('--- 步驟 1: 快取產品圖片 ---')
const cacheA = {url:'https://woodmart.xtemos.com/wp-content/uploads/2016/09/product-furniture-19.jpg',size:'200KB'}
const cacheB = {url:'https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1.jpg',size:'300KB'}

imageCache.set(productA,cacheA)
logToPage(`已將產品 A 加入快取。快取中是否有產品 A？ ${imageCache.has(productA)}`)

imageCache.set(productB,cacheB)
logToPage(`已將產品 B 加入快取。快取中是否有產品 B？ ${imageCache.has(productB)}`)

logToPage('--- 步驟 2: 在畫面上顯示產品 ---')
displayProduct(productA,imageCache.get(productA))
displayProduct(productB,imageCache.get(productB))

function simulateGarbageCollection(){
    logToPage('--- 步驟 3: 模擬產品 A 從 DOM 移除 ---')
    const productAElement = document.getElementById('product-101')
    if(productAElement){
        productAElement.remove()
        logToPage('產品 A 元素已從頁面移除！')
    }

    logToPage('--- 步驟 4: 將 productA 變數設為 null ---')

    productA = null
    logToPage('將 productA 變數設為 null，等待垃圾回收...')

    logToPage('--- 步驟 5: 檢查 WeakMap ---')
    logToPage(`快取中是否有產品 B？ ${imageCache.has(productB)}`)
}