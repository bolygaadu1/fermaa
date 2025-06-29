import express from 'express';
import multer from 'multer';
import path from 'path';
import { promises as fs } from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://127.0.0.1:8080', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files only in production
if (isProduction) {
  app.use(express.static('dist'));
}
app.use('/uploads', express.static('uploads'));

// Ensure data directories exist
const ensureDirectories = async () => {
  try {
    await fs.mkdir('data', { recursive: true });
    await fs.mkdir('uploads', { recursive: true });
    console.log('Directories created successfully');
  } catch (error) {
    console.error('Error creating directories:', error);
  }
};

// Initialize directories
await ensureDirectories();

// File storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
});

// Helper functions for data persistence
const readOrders = async () => {
  try {
    const data = await fs.readFile('data/orders.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

const writeOrders = async (orders) => {
  await fs.writeFile('data/orders.json', JSON.stringify(orders, null, 2));
};

const readFiles = async () => {
  try {
    const data = await fs.readFile('data/files.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

const writeFiles = async (files) => {
  await fs.writeFile('data/files.json', JSON.stringify(files, null, 2));
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Routes

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await readOrders();
    res.json(orders);
  } catch (error) {
    console.error('Error reading orders:', error);
    res.status(500).json({ error: 'Failed to read orders' });
  }
});

// Create new order
app.post('/api/orders', async (req, res) => {
  try {
    const orders = await readOrders();
    const newOrder = {
      ...req.body,
      orderId: `ORD-${Date.now()}`,
      orderDate: new Date().toISOString(),
      status: 'pending'
    };
    
    orders.push(newOrder);
    await writeOrders(orders);
    
    res.json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Update order status
app.put('/api/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    
    const orders = await readOrders();
    const orderIndex = orders.findIndex(order => order.orderId === orderId);
    
    if (orderIndex === -1) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    orders[orderIndex].status = status;
    await writeOrders(orders);
    
    res.json(orders[orderIndex]);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// Get order by ID
app.get('/api/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const orders = await readOrders();
    const order = orders.find(order => order.orderId === orderId);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error finding order:', error);
    res.status(500).json({ error: 'Failed to find order' });
  }
});

// Delete all orders
app.delete('/api/orders', async (req, res) => {
  try {
    await writeOrders([]);
    res.json({ message: 'All orders deleted' });
  } catch (error) {
    console.error('Error deleting orders:', error);
    res.status(500).json({ error: 'Failed to delete orders' });
  }
});

// File upload endpoint
app.post('/api/upload', upload.array('files'), async (req, res) => {
  try {
    console.log('Upload request received:', req.files?.length || 0, 'files');
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const files = await readFiles();
    const uploadedFiles = req.files.map(file => ({
      name: file.originalname,
      size: file.size,
      type: file.mimetype,
      path: `/uploads/${file.filename}`,
      serverPath: file.path
    }));
    
    files.push(...uploadedFiles);
    await writeFiles(files);
    
    console.log('Files uploaded successfully:', uploadedFiles.length);
    res.json(uploadedFiles);
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ error: 'Failed to upload files' });
  }
});

// Get all files
app.get('/api/files', async (req, res) => {
  try {
    const files = await readFiles();
    res.json(files);
  } catch (error) {
    console.error('Error reading files:', error);
    res.status(500).json({ error: 'Failed to read files' });
  }
});

// Delete all files
app.delete('/api/files', async (req, res) => {
  try {
    const files = await readFiles();
    
    // Delete physical files
    for (const file of files) {
      try {
        if (file.serverPath) {
          await fs.unlink(file.serverPath);
        }
      } catch (error) {
        console.error('Error deleting file:', file.serverPath, error);
      }
    }
    
    await writeFiles([]);
    res.json({ message: 'All files deleted' });
  } catch (error) {
    console.error('Error deleting files:', error);
    res.status(500).json({ error: 'Failed to delete files' });
  }
});

// Admin login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  // In production, use proper authentication
  if (username === 'admin' && password === 'xerox123') {
    res.json({ success: true, token: 'admin-token' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Serve React app for all other routes (only in production)
if (isProduction) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${isProduction ? 'production' : 'development'}`);
  console.log(`📁 Data directory: ${path.join(__dirname, 'data')}`);
  console.log(`📂 Uploads directory: ${path.join(__dirname, 'uploads')}`);
});