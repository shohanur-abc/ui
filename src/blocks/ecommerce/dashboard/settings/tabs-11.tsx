import { Bell, CreditCard, Key, Settings, Shield, User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type TabItem = {
	value: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
};

type ProfileField = {
	id: string;
	label: string;
	placeholder: string;
	type?: string;
	value?: string;
};

const ProfileTab = ({
	avatar,
	fallback,
	fields,
}: {
	avatar: string;
	fallback: string;
	fields: ProfileField[];
}) => (
	<div className="space-y-6">
		<div className="flex items-center gap-4">
			<Avatar className="size-20 ring-2 ring-border">
				<AvatarImage src={avatar} />
				<AvatarFallback className="bg-primary/10 text-primary text-lg">
					{fallback}
				</AvatarFallback>
			</Avatar>
			<div className="space-y-1">
				<Button size="sm">Change Avatar</Button>
				<p className="text-xs text-muted-foreground">
					JPG, GIF or PNG. Max 2MB.
				</p>
			</div>
		</div>
		<div className="grid gap-4 @sm:grid-cols-2">
			{fields.map((field) => (
				<div key={field.id} className="space-y-2">
					<Label htmlFor={field.id}>{field.label}</Label>
					<Input
						id={field.id}
						type={field.type || 'text'}
						placeholder={field.placeholder}
						defaultValue={field.value}
					/>
				</div>
			))}
		</div>
		<div className="flex justify-end gap-3">
			<Button variant="outline">Cancel</Button>
			<Button>Save Changes</Button>
		</div>
	</div>
);

const SecurityTab = () => (
	<div className="space-y-6">
		<div className="space-y-4">
			<h4 className="font-medium">Change Password</h4>
			<div className="grid gap-4 @sm:grid-cols-2">
				<div className="space-y-2 @sm:col-span-2">
					<Label htmlFor="currentPass">Current Password</Label>
					<Input
						id="currentPass"
						type="password"
						placeholder="Enter current password"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="newPass">New Password</Label>
					<Input
						id="newPass"
						type="password"
						placeholder="Enter new password"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="confirmPass">Confirm Password</Label>
					<Input
						id="confirmPass"
						type="password"
						placeholder="Confirm new password"
					/>
				</div>
			</div>
		</div>
		<div className="flex justify-end">
			<Button>Update Password</Button>
		</div>
	</div>
);

export default function Main() {
	const tabs: TabItem[] = [
		{ value: 'profile', label: 'Profile', icon: User },
		{ value: 'security', label: 'Security', icon: Shield },
		{ value: 'notifications', label: 'Notifications', icon: Bell },
		{ value: 'billing', label: 'Billing', icon: CreditCard },
	];

	const profileFields: ProfileField[] = [
		{
			id: 'firstName',
			label: 'First Name',
			placeholder: 'John',
			value: 'John',
		},
		{ id: 'lastName', label: 'Last Name', placeholder: 'Doe', value: 'Doe' },
		{
			id: 'email',
			label: 'Email',
			placeholder: 'john@example.com',
			type: 'email',
			value: 'john@example.com',
		},
		{
			id: 'phone',
			label: 'Phone',
			placeholder: '+1 234 567 890',
			type: 'tel',
			value: '+1 234 567 890',
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardHeader className="border-b">
						<div className="flex items-center gap-3">
							<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
								<Settings className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle>Account Settings</CardTitle>
								<CardDescription>
									Manage your account preferences
								</CardDescription>
							</div>
						</div>
					</CardHeader>
					<CardContent className="pt-6">
						<Tabs defaultValue="profile" className="space-y-6">
							<TabsList className="w-full justify-start">
								{tabs.map((tab) => (
									<TabsTrigger
										key={tab.value}
										value={tab.value}
										className="gap-2"
									>
										<tab.icon className="size-4" />
										<span className="hidden @sm:inline">{tab.label}</span>
									</TabsTrigger>
								))}
							</TabsList>
							<TabsContent value="profile">
								<ProfileTab
									avatar="https://avatars.githubusercontent.com/u/252440198?v=4"
									fallback="JD"
									fields={profileFields}
								/>
							</TabsContent>
							<TabsContent value="security">
								<SecurityTab />
							</TabsContent>
							<TabsContent value="notifications">
								<div className="py-8 text-center text-muted-foreground">
									Notification settings content
								</div>
							</TabsContent>
							<TabsContent value="billing">
								<div className="py-8 text-center text-muted-foreground">
									Billing settings content
								</div>
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
