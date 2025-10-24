import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";

interface Organization {
  org_id: string;
  org_name: string;
  org_mail: string;
  org_contact: string;
  org_slug: string;
  status: string;
  pending_requests: number;
  primary_admin_name: string;
  primary_admin_mail: string;
  support_email: string;
  phone: string;
  alt_phone: string;
  max_coordinators: number;
  timezone_common: string;
  timezone_region: string;
  language: string;
  website_url: string;
  users: User[];
}

interface User {
  user_id: string;
  user_name: string;
  user_role: string;
}

const OrganizationDetails = () => {
  const { id } = useParams();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"details" | "users">("details");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isStatusChangeOpen, setIsStatusChangeOpen] = useState(false);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUserName, setNewUserName] = useState("");
  const [newUserRole, setNewUserRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [editedOrg, setEditedOrg] = useState<Organization | null>(null);

  const fetchOrganizationDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8000/organisations/${id}`);
      const data = await response.json();
      setOrganization(data);
    } catch (error) {
      console.error("Failed to fetch organization details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchOrganizationDetails();
    }
  }, [id]);

  const handleAddUser = async () => {
    if (!id) return;
    try {
      await fetch(`http://localhost:8000/organisations/${id}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: newUserName,
          user_role: newUserRole,
        }),
      });
      fetchOrganizationDetails();
      setIsAddUserOpen(false);
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  const handleDeleteUser = async (user_id: string) => {
    if (!id) return;
    try {
      await fetch(
        `http://localhost:8000/organisations/${id}/users/${user_id}`,
        {
          method: "DELETE",
        }
      );
      fetchOrganizationDetails();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleChangeStatus = async (newStatus: string) => {
    if (!id) return;
    try {
      await fetch(`http://localhost:8000/organisations/${id}/status?status=${newStatus}`, {
        method: "PUT",
      });
      fetchOrganizationDetails();
    } catch (error) {
      console.error("Failed to change status:", error);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setNewUserName(user.user_name);
    setNewUserRole(user.user_role);
    setIsEditUserOpen(true);
  };

  const handleUpdateUser = async () => {
    if (!id || !editingUser) return;
    try {
      await fetch(
        `http://localhost:8000/organisations/${id}/users/${editingUser.user_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_name: newUserName,
            user_role: newUserRole,
          }),
        }
      );
      fetchOrganizationDetails();
      setIsEditUserOpen(false);
      setEditingUser(null);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleEditDetails = () => {
    setIsEditingDetails(true);
    setEditedOrg(organization);
  };

  const handleCancelEdit = () => {
    setIsEditingDetails(false);
    setEditedOrg(null);
  };

  const handleSaveDetails = async () => {
    if (!id || !editedOrg) return;
    try {
      await fetch(`http://localhost:8000/organisations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedOrg),
      });
      fetchOrganizationDetails();
      setIsEditingDetails(false);
      setEditedOrg(null);
    } catch (error) {
      console.error("Failed to update organization:", error);
    }
  };

  const handleOrgFieldChange = (field: string, value: string | number) => {
    if (!editedOrg) return;
    setEditedOrg({
      ...editedOrg,
      [field]: value,
    });
  };

  const getRoleBadgeColor = (role: string) => {
    return role === "Admin"
      ? "text-green-600 bg-green-100"
      : "text-yellow-600 bg-yellow-100";
  };

  if (loading) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  if (!organization) {
    return (
      <Layout>
        <div>Organization not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8">
        <Breadcrumb
          items={[
            { label: "Manage B2B organizations", href: "/organizations" },
            { label: "Organization details" },
          ]}
        />

        <div className="bg-white rounded-lg border border-border p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="w-24 h-24 rounded-lg bg-amber-700 flex items-center justify-center overflow-hidden">
                <div className="text-4xl">🏛️</div>
              </div>
              <div>
                <h1 className="text-xl font-semibold mb-2">
                  {organization.org_name}
                </h1>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <span>✉️</span> {organization.org_mail}
                  </p>
                  <p className="flex items-center gap-2">
                    <span>📱</span> {organization.org_contact}
                  </p>
                  <p className="flex items-center gap-2 text-primary">
                    <span>🌐</span> {organization.org_slug}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                  organization.status === "Active"
                    ? "text-green-600 bg-green-100"
                    : organization.status === "Blocked"
                    ? "text-red-600 bg-red-100"
                    : "text-gray-600 bg-gray-100"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                {organization.status}
              </span>
              <Button
                variant="outline"
                className="text-primary border-primary hover:bg-primary/10"
                onClick={() => {
                  setSelectedStatus(organization.status);
                  setIsStatusChangeOpen(true);
                }}
              >
                Change status
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-border">
          <div className="border-b border-border">
            <div className="flex gap-8 px-6">
              <button
                onClick={() => setActiveTab("details")}
                className={`py-4 border-b-2 transition-colors ${
                  activeTab === "details"
                    ? "border-primary text-primary font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Basic details
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`py-4 border-b-2 transition-colors ${
                  activeTab === "users"
                    ? "border-primary text-primary font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Users
              </button>
            </div>
          </div>

          {activeTab === "details" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Profile</h2>
                {isEditingDetails ? (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={handleCancelEdit}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveDetails}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <button 
                    onClick={handleEditDetails}
                    className="text-primary hover:text-primary/80"
                  >
                    <Edit2 size={18} />
                  </button>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Organization details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        Organization name
                      </Label>
                      <Input
                        value={isEditingDetails ? editedOrg?.org_name || "" : organization.org_name}
                        onChange={(e) => isEditingDetails && handleOrgFieldChange("org_name", e.target.value)}
                        readOnly={!isEditingDetails}
                        className={isEditingDetails ? "" : "bg-accent"}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        Organization SLUG
                      </Label>
                      <Input
                        value={isEditingDetails ? editedOrg?.org_slug || "" : organization.org_slug}
                        onChange={(e) => isEditingDetails && handleOrgFieldChange("org_slug", e.target.value)}
                        readOnly={!isEditingDetails}
                        className={isEditingDetails ? "" : "bg-accent"}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Contact details</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">
                          Primary Admin name
                        </Label>
                        <Input
                          value={isEditingDetails ? editedOrg?.primary_admin_name || "" : organization.primary_admin_name || ""}
                          onChange={(e) => isEditingDetails && handleOrgFieldChange("primary_admin_name", e.target.value)}
                          readOnly={!isEditingDetails}
                          className={isEditingDetails ? "" : "bg-accent"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">
                          Primary Admin Mail-id
                        </Label>
                        <Input
                          value={isEditingDetails ? editedOrg?.primary_admin_mail || "" : organization.primary_admin_mail || ""}
                          onChange={(e) => isEditingDetails && handleOrgFieldChange("primary_admin_mail", e.target.value)}
                          readOnly={!isEditingDetails}
                          className={isEditingDetails ? "" : "bg-accent"}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">
                          Support Email-ID
                        </Label>
                        <Input
                          value={isEditingDetails ? editedOrg?.support_email || "" : organization.support_email || ""}
                          onChange={(e) => isEditingDetails && handleOrgFieldChange("support_email", e.target.value)}
                          readOnly={!isEditingDetails}
                          className={isEditingDetails ? "" : "bg-accent"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">
                          Phone no
                        </Label>
                        <div className="flex gap-2">
                          <Select defaultValue="+91">
                            <SelectTrigger className="w-24 bg-accent">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="+91">+91</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            value={isEditingDetails ? editedOrg?.phone || "" : organization.phone || ""}
                            onChange={(e) => isEditingDetails && handleOrgFieldChange("phone", e.target.value)}
                            readOnly={!isEditingDetails}
                            className={isEditingDetails ? "" : "bg-accent flex-1"}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">
                          Alternative phone no
                        </Label>
                        <div className="flex gap-2">
                          <Select defaultValue="+91">
                            <SelectTrigger className="w-24 bg-accent">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="+91">+91</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            value={isEditingDetails ? editedOrg?.alt_phone || "" : organization.alt_phone || ""}
                            onChange={(e) => isEditingDetails && handleOrgFieldChange("alt_phone", e.target.value)}
                            readOnly={!isEditingDetails}
                            className={isEditingDetails ? "" : "bg-accent flex-1"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">
                    Maximum Allowed Coordinators
                  </h3>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">
                      Max active Coordinators allowed
                    </Label>
                    <Select
                      value={isEditingDetails ? editedOrg?.max_coordinators?.toString() || "5" : organization.max_coordinators?.toString() || "5"}
                      onValueChange={(value) => isEditingDetails && handleOrgFieldChange("max_coordinators", parseInt(value))}
                      disabled={!isEditingDetails}
                    >
                      <SelectTrigger className={isEditingDetails ? "" : "bg-accent"}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">Upto 5 Coordinators</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Timezone</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        Common name
                      </Label>
                      <Select
                        value={isEditingDetails ? editedOrg?.timezone_common?.toLowerCase().replace(" ", "") || "ist" : organization.timezone_common?.toLowerCase().replace(" ", "") || "ist"}
                        onValueChange={(value) => isEditingDetails && handleOrgFieldChange("timezone_common", value)}
                        disabled={!isEditingDetails}
                      >
                        <SelectTrigger className={isEditingDetails ? "" : "bg-accent"}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ist">
                            India Standard Time
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        Region
                      </Label>
                      <Select
                        value={isEditingDetails ? editedOrg?.timezone_region?.toLowerCase().replace("/", "") || "asia" : organization.timezone_region?.toLowerCase().replace("/", "") || "asia"}
                        onValueChange={(value) => isEditingDetails && handleOrgFieldChange("timezone_region", value)}
                        disabled={!isEditingDetails}
                      >
                        <SelectTrigger className={isEditingDetails ? "" : "bg-accent"}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asia">Asia/Colombo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Language</h3>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">
                      Choose language for organization
                    </Label>
                    <Select
                      value={isEditingDetails ? editedOrg?.language?.toLowerCase() || "english" : organization.language?.toLowerCase() || "english"}
                      onValueChange={(value) => isEditingDetails && handleOrgFieldChange("language", value)}
                      disabled={!isEditingDetails}
                    >
                      <SelectTrigger className={isEditingDetails ? "" : "bg-accent"}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Official website URL</h3>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">
                      website URL
                    </Label>
                    <Input
                      value={isEditingDetails ? editedOrg?.website_url || "" : organization.website_url || ""}
                      onChange={(e) => isEditingDetails && handleOrgFieldChange("website_url", e.target.value)}
                      readOnly={!isEditingDetails}
                      className={isEditingDetails ? "" : "bg-accent"}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Users</h2>
                <Button
                  onClick={() => setIsAddUserOpen(true)}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Plus size={18} />
                  Add user
                </Button>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">
                      Sr. No
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">
                      User name
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">
                      Role
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {organization.users.map((user, index) => (
                    <tr
                      key={user.user_id}
                      className="border-b border-border last:border-0"
                    >
                      <td className="py-4 px-4 text-sm">{index + 1}</td>
                      <td className="py-4 px-4 text-sm">{user.user_name}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                            user.user_role
                          )}`}
                        >
                          {user.user_role}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.user_id)}
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
          )}
        </div>
      </div>

      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Name of the user</Label>
              <Input
                placeholder="Type here"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Choose user role</Label>
              <Select onValueChange={setNewUserRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Co-ordinator">Co-ordinator</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={handleAddUser}
            >
              Add
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Name of the user</Label>
              <Input
                placeholder="Type here"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Choose user role</Label>
              <Select value={newUserRole} onValueChange={setNewUserRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Co-ordinator">Co-ordinator</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={handleUpdateUser}
            >
              Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isStatusChangeOpen} onOpenChange={setIsStatusChangeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Choose new status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Blocked">Blocked</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsStatusChangeOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={() => {
                handleChangeStatus(selectedStatus);
                setIsStatusChangeOpen(false);
              }}
            >
              Change Status
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default OrganizationDetails;
