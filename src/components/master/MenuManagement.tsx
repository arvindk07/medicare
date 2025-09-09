
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Move, Eye, Menu } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface MenuItem {
  id: number;
  title: string;
  url: string;
  parentId: number | null;
  order: number;
  isVisible: boolean;
  target: "_self" | "_blank";
  cssClass?: string;
}

export const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: 1, title: "Home", url: "/", parentId: null, order: 1, isVisible: true, target: "_self" },
    { id: 2, title: "About Us", url: "/about", parentId: null, order: 2, isVisible: true, target: "_self" },
    { id: 3, title: "Our Team", url: "/team", parentId: 2, order: 1, isVisible: true, target: "_self" },
    { id: 4, title: "Our Story", url: "/story", parentId: 2, order: 2, isVisible: true, target: "_self" },
    { id: 5, title: "Services", url: "/services", parentId: null, order: 3, isVisible: true, target: "_self" },
    { id: 6, title: "Individual Therapy", url: "/services/individual", parentId: 5, order: 1, isVisible: true, target: "_self" },
    { id: 7, title: "Group Therapy", url: "/services/group", parentId: 5, order: 2, isVisible: true, target: "_self" },
    { id: 8, title: "Contact", url: "/contact", parentId: null, order: 4, isVisible: true, target: "_self" },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    parentId: null as number | null,
    target: "_self" as "_self" | "_blank",
    cssClass: "",
    isVisible: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      setMenuItems(menuItems.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData, order: item.order }
          : item
      ));
      toast.success("Menu item updated successfully");
    } else {
      const maxOrder = Math.max(...menuItems.filter(item => item.parentId === formData.parentId).map(item => item.order), 0);
      const newItem: MenuItem = {
        id: menuItems.length + 1,
        ...formData,
        order: maxOrder + 1
      };
      setMenuItems([...menuItems, newItem]);
      toast.success("Menu item created successfully");
    }
    
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({ title: "", url: "", parentId: null, target: "_self", cssClass: "", isVisible: true });
  };

  const deleteItem = (id: number) => {
    // Delete item and all its children
    const itemsToDelete = [id];
    const findChildren = (parentId: number) => {
      menuItems.filter(item => item.parentId === parentId).forEach(child => {
        itemsToDelete.push(child.id);
        findChildren(child.id);
      });
    };
    findChildren(id);
    
    setMenuItems(menuItems.filter(item => !itemsToDelete.includes(item.id)));
    toast.success("Menu item(s) deleted successfully");
  };

  const moveItem = (id: number, direction: "up" | "down") => {
    const item = menuItems.find(i => i.id === id);
    if (!item) return;

    const siblings = menuItems.filter(i => i.parentId === item.parentId).sort((a, b) => a.order - b.order);
    const currentIndex = siblings.findIndex(i => i.id === id);
    
    if ((direction === "up" && currentIndex === 0) || (direction === "down" && currentIndex === siblings.length - 1)) {
      return;
    }

    const newOrder = direction === "up" ? siblings[currentIndex - 1].order : siblings[currentIndex + 1].order;
    const swapOrder = item.order;

    setMenuItems(menuItems.map(i => {
      if (i.id === id) return { ...i, order: newOrder };
      if (i.id === siblings[direction === "up" ? currentIndex - 1 : currentIndex + 1].id) return { ...i, order: swapOrder };
      return i;
    }));

    toast.success("Menu item order updated");
  };

  const getParentOptions = () => {
    return menuItems.filter(item => item.parentId === null);
  };

  const renderMenuTree = (parentId: number | null = null, level: number = 0) => {
    return menuItems
      .filter(item => item.parentId === parentId)
      .sort((a, b) => a.order - b.order)
      .map(item => (
        <TableRow key={item.id}>
          <TableCell>
            <div style={{ paddingLeft: `${level * 20}px` }} className="flex items-center">
              {level > 0 && <span className="text-gray-400 mr-2">└─</span>}
              <span className="font-medium">{item.title}</span>
            </div>
          </TableCell>
          <TableCell>
            <code className="text-sm bg-gray-100 px-2 py-1 rounded">{item.url}</code>
          </TableCell>
          <TableCell>
            <Badge variant={item.isVisible ? "default" : "secondary"}>
              {item.isVisible ? "Visible" : "Hidden"}
            </Badge>
          </TableCell>
          <TableCell>{item.target}</TableCell>
          <TableCell>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" onClick={() => moveItem(item.id, "up")}>
                ↑
              </Button>
              <Button variant="ghost" size="sm" onClick={() => moveItem(item.id, "down")}>
                ↓
              </Button>
              <Button variant="ghost" size="sm" onClick={() => {
                setEditingItem(item);
                setFormData({
                  title: item.title,
                  url: item.url,
                  parentId: item.parentId,
                  target: item.target,
                  cssClass: item.cssClass || "",
                  isVisible: item.isVisible
                });
                setIsDialogOpen(true);
              }}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteItem(item.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold flex items-center">
            <Menu className="mr-2" />
            Website Menu Management
          </h3>
          <p className="text-sm text-muted-foreground">Create and manage website navigation menus</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingItem(null);
              setFormData({ title: "", url: "", parentId: null, target: "_self", cssClass: "", isVisible: true });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Menu Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Menu Item" : "Create Menu Item"}</DialogTitle>
              <DialogDescription>
                {editingItem ? "Update menu item details" : "Add a new item to the website navigation menu"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Menu Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Menu item title"
                  required
                />
              </div>
              <div>
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  placeholder="/page-url or https://external-link.com"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="parent">Parent Menu</Label>
                  <Select value={formData.parentId?.toString() || ""} onValueChange={(value) => setFormData({...formData, parentId: value ? parseInt(value) : null})}>
                    <SelectTrigger>
                      <SelectValue placeholder="No parent (top level)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No parent (top level)</SelectItem>
                      {getParentOptions().map(item => (
                        <SelectItem key={item.id} value={item.id.toString()}>{item.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="target">Link Target</Label>
                  <Select value={formData.target} onValueChange={(value) => setFormData({...formData, target: value as "_self" | "_blank"})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_self">Same window</SelectItem>
                      <SelectItem value="_blank">New window</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="cssClass">CSS Class (Optional)</Label>
                <Input
                  id="cssClass"
                  value={formData.cssClass}
                  onChange={(e) => setFormData({...formData, cssClass: e.target.value})}
                  placeholder="custom-menu-class"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isVisible"
                  checked={formData.isVisible}
                  onChange={(e) => setFormData({...formData, isVisible: e.target.checked})}
                />
                <Label htmlFor="isVisible">Visible in menu</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingItem ? "Update" : "Create"} Menu Item
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Menu Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {renderMenuTree()}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Menu Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <nav className="flex space-x-6">
              {menuItems
                .filter(item => item.parentId === null && item.isVisible)
                .sort((a, b) => a.order - b.order)
                .map(item => (
                  <div key={item.id} className="relative group">
                    <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
                      {item.title}
                    </a>
                    {menuItems.some(child => child.parentId === item.id && child.isVisible) && (
                      <div className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 min-w-48 opacity-0 group-hover:opacity-100 transition-opacity">
                        {menuItems
                          .filter(child => child.parentId === item.id && child.isVisible)
                          .sort((a, b) => a.order - b.order)
                          .map(child => (
                            <a key={child.id} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              {child.title}
                            </a>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
            </nav>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
