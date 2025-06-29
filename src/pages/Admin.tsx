import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import OrdersList from '@/components/admin/OrdersList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, Download, FileText, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { orderAPI, fileAPI } from '@/services/api';

const Admin = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showClearFilesDialog, setShowClearFilesDialog] = useState(false);
  const [showClearOrdersDialog, setShowClearOrdersDialog] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    
    if (!adminLoggedIn) {
      navigate('/login');
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/login');
  };

  const downloadAllFiles = async () => {
    try {
      const files = await fileAPI.getAll();
      
      if (files.length === 0) {
        toast.info("No files available to download");
        return;
      }
      
      toast.success(`Found ${files.length} files. Download them individually from the files list.`);
    } catch (error) {
      console.error('Error fetching files:', error);
      toast.error("Failed to fetch files");
    }
  };

  const clearAllFiles = async () => {
    try {
      await fileAPI.deleteAll();
      toast.success("All uploaded files have been cleared");
      setShowClearFilesDialog(false);
    } catch (error) {
      console.error('Error clearing files:', error);
      toast.error("Failed to clear files");
    }
  };

  const clearAllOrders = async () => {
    try {
      await orderAPI.deleteAll();
      toast.success("All orders have been cleared");
      setShowClearOrdersDialog(false);
      // Force reload the component to update UI
      window.location.reload();
    } catch (error) {
      console.error('Error clearing orders:', error);
      toast.error("Failed to clear orders");
    }
  };
  
  if (!isLoggedIn) {
    return null; // Don't render anything while checking auth state
  }

  return (
    <PageLayout>
      <div className="py-6 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-10 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="mt-2 text-gray-600 text-sm sm:text-base">
                Manage orders and settings
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout} 
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
          
          <Tabs defaultValue="orders" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 sm:mb-8 w-full sm:w-auto">
              <TabsTrigger value="orders" className="text-xs sm:text-sm">Orders</TabsTrigger>
              <TabsTrigger value="settings" className="text-xs sm:text-sm">Settings</TabsTrigger>
              <TabsTrigger value="files" className="text-xs sm:text-sm">Files</TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
                <h2 className="text-lg sm:text-xl font-semibold">All Orders</h2>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50 w-full sm:w-auto text-sm"
                  onClick={() => setShowClearOrdersDialog(true)}
                >
                  <Trash2 className="h-4 w-4" /> Clear All Orders
                </Button>
              </div>
              <OrdersList />
            </TabsContent>
            <TabsContent value="settings" className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-100">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Settings</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-md">
                  <h3 className="font-medium text-gray-700 text-sm sm:text-base">File Storage</h3>
                  <p className="mt-1 text-gray-600 text-sm">Customer files are stored on the server in the uploads folder. 
                  Files are automatically managed and can be downloaded from the admin panel.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-md">
                  <h3 className="font-medium text-gray-700 text-sm sm:text-base">Admin Credentials</h3>
                  <p className="mt-1 text-gray-600 text-sm">Username: admin | Password: xerox123</p>
                  <p className="text-xs text-gray-500 mt-1">This is for demonstration purposes only. In a real app, you would use secure credential storage.</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="files" className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
                <h2 className="text-lg sm:text-xl font-semibold">All Uploaded Files</h2>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 text-sm"
                    onClick={downloadAllFiles}
                  >
                    <Download className="h-4 w-4" /> View All Files
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50 text-sm"
                    onClick={() => setShowClearFilesDialog(true)}
                  >
                    <Trash2 className="h-4 w-4" /> Clear All Files
                  </Button>
                </div>
              </div>
              <FilesManager />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Alert Dialog for clearing files */}
      <AlertDialog open={showClearFilesDialog} onOpenChange={setShowClearFilesDialog}>
        <AlertDialogContent className="mx-4">
          <AlertDialogHeader>
            <AlertDialogTitle>Clear All Files</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to clear all uploaded files? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={clearAllFiles} className="bg-red-600 hover:bg-red-700 w-full sm:w-auto">
              Yes, Clear All Files
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Alert Dialog for clearing orders */}
      <AlertDialog open={showClearOrdersDialog} onOpenChange={setShowClearOrdersDialog}>
        <AlertDialogContent className="mx-4">
          <AlertDialogHeader>
            <AlertDialogTitle>Clear All Orders</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to clear all orders? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={clearAllOrders} className="bg-red-600 hover:bg-red-700 w-full sm:w-auto">
              Yes, Clear All Orders
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout>
  );
};

// Simple files manager component
const FilesManager = () => {
  const [files, setFiles] = useState<Array<{name: string, size: number, type: string, path: string}>>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      setLoading(true);
      const filesData = await fileAPI.getAll();
      setFiles(filesData);
    } catch (error) {
      console.error('Error loading files:', error);
      toast.error('Failed to load files');
    } finally {
      setLoading(false);
    }
  };
  
  const handleFileDownload = (file: {path: string, name: string}) => {
    try {
      // Create download link
      const link = document.createElement('a');
      link.href = file.path;
      link.download = file.name;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success(`Downloading ${file.name}`);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error(`Failed to download ${file.name}`);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Loading files...</p>
      </div>
    );
  }
  
  return (
    <div>
      {files.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No files uploaded yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-50 rounded-md gap-3">
              <div className="flex items-center min-w-0 flex-1">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-xerox-600 mr-2 sm:mr-3 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(2)} KB • {file.path}
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1 w-full sm:w-auto text-xs"
                onClick={() => handleFileDownload(file)}
              >
                <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                Download
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;