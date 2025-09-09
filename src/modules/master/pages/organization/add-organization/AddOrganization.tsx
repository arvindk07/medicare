import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BasicForm from "./BasicForm";
import UploadDocForm from "./UploadDocForm";
import MOUForm from "./MOUForm";
import ProfileUploaderForm from "./ProfileUploaderForm";

export const AddOrganization = () => {
  return (
    <div className="">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="w-full justify-start bg-white">
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
          >
            General Info
          </TabsTrigger>
          <TabsTrigger
            value="docs"
            className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
          >
            Upload Doc
          </TabsTrigger>
          <TabsTrigger
            value="mou"
            className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
          >
            MOU
          </TabsTrigger>
          <TabsTrigger
            value="upload"
            className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
          >
            Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="bg-white p-8 mt-6 rounded-sm">
          <h2 className="text-lg font-semibold mb-6">
            General Organization Info
          </h2>
          <BasicForm />
        </TabsContent>
        <TabsContent value="docs" className="bg-white p-8 mt-6 rounded-sm">
          <h2 className="text-lg font-semibold mb-6">Upload Document</h2>
          <UploadDocForm />
        </TabsContent>
        <TabsContent value="mou" className="bg-white p-8 mt-6 rounded-sm">
          <h2 className="text-lg font-semibold mb-6">MOU Form</h2>
          <MOUForm />
        </TabsContent>
        <TabsContent value="upload" className="bg-white p-8 mt-6 rounded-sm">
          <h2 className="text-lg font-semibold mb-6">Upload Profile</h2>
          <ProfileUploaderForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};
