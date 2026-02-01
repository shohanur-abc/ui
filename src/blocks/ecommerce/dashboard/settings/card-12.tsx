import { ArrowRight, Crown, Package, Settings, Users, Zap } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

type SettingCard = {
	title: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	href: string;
	badge?: string;
	badgeVariant?: 'default' | 'secondary' | 'destructive';
};

const SettingsCard = ({
	title,
	description,
	icon: Icon,
	href,
	badge,
	badgeVariant = 'secondary',
}: SettingCard) => (
	<a
		href={href}
		className="group flex flex-col rounded-lg border p-6 transition-all hover:border-primary/50 hover:bg-muted/30 hover:shadow-lg hover:shadow-primary/5"
	>
		<div className="flex items-start justify-between">
			<div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
				<Icon className="size-6 text-primary" />
			</div>
			{badge && (
				<Badge variant={badgeVariant} className="text-xs">
					{badge}
				</Badge>
			)}
		</div>
		<div className="mt-4 flex-1">
			<h3 className="font-semibold transition-colors group-hover:text-primary">
				{title}
			</h3>
			<p className="mt-1 text-sm text-muted-foreground">{description}</p>
		</div>
		<div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
			<span>Configure</span>
			<ArrowRight className="size-4" />
		</div>
	</a>
);

export default function Main() {
	const settingsCards: SettingCard[] = [
		{
			title: 'Store Settings',
			description: 'Configure your store name, logo, and business information',
			icon: Settings,
			href: '#store',
		},
		{
			title: 'Team Members',
			description: 'Manage team access and permissions',
			icon: Users,
			href: '#team',
			badge: '5 members',
		},
		{
			title: 'Subscription',
			description: 'View and manage your subscription plan',
			icon: Crown,
			href: '#subscription',
			badge: 'Pro',
			badgeVariant: 'default',
		},
		{
			title: 'Integrations',
			description: 'Connect third-party apps and services',
			icon: Zap,
			href: '#integrations',
			badge: '3 active',
		},
		{
			title: 'Shipping',
			description: 'Set up shipping zones and rates',
			icon: Package,
			href: '#shipping',
		},
		{
			title: 'Advanced',
			description: 'Developer settings and API configuration',
			icon: Settings,
			href: '#advanced',
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-5xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="mb-8">
					<h1 className="text-2xl font-bold @md:text-3xl">Settings</h1>
					<p className="mt-1 text-muted-foreground">
						Manage your store settings and preferences
					</p>
				</div>
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
					{settingsCards.map((card) => (
						<SettingsCard key={card.title} {...card} />
					))}
				</div>
			</div>
		</section>
	);
}
