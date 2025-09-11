# JavaScript 概念範例

這個專案包含了各種 JavaScript 核心概念的程式碼範例，每個範例都獨立運作。

---

## 範例清單

### 1.類別繼承 ( Class Inheritance)
- **簡介**:展示如何使用類別繼承來建立不同種類的商品，並重用程式碼。
  - [**原生 JS 寫法 (畫面)**](./src/classes/classInheritance/plain-js/index.html)
  - [**原生 JS 寫法 (程式碼)**](./src/classes/classInheritance/plain-js/product-inheritance.js)
  - [**Vue 寫法**](./src/classes/classInheritance/vue-js/src/components/productInheritance.vue) 

- **簡介**:使用者角色繼承範例。此範例展示如何使用類別繼承來定義不同權限的使用者角色，並在畫面上顯示它們各自的獨特資訊與行為。
  - [**原生 JS 寫法 (畫面)**](./src/classes/classInheritance-2/plain-js/index.html)
  - [**原生 JS 寫法 (程式碼)**](./src/classes/classInheritance-2/plain-js/userRoleInheritance.js)
  - [**Vue 寫法**](./src/classes/classInheritance-2/vue-js/src/components/userRoleInheritance.vue)

### 2.WeakMap
- **簡介**:Class + WeakMap 隱藏庫存範例。在 Class 中儲存私有資料，並在物件被移除時自動清理(weakmap)。 
  - [**原生 JS 寫法 (畫面)**](./src/weakmap/class-weakmap/plain-js/index.html)
  - [**原生 JS 寫法 (程式碼)**](./src/weakmap/class-weakmap/plain-js/class-weakmap.js)
  - [**Vue 寫法**](./src/weakmap/class-weakmap/vue-js/src/components/classWeakmap.vue) 

- **簡介**:WeakMap 產品快取範例。WeakMap如何為物件（產品）建立一個「快取」，
        並且在物件被垃圾回收時，自動清除相關的快取資料。
  - [**原生 JS 寫法 (畫面)**](./src/weakmap/product-cache/plain-js/index.html)
  - [**原生 JS 寫法 (程式碼)**](./src/weakmap/product-cache/plain-js/private-data.js)
  - [**Vue 寫法**](./src/weakmap/product-cache/vue-js/src/components/CacheDemo.vue) 

### 3.Generators(生成器)
- **簡介**:Generator 惰性載入示範。使用 Generator 實現分批載入產品資料。
  - [**原生 JS 寫法 (畫面)**](./src/generators/plain-js/index.html)
  - [**原生 JS寫法 (程式碼)**](./src/generators/plain-js/infinite-scroll-demo.js)
  - [**Vue 寫法**](./src/generators/vue-js/src/components/InfiniteScroll.vue)

### 4.Nested Functions + Closures (巢狀函數+閉包)
- **簡介**:電商購物車的折扣計算範例。這個範例清楚地展示了巢狀函式如何利用閉包來存取父層的變數，實現資料的封裝和模組化。
  - [**原生 JS 寫法 (畫面)**](./src/functions/nested-closure/plain-js/index.html)
  - [**原生 JS寫法 (程式碼)**](./src/functions/nested-closure/plain-js/script.js)
  - [**Vue 寫法**](./src/functions/nested-closure/vue-js/src/components/nestedClosure.vue)

---

## 如何使用
1. Clone或下載此專案
2. 打開您感興趣的檔案，並在瀏覽器中運行。
3. 如果範例有搭配Vite專案，請先執行 `npm install`。