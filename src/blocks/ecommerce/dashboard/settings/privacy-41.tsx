import {
	AlertTriangle,
	Check,
	ChevronRight,
	Cookie,
	Database,
	Download,
	Eye,
	EyeOff,
	FileText,
	Lock,
	Shield,
	Trash2,
	User,
	Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';

type PrivacySetting = {
	id: string;
	title: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	enabled: boolean;
	category: string;
};

type DataCategory = {
	name: string;
	size: string;
	items: number;
};

const PrivacyToggle = ({
	title,
	description,
	icon: Icon,
	enabled,
}: PrivacySetting) => (
	<div
		className={`flex items-start gap-4 rounded-lg border p-4 transition-all ${
			enabled ? 'border-primary/30 bg-primary/5' : ''
		}`}
	>
		<div
			className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
				enabled
					? 'bg-primary/10 text-primary'
					: 'bg-muted text-muted-foreground'
			}`}
		>
			<Icon className="size-5" />
		</div>
		<div className="flex-1">
			<h4 className="font-medium">{title}</h4>
			<p className="mt-1 text-sm text-muted-foreground">{description}</p>
		</div>
		<Switch defaultChecked={enabled} />
	</div>
);

const DataCategoryRow = ({ name, size, items }: DataCategory) => (
	<div className="flex items-center justify-between py-3">
		<div className="flex items-center gap-3">
			<Database className="size-4 text-muted-foreground" />
			<div>
				<p className="font-medium">{name}</p>
				<p className="text-xs text-muted-foreground">{items} items</p>
			</div>
		</div>
		<div className="flex items-center gap-3">
			<span className="text-sm text-muted-foreground">{size}</span>
			<Button variant="ghost" size="sm">
				Manage
			</Button>
		</div>
	</div>
);

export default function Main() {
	const privacySettings: PrivacySetting[] = [
		{
			id: 'profileVisibility',
			title: 'Profile Visibility',
			description: 'Allow others to see your profile information',
			icon: User,
			enabled: true,
			category: 'visibility',
		},
		{
			id: 'activityStatus',
			title: 'Activity Status',
			description: 'Show when you were last active',
			icon: Eye,
			enabled: false,
			category: 'visibility',
		},
		{
			id: 'searchable',
			title: 'Searchable Profile',
			description: 'Allow your profile to appear in search results',
			icon: Users,
			enabled: true,
			category: 'visibility',
		},
		{
			id: 'dataCollection',
			title: 'Analytics Data Collection',
			description: 'Help us improve by sharing usage data',
			icon: Database,
			enabled: true,
			category: 'data',
		},
		{
			id: 'cookies',
			title: 'Marketing Cookies',
			description: 'Allow cookies for personalized ads',
			icon: Cookie,
			enabled: false,
			category: 'data',
		},
		{
			id: 'thirdParty',
			title: 'Third-Party Data Sharing',
			description: 'Share data with trusted partners',
			icon: Shield,
			enabled: false,
			category: 'data',
		},
	];

	const dataCategories: DataCategory[] = [
		{ name: 'Personal Information', size: '2.3 MB', items: 45 },
		{ name: 'Order History', size: '15.7 MB', items: 234 },
		{ name: 'Activity Logs', size: '8.2 MB', items: 1502 },
		{ name: 'Preferences', size: '128 KB', items: 18 },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="@lg:col-span-2 space-y-6">
						<Card>
							<CardHeader className="border-b">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
										<Shield className="size-5 text-primary" />
									</div>
									<div>
										<CardTitle>Privacy Settings</CardTitle>
										<CardDescription>
											Control your data and visibility
										</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent className="space-y-3 pt-6">
								{privacySettings.map((setting) => (
									<PrivacyToggle key={setting.id} {...setting} />
								))}
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="border-b">
								<CardTitle className="text-base">Your Data</CardTitle>
								<CardDescription>
									View and manage data we've collected
								</CardDescription>
							</CardHeader>
							<CardContent className="divide-y pt-2">
								{dataCategories.map((category) => (
									<DataCategoryRow key={category.name} {...category} />
								))}
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card className="border-primary/20 bg-primary/5">
							<CardContent className="pt-6 text-center">
								<div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
									<Lock className="size-6 text-primary" />
								</div>
								<h4 className="font-semibold">Privacy Score</h4>
								<p className="mt-1 text-3xl font-bold text-primary">85%</p>
								<p className="mt-1 text-sm text-muted-foreground">
									Your privacy settings are strong
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">Data Actions</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<Button
									variant="outline"
									className="w-full justify-start gap-2"
								>
									<Download className="size-4" />
									Download My Data
								</Button>
								<Button
									variant="outline"
									className="w-full justify-start gap-2"
								>
									<FileText className="size-4" />
									Privacy Policy
								</Button>
								<Button
									variant="outline"
									className="w-full justify-start gap-2 text-destructive hover:text-destructive"
								>
									<Trash2 className="size-4" />
									Delete My Account
								</Button>
							</CardContent>
						</Card>

						<Card className="border-amber-500/20 bg-amber-500/5">
							<CardContent className="pt-6">
								<div className="flex items-start gap-3">
									<AlertTriangle className="size-5 text-amber-500 shrink-0" />
									<div>
										<h4 className="font-medium">GDPR Request</h4>
										<p className="mt-1 text-sm text-muted-foreground">
											You have the right to request access, correction, or
											deletion of your personal data.
										</p>
										<Button
											variant="link"
											size="sm"
											className="mt-2 h-auto p-0"
										>
											Submit a request
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
