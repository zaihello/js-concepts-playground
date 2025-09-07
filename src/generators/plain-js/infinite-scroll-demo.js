function* getProductsFromDatabase(){
    yield ["產品 A", "產品 B", "產品 C", "產品 D", "產品 E"];
    yield ["產品 F", "產品 G", "產品 H", "產品 I", "產品 J"];
    yield ["產品 K", "產品 L", "產品 M", "產品 N", "產品 O"];
}

const productGenerator = getProductsFromDatabase()

// 第一次載入頁面時，顯示第一批產品
let outputDiv = document.getElementById("output")

function loadProducts(){
    const result = productGenerator.next()

    if(result.done){
        outputDiv.innerHTML += "<p style='color:red'>所有產品都已載入！</p>"
        document.querySelector('button').disabled = true
    }else{
        outputDiv.innerHTML += `<h3>從資料庫載入中...</h3>`

        const productsHtml = result.value.map(p => `<div>${p}</div>`).join('')
        outputDiv.innerHTML += productsHtml

    }
}
// 首次載入
loadProducts()