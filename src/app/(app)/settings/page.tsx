"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle, Lock, Bell, Palette } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle"; // For Dark Mode switch
import * as React from "react";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
});
type ProfileFormData = z.infer<typeof profileSchema>;

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmNewPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "New passwords don't match",
  path: ["confirmNewPassword"],
});
type PasswordFormData = z.infer<typeof passwordSchema>;

export default function SettingsPage() {
  const { toast } = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState({
    emailMarketing: true,
    productUpdates: false,
    payouts: true,
  });

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    // Mock initial data - in a real app, this would come from user state/API
    defaultValues: {
      firstName: "Johnathan",
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "555-0101",
      username: "john_doe_123",
    },
  });

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onProfileSubmit = (data: ProfileFormData) => {
    console.log("Profile update data:", data);
    toast({ title: "Profile Updated (UI Only)", description: "Your profile changes have been logged." });
  };

  const onPasswordSubmit = (data: PasswordFormData) => {
    console.log("Password change data:", data);
    toast({ title: "Password Changed (UI Only)", description: "Your password change has been logged." });
    passwordForm.reset({currentPassword: "", newPassword: "", confirmNewPassword: ""});
  };

  const handleNotificationToggle = (key: keyof typeof notificationsEnabled) => {
    setNotificationsEnabled(prev => ({...prev, [key]: !prev[key]}));
    toast({ title: "Notification Settings Updated (UI Only)" });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-headline font-bold">Settings</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="profile"><UserCircle className="mr-2 h-4 w-4 inline-block" />Profile</TabsTrigger>
          <TabsTrigger value="password"><Lock className="mr-2 h-4 w-4 inline-block" />Password</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="mr-2 h-4 w-4 inline-block" />Notifications</TabsTrigger>
          <TabsTrigger value="appearance"><Palette className="mr-2 h-4 w-4 inline-block" />Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>Manage your personal information.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" {...profileForm.register("firstName")} />
                    {profileForm.formState.errors.firstName && <p className="text-sm text-destructive">{profileForm.formState.errors.firstName.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" {...profileForm.register("lastName")} />
                    {profileForm.formState.errors.lastName && <p className="text-sm text-destructive">{profileForm.formState.errors.lastName.message}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...profileForm.register("email")} />
                  {profileForm.formState.errors.email && <p className="text-sm text-destructive">{profileForm.formState.errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input id="phoneNumber" type="tel" {...profileForm.register("phoneNumber")} />
                  {profileForm.formState.errors.phoneNumber && <p className="text-sm text-destructive">{profileForm.formState.errors.phoneNumber.message}</p>}
                </div>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" {...profileForm.register("username")} />
                  {profileForm.formState.errors.username && <p className="text-sm text-destructive">{profileForm.formState.errors.username.message}</p>}
                </div>
                <Button type="submit">Save Profile</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" {...passwordForm.register("currentPassword")} />
                  {passwordForm.formState.errors.currentPassword && <p className="text-sm text-destructive">{passwordForm.formState.errors.currentPassword.message}</p>}
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" {...passwordForm.register("newPassword")} />
                  {passwordForm.formState.errors.newPassword && <p className="text-sm text-destructive">{passwordForm.formState.errors.newPassword.message}</p>}
                </div>
                <div>
                  <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                  <Input id="confirmNewPassword" type="password" {...passwordForm.register("confirmNewPassword")} />
                  {passwordForm.formState.errors.confirmNewPassword && <p className="text-sm text-destructive">{passwordForm.formState.errors.confirmNewPassword.message}</p>}
                </div>
                <Button type="submit">Update Password</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <Label htmlFor="emailMarketingNotifications" className="font-medium">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">Receive updates on new products and promotions.</p>
                </div>
                <Switch
                  id="emailMarketingNotifications"
                  checked={notificationsEnabled.emailMarketing}
                  onCheckedChange={() => handleNotificationToggle("emailMarketing")}
                  aria-label="Toggle marketing email notifications"
                />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                 <div>
                  <Label htmlFor="productUpdatesNotifications" className="font-medium">Product Updates</Label>
                  <p className="text-sm text-muted-foreground">Get notified about changes to products you promote.</p>
                </div>
                <Switch
                  id="productUpdatesNotifications"
                  checked={notificationsEnabled.productUpdates}
                  onCheckedChange={() => handleNotificationToggle("productUpdates")}
                  aria-label="Toggle product update notifications"
                />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <Label htmlFor="payoutNotifications" className="font-medium">Payout Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive alerts when payouts are processed.</p>
                </div>
                <Switch
                  id="payoutNotifications"
                  checked={notificationsEnabled.payouts}
                  onCheckedChange={() => handleNotificationToggle("payouts")}
                  aria-label="Toggle payout notifications"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <Label htmlFor="darkModeToggle" className="font-medium">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Toggle between light and dark themes.</p>
                </div>
                <ThemeToggle />
              </div>
              {/* Add other appearance settings here, e.g., font size, compact mode, etc. */}
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
