import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { profileFormSchema, ProfileFormValues } from "@/core/forms/update-profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Profile() {
  // Initialize the form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: 'DD', // Default username (can be fetched from the backend)
      avatar: undefined, // Default avatar (can be fetched from the backend)
    },
  });

  // Handle form submission
  const onSubmit = (data: ProfileFormValues) => {
    console.log('Form data:', data);
    // Add logic to update the profile (e.g., API call)
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Update Profile</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Avatar Field */}
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={field.value ? URL.createObjectURL(field.value) : undefined} />
                      <AvatarFallback>AN</AvatarFallback>
                    </Avatar>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                      className="w-full"
                    ></Input>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
}