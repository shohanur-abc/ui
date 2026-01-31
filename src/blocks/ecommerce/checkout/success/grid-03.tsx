import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	CheckCircle,
	Download,
	FileText,
	Key,
	HardDrive,
	Clock,
	ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

interface DownloadProps {
	name: string;
	size: string;
	format: string;
	version: string;
}

interface LicenseProps {
	product: string;
	key: string;
	type: string;
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
	<div className="text-center space-y-4">
		<div className="size-16 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center">
			<CheckCircle className="size-8 text-emerald-500" />
		</div>
		<div>
			<h1 className="text-2xl @lg:text-3xl font-bold">Purchase Complete!</h1>
			<p className="text-muted-foreground">
				Order #{orderNumber} • {purchaseDate}
			</p>
		</div>
	</div>
);

const DownloadCard = ({ name, size, format, version }: DownloadProps) => (
	<Card className="hover:shadow-lg transition-shadow">
		<CardContent className="pt-6">
			<div className="text-center space-y-4">
				<div className="size-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
					<FileText className="size-8 text-primary" />
				</div>
				<div>
					<p className="font-semibold">{name}</p>
					<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-1">
						<span className="flex items-center gap-1">
							<HardDrive className="size-3" />
							{size}
						</span>
						<span>•</span>
						<span className="uppercase">{format}</span>
						<span>•</span>
						<span>v{version}</span>
					</div>
				</div>
				<Button className="w-full gap-2">
					<Download className="size-4" />
					Download
				</Button>
			</div>
		</CardContent>
	</Card>
);

const LicenseCard = ({ product, key: licenseKey, type }: LicenseProps) => (
	<Card>
		<CardContent className="pt-6">
			<div className="flex items-start gap-4">
				<div className="size-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
					<Key className="size-5 text-amber-500" />
				</div>
				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-2">
						<p className="font-semibold">{product}</p>
						<Badge variant="outline" className="text-xs">
							{type}
						</Badge>
					</div>
					<p className="font-mono text-sm mt-2 p-2 rounded bg-muted break-all">
						{licenseKey}
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const QuickStartCard = ({
	steps,
}: {
	steps: { number: number; title: string; description: string }[];
}) => (
	<Card className="bg-muted/30">
		<CardContent className="pt-6">
			<h3 className="font-semibold mb-4">Quick Start Guide</h3>
			<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4">
				{steps.map((step) => (
					<div key={step.number} className="text-center">
						<div className="size-10 mx-auto rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-2">
							{step.number}
						</div>
						<p className="font-medium text-sm">{step.title}</p>
						<p className="text-xs text-muted-foreground mt-1">
							{step.description}
						</p>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const AccessInfoCard = ({ expiresAt }: { expiresAt?: string }) => (
	<Card>
		<CardContent className="pt-6">
			<div className="flex items-center gap-3">
				<Clock className="size-5 text-muted-foreground" />
				<div>
					<p className="font-medium text-sm">Download Access</p>
					<p className="text-xs text-muted-foreground">
						{expiresAt ? `Links expire on ${expiresAt}` : 'Lifetime access'}
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3 justify-center">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button key={i} size="lg" variant={variant || 'default'} className="gap-2" asChild>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const downloads: DownloadProps[] = [
		{ name: 'Design System Pro', size: '245 MB', format: 'ZIP', version: '2.1.0' },
		{ name: 'Icon Pack Premium', size: '128 MB', format: 'ZIP', version: '1.5.0' },
		{ name: 'UI Kit Complete', size: '512 MB', format: 'ZIP', version: '3.0.0' },
		{ name: 'Font Bundle', size: '56 MB', format: 'ZIP', version: '1.2.0' },
	];

	const licenses: LicenseProps[] = [
		{ product: 'Design System Pro', key: 'DSP-XXXX-YYYY-ZZZZ', type: 'Commercial' },
		{ product: 'Icon Pack Premium', key: 'IPP-AAAA-BBBB-CCCC', type: 'Extended' },
	];

	const quickStartSteps = [
		{ number: 1, title: 'Download', description: 'Get your files' },
		{ number: 2, title: 'Extract', description: 'Unzip contents' },
		{ number: 3, title: 'Activate', description: 'Enter license' },
		{ number: 4, title: 'Create', description: 'Start building' },
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<PageHeader orderNumber="DIG-78432" purchaseDate="January 15, 2024" />

				<div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-4">
					{downloads.map((download, i) => (
						<DownloadCard key={i} {...download} />
					))}
				</div>

				<div className="grid @lg:grid-cols-2 gap-4">
					{licenses.map((license, i) => (
						<LicenseCard key={i} {...license} />
					))}
				</div>

				<QuickStartCard steps={quickStartSteps} />

				<AccessInfoCard />

				<CTA
					items={[
						{ label: 'Go to Library', href: '/library', icon: ArrowRight },
						{ label: 'Browse More', href: '/shop', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
