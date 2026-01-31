import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Building, CheckCircle, Globe, Shield, Users } from 'lucide-react';

interface LicenseDetail {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
}

interface LicenseHeaderProps {
	productName: string;
	version: string;
	licenseType: string;
	status: string;
}

interface LicenseKeyProps {
	licenseKey: string;
	activatedOn: string;
	expiresOn: string;
}

interface LicenseDetailsGridProps {
	details: LicenseDetail[];
}

interface InvoiceInfoProps {
	invoiceNumber: string;
	purchaseDate: string;
	amount: number;
	currency: string;
	paymentMethod: string;
}

interface SupportInfoProps {
	level: string;
	expires: string;
	email: string;
}

const LicenseHeader = ({
	productName,
	version,
	licenseType,
	status,
}: LicenseHeaderProps) => (
	<div className="flex items-start justify-between">
		<div className="flex items-center gap-4">
			<div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
				<Shield className="size-7 text-primary" />
			</div>
			<div>
				<h1 className="text-xl font-bold">{productName}</h1>
				<p className="text-sm text-muted-foreground">Version {version}</p>
				<Badge variant="secondary" className="mt-1">
					{licenseType}
				</Badge>
			</div>
		</div>
		<Badge variant="default" className="gap-1">
			<CheckCircle className="size-3" />
			{status}
		</Badge>
	</div>
);

const LicenseKey = ({
	licenseKey,
	activatedOn,
	expiresOn,
}: LicenseKeyProps) => (
	<div className="p-4 rounded-lg bg-muted/40 space-y-3">
		<p className="text-sm font-semibold">License Key</p>
		<p className="font-mono text-sm bg-background p-2 rounded border select-all">
			{licenseKey}
		</p>
		<div className="grid grid-cols-2 gap-4 text-sm">
			<div>
				<p className="text-muted-foreground">Activated</p>
				<p className="font-medium">{activatedOn}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Expires</p>
				<p className="font-medium">{expiresOn}</p>
			</div>
		</div>
	</div>
);

const LicenseDetailsGrid = ({ details }: LicenseDetailsGridProps) => (
	<div className="grid @sm:grid-cols-2 gap-3">
		{details.map((detail, index) => (
			<div
				key={index}
				className="flex items-center gap-3 p-3 rounded-lg border"
			>
				<detail.icon className="size-5 text-muted-foreground" />
				<div>
					<p className="text-xs text-muted-foreground">{detail.label}</p>
					<p className="font-medium">{detail.value}</p>
				</div>
			</div>
		))}
	</div>
);

const InvoiceInfo = ({
	invoiceNumber,
	purchaseDate,
	amount,
	currency,
	paymentMethod,
}: InvoiceInfoProps) => (
	<div className="p-4 rounded-lg border space-y-3">
		<div className="flex items-center justify-between">
			<p className="font-semibold">Purchase Invoice</p>
			<p className="text-sm font-mono text-muted-foreground">{invoiceNumber}</p>
		</div>
		<div className="grid grid-cols-2 gap-4 text-sm">
			<div>
				<p className="text-muted-foreground">Date</p>
				<p className="font-medium">{purchaseDate}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Payment</p>
				<p className="font-medium">{paymentMethod}</p>
			</div>
		</div>
		<Separator />
		<div className="flex justify-between items-center">
			<span className="font-semibold">Amount Paid</span>
			<span className="text-xl font-bold text-primary">
				{currency}
				{amount.toFixed(2)}
			</span>
		</div>
	</div>
);

const SupportInfo = ({ level, expires, email }: SupportInfoProps) => (
	<div className="p-4 rounded-lg border-2 border-primary/20 bg-primary/5 space-y-2">
		<div className="flex items-center justify-between">
			<p className="font-semibold">Support & Maintenance</p>
			<Badge>{level}</Badge>
		</div>
		<div className="text-sm space-y-1">
			<p className="text-muted-foreground">
				Coverage until:{' '}
				<span className="text-foreground font-medium">{expires}</span>
			</p>
			<p className="text-muted-foreground">
				Contact: <span className="text-foreground">{email}</span>
			</p>
		</div>
	</div>
);

export default function Main() {
	const header: LicenseHeaderProps = {
		productName: 'DataSync Enterprise',
		version: '4.2.1',
		licenseType: 'Enterprise License',
		status: 'Active',
	};

	const licenseKey: LicenseKeyProps = {
		licenseKey: 'DSYN-ENT4-XXXX-XXXX-XXXX-ABCD',
		activatedOn: 'February 1, 2024',
		expiresOn: 'February 1, 2025',
	};

	const details: LicenseDetail[] = [
		{ icon: Users, label: 'Licensed Users', value: 'Unlimited' },
		{ icon: Building, label: 'Organization', value: 'TechCorp Inc.' },
		{ icon: Globe, label: 'Deployment', value: 'On-Premise + Cloud' },
		{ icon: Shield, label: 'License Type', value: 'Perpetual' },
	];

	const invoice: InvoiceInfoProps = {
		invoiceNumber: 'INV-2024-5678',
		purchaseDate: 'January 28, 2024',
		amount: 4999.0,
		currency: '$',
		paymentMethod: 'Wire Transfer',
	};

	const support: SupportInfoProps = {
		level: 'Premium',
		expires: 'February 1, 2025',
		email: 'enterprise@datasync.io',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<Card>
					<CardHeader className="border-b">
						<LicenseHeader {...header} />
					</CardHeader>
					<CardContent className="space-y-6 pt-6">
						<LicenseKey {...licenseKey} />
						<LicenseDetailsGrid details={details} />
						<InvoiceInfo {...invoice} />
						<SupportInfo {...support} />
					</CardContent>
					<CardFooter className="border-t pt-6 flex flex-wrap gap-3">
						<Button>Renew License</Button>
						<Button variant="outline">Download Invoice</Button>
						<Button variant="ghost">Manage License</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
