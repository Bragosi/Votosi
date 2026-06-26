import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterVoterForm from "./_components/RegisteredVotersForm";
import RegisteredVoters from "./_components/RegisteredVoters";

export default function RegisterVoters() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Voters Management
        </h1>

        <p className="text-muted-foreground text-sm">
          Manage election voters and control access to Votosi.
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="approved" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-muted p-1 rounded-xl h-11">
          <TabsTrigger
            value="approved"
            className="rounded-lg text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            Approved Voters
          </TabsTrigger>

          <TabsTrigger
            value="register"
            className="rounded-lg text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            Register Voters
          </TabsTrigger>
        </TabsList>

        {/* Approved Officers */}
        <TabsContent value="approved" className="space-y-4">
          <Card className="border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Approved Voters</CardTitle>
              <CardDescription>
                View and manage all voters with system access.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <RegisteredVoters />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Register Officer */}
        <TabsContent value="register" className="space-y-4">
          <Card className="border-border/60 shadow-sm">
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <RegisterVoterForm />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
