import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	Download,
	FileText,
	Key,
	ArrowRight,
	CheckCircle,
	Copy,
	Mail,
	ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

interface DownloadItemProps {
	name: string;
	type: string;
	size: string;
	format: string;
}

interface LicenseProps {
	product: string;
	key: string;
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

const SuccessHeader = ({
	orderNumber,
	email,
}: {
	orderNumber: string;
	email: string;
}) => (
	<div className="text-center space-y-4">
		<div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
			<CheckCircle className="size-10 text-primary" />
		</div>
		<div>
			<h1 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold">
				Purchase Complete!
			</h1>
			<p className="text-muted-foreground mt-2">
				Your digital products are ready for download
			</p>
		</div>
		<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50">
			<Mail className="size-4 text-muted-foreground" />
			<span className="text-sm">Receipt sent to {email}</span>
		</div>
	</div>
);

const OrderInfo = ({
	orderNumber,
	total,
	currency,
	date,
}: {
	orderNumber: string;
	total: number;
	currency: string;
	date: string;
}) => (
	<div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-muted/30">
		<div className="text-center">
			<p className="text-xs text-muted-foreground">Order</p>
			<p className="font-mono font-semibold">{orderNumber}</p>
		</div>
		<div className="text-center border-x">
			<p className="text-xs text-muted-foreground">Date</p>
			<p className="font-semibold">{date}</p>
		</div>
		<div className="text-center">
			<p className="text-xs text-muted-foreground">Total</p>
			<p className="font-semibold">
				{currency}
				{total.toFixed(2)}
			</p>
		</div>
	</div>
);

const DownloadItem = ({ name, type, size, format }: DownloadItemProps) => (
	<div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
		<div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
			<FileText className="size-7 text-primary" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium truncate">{name}</p>
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<Badge variant="outline" className="text-xs">
					{format}
				</Badge>
				<span>{size}</span>
			</div>
		</div>
		<Button size="sm" className="gap-2">
			<Download className="size-4" />
			Download
		</Button>
	</div>
);

const DownloadsSection = ({ items }: { items: DownloadItemProps[] }) => (
	<div className="space-y-4">
		<div className="flex items-center justify-between">
			<h2 className="font-semibold text-lg">Your Downloads</h2>
			<Button variant="ghost" size="sm" className="gap-2">
				<Download className="size-4" />
				Download All
			</Button>
		</div>
		<div className="space-y-3">
			{items.map((item, i) => (
				<DownloadItem key={i} {...item} />
			))}
		</div>
	</div>
);

const LicenseItem = ({
	product,
	key: licenseKey,
	validUntil,
}: LicenseProps) => (
	<div className="p-4 rounded-xl bg-muted/30">
		<div className="flex items-start justify-between gap-4">
			<div className="flex items-start gap-3">
				<div className="size-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
					<Key className="size-5 text-amber-500" />
				</div>
				<div>
					<p className="font-medium">{product}</p>
					<code className="text-sm font-mono text-muted-foreground">
						{licenseKey}
					</code>
					<p className="text-xs text-muted-foreground mt-1">
						Valid until {validUntil}
					</p>
				</div>
			</div>
			<Button variant="ghost" size="icon" className="shrink-0">
				<Copy className="size-4" />
			</Button>
		</div>
	</div>
);

const LicenseSection = ({ licenses }: { licenses: LicenseProps[] }) => (
	<div className="space-y-4">
		<h2 className="font-semibold text-lg flex items-center gap-2">
			<Key className="size-5" />
			License Keys
		</h2>
		<div className="space-y-3">
			{licenses.map((license, i) => (
				<LicenseItem key={i} {...license} />
			))}
		</div>
	</div>
);

const GettingStarted = ({ steps }: { steps: string[] }) => (
	<div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
		<h3 className="font-semibold mb-4">Getting Started</h3>
		<ol className="space-y-3">
			{steps.map((step, i) => (
				<li key={i} className="flex items-start gap-3 text-sm">
					<span className="size-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-xs font-semibold text-primary">
						{i + 1}
					</span>
					{step}
				</li>
			))}
		</ol>
	</div>
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
			name: 'Pro Template Collection',
			type: 'Templates',
			size: '245 MB',
			format: 'ZIP',
		},
		{ name: 'Icon Pack Premium', type: 'Icons', size: '128 MB', format: 'ZIP' },
		{ name: 'Font Family Bundle', type: 'Fonts', size: '56 MB', format: 'ZIP' },
	];

	const licenses: LicenseProps[] = [
		{
			product: 'Template Collection Pro',
			key: 'TEMP-XXXX-YYYY-ZZZZ',
			validUntil: 'Lifetime',
		},
		{
			product: 'Icon Pack Premium',
			key: 'ICON-AAAA-BBBB-CCCC',
			validUntil: 'Lifetime',
		},
	];

	const gettingStartedSteps = [
		'Download your files using the buttons above',
		'Extract the ZIP files to your preferred location',
		'Activate your license in the software settings',
		'Check the documentation for usage instructions',
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<SuccessHeader
					orderNumber="DIG-2024-78432"
					email="customer@example.com"
				/>

				<OrderInfo
					orderNumber="DIG-78432"
					total={199.99}
					currency="$"
					date="Jan 15, 2024"
				/>

				<Separator />

				<DownloadsSection items={downloads} />

				<Separator />

				<LicenseSection licenses={licenses} />

				<GettingStarted steps={gettingStartedSteps} />

				<CTA
					items={[
						{ label: 'View Library', href: '/library', icon: ArrowRight },
						{
							label: 'Documentation',
							href: '/docs',
							variant: 'outline',
							icon: ExternalLink,
						},
					]}
				/>
			</div>
		</section>
	);
}
