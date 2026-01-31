import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	AlertTriangle,
	Calendar,
	Camera,
	CheckCircle,
	Clock,
	Eye,
	FileText,
	Globe,
	Monitor,
	MousePointer,
	Server,
	Shield,
	TrendingUp,
	Users,
	Zap,
} from 'lucide-react';

interface SubscriptionInfoProps {
	planName: string;
	planTier: string;
	billingCycle: string;
	accountId: string;
	renewalDate: string;
	status: string;
	memberSince: string;
}

interface UsageMetricProps {
	name: string;
	icon: React.ReactNode;
	used: number;
	limit: number;
	unit: string;
	overage: number;
}

interface FeatureUsageProps {
	feature: string;
	included: boolean;
	usage: string;
	status: string;
}

interface APICallProps {
	endpoint: string;
	method: string;
	calls: number;
	errors: number;
	avgLatency: number;
}

interface AddonProps {
	name: string;
	description: string;
	quantity: number;
	unitPrice: number;
	total: number;
}

interface UsageChargeProps {
	category: string;
	description: string;
	quantity: number;
	rate: number;
	amount: number;
}

interface BillingSummaryProps {
	basePlan: number;
	addons: number;
	usageCharges: number;
	credits: number;
	subtotal: number;
	tax: number;
	total: number;
	currency: string;
}

const SubscriptionInfo = ({
	planName,
	planTier,
	billingCycle,
	accountId,
	renewalDate,
	status,
	memberSince,
}: SubscriptionInfoProps) => (
	<Card className="bg-gradient-to-r from-purple-500/5 to-fuchsia-500/5 border-purple-500/20">
		<CardContent className="pt-6">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-4">
					<div className="size-16 rounded-lg bg-purple-500/10 flex items-center justify-center">
						<Zap className="size-8 text-purple-500" />
					</div>
					<div>
						<h1 className="text-2xl font-bold">{planName}</h1>
						<p className="text-muted-foreground">
							{planTier} Plan • {billingCycle}
						</p>
					</div>
				</div>
				<Badge variant="default" className="text-sm">
					{status}
				</Badge>
			</div>
			<div className="grid grid-cols-2 @md:grid-cols-4 gap-4 mt-6 text-sm">
				<div>
					<p className="text-xs text-muted-foreground">Account ID</p>
					<p className="font-mono font-semibold">{accountId}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Member Since</p>
					<p>{memberSince}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Billing Cycle</p>
					<p>{billingCycle}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Renewal Date</p>
					<p className="font-medium text-primary">{renewalDate}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const UsageMetrics = ({ metrics }: { metrics: UsageMetricProps[] }) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<TrendingUp className="size-4" />
				Usage Summary
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-6">
			{metrics.map((metric, index) => (
				<div key={index} className="space-y-2">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							{metric.icon}
							<span className="font-medium">{metric.name}</span>
						</div>
						<div className="text-right text-sm">
							<span className="font-bold">{metric.used.toLocaleString()}</span>
							<span className="text-muted-foreground">
								{' '}
								/ {metric.limit.toLocaleString()} {metric.unit}
							</span>
						</div>
					</div>
					<Progress
						value={(metric.used / metric.limit) * 100}
						className={`h-2 ${metric.used > metric.limit ? 'bg-red-200' : ''}`}
					/>
					{metric.overage > 0 && (
						<div className="flex items-center gap-1 text-xs text-red-500">
							<AlertTriangle className="size-3" />
							<span>
								Overage: {metric.overage.toLocaleString()} {metric.unit}
							</span>
						</div>
					)}
				</div>
			))}
		</CardContent>
	</Card>
);

