# Product Management System - CRUD Operations

A complete web application for managing products using JavaScript and JSON Server for API operations.

Una aplicación web completa para gestionar productos usando JavaScript y JSON Server.

## 🚀 Features

### English
- **Create** new products with name and price
- **Read** all products from the database  
- **Update** existing products
- **Delete** products with confirmation
- Auto-generated unique IDs
- Real-time product counter
- Loading states and error handling
- Responsive design

### Español
- **Crear** nuevos productos con nombre y precio
- **Leer** productos de la base de datos
- **Actualizar** productos existentes  
- **Eliminar** productos con confirmación
- IDs únicos auto-generados
- Contador en tiempo real
- Estados de carga y manejo de errores

## 📁 Project Structure

```
M3S3/
├── index.html                  # Main HTML file
├── src/
│   ├── data_base/
│   │   └── db.json            # JSON Server database
│   ├── java_script/
│   │   └── script.js          # Main JavaScript file
│   └── styles/
│       └── styles.css         # CSS styles
└── README.md                  # This file
```

## 🛠️ Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling  
- **JavaScript ES6+** - Logic
- **JSON Server** - Mock REST API
- **Fetch API** - HTTP requests

## 📋 Prerequisites

### English
- Node.js installed
- npm (comes with Node.js)
- Modern web browser

### Español
- Node.js instalado
- npm (viene con Node.js)
- Navegador web moderno

## 🚀 Installation & Setup

### Step 1: Install JSON Server
```bash
# Install JSON Server globally
npm install -g json-server
```

### Step 2: Navigate to Project
```bash
cd M3S3
```

### Step 3: Start JSON Server
```bash
json-server --watch src/data_base/db.json --port 3000
```

### Step 4: Open Application
Open `index.html` in your browser or use Live Server extension in VS Code.

## 🌐 API Endpoints

```
GET    http://localhost:3000/productos      # Get all products
GET    http://localhost:3000/productos/:id  # Get product by ID  
POST   http://localhost:3000/productos      # Create new product
PUT    http://localhost:3000/productos/:id  # Update product
DELETE http://localhost:3000/productos/:id  # Delete product
```

## 📖 Usage

### English
1. **Start JSON Server** using command above
2. **Open index.html** in browser
3. **Add Products**: Fill form and click "Add Product"  
4. **Edit Products**: Click "Edit" button on product card
5. **Delete Products**: Click "Delete" and confirm
6. **Refresh**: Click "Refresh List" to reload

### Español
1. **Iniciar JSON Server** con el comando de arriba
2. **Abrir index.html** en navegador
3. **Agregar**: Llenar formulario y clic "Add Product"
4. **Editar**: Clic "Edit" en tarjeta de producto
5. **Eliminar**: Clic "Delete" y confirmar
6. **Actualizar**: Clic "Refresh List"

## 💻 Code Explanation

### English

This JavaScript application implements a complete **CRUD system** with the following key components:

#### **Core Architecture**
- **API Configuration**: Base URL and global variables for state management
- **DOM Elements**: All form inputs and display containers captured at startup
- **Event Listeners**: Centralized setup for form submission, edit, and delete actions

#### **CRUD Operations**

**CREATE - Adding Products**
```javascript
async function createProduct(productData) {
    const newId = await generateNewId();
    // POST request with auto-generated unique ID
}
```
- Automatically generates unique IDs by finding highest existing ID + 1
- Sends POST request with product data to JSON Server
- Comprehensive error handling with user feedback

**READ - Loading Products**  
```javascript
async function loadProducts() {
    showLoading(true);
    const response = await fetch(API_URL);
    displayProducts(await response.json());
}
```
- Fetches all products from API with loading spinner
- Updates UI with dynamic product cards
- Real-time product counter updates

**UPDATE - Editing Products**
```javascript
function editProduct(id, name, price) {
    editingProductId = id;
    // Pre-fills form and switches to edit mode
}
```
- Switches form to edit mode with existing data
- Changes button text and shows cancel option
- Sends PUT request to update specific product

**DELETE - Removing Products**
```javascript
async function deleteProduct(id) {
    if (!confirm('Are you sure?')) return;
    // DELETE request with confirmation
}
```
- User confirmation dialog before deletion
- DELETE request to API endpoint
- Automatic list refresh after successful deletion

#### **UI Management**
- **Dynamic Cards**: Products displayed as responsive grid cards
- **Error Handling**: User-friendly messages with auto-hide (5 seconds)
- **Loading States**: Visual feedback during API operations
- **Form Validation**: Required fields and number validation for price

### Español

Esta aplicación JavaScript implementa un **sistema CRUD completo** con los siguientes componentes clave:

#### **Arquitectura Principal**
- **Configuración API**: URL base y variables globales para manejo de estado
- **Elementos DOM**: Todos los inputs y contenedores capturados al inicio
- **Event Listeners**: Configuración centralizada para formularios y acciones

#### **Operaciones CRUD**
- **CREATE**: Genera IDs únicos automáticamente y envía POST request
- **READ**: Obtiene productos con spinner de carga y actualiza UI dinámicamente  
- **UPDATE**: Cambia formulario a modo edición y envía PUT request
- **DELETE**: Confirmación de usuario y DELETE request con recarga automática

#### **Gestión de UI**
- **Tarjetas Dinámicas**: Productos en grid responsivo
- **Manejo de Errores**: Mensajes amigables con auto-ocultado
- **Estados de Carga**: Feedback visual durante operaciones API
- **Validación**: Campos requeridos y validación numérica

## 🐛 Troubleshooting

### Common Issues

**JSON Server not starting**
```bash
# Check if you're in correct directory
pwd
ls src/data_base/db.json
```

**Port already in use**  
```bash
# Use different port
json-server --watch src/data_base/db.json --port 3001
# Update API_URL in script.js accordingly
```

**CORS Issues**
```bash
# JSON Server has CORS enabled by default
# If issues persist, try:
json-server --watch src/data_base/db.json --port 3000 --host 0.0.0.0
```


---

**Happy Coding! / ¡Feliz Programación!** 🚀