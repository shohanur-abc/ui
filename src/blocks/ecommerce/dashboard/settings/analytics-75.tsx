import {
	AlertCircle,
	ArrowUpRight,
	BarChart3,
	Check,
	ExternalLink,
	Eye,
	FileText,
	Globe,
	Hash,
	LineChart,
	Plus,
	Settings2,
	Target,
	TrendingUp,
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

type AnalyticsPlatform = {
	id: string;
	name: string;
	icon: string;
	connected: boolean;
	trackingId?: string;
};

type MetricCard = {
	label: string;
	value: string;
	change: string;
	changeType: 'positive' | 'negative';
};

const PlatformCard = ({
	name,
	icon,
	connected,
	trackingId,
}: AnalyticsPlatform) => (
	<div
		className={`rounded-lg border p-4 transition-all ${
			connected ? 'border-primary/30 bg-primary/5' : ''
		}`}
	>
		<div className="flex items-start justify-between">
			<div className="flex items-center gap-3">
				<div
					className={`flex size-10 items-center justify-center rounded-lg text-xl ${
						connected ? 'bg-primary/10' : 'bg-muted'
					}`}
				>
					{icon}
				</div>
				<div>
					<div className="flex items-center gap-2">
						<h4 className="font-medium">{name}</h4>
						{connected && (
							<Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-xs">
								<Check className="mr-1 size-3" />
								Connected
							</Badge>
						)}
					</div>
					{trackingId && (
						<code className="text-xs text-muted-foreground">{trackingId}</code>
					)}
				</div>
			</div>
			{connected ? (
				<Button variant="ghost" size="sm">
					<Settings2 className="size-4" />
				</Button>
			) : (
				<Button size="sm">Connect</Button>
			)}
		</div>
	</div>
);

const StatCard = ({ label, value, change, changeType }: MetricCard) => (
	<div className="rounded-lg border p-4">
		<p className="text-sm text-muted-foreground">{label}</p>
		<p className="text-2xl font-bold mt-1">{value}</p>
		<p
			className={`text-sm mt-1 flex items-center gap-1 ${
				changeType === 'positive' ? 'text-emerald-500' : 'text-destructive'
			}`}
		>
			<ArrowUpRight className="size-3" />
			{change}
		</p>
	</div>
);

export default function Main() {
	const platforms: AnalyticsPlatform[] = [
		{
			id: 'ga4',
			name: 'Google Analytics 4',
			icon: '📊',
			connected: true,
			trackingId: 'G-XXXXXXXXXX',
		},
		{
			id: 'fb',
			name: 'Facebook Pixel',
			icon: '📘',
			connected: true,
			trackingId: '1234567890',
		},
		{
			id: 'gtm',
			name: 'Google Tag Manager',
			icon: '🏷️',
			connected: true,
			trackingId: 'GTM-XXXXXX',
		},
		{ id: 'hotjar', name: 'Hotjar', icon: '🔥', connected: false },
		{ id: 'mixpanel', name: 'Mixpanel', icon: '📈', connected: false },
	];

	const metrics: MetricCard[] = [
		{
			label: 'Page Views',
			value: '124,892',
			change: '+12.5%',
			changeType: 'positive',
		},
		{
			label: 'Conversions',
			value: '1,234',
			change: '+8.2%',
			changeType: 'positive',
		},
		{
			label: 'Bounce Rate',
			value: '42.3%',
			change: '-5.1%',
			changeType: 'positive',
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<div className="grid gap-4 @sm:grid-cols-3">
						{metrics.map((metric) => (
							<StatCard key={metric.label} {...metric} />
						))}
					</div>

					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
										<BarChart3 className="size-5 text-primary" />
									</div>
									<div>
										<CardTitle>Analytics & Tracking</CardTitle>
										<CardDescription>
											Connect analytics platforms to track performance
										</CardDescription>
									</div>
								</div>
								<Button variant="outline" className="gap-2">
									<Plus className="size-4" />
									Add Platform
								</Button>
							</div>
						</CardHeader>
						<CardContent className="space-y-4 pt-6">
							{platforms.map((platform) => (
								<PlatformCard key={platform.id} {...platform} />
							))}
						</CardContent>
					</Card>

					<div className="grid gap-6 @lg:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Tracking Settings</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<div>
										<Label>Enhanced Ecommerce</Label>
										<p className="text-sm text-muted-foreground">
											Track product views, add to cart, purchases
										</p>
									</div>
									<Switch defaultChecked />
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div>
										<Label>User ID Tracking</Label>
										<p className="text-sm text-muted-foreground">
											Track logged-in users across devices
										</p>
									</div>
									<Switch defaultChecked />
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div>
										<Label>Cookie Consent Required</Label>
										<p className="text-sm text-muted-foreground">
											Wait for consent before tracking
										</p>
									</div>
									<Switch defaultChecked />
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">Custom Scripts</CardTitle>
								<CardDescription>
									Add custom tracking code to your store
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label>Header Scripts</Label>
									<Textarea
										placeholder="<!-- Add scripts here -->"
										className="font-mono text-sm min-h-20"
									/>
								</div>
								<div className="space-y-2">
									<Label>Footer Scripts</Label>
									<Textarea
										placeholder="<!-- Add scripts here -->"
										className="font-mono text-sm min-h-20"
									/>
								</div>
								<Button size="sm">Save Scripts</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
