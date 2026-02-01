import {
	AlertTriangle,
	Archive,
	Calendar,
	Check,
	Clock,
	Download,
	RefreshCw,
	Settings2,
	Trash2,
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
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

type RetentionPolicy = {
	id: string;
	name: string;
	description: string;
	period: string;
	enabled: boolean;
};

type DataUsage = {
	category: string;
	used: number;
	total: number;
};

const RetentionPolicyCard = ({
	name,
	description,
	period,
	enabled,
}: RetentionPolicy) => (
	<div
		className={`flex items-start gap-4 rounded-lg border p-4 transition-all ${
			enabled ? 'border-primary/30 bg-primary/5' : ''
		}`}
	>
		<Checkbox id={name} defaultChecked={enabled} className="mt-1" />
		<div className="flex-1">
			<Label htmlFor={name} className="font-medium cursor-pointer">
				{name}
			</Label>
			<p className="mt-1 text-sm text-muted-foreground">{description}</p>
		</div>
		<Select defaultValue={period}>
			<SelectTrigger className="w-36">
				<SelectValue placeholder="Period" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="30days">30 Days</SelectItem>
				<SelectItem value="90days">90 Days</SelectItem>
				<SelectItem value="1year">1 Year</SelectItem>
				<SelectItem value="forever">Forever</SelectItem>
			</SelectContent>
		</Select>
	</div>
);

const DataUsageBar = ({ category, used, total }: DataUsage) => {
	const percentage = Math.round((used / total) * 100);

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between text-sm">
				<span>{category}</span>
				<span className="text-muted-foreground">
					{used} / {total} GB
				</span>
			</div>
			<Progress value={percentage} className="h-2" />
		</div>
	);
};

export default function Main() {
	const retentionPolicies: RetentionPolicy[] = [
		{
			id: 'activity',
			name: 'Activity Logs',
			description: 'Login history, page views, and actions',
			period: '90days',
			enabled: true,
		},
		{
			id: 'orders',
			name: 'Order History',
			description: 'Past orders and transaction records',
			period: 'forever',
			enabled: true,
		},
		{
			id: 'messages',
			name: 'Support Messages',
			description: 'Chat and support ticket history',
			period: '1year',
			enabled: true,
		},
		{
			id: 'cart',
			name: 'Abandoned Carts',
			description: "Saved cart items that weren't purchased",
			period: '30days',
			enabled: true,
		},
		{
			id: 'analytics',
			name: 'Analytics Data',
			description: 'Usage statistics and behavior data',
			period: '90days',
			enabled: false,
		},
	];

	const dataUsage: DataUsage[] = [
		{ category: 'Orders & Transactions', used: 15.4, total: 50 },
		{ category: 'Activity & Logs', used: 8.7, total: 20 },
		{ category: 'Media & Uploads', used: 3.2, total: 25 },
		{ category: 'Messages', used: 1.1, total: 5 },
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
										<Clock className="size-5 text-primary" />
									</div>
									<div>
										<CardTitle>Data Retention</CardTitle>
										<CardDescription>
											Set how long we keep your data
										</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent className="space-y-4 pt-6">
								{retentionPolicies.map((policy) => (
									<RetentionPolicyCard key={policy.id} {...policy} />
								))}
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="border-b">
								<CardTitle className="text-base">
									Auto-Delete Settings
								</CardTitle>
								<CardDescription>
									Automatically delete old data based on your preferences
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6 pt-6">
								<div className="flex items-center justify-between">
									<div>
										<Label>Enable Auto-Delete</Label>
										<p className="text-sm text-muted-foreground">
											Automatically remove data past retention period
										</p>
									</div>
									<Switch defaultChecked />
								</div>
								<Separator />
								<div className="space-y-4">
									<Label>Pre-deletion Warning (days)</Label>
									<div className="flex items-center gap-4">
										<Slider
											defaultValue={[7]}
											max={30}
											step={1}
											className="flex-1"
										/>
										<span className="w-12 text-right text-sm text-muted-foreground">
											7 days
										</span>
									</div>
									<p className="text-xs text-muted-foreground">
										You'll receive an email before data is permanently deleted
									</p>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Storage Usage</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								{dataUsage.map((usage) => (
									<DataUsageBar key={usage.category} {...usage} />
								))}
								<Separator />
								<div className="flex items-center justify-between">
									<span className="font-medium">Total Used</span>
									<span className="font-semibold">28.4 / 100 GB</span>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">Quick Actions</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<Button
									variant="outline"
									className="w-full justify-start gap-2"
								>
									<Archive className="size-4" />
									Archive Old Data
								</Button>
								<Button
									variant="outline"
									className="w-full justify-start gap-2"
								>
									<Download className="size-4" />
									Download Before Delete
								</Button>
								<Button
									variant="outline"
									className="w-full justify-start gap-2 text-destructive hover:text-destructive"
								>
									<Trash2 className="size-4" />
									Delete All Data
								</Button>
							</CardContent>
						</Card>

						<Card className="border-amber-500/20 bg-amber-500/5">
							<CardContent className="pt-6">
								<div className="flex items-start gap-3">
									<AlertTriangle className="size-5 text-amber-500 shrink-0" />
									<div>
										<h4 className="font-medium">Legal Requirements</h4>
										<p className="mt-1 text-sm text-muted-foreground">
											Some data may need to be retained for legal or regulatory
											compliance, even after your deletion request.
										</p>
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
