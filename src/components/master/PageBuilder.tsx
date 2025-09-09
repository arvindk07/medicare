
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Layout, 
  Type, 
  Image, 
  Video, 
  Grid, 
  Columns,
  Move,
  Settings,
  Save,
  Globe
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

interface PageSection {
  id: string;
  type: "hero" | "text" | "image" | "video" | "grid" | "columns";
  title: string;
  content: any;
  styles: {
    backgroundColor?: string;
    textColor?: string;
    padding?: string;
    margin?: string;
  };
}

interface WebsitePage {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  sections: PageSection[];
  seoTitle?: string;
  seoDescription?: string;
}

export const PageBuilder = () => {
  const [pages, setPages] = useState<WebsitePage[]>([
    {
      id: "1",
      title: "Home Page",
      slug: "/",
      status: "published",
      sections: [
        {
          id: "hero-1",
          type: "hero",
          title: "Hero Section",
          content: {
            title: "Welcome to Our Therapy Platform",
            subtitle: "Professional mental health services at your fingertips",
            buttonText: "Get Started",
            backgroundImage: ""
          },
          styles: { backgroundColor: "#3B82F6", textColor: "#FFFFFF", padding: "80px 20px" }
        }
      ]
    }
  ]);

  const [selectedPage, setSelectedPage] = useState<string | null>("1");
  const [editingSection, setEditingSection] = useState<PageSection | null>(null);
  const [isPageDialogOpen, setIsPageDialogOpen] = useState(false);
  const [isSectionDialogOpen, setIsSectionDialogOpen] = useState(false);

  const [newPageData, setNewPageData] = useState({
    title: "",
    slug: "",
    seoTitle: "",
    seoDescription: ""
  });

  const sectionTypes = [
    { type: "hero", label: "Hero Section", icon: Layout },
    { type: "text", label: "Text Block", icon: Type },
    { type: "image", label: "Image", icon: Image },
    { type: "video", label: "Video", icon: Video },
    { type: "grid", label: "Grid Layout", icon: Grid },
    { type: "columns", label: "Columns", icon: Columns }
  ];

  const currentPage = pages.find(p => p.id === selectedPage);

  const createNewPage = () => {
    const newPage: WebsitePage = {
      id: Date.now().toString(),
      title: newPageData.title,
      slug: newPageData.slug.startsWith('/') ? newPageData.slug : `/${newPageData.slug}`,
      status: "draft",
      sections: [],
      seoTitle: newPageData.seoTitle,
      seoDescription: newPageData.seoDescription
    };

    setPages([...pages, newPage]);
    setSelectedPage(newPage.id);
    setIsPageDialogOpen(false);
    setNewPageData({ title: "", slug: "", seoTitle: "", seoDescription: "" });
    toast.success("New page created");
  };

  const addSection = (type: PageSection["type"]) => {
    if (!selectedPage) return;

    const newSection: PageSection = {
      id: `${type}-${Date.now()}`,
      type,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Section`,
      content: getDefaultContent(type),
      styles: { padding: "40px 20px" }
    };

    setPages(pages.map(page => 
      page.id === selectedPage 
        ? { ...page, sections: [...page.sections, newSection] }
        : page
    ));

    toast.success("Section added");
  };

  const getDefaultContent = (type: PageSection["type"]) => {
    switch (type) {
      case "hero":
        return { title: "Hero Title", subtitle: "Hero subtitle", buttonText: "Call to Action" };
      case "text":
        return { content: "<p>Your text content here...</p>" };
      case "image":
        return { src: "", alt: "", caption: "" };
      case "video":
        return { src: "", title: "" };
      case "grid":
        return { items: [{ title: "Item 1", content: "Content 1" }] };
      case "columns":
        return { columns: [{ content: "Column 1" }, { content: "Column 2" }] };
      default:
        return {};
    }
  };

  const updateSection = (sectionId: string, updates: Partial<PageSection>) => {
    if (!selectedPage) return;

    setPages(pages.map(page => 
      page.id === selectedPage 
        ? {
            ...page,
            sections: page.sections.map(section => 
              section.id === sectionId ? { ...section, ...updates } : section
            )
          }
        : page
    ));
  };

  const deleteSection = (sectionId: string) => {
    if (!selectedPage) return;

    setPages(pages.map(page => 
      page.id === selectedPage 
        ? { ...page, sections: page.sections.filter(s => s.id !== sectionId) }
        : page
    ));

    toast.success("Section deleted");
  };

  const publishPage = (pageId: string) => {
    setPages(pages.map(page => 
      page.id === pageId ? { ...page, status: "published" } : page
    ));
    toast.success("Page published");
  };

  const renderSectionPreview = (section: PageSection) => {
    const style = {
      backgroundColor: section.styles.backgroundColor,
      color: section.styles.textColor,
      padding: section.styles.padding,
      margin: section.styles.margin
    };

    switch (section.type) {
      case "hero":
        return (
          <div style={style} className="text-center">
            <h1 className="text-4xl font-bold mb-4">{section.content.title}</h1>
            <p className="text-xl mb-6">{section.content.subtitle}</p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold">
              {section.content.buttonText}
            </button>
          </div>
        );
      case "text":
        return (
          <div style={style} dangerouslySetInnerHTML={{ __html: section.content.content }} />
        );
      default:
        return (
          <div style={style} className="p-8 border-2 border-dashed border-gray-300 text-center">
            <p className="text-gray-500">{section.title} - Content will be rendered here</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Globe className="mr-2" />
            Website Page Builder
          </h2>
          <p className="text-muted-foreground">Create and manage website pages with drag-and-drop functionality</p>
        </div>
        <Dialog open={isPageDialogOpen} onOpenChange={setIsPageDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Page
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Page</DialogTitle>
              <DialogDescription>Add a new page to your website</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Page Title</Label>
                <Input
                  id="title"
                  value={newPageData.title}
                  onChange={(e) => setNewPageData({...newPageData, title: e.target.value})}
                  placeholder="About Us"
                />
              </div>
              <div>
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={newPageData.slug}
                  onChange={(e) => setNewPageData({...newPageData, slug: e.target.value})}
                  placeholder="/about-us"
                />
              </div>
              <div>
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input
                  id="seoTitle"
                  value={newPageData.seoTitle}
                  onChange={(e) => setNewPageData({...newPageData, seoTitle: e.target.value})}
                  placeholder="About Us - Company Name"
                />
              </div>
              <div>
                <Label htmlFor="seoDescription">SEO Description</Label>
                <Input
                  id="seoDescription"
                  value={newPageData.seoDescription}
                  onChange={(e) => setNewPageData({...newPageData, seoDescription: e.target.value})}
                  placeholder="Learn more about our company and mission"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsPageDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={createNewPage}>Create Page</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Pages List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pages.map((page) => (
                <div
                  key={page.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedPage === page.id
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-100 border border-transparent'
                  }`}
                  onClick={() => setSelectedPage(page.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{page.title}</h3>
                      <p className="text-sm text-gray-500">{page.slug}</p>
                    </div>
                    <Badge variant={page.status === "published" ? "default" : "secondary"}>
                      {page.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Page Builder */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {currentPage ? `Editing: ${currentPage.title}` : "Select a page to edit"}
              </CardTitle>
              {currentPage && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => publishPage(currentPage.id)}
                    disabled={currentPage.status === "published"}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {currentPage.status === "published" ? "Published" : "Publish"}
                  </Button>
                  <Button size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {currentPage ? (
              <Tabs defaultValue="design" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="design">Design</TabsTrigger>
                  <TabsTrigger value="sections">Add Sections</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="design" className="space-y-4">
                  <div className="space-y-4">
                    {currentPage.sections.map((section) => (
                      <Card key={section.id} className="relative">
                        <div className="absolute top-2 right-2 flex gap-1 z-10">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingSection(section);
                              setIsSectionDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteSection(section.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <CardContent className="p-4">
                          <div className="mb-2">
                            <Badge variant="outline">{section.type}</Badge>
                          </div>
                          {renderSectionPreview(section)}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="sections">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {sectionTypes.map((sectionType) => (
                      <Card
                        key={sectionType.type}
                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => addSection(sectionType.type as PageSection["type"])}
                      >
                        <CardContent className="p-4 text-center">
                          <sectionType.icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                          <h3 className="font-medium">{sectionType.label}</h3>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="preview">
                  <div className="border rounded-lg p-4 bg-white">
                    <div className="space-y-0">
                      {currentPage.sections.map((section) => (
                        <div key={section.id}>
                          {renderSectionPreview(section)}
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Globe className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>Select a page from the sidebar to start editing</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Section Editor Dialog */}
      <Dialog open={isSectionDialogOpen} onOpenChange={setIsSectionDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Section</DialogTitle>
            <DialogDescription>Customize section content and appearance</DialogDescription>
          </DialogHeader>
          {editingSection && (
            <div className="space-y-4">
              <div>
                <Label>Section Title</Label>
                <Input
                  value={editingSection.title}
                  onChange={(e) => setEditingSection({...editingSection, title: e.target.value})}
                />
              </div>
              
              {editingSection.type === "text" && (
                <div>
                  <Label>Content</Label>
                  <RichTextEditor
                    content={editingSection.content.content || ""}
                    onChange={(content) => setEditingSection({
                      ...editingSection,
                      content: { ...editingSection.content, content }
                    })}
                  />
                </div>
              )}

              {editingSection.type === "hero" && (
                <div className="space-y-4">
                  <div>
                    <Label>Hero Title</Label>
                    <Input
                      value={editingSection.content.title || ""}
                      onChange={(e) => setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, title: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <Label>Subtitle</Label>
                    <Input
                      value={editingSection.content.subtitle || ""}
                      onChange={(e) => setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, subtitle: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <Label>Button Text</Label>
                    <Input
                      value={editingSection.content.buttonText || ""}
                      onChange={(e) => setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, buttonText: e.target.value }
                      })}
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Background Color</Label>
                  <Input
                    type="color"
                    value={editingSection.styles.backgroundColor || "#ffffff"}
                    onChange={(e) => setEditingSection({
                      ...editingSection,
                      styles: { ...editingSection.styles, backgroundColor: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label>Text Color</Label>
                  <Input
                    type="color"
                    value={editingSection.styles.textColor || "#000000"}
                    onChange={(e) => setEditingSection({
                      ...editingSection,
                      styles: { ...editingSection.styles, textColor: e.target.value }
                    })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsSectionDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  if (selectedPage && editingSection) {
                    updateSection(editingSection.id, editingSection);
                    setIsSectionDialogOpen(false);
                    toast.success("Section updated");
                  }
                }}>
                  Update Section
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
