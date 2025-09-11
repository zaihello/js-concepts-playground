//當createCart函式執行完畢，區域變數cartItems、discountRate理應被清除。discountRate、cartItems這2個變數被封裝
//閉包內層函式能存取外層韓式的變數
// 主函式：創建一個帶有特定折扣的購物車
function createCart(discountRate) {
    const cartItems = []
    //巢狀函式：計算總價
    function calculateTotal() {
        let subtotal = 0
        for (const item of cartItems) {
            subtotal += item.price * item.quantity
        }
        const discountedTotal = subtotal * (1-discountRate)
        return discountedTotal
    }
    //
    return {
        addItem: function(item) {
            const existingItem = cartItems.find(i => i.name === item.name)
            if(existingItem) {
                existingItem.quantity += 1
            } else {
                cartItems.push({...item,quantity: 1})
            }
        },
        getCartTotal: function() {
            return calculateTotal()
        }
    }
}

const DISCOUNT_RATE = 0.15
const myCart = createCart(DISCOUNT_RATE)

document.getElementById('discount-display').textContent = `${(DISCOUNT_RATE * 100).toFixed(0)}%`

function updateCartDisplay() {
    const total = myCart.getCartTotal()
    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click',(event) => {
        const productItemDiv = event.target.closest('div[data-name]')
        const itemName = productItemDiv.dataset.name
        const itemPrice = parseFloat(productItemDiv.dataset.price) 

        myCart.addItem({name:itemName,price:itemPrice})
        updateCartDisplay()
    })
})
//因為程式碼最一開始，購物車是空的，需要呼叫一次來顯示初始的 $0.00。
updateCartDisplay()