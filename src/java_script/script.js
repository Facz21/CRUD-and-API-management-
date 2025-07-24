// API Configuration
const API_URL = 'http://localhost:3000/productos';

// Global Variables
let editingProductId = null;

// DOM Elements
const productForm = document.getElementById('productForm');
const productName = document.getElementById('productName');
const productPrice = document.getElementById('productPrice');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const refreshBtn = document.getElementById('refreshBtn');
const productsList = document.getElementById('productsList');
const productCount = document.getElementById('productCount');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');

// Event Listeners Setup
document.addEventListener('DOMContentLoaded', function() {
    loadProducts(); // Load products when page loads
    setupEventListeners(); // Setup all event listeners
});

// Setup all event listeners for the application
function setupEventListeners() {
    productForm.addEventListener('submit', handleFormSubmit);
    cancelBtn.addEventListener('click', cancelEdit);
    refreshBtn.addEventListener('click', loadProducts);
}

// Show or hide loading spinner
function showLoading(show = true) {
    loading.style.display = show ? 'block' : 'none';
}

// Display error messages to user
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    // Auto-hide error message after 5 seconds
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// ============= CRUD OPERATIONS =============

// Generate new unique ID for products
async function generateNewId() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        
        // If no products exist, start with ID 1
        if (products.length === 0) {
            return 1;
        }
        
        // Find the highest ID and add 1
        const maxId = Math.max(...products.map(product => parseInt(product.id)));
        return maxId + 1;
    } catch (error) {
        // If error occurs, use timestamp as fallback
        return Date.now();
    }
}

// CREATE - Add new product to database
async function createProduct(productData) {
    try {
        // Generate unique ID for new product
        const newId = await generateNewId();
        const productWithId = {
            ...productData,
            id: newId.toString() // Convert to string for consistency
        };

        // Send POST request to API
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productWithId)
        });

        // Check if request was successful
        if (!response.ok) {
            throw new Error('Error creating product');
        }

        const newProduct = await response.json();
        console.log('Product created:', newProduct);
        return newProduct;
    } catch (error) {
        console.error('Error:', error);
        showError('Error creating product: ' + error.message);
        throw error;
    }
}

// READ - Load all products from database
async function loadProducts() {
    showLoading(true); // Show loading spinner
    try {
        // Fetch products from API
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Error loading products');
        }

        const products = await response.json();
        displayProducts(products); // Display products in UI
        updateProductCount(products.length); // Update product counter
    } catch (error) {
        console.error('Error:', error);
        showError('Error loading products: ' + error.message);
    } finally {
        showLoading(false); // Hide loading spinner
    }
}

// UPDATE - Update existing product in database
async function updateProduct(id, productData) {
    try {
        // Send PUT request to update product
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData)
        });

        if (!response.ok) {
            throw new Error('Error updating product');
        }

        const updatedProduct = await response.json();
        console.log('Product updated:', updatedProduct);
        return updatedProduct;
    } catch (error) {
        console.error('Error:', error);
        showError('Error updating product: ' + error.message);
        throw error;
    }
}

// DELETE - Remove product from database
async function deleteProduct(id) {
    // Ask user for confirmation before deleting
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }

    try {
        // Send DELETE request to API
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Error deleting product');
        }

        console.log('Product deleted:', id);
        loadProducts(); // Reload product list after deletion
    } catch (error) {
        console.error('Error:', error);
        showError('Error deleting product: ' + error.message);
    }
}

// ============= FORM HANDLING =============

// Handle form submission for create/update operations
async function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    // Extract form data
    const formData = new FormData(productForm);
    const productData = {
        name: formData.get('name'),
        price: parseFloat(formData.get('price'))
    };

    try {
        if (editingProductId) {
            // Update existing product
            await updateProduct(editingProductId, productData);
            console.log('Product updated successfully');
        } else {
            // Create new product
            await createProduct(productData);
            console.log('Product created successfully');
        }

        // Reset form and reload product list
        resetForm();
        loadProducts();
    } catch (error) {
        // Error handling is done in individual CRUD functions
    }
}

// Set form to edit mode with product data
function editProduct(id, name, price) {
    editingProductId = id; // Set product ID being edited
    productName.value = name; // Fill form with existing data
    productPrice.value = price;
    submitBtn.textContent = 'Update Product'; // Change button text
    cancelBtn.style.display = 'inline-block'; // Show cancel button
}

// Cancel edit mode and reset form
function cancelEdit() {
    resetForm();
}

// Reset form to initial state (create mode)
function resetForm() {
    editingProductId = null; // Clear editing ID
    productForm.reset(); // Clear form fields
    submitBtn.textContent = 'Add Product'; // Reset button text
    cancelBtn.style.display = 'none'; // Hide cancel button
}

// ============= DISPLAY FUNCTIONS =============

// Display products in the UI grid
function displayProducts(products) {
    productsList.innerHTML = ''; // Clear existing products

    // Show message if no products exist
    if (products.length === 0) {
        productsList.innerHTML = '<p class="no-products">No products available</p>';
        return;
    }

    // Create and display product cards
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsList.appendChild(productCard);
    });
}

// Create individual product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Set card HTML content with product data and action buttons
    card.innerHTML = `
        <h3>${product.name}</h3>
        <p class="price">$${product.price}</p>
        <div class="product-actions">
            <button class="edit-btn" onclick="editProduct(${product.id}, '${product.name}', ${product.price})">
                Edit
            </button>
            <button class="delete-btn" onclick="deleteProduct(${product.id})">
                Delete
            </button>
        </div>
    `;
    return card;
}

// Update product counter display
function updateProductCount(count) {
    productCount.textContent = `Total: ${count} product${count !== 1 ? 's' : ''}`;
}