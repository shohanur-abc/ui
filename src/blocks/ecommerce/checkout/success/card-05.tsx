import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Download,
	FileText,
	Key,
	Mail,
	ArrowRight,
	Copy,
	CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

interface DigitalItemProps {
	name: string;
	type: string;
	size: string;
	downloadReady: boolean;
}

interface LicenseKeyProps {
	product: string;
	key: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const SuccessHeader = () => (
	<Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
		<CardContent className="pt-6">
			<div className="flex items-center gap-4">
				<div className="size-14 rounded-full bg-primary/10 flex items-center justify-center">
					<CheckCircle className="size-7 text-primary" />
				</div>
				<div>
					<h1 className="text-xl @lg:text-2xl font-bold">Purchase Complete!</h1>
					<p className="text-muted-foreground">
						Your digital items are ready for download
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const DigitalItemCard = ({
	name,
	type,
	size,
	downloadReady,
}: DigitalItemProps) => (
	<Card>
		<CardContent className="pt-6">
			<div className="flex items-center gap-4">
				<div className="size-14 rounded-xl bg-muted flex items-center justify-center">
					<FileText className="size-7 text-muted-foreground" />
				</div>
				<div className="flex-1 min-w-0">
					<p className="font-semibold truncate">{name}</p>
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<span>{type}</span>
						<span>•</span>
						<span>{size}</span>
					</div>
				</div>
				<Button
					variant={downloadReady ? 'default' : 'secondary'}
					size="sm"
					className="gap-2"
					disabled={!downloadReady}
				>
					<Download className="size-4" />
					Download
				</Button>
			</div>
		</CardContent>
	</Card>
);

const DownloadsCard = ({ items }: { items: DigitalItemProps[] }) => (
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
				<DigitalItemCard key={i} {...item} />
			))}
		</div>
	</div>
);

const LicenseKeyCard = ({ product, key: licenseKey }: LicenseKeyProps) => (
	<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
		<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
			<Key className="size-5 text-primary" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium text-sm">{product}</p>
			<code className="text-xs font-mono text-muted-foreground">
				{licenseKey}
			</code>
		</div>
		<Button variant="ghost" size="icon" className="shrink-0">
			<Copy className="size-4" />
		</Button>
	</div>
);

const LicenseKeysCard = ({ keys }: { keys: LicenseKeyProps[] }) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<Key className="size-4" />
				License Keys
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{keys.map((item, i) => (
				<LicenseKeyCard key={i} {...item} />
			))}
		</CardContent>
	</Card>
);

const EmailConfirmation = ({ email }: { email: string }) => (
	<Card className="bg-muted/30">
		<CardContent className="pt-6">
			<div className="flex items-center gap-3">
				<Mail className="size-5 text-muted-foreground" />
				<div>
					<p className="text-sm">
						Confirmation and download links sent to{' '}
						<span className="font-medium">{email}</span>
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const OrderInfo = ({
	orderNumber,
	total,
	currency,
}: {
	orderNumber: string;
	total: number;
	currency: string;
}) => (
	<Card>
		<CardContent className="pt-6">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm text-muted-foreground">Order Number</p>
					<p className="font-mono font-semibold">{orderNumber}</p>
				</div>
				<Separator orientation="vertical" className="h-10" />
				<div className="text-right">
					<p className="text-sm text-muted-foreground">Total</p>
					<p className="text-xl font-bold">
						{currency}
						{total.toFixed(2)}
					</p>
				</div>
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
	const digitalItems: DigitalItemProps[] = [
		{
			name: 'Pro Design Templates Pack',
			type: 'ZIP',
			size: '245 MB',
			downloadReady: true,
		},
		{
			name: 'Icon Library Premium',
			type: 'ZIP',
			size: '128 MB',
			downloadReady: true,
		},
		{
			name: 'UI Kit Pro License',
			type: 'PDF',
			size: '2.4 MB',
			downloadReady: true,
		},
	];

	const licenseKeys: LicenseKeyProps[] = [
		{ product: 'Design Pro Suite', key: 'DPRO-XXXX-YYYY-ZZZZ-1234' },
		{ product: 'Icon Library', key: 'ICON-AAAA-BBBB-CCCC-5678' },
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 space-y-6">
				<SuccessHeader />

				<OrderInfo orderNumber="DIG-2024-78432" total={149.99} currency="$" />

				<DownloadsCard items={digitalItems} />

				<LicenseKeysCard keys={licenseKeys} />

				<EmailConfirmation email="customer@example.com" />

				<CTA
					items={[
						{ label: 'View Library', href: '/library', icon: ArrowRight },
						{ label: 'Shop More', href: '/shop', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
