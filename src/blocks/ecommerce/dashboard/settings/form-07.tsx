import { Eye, EyeOff, Lock, Shield, Trash2, UserX } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

type PrivacySetting = {
	id: string;
	title: string;
	description: string;
	enabled: boolean;
};

type DataOption = {
	id: string;
	label: string;
	description: string;
	checked: boolean;
};

const PrivacyToggle = ({ title, description, enabled }: PrivacySetting) => (
	<div className="flex items-center justify-between gap-4 py-4">
		<div className="space-y-1">
			<Label className="font-medium">{title}</Label>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<Switch defaultChecked={enabled} />
	</div>
);

const DataCheckbox = ({ id, label, description, checked }: DataOption) => (
	<div className="flex items-start gap-3 rounded-lg border p-4 transition-all hover:border-primary/30">
		<Checkbox id={id} defaultChecked={checked} className="mt-0.5" />
		<div className="space-y-1">
			<Label htmlFor={id} className="font-medium cursor-pointer">
				{label}
			</Label>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</div>
);

const DangerAction = ({
	icon: Icon,
	title,
	description,
	buttonLabel,
	variant = 'outline',
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
	buttonLabel: string;
	variant?: 'outline' | 'destructive';
}) => (
	<div className="flex flex-col gap-4 rounded-lg border border-destructive/20 bg-destructive/5 p-4 @sm:flex-row @sm:items-center @sm:justify-between">
		<div className="flex items-start gap-3">
			<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
				<Icon className="size-5 text-destructive" />
			</div>
			<div>
				<h4 className="font-medium">{title}</h4>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</div>
		<Button variant={variant} size="sm" className="shrink-0">
			{buttonLabel}
		</Button>
	</div>
);

export default function Main() {
	const privacySettings: PrivacySetting[] = [
		{
			id: 'profileVisibility',
			title: 'Public Profile',
			description: 'Make your profile visible to other users',
			enabled: false,
		},
		{
			id: 'activityStatus',
			title: 'Show Activity Status',
			description: 'Let others see when you are active',
			enabled: true,
		},
		{
			id: 'searchEngines',
			title: 'Search Engine Indexing',
			description: 'Allow search engines to index your public pages',
			enabled: false,
		},
		{
			id: 'analytics',
			title: 'Usage Analytics',
			description: 'Help improve the product by sharing anonymous usage data',
			enabled: true,
		},
	];

	const dataOptions: DataOption[] = [
		{
			id: 'orderHistory',
			label: 'Order History',
			description: 'Include your complete order history',
			checked: true,
		},
		{
			id: 'savedAddresses',
			label: 'Saved Addresses',
			description: 'Include saved shipping and billing addresses',
			checked: true,
		},
		{
			id: 'paymentMethods',
			label: 'Payment Information',
			description: 'Include saved payment methods (partial)',
			checked: false,
		},
		{
			id: 'preferences',
			label: 'Preferences & Settings',
			description: 'Include your dashboard preferences',
			checked: true,
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-3xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<Eye className="size-5 text-primary" />
								</div>
								<div>
									<CardTitle>Privacy Settings</CardTitle>
									<CardDescription>Control your privacy and visibility preferences</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="divide-y pt-2">
							{privacySettings.map((setting) => (
								<PrivacyToggle key={setting.id} {...setting} />
							))}
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
										<Shield className="size-5 text-primary" />
									</div>
									<div>
										<CardTitle>Data Export</CardTitle>
										<CardDescription>Download a copy of your data</CardDescription>
									</div>
								</div>
								<Badge variant="secondary">GDPR Compliant</Badge>
							</div>
						</CardHeader>
						<CardContent className="space-y-4 pt-6">
							<div className="grid gap-3 @sm:grid-cols-2">
								{dataOptions.map((option) => (
									<DataCheckbox key={option.id} {...option} />
								))}
							</div>
							<div className="flex justify-end">
								<Button variant="outline">Request Data Export</Button>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<CardTitle className="text-destructive">Danger Zone</CardTitle>
							<CardDescription>Irreversible and destructive actions</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4 pt-6">
							<DangerAction
								icon={UserX}
								title="Deactivate Account"
								description="Temporarily disable your account. You can reactivate anytime."
								buttonLabel="Deactivate"
							/>
							<DangerAction
								icon={Trash2}
								title="Delete Account"
								description="Permanently delete your account and all associated data."
								buttonLabel="Delete Account"
								variant="destructive"
							/>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
