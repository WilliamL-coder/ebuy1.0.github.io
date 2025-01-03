// 模拟登录状态
function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

function toggleLogin() {
    if (isLoggedIn()) {
        logout();
    } else {
        localStorage.setItem('isLoggedIn', 'true');
        document.getElementById('loginButton').style.display = 'none';
        document.getElementById('logoutButton').style.display = 'block';
        document.getElementById('createSection').style.display = 'block';
        updateProductList();
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    document.getElementById('loginButton').style.display = 'block';
    document.getElementById('logoutButton').style.display = 'none';
    document.getElementById('createSection').style.display = 'none';
    updateProductList();
}

// 商品相关操作
function getProducts() {
    let products = localStorage.getItem('products');
    return products? JSON.parse(products) : [];
}

function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

function addProduct(product) {
    let products = getProducts();
    products.push(product);
    saveProducts(products);
    updateProductList();
}

function deleteProduct() {
    let productId = parseInt(document.getElementById('productDetailModal').dataset.productId);
    let products = getProducts();
    products = products.filter(product => product.id!== productId);
    saveProducts(products);
    closeModal();
    updateProductList();
}

function updateProduct(product) {
    let products = getProducts();
    products = products.map(p => p.id === product.id? product : p);
    saveProducts(products);
    closeModal('editModal');
    updateProductList();
}

function openEditModal() {
    let productId = parseInt(document.getElementById('productDetailModal').dataset.productId);
    let products = getProducts();
    let product = products.find(p => p.id === productId);
    document.getElementById('editProductId').value = product.id;
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductDescription').value = product.description;
    document.getElementById('editProductPrice').value = product.price;
    document.getElementById('editProductImage').value = product.image;
    openModal('editModal');
}

function updateProductList() {
    let productList = document.getElementById('productList');
    productList.innerHTML = '';
    let products = getProducts();
    products.forEach(product => {
        let productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>价格: ${product.price}</p>
            ${product.image? `<img src="${product.image}">` : ''}
        `;
        productItem.dataset.productId = product.id;
        productItem.onclick = function () {
            showProductDetail(product);
        };
        if (isLoggedIn()) {
            let editButton = document.createElement('button');
            editButton.textContent = '编辑';
            editButton.onclick = function () {
                openEditModal();
            };
            let deleteButton = document.createElement('button');
            deleteButton.textContent = '删除';
            deleteButton.onclick = function () {
                deleteProduct();
            };
            productItem.appendChild(editButton);
            productItem.appendChild(deleteButton);
        }
        productList.appendChild(productItem);
    });
}

function showProductDetail(product) {
    document.getElementById('detailProductName').textContent = product.name;
    document.getElementById('detailProductDescription').textContent = product.description;
    document.getElementById('detailProductPrice').textContent = `价格: ${product.price}`;
    document.getElementById('detailProductImage').src = product.image || '';
    document.getElementById('productDetailModal').dataset.productId = product.id;
    if (isLoggedIn()) {
        document.getElementById('editButton').style.display = 'block';
        document.getElementById('deleteButton').style.display = 'block';
    } else {
        document.getElementById('editButton').style.display = 'none';
        document.getElementById('deleteButton').style.display = 'none';
    }
    openModal('productDetailModal');
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId = 'productDetailModal') {
    document.getElementById(modalId).style.display = 'none';
}

document.getElementById('createForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let product = {
        id: Date.now(),
        name: document.getElementById('productName').value,
        description: document.getElementById('productDescription').value,
        price: parseFloat(document.getElementById('productPrice').value),
        image: document.getElementById('productImage').value
    };
    addProduct(product);
    this.reset();
});

document.getElementById('editForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let product = {
        id: parseInt(document.getElementById('editProductId').value),
        name: document.getElementById('editProductName').value,
        description: document.getElementById('editProductDescription').value,
        price: parseFloat(document.getElementById('editProductPrice').value),
        image: document.getElementById('editProductImage').value
    };
    updateProduct(product);
    this.reset();
});

document.getElementById('closeModal').addEventListener('click', function () {
    closeModal();
});

document.getElementById('closeEditModal').addEventListener('click', function () {
    closeModal('editModal');
});

window.onload = function () {
    updateProductList();
    if (isLoggedIn()) {
        document.getElementById('loginButton').style.display = 'none';
        document.getElementById('logoutButton').style.display = 'block';
        document.getElementById('createSection').style.display = 'block';
    }
};