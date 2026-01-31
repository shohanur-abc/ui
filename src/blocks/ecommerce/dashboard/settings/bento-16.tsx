import {
	Bell,
	Check,
	ChevronRight,
	CreditCard,
	Key,
	Link,
	Lock,
	Mail,
	Shield,
	Smartphone,
	User,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

type ProfileCompletionItem = {
	label: string;
	completed: boolean;
	action?: string;
};

type QuickAction = {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	href: string;
};

type ConnectedAccount = {
	name: string;
	icon: string;
	connected: boolean;
	email?: string;
};

const CompletionProgress = ({
	items,
	percentage,
}: { items: ProfileCompletionItem[]; percentage: number }) => (
	<div className="space-y-4">
		<div className="flex items-center justify-between">
			<span className="text-sm font-medium">Profile Completion</span>
			<span className="text-sm text-muted-foreground">{percentage}%</span>
		</div>
		<Progress value={percentage} className="h-2" />
		<div className="space-y-2">
			{items.map((item) => (
				<div key={item.label} className="flex items-center justify-between text-sm">
					<div className="flex items-center gap-2">
						<div
							className={`flex size-5 items-center justify-center rounded-full ${
								item.completed
									? 'bg-emerald-500/10 text-emerald-500'
									: 'bg-muted text-muted-foreground'
							}`}
						>
							{item.completed && <Check className="size-3" />}
						</div>
						<span className={item.completed ? 'text-muted-foreground' : ''}>
							{item.label}
						</span>
					</div>
					{!item.completed && item.action && (
						<Button variant="ghost" size="sm" className="h-auto p-0 text-primary">
							{item.action}
						</Button>
					)}
				</div>
			))}
		</div>
	</div>
);

const QuickActionButton = ({ icon: Icon, label, href }: QuickAction) => (
	<a
		href={href}
		className="flex flex-col items-center gap-2 rounded-lg border p-4 transition-all hover:border-primary/50 hover:bg-muted/30"
	>
		<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
			<Icon className="size-5 text-primary" />
		</div>
		<span className="text-sm font-medium">{label}</span>
	</a>
);

const ConnectedAccountRow = ({ name, icon, connected, email }: ConnectedAccount) => (
	<div className="flex items-center justify-between py-3">
		<div className="flex items-center gap-3">
			<div className="flex size-8 items-center justify-center rounded-lg bg-muted text-lg">
				{icon}
			</div>
			<div>
				<p className="text-sm font-medium">{name}</p>
				{connected && email && (
					<p className="text-xs text-muted-foreground">{email}</p>
				)}
			</div>
		</div>
		<Button variant={connected ? 'secondary' : 'outline'} size="sm">
			{connected ? 'Disconnect' : 'Connect'}
		</Button>
	</div>
);

export default function Main() {
	const profile = {
		name: 'John Doe',
		email: 'john@example.com',
		avatar: 'https://avatars.githubusercontent.com/u/252440198?v=4',
		role: 'Store Owner',
	};

	const completionItems: ProfileCompletionItem[] = [
		{ label: 'Add profile photo', completed: true },
		{ label: 'Verify email address', completed: true },
		{ label: 'Add phone number', completed: false, action: 'Add' },
		{ label: 'Enable two-factor auth', completed: false, action: 'Enable' },
		{ label: 'Complete business info', completed: true },
	];

	const quickActions: QuickAction[] = [
		{ icon: User, label: 'Profile', href: '#profile' },
		{ icon: Shield, label: 'Security', href: '#security' },
		{ icon: Bell, label: 'Notifications', href: '#notifications' },
		{ icon: CreditCard, label: 'Billing', href: '#billing' },
	];

	const connectedAccounts: ConnectedAccount[] = [
		{ name: 'Google', icon: '🔍', connected: true, email: 'john@gmail.com' },
		{ name: 'GitHub', icon: '🐙', connected: true, email: 'johndoe' },
		{ name: 'Slack', icon: '💬', connected: false },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-5xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="@lg:col-span-2 space-y-6">
						<Card>
							<CardContent className="flex items-center gap-6 pt-6">
								<Avatar className="size-20 ring-2 ring-border">
									<AvatarImage src={profile.avatar} />
									<AvatarFallback>JD</AvatarFallback>
								</Avatar>
								<div className="flex-1">
									<div className="flex items-center gap-2">
										<h2 className="text-xl font-semibold">{profile.name}</h2>
										<Badge variant="secondary">{profile.role}</Badge>
									</div>
									<p className="text-muted-foreground">{profile.email}</p>
									<div className="mt-3 flex gap-2">
										<Button size="sm">Edit Profile</Button>
										<Button size="sm" variant="outline">View Public Profile</Button>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">Quick Actions</CardTitle>
								<CardDescription>Common settings shortcuts</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 gap-3 @sm:grid-cols-4">
									{quickActions.map((action) => (
										<QuickActionButton key={action.label} {...action} />
									))}
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">Connected Accounts</CardTitle>
								<CardDescription>Manage your connected services</CardDescription>
							</CardHeader>
							<CardContent className="divide-y">
								{connectedAccounts.map((account) => (
									<ConnectedAccountRow key={account.name} {...account} />
								))}
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Complete Your Profile</CardTitle>
								<CardDescription>Unlock all features</CardDescription>
							</CardHeader>
							<CardContent>
								<CompletionProgress items={completionItems} percentage={60} />
							</CardContent>
						</Card>

						<Card className="bg-primary/5 border-primary/20">
							<CardContent className="pt-6 text-center">
								<div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
									<Shield className="size-6 text-primary" />
								</div>
								<h3 className="font-semibold">Secure Your Account</h3>
								<p className="mt-1 text-sm text-muted-foreground">
									Enable two-factor authentication for enhanced security
								</p>
								<Button className="mt-4 w-full" size="sm">
									Enable 2FA
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
