import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Trash2, Filter, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

interface Organization {
  org_id: string;
  org_name: string;
  logo: string;
  pendingRequests: number;
  status: "Active" | "Blocked" | "Inactive";
}

interface BackendOrganization {
  org_id: string;
  org_name: string;
  status: string;
  pending_requests: number;
}

const Organizations = () => {
  const navigate = useNavigate();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [filteredOrganizations, setFilteredOrganizations] = useState<Organization[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newOrgName, setNewOrgName] = useState("");
  const [newOrgSlug, setNewOrgSlug] = useState("");
  const [newOrgMail, setNewOrgMail] = useState("");
  const [newOrgContact, setNewOrgContact] = useState("");

  const fetchOrganizations = async () => {
    try {
      const response = await fetch("http://localhost:8000/organisations");
      const data: BackendOrganization[] = await response.json();
      const formattedData: Organization[] = data.map((org) => ({
        org_id: org.org_id,
        org_name: org.org_name,
        logo: "🏢",
        pendingRequests: org.pending_requests || 0,
        status: (org.status as "Active" | "Blocked" | "Inactive") || "Active",
      }));
      setOrganizations(formattedData);
    } catch (error) {
      console.error("Failed to fetch organizations:", error);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  useEffect(() => {
    const filtered = organizations.filter((org) =>
      org.org_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrganizations(filtered);
  }, [organizations, searchTerm]);

  const handleAddOrganization = async () => {
    try {
      await fetch("http://localhost:8000/organisations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          org_name: newOrgName,
          org_slug: newOrgSlug,
          org_mail: newOrgMail,
          org_contact: newOrgContact,
        }),
      });
      fetchOrganizations();
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Failed to add organization:", error);
    }
  };

  const handleDeleteOrganization = async (org_id: string) => {
    try {
      await fetch(`http://localhost:8000/organisations/${org_id}`, {
        method: "DELETE",
      });
      fetchOrganizations();
    } catch (error) {
      console.error("Failed to delete organization:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-600 bg-green-100";
      case "Blocked":
        return "text-red-600 bg-red-100";
      case "Inactive":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <Breadcrumb items={[{ label: "Manage B2B organizations" }]} />
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search organizations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
            <button className="text-primary hover:text-primary/80">
              <Search size={20} />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold">B2B organizations</h1>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus size={18} />
              Add organization
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">
                    Sr. No
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">
                    Organizations
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">
                    Pending requests
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground flex items-center gap-2">
                    Status <Filter size={14} />
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrganizations.map((org, index) => (
                  <tr
                    key={org.org_id}
                    className="border-b border-border last:border-0 hover:bg-accent/50"
                  >
                    <td className="py-4 px-4 text-sm">{index + 1}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                          {org.logo}
                        </div>
                        <span className="text-sm">{org.org_name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm">
                      {org.pendingRequests} pending requests
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          org.status
                        )}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {org.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            navigate(`/organization/${org.org_id}`)
                          }
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteOrganization(org.org_id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Organization</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name of the organization</Label>
                <Input
                  placeholder="Text"
                  value={newOrgName}
                  onChange={(e) => setNewOrgName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input
                  placeholder="Type here"
                  value={newOrgSlug}
                  onChange={(e) => setNewOrgSlug(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Organization mail</Label>
                <Input
                  placeholder="Type here"
                  value={newOrgMail}
                  onChange={(e) => setNewOrgMail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Contact</Label>
                <Input
                  placeholder="Type here"
                  value={newOrgContact}
                  onChange={(e) => setNewOrgContact(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={handleAddOrganization}
            >
              Add
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Organizations;
