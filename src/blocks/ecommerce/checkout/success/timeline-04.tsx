import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	CheckCircle,
	Download,
	Key,
	Mail,
	FileText,
	Lock,
	ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

interface TimelineStepProps {
	icon: React.ElementType;
	title: string;
	description: string;
	time: string;
	status: 'completed' | 'current' | 'upcoming';
	action?: { label: string; href: string };
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const PageHeader = ({ orderNumber }: { orderNumber: string }) => (
	<div className="text-center space-y-4">
		<div className="size-20 mx-auto rounded-full bg-violet-500/10 flex items-center justify-center">
			<Download className="size-10 text-violet-500" />
		</div>
		<div>
			<h1 className="text-2xl @lg:text-4xl font-bold">Download Ready!</h1>
			<p className="text-muted-foreground">Order #{orderNumber}</p>
		</div>
		<Badge className="bg-violet-500">Digital Product</Badge>
	</div>
);

const TimelineStep = ({
	icon: Icon,
	title,
	description,
	time,
	status,
	action,
}: TimelineStepProps) => (
	<div className="relative flex gap-4">
		<div className="flex flex-col items-center">
			<div
				className={`size-10 rounded-full flex items-center justify-center ${
					status === 'completed'
						? 'bg-emerald-500 text-white'
						: status === 'current'
							? 'bg-violet-500 text-white ring-4 ring-violet-500/20'
							: 'bg-muted text-muted-foreground'
				}`}
			>
				<Icon className="size-5" />
			</div>
			<div className="flex-1 w-0.5 bg-border mt-2" />
		</div>
		<div className="pb-6 flex-1">
			<div className="flex items-start justify-between flex-wrap gap-2">
				<div>
					<h3
						className={`font-semibold ${
							status === 'upcoming' ? 'text-muted-foreground' : ''
						}`}
					>
						{title}
					</h3>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
				<div className="flex items-center gap-3">
					<span className="text-sm text-muted-foreground">{time}</span>
					{action && status !== 'upcoming' && (
						<Button size="sm" variant="outline" asChild>
							<Link href={action.href}>{action.label}</Link>
						</Button>
					)}
				</div>
			</div>
		</div>
	</div>
);

const LicenseCard = ({
	productName,
	licenseKey,
	expiresAt,
}: {
	productName: string;
	licenseKey: string;
	expiresAt: string;
}) => (
	<Card className="bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 text-white border-0">
		<CardContent className="pt-6">
			<div className="flex items-center gap-3 mb-4">
				<Key className="size-6" />
				<h3 className="font-semibold">License Key</h3>
			</div>
			<p className="text-sm opacity-80 mb-2">{productName}</p>
			<div className="p-3 rounded-lg bg-white/10 font-mono text-center">
				{licenseKey}
			</div>
			<p className="text-xs opacity-80 mt-3 text-center">Valid until {expiresAt}</p>
		</CardContent>
	</Card>
);

const DownloadCard = ({
	files,
}: {
	files: { name: string; size: string; type: string }[];
}) => (
	<Card>
		<CardContent className="pt-6">
			<h3 className="font-semibold mb-4 flex items-center gap-2">
				<FileText className="size-4" />
				Your Downloads
			</h3>
			<div className="space-y-3">
				{files.map((file, i) => (
					<div
						key={i}
						className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
					>
						<div className="flex items-center gap-3">
							<div className="size-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
								<FileText className="size-5 text-violet-500" />
							</div>
							<div>
								<p className="font-medium text-sm">{file.name}</p>
								<p className="text-xs text-muted-foreground">
									{file.type} • {file.size}
								</p>
							</div>
						</div>
						<Button size="sm" variant="ghost" className="gap-2">
							<Download className="size-4" />
							Download
						</Button>
					</div>
				))}
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
	const timelineSteps: TimelineStepProps[] = [
		{
			icon: CheckCircle,
			title: 'Payment Confirmed',
			description: 'Your payment was successful',
			time: 'Jan 15, 10:30 AM',
			status: 'completed',
		},
		{
			icon: Key,
			title: 'License Generated',
			description: 'Your license key is ready',
			time: 'Jan 15, 10:30 AM',
			status: 'completed',
			action: { label: 'Copy', href: '#' },
		},
		{
			icon: Download,
			title: 'Download Available',
			description: 'Click to download your files',
			time: 'Jan 15, 10:31 AM',
			status: 'current',
			action: { label: 'Download', href: '#' },
		},
		{
			icon: Mail,
			title: 'Email Sent',
			description: 'Confirmation sent to your email',
			time: 'Jan 15, 10:31 AM',
			status: 'completed',
		},
		{
			icon: Lock,
			title: 'Activate License',
			description: 'Activate in application settings',
			time: 'When ready',
			status: 'upcoming',
		},
	];

	const files = [
		{ name: 'App_v3.0.1_installer.exe', size: '125 MB', type: 'Executable' },
		{ name: 'User_Manual.pdf', size: '4.2 MB', type: 'PDF' },
		{ name: 'Quick_Start_Guide.pdf', size: '1.1 MB', type: 'PDF' },
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<PageHeader orderNumber="DIG-78432" />

				<LicenseCard
					productName="Pro Designer Suite v3.0"
					licenseKey="XXXX-XXXX-XXXX-XXXX"
					expiresAt="Jan 15, 2025"
				/>

				<Card>
					<CardContent className="pt-6">
						<h2 className="font-semibold mb-6">Activation Steps</h2>
						<div>
							{timelineSteps.map((step, i) => (
								<TimelineStep key={i} {...step} />
							))}
						</div>
					</CardContent>
				</Card>

				<DownloadCard files={files} />

				<CTA
					items={[
						{ label: 'Download All', href: '/download', icon: Download },
						{ label: 'Get Help', href: '/support', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
