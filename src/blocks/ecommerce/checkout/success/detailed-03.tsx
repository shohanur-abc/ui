import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Download,
	FileText,
	Key,
	CheckCircle,
	Clock,
	HardDrive,
	Copy,
	ExternalLink,
	LifeBuoy,
	BookOpen,
} from 'lucide-react';
import Link from 'next/link';

interface DownloadItemProps {
	name: string;
	description: string;
	version: string;
	size: string;
	format: string;
	downloadCount?: number;
}

interface LicenseProps {
	product: string;
	type: string;
	key: string;
	activations: string;
	validUntil: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const PageHeader = ({
	orderNumber,
	purchaseDate,
}: {
	orderNumber: string;
	purchaseDate: string;
}) => (
	<div className="flex flex-col @lg:flex-row @lg:items-center justify-between gap-4">
		<div className="flex items-center gap-4">
			<div className="size-14 rounded-full bg-primary/10 flex items-center justify-center">
				<CheckCircle className="size-7 text-primary" />
			</div>
			<div>
				<h1 className="text-2xl @lg:text-3xl font-bold">
					Purchase Complete
				</h1>
				<p className="text-muted-foreground">
					Order #{orderNumber} • {purchaseDate}
				</p>
			</div>
		</div>
		<Button variant="outline" className="gap-2">
			<Download className="size-4" />
			Download All
		</Button>
	</div>
);

const DownloadCard = ({
	name,
	description,
	version,
	size,
	format,
}: DownloadItemProps) => (
	<div className="flex items-start gap-4 p-4 rounded-xl border hover:bg-muted/50 transition-colors">
		<div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
			<FileText className="size-7 text-primary" />
		</div>
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2">
				<p className="font-semibold truncate">{name}</p>
				<Badge variant="outline" className="text-xs shrink-0">
					v{version}
				</Badge>
			</div>
			<p className="text-sm text-muted-foreground mt-1">{description}</p>
			<div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
				<div className="flex items-center gap-1">
					<HardDrive className="size-3" />
					<span>{size}</span>
				</div>
				<span className="uppercase">{format}</span>
			</div>
		</div>
		<Button size="sm" className="gap-2 shrink-0">
			<Download className="size-4" />
			Download
		</Button>
	</div>
);

const DownloadsSection = ({ items }: { items: DownloadItemProps[] }) => (
	<Card>
		<CardHeader>
			<CardTitle className="flex items-center gap-2">
				<Download className="size-5" />
				Your Downloads
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{items.map((item, i) => (
				<DownloadCard key={i} {...item} />
			))}
		</CardContent>
	</Card>
);

const LicenseCard = ({
	product,
	type,
	key: licenseKey,
	activations,
	validUntil,
}: LicenseProps) => (
	<div className="p-4 rounded-xl border space-y-3">
		<div className="flex items-start justify-between gap-4">
			<div>
				<p className="font-semibold">{product}</p>
				<Badge variant="secondary" className="mt-1">
					{type}
				</Badge>
			</div>
			<Button variant="ghost" size="icon">
				<Copy className="size-4" />
			</Button>
		</div>
		<div className="p-3 rounded-lg bg-muted/50 font-mono text-sm break-all">
			{licenseKey}
		</div>
		<div className="grid grid-cols-2 gap-4 text-sm">
			<div>
				<p className="text-muted-foreground">Activations</p>
				<p className="font-medium">{activations}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Valid Until</p>
				<p className="font-medium">{validUntil}</p>
			</div>
		</div>
	</div>
);

const LicensesSection = ({ licenses }: { licenses: LicenseProps[] }) => (
	<Card>
		<CardHeader>
			<CardTitle className="flex items-center gap-2">
				<Key className="size-5" />
				License Keys
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			{licenses.map((license, i) => (
				<LicenseCard key={i} {...license} />
			))}
		</CardContent>
	</Card>
);

const GettingStartedCard = ({
	steps,
}: {
	steps: { title: string; description: string }[];
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base">Getting Started</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			{steps.map((step, i) => (
				<div key={i} className="flex items-start gap-3">
					<div className="size-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-xs font-bold text-primary">
						{i + 1}
					</div>
					<div>
						<p className="font-medium text-sm">{step.title}</p>
						<p className="text-xs text-muted-foreground">{step.description}</p>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const ResourcesCard = () => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base">Resources</CardTitle>
		</CardHeader>
		<CardContent className="space-y-2">
			<Button variant="ghost" className="w-full justify-start gap-2" asChild>
				<Link href="/docs">
					<BookOpen className="size-4" />
					Documentation
					<ExternalLink className="size-3 ml-auto" />
				</Link>
			</Button>
			<Button variant="ghost" className="w-full justify-start gap-2" asChild>
				<Link href="/support">
					<LifeBuoy className="size-4" />
					Support Center
					<ExternalLink className="size-3 ml-auto" />
				</Link>
			</Button>
		</CardContent>
	</Card>
);

const OrderSummaryCard = ({
	items,
	total,
	currency,
}: {
	items: { name: string; price: number }[];
	total: number;
	currency: string;
}) => (
	<Card className="bg-muted/30">
		<CardHeader>
			<CardTitle className="text-base">Order Summary</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{items.map((item, i) => (
				<div key={i} className="flex justify-between text-sm">
					<span className="text-muted-foreground">{item.name}</span>
					<span>
						{currency}
						{item.price.toFixed(2)}
					</span>
				</div>
			))}
			<Separator />
			<div className="flex justify-between font-semibold">
				<span>Total</span>
				<span>
					{currency}
					{total.toFixed(2)}
				</span>
			</div>
		</CardContent>
	</Card>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="flex-1 gap-2"
				asChild
			>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const downloads: DownloadItemProps[] = [
		{
			name: 'Pro Design Suite',
			description: 'Complete design toolkit with templates and assets',
			version: '3.2.1',
			size: '845 MB',
			format: 'ZIP',
		},
		{
			name: 'Icon Library Premium',
			description: '5,000+ vector icons in multiple formats',
			version: '2.0.0',
			size: '128 MB',
			format: 'ZIP',
		},
		{
			name: 'Font Family Bundle',
			description: '12 premium font families with all weights',
			version: '1.5.0',
			size: '56 MB',
			format: 'ZIP',
		},
	];

	const licenses: LicenseProps[] = [
		{
			product: 'Pro Design Suite',
			type: 'Commercial License',
			key: 'PRDS-XXXX-YYYY-ZZZZ-1234',
			activations: '3 of 5 used',
			validUntil: 'Lifetime',
		},
		{
			product: 'Icon Library Premium',
			type: 'Extended License',
			key: 'ICON-AAAA-BBBB-CCCC-5678',
			activations: '1 of 10 used',
			validUntil: 'Lifetime',
		},
	];

	const gettingStartedSteps = [
		{
			title: 'Download your files',
			description: 'Click the download button next to each product',
		},
		{
			title: 'Extract the contents',
			description: 'Unzip the downloaded files to your preferred location',
		},
		{
			title: 'Activate your license',
			description: 'Enter your license key in the software settings',
		},
		{
			title: 'Start creating',
			description: 'Check the documentation for usage guides',
		},
	];

	const orderItems = [
		{ name: 'Pro Design Suite', price: 199.00 },
		{ name: 'Icon Library Premium', price: 49.00 },
		{ name: 'Font Family Bundle', price: 29.00 },
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<PageHeader
					orderNumber="DIG-2024-78432"
					purchaseDate="January 15, 2024"
				/>

				<div className="grid @lg:grid-cols-3 gap-6">
					<div className="@lg:col-span-2 space-y-6">
						<DownloadsSection items={downloads} />
						<LicensesSection licenses={licenses} />
					</div>
					<div className="space-y-6">
						<GettingStartedCard steps={gettingStartedSteps} />
						<ResourcesCard />
						<OrderSummaryCard
							items={orderItems}
							total={277.00}
							currency="$"
						/>
					</div>
				</div>

				<CTA
					items={[
						{ label: 'View Library', href: '/library' },
						{ label: 'Shop More', href: '/shop', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