const FeatureUsageTable = ({ features }: { features: FeatureUsageProps[] }) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<Shield className="size-4" />
				Feature Usage
			</CardTitle>
		</CardHeader>
		<CardContent>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Feature</TableHead>
						<TableHead className="text-center">Included</TableHead>
						<TableHead>Usage</TableHead>
						<TableHead className="text-center">Status</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{features.map((feature, index) => (
						<TableRow key={index}>
							<TableCell className="font-medium">{feature.feature}</TableCell>
							<TableCell className="text-center">
								{feature.included ? (
									<CheckCircle className="size-4 text-green-500 mx-auto" />
								) : (
									<span className="text-xs text-muted-foreground">Add-on</span>
								)}
							</TableCell>
							<TableCell className="text-sm text-muted-foreground">
								{feature.usage}
							</TableCell>
							<TableCell className="text-center">
								<Badge
									variant={
										feature.status === 'Active' ? 'default' : 'secondary'
									}
								>
									{feature.status}
								</Badge>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
);

const APIUsageTable = ({ calls }: { calls: APICallProps[] }) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<Server className="size-4" />
				API Usage by Endpoint
			</CardTitle>
		</CardHeader>
		<CardContent>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Endpoint</TableHead>
						<TableHead className="text-center">Method</TableHead>
						<TableHead className="text-right">Calls</TableHead>
						<TableHead className="text-right">Errors</TableHead>
						<TableHead className="text-right">Avg Latency</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{calls.map((call, index) => (
						<TableRow key={index}>
							<TableCell className="font-mono text-sm">
								{call.endpoint}
							</TableCell>
							<TableCell className="text-center">
								<Badge
									variant={
										call.method === 'GET'
											? 'secondary'
											: call.method === 'POST'
												? 'default'
												: 'outline'
									}
								>
									{call.method}
								</Badge>
							</TableCell>
							<TableCell className="text-right">
								{call.calls.toLocaleString()}
							</TableCell>
							<TableCell className="text-right text-red-500">
								{call.errors > 0 ? call.errors : '-'}
							</TableCell>
							<TableCell className="text-right">{call.avgLatency}ms</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
);

const AddonsTable = ({
	addons,
	currency,
}: {
	addons: AddonProps[];
	currency: string;
}) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<FileText className="size-4" />
				Add-ons & Extensions
			</CardTitle>
		</CardHeader>
		<CardContent>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Add-on</TableHead>
						<TableHead>Description</TableHead>
						<TableHead className="text-center">Qty</TableHead>
						<TableHead className="text-right">Unit Price</TableHead>
						<TableHead className="text-right">Total</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{addons.map((addon, index) => (
						<TableRow key={index}>
							<TableCell className="font-medium">{addon.name}</TableCell>
							<TableCell className="text-muted-foreground text-sm">
								{addon.description}
							</TableCell>
							<TableCell className="text-center">{addon.quantity}</TableCell>
							<TableCell className="text-right">
								{currency}
								{addon.unitPrice}
							</TableCell>
							<TableCell className="text-right font-medium">
								{currency}
								{addon.total}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
);

const UsageChargesTable = ({
	charges,
	currency,
}: {
	charges: UsageChargeProps[];
	currency: string;
}) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<TrendingUp className="size-4" />
				Usage-Based Charges
			</CardTitle>
		</CardHeader>
		<CardContent>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Category</TableHead>
						<TableHead>Description</TableHead>
						<TableHead className="text-right">Quantity</TableHead>
						<TableHead className="text-right">Rate</TableHead>
						<TableHead className="text-right">Amount</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{charges.map((charge, index) => (
						<TableRow key={index}>
							<TableCell>
								<Badge variant="outline">{charge.category}</Badge>
							</TableCell>
							<TableCell>{charge.description}</TableCell>
							<TableCell className="text-right">
								{charge.quantity.toLocaleString()}
							</TableCell>
							<TableCell className="text-right">
								{currency}
								{charge.rate.toFixed(4)}
							</TableCell>
							<TableCell className="text-right font-medium">
								{currency}
								{charge.amount.toFixed(2)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
);

const BillingSummary = ({
	basePlan,
	addons,
	usageCharges,
	credits,
	subtotal,
	tax,
	total,
	currency,
}: BillingSummaryProps) => (
	<Card className="bg-primary text-primary-foreground">
		<CardHeader className="pb-3">
			<CardTitle className="text-base text-primary-foreground">
				Billing Summary
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="space-y-2 text-sm">
				<div className="flex justify-between">
					<span className="opacity-80">Base Plan (Pro)</span>
					<span>
						{currency}
						{basePlan.toFixed(2)}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="opacity-80">Add-ons</span>
					<span>
						{currency}
						{addons.toFixed(2)}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="opacity-80">Usage Charges</span>
					<span>
						{currency}
						{usageCharges.toFixed(2)}
					</span>
				</div>
				{credits > 0 && (
					<div className="flex justify-between text-green-300">
						<span>Credits Applied</span>
						<span>
							-{currency}
							{credits.toFixed(2)}
						</span>
					</div>
				)}
			</div>
			<Separator className="bg-primary-foreground/20" />
			<div className="flex justify-between">
				<span className="opacity-80">Subtotal</span>
				<span>
					{currency}
					{subtotal.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between">
				<span className="opacity-80">Tax (10%)</span>
				<span>
					{currency}
					{tax.toFixed(2)}
				</span>
			</div>
			<Separator className="bg-primary-foreground/20" />
			<div className="flex justify-between font-bold text-2xl">
				<span>Total Due</span>
				<span>
					{currency}
					{total.toFixed(2)}
				</span>
			</div>
			<div className="flex items-center gap-2 text-xs opacity-80">
				<Clock className="size-3" />
				<span>Due on billing cycle renewal</span>
			</div>
			<Button variant="secondary" className="w-full">
				Update Payment Method
			</Button>
		</CardContent>
	</Card>
);

export default function Main() {
	const subscription: SubscriptionInfoProps = {
		planName: 'CloudSync Platform',
		planTier: 'Pro',
		billingCycle: 'Monthly',
		accountId: 'CS-2024-789012',
		renewalDate: 'March 1, 2024',
		status: 'Active',
		memberSince: 'June 2022',
	};

	const usageMetrics: UsageMetricProps[] = [
		{
			name: 'API Calls',
			icon: <Server className="size-4 text-blue-500" />,
			used: 850000,
			limit: 1000000,
			unit: 'calls',
			overage: 0,
		},
		{
			name: 'Storage',
			icon: <Monitor className="size-4 text-green-500" />,
			used: 245,
			limit: 500,
			unit: 'GB',
			overage: 0,
		},
		{
			name: 'Bandwidth',
			icon: <Globe className="size-4 text-purple-500" />,
			used: 1850,
			limit: 2000,
			unit: 'GB',
			overage: 0,
		},
		{
			name: 'Media Processing',
			icon: <Camera className="size-4 text-orange-500" />,
			used: 125,
			limit: 100,
			unit: 'hours',
			overage: 25,
		},
		{
			name: 'Active Users',
			icon: <Users className="size-4 text-cyan-500" />,
			used: 48,
			limit: 50,
			unit: 'seats',
			overage: 0,
		},
	];

	const features: FeatureUsageProps[] = [
		{
			feature: 'Real-time Analytics',
			included: true,
			usage: 'Active - 2.4M events/day',
			status: 'Active',
		},
		{
			feature: 'Custom Domains',
			included: true,
			usage: '5 domains configured',
			status: 'Active',
		},
		{
			feature: 'SSL Certificates',
			included: true,
			usage: 'Auto-renewed',
			status: 'Active',
		},
		{
			feature: 'Webhooks',
			included: true,
			usage: '12 endpoints',
			status: 'Active',
		},
		{
			feature: 'Priority Support',
			included: false,
			usage: '3 tickets this month',
			status: 'Active',
		},
		{
			feature: 'Advanced AI Features',
			included: false,
			usage: 'Beta access',
			status: 'Beta',
		},
	];

	const apiCalls: APICallProps[] = [
		{
			endpoint: '/api/v2/users',
			method: 'GET',
			calls: 245680,
			errors: 12,
			avgLatency: 45,
		},
		{
			endpoint: '/api/v2/data',
			method: 'POST',
			calls: 189450,
			errors: 8,
			avgLatency: 120,
		},
		{
			endpoint: '/api/v2/analytics',
			method: 'GET',
			calls: 156890,
			errors: 3,
			avgLatency: 89,
		},
		{
			endpoint: '/api/v2/files',
			method: 'PUT',
			calls: 98760,
			errors: 24,
			avgLatency: 245,
		},
		{
			endpoint: '/api/v2/webhooks',
			method: 'POST',
			calls: 45230,
			errors: 5,
			avgLatency: 65,
		},
	];

	const addons: AddonProps[] = [
		{
			name: 'Priority Support',
			description: '24/7 phone & chat support',
			quantity: 1,
			unitPrice: 99,
			total: 99,
		},
		{
			name: 'Advanced Security',
			description: 'WAF, DDoS protection',
			quantity: 1,
			unitPrice: 149,
			total: 149,
		},
		{
			name: 'Additional Seats',
			description: 'Extra user licenses',
			quantity: 10,
			unitPrice: 15,
			total: 150,
		},
	];

	const usageCharges: UsageChargeProps[] = [
		{
			category: 'Compute',
			description: 'Media processing overage',
			quantity: 25,
			rate: 2.5,
			amount: 62.5,
		},
		{
			category: 'API',
			description: 'Premium endpoint calls',
			quantity: 15000,
			rate: 0.0015,
			amount: 22.5,
		},
		{
			category: 'Storage',
			description: 'Cold storage archive',
			quantity: 50,
			rate: 0.005,
			amount: 0.25,
		},
	];

	const billing: BillingSummaryProps = {
		basePlan: 299,
		addons: 398,
		usageCharges: 85.25,
		credits: 25,
		subtotal: 757.25,
		tax: 75.73,
		total: 832.98,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="space-y-6">
					<SubscriptionInfo {...subscription} />
					<UsageMetrics metrics={usageMetrics} />
					<div className="grid @md:grid-cols-2 gap-4">
						<FeatureUsageTable features={features} />
						<APIUsageTable calls={apiCalls} />
					</div>
					<AddonsTable addons={addons} currency="$" />
					<div className="grid @md:grid-cols-3 gap-4">
						<div className="@md:col-span-2">
							<UsageChargesTable charges={usageCharges} currency="$" />
						</div>
						<BillingSummary {...billing} />
					</div>
					<Card>
						<CardContent className="pt-6 text-sm text-muted-foreground">
							<div className="flex items-center gap-2 mb-2">
								<Eye className="size-4" />
								<span className="font-medium text-foreground">Usage Tips</span>
							</div>
							<ul className="list-disc list-inside space-y-1">
								<li>
									Consider upgrading to Business plan for unlimited media
									processing
								</li>
								<li>
									Enable caching to reduce API call volume and improve
									performance
								</li>
								<li>
									Archive unused files to cold storage to save on storage costs
								</li>
							</ul>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
