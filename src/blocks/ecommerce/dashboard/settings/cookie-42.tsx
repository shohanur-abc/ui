import {
	AlertTriangle,
	Check,
	ChevronRight,
	Cookie,
	ExternalLink,
	Info,
	Settings2,
	X,
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

type CookieCategory = {
	id: string;
	name: string;
	description: string;
	required: boolean;
	enabled: boolean;
	cookieCount: number;
};

type CookieDetail = {
	name: string;
	provider: string;
	purpose: string;
	expiry: string;
};

const CookieCategoryCard = ({
	name,
	description,
	required,
	enabled,
	cookieCount,
}: CookieCategory) => (
	<div
		className={`rounded-lg border p-4 transition-all ${
			enabled || required ? 'border-primary/30 bg-primary/5' : ''
		}`}
	>
		<div className="flex items-start justify-between">
			<div>
				<div className="flex items-center gap-2">
					<h4 className="font-medium">{name}</h4>
					{required && (
						<Badge variant="secondary" className="text-xs">
							Required
						</Badge>
					)}
				</div>
				<p className="mt-1 text-sm text-muted-foreground">{description}</p>
				<p className="mt-2 text-xs text-muted-foreground">
					{cookieCount} cookies used
				</p>
			</div>
			<Switch defaultChecked={enabled || required} disabled={required} />
		</div>
	</div>
);

const CookieDetailRow = ({ name, provider, purpose, expiry }: CookieDetail) => (
	<div className="grid gap-2 py-3 @sm:grid-cols-4">
		<div>
			<code className="text-sm">{name}</code>
		</div>
		<div className="text-sm text-muted-foreground">{provider}</div>
		<div className="text-sm text-muted-foreground">{purpose}</div>
		<div className="text-sm text-muted-foreground">{expiry}</div>
	</div>
);

export default function Main() {
	const cookieCategories: CookieCategory[] = [
		{
			id: 'essential',
			name: 'Essential Cookies',
			description:
				'Required for the website to function. Cannot be disabled.',
			required: true,
			enabled: true,
			cookieCount: 4,
		},
		{
			id: 'functional',
			name: 'Functional Cookies',
			description:
				'Enable personalization and remember your preferences.',
			required: false,
			enabled: true,
			cookieCount: 6,
		},
		{
			id: 'analytics',
			name: 'Analytics Cookies',
			description:
				'Help us understand how visitors use our website.',
			required: false,
			enabled: true,
			cookieCount: 3,
		},
		{
			id: 'marketing',
			name: 'Marketing Cookies',
			description:
				'Used to deliver personalized advertisements.',
			required: false,
			enabled: false,
			cookieCount: 8,
		},
	];

	const cookieDetails: CookieDetail[] = [
		{ name: '_session', provider: 'First-party', purpose: 'Session management', expiry: 'Session' },
		{ name: '_auth', provider: 'First-party', purpose: 'Authentication', expiry: '30 days' },
		{ name: '_ga', provider: 'Google', purpose: 'Analytics', expiry: '2 years' },
		{ name: '_fbp', provider: 'Facebook', purpose: 'Marketing', expiry: '3 months' },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<Cookie className="size-5 text-primary" />
								</div>
								<div>
									<CardTitle>Cookie Preferences</CardTitle>
									<CardDescription>
										Manage how we use cookies on this website
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-4 pt-6">
							{cookieCategories.map((category) => (
								<CookieCategoryCard key={category.id} {...category} />
							))}
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center justify-between">
								<div>
									<CardTitle className="text-base">Cookie Details</CardTitle>
									<CardDescription>
										Complete list of cookies we use
									</CardDescription>
								</div>
								<Button variant="outline" size="sm" className="gap-2">
									<ExternalLink className="size-4" />
									Cookie Policy
								</Button>
							</div>
						</CardHeader>
						<CardContent className="pt-4">
							<div className="grid gap-2 border-b py-2 text-sm font-medium text-muted-foreground @sm:grid-cols-4">
								<span>Cookie Name</span>
								<span>Provider</span>
								<span>Purpose</span>
								<span>Expiry</span>
							</div>
							<div className="divide-y">
								{cookieDetails.map((cookie) => (
									<CookieDetailRow key={cookie.name} {...cookie} />
								))}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<CardTitle className="text-base">Quick Settings</CardTitle>
						</CardHeader>
						<CardContent className="pt-6">
							<RadioGroup defaultValue="custom" className="space-y-3">
								{[
									{
										value: 'essential',
										label: 'Essential Only',
										description: 'Only required cookies',
									},
									{
										value: 'balanced',
										label: 'Balanced',
										description: 'Essential + functional cookies',
									},
									{
										value: 'all',
										label: 'Accept All',
										description: 'All cookie categories',
									},
									{
										value: 'custom',
										label: 'Custom',
										description: 'Your current preferences',
									},
								].map((option) => (
									<Label
										key={option.value}
										htmlFor={option.value}
										className="flex items-start gap-4 rounded-lg border p-4 cursor-pointer hover:bg-muted/30 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
									>
										<RadioGroupItem value={option.value} id={option.value} className="mt-1" />
										<div>
											<span className="font-medium">{option.label}</span>
											<p className="text-sm text-muted-foreground">
												{option.description}
											</p>
										</div>
									</Label>
								))}
							</RadioGroup>
						</CardContent>
					</Card>

					<div className="flex justify-end gap-3">
						<Button variant="outline">Reset to Defaults</Button>
						<Button>Save Preferences</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
