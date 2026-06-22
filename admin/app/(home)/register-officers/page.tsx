import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Registeredofficers from "./_components/RegisteredOfficers";
import RegisterOfficersForm from "./_components/RegisterOfficersForm";
import AdminGuard from "@/components/guard/AdminGuard";

export default function AddOfficers() {
  return (
    <AdminGuard>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Officer Management
          </h1>

          <p className="text-muted-foreground text-sm">
            Manage election officers, register new officers and control access
            to Votosi.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="approved" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-muted p-1 rounded-xl h-11">
            <TabsTrigger
              value="approved"
              className="rounded-lg text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              Approved Officers
            </TabsTrigger>

            <TabsTrigger
              value="register"
              className="rounded-lg text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              Register Officer
            </TabsTrigger>
          </TabsList>

          {/* Approved Officers */}
          <TabsContent value="approved" className="space-y-4">
            <Card className="border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Approved Officers</CardTitle>
                <CardDescription>
                  View and manage all officers with system access.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Registeredofficers />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Register Officer */}
          <TabsContent value="register" className="space-y-4">
            <Card className="border-border/60 shadow-sm">
              <CardContent>
                {/* Replace this with your Form component */}
                <div className="text-sm text-muted-foreground">
                  <RegisterOfficersForm />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminGuard>
  );
}
