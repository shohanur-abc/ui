import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	CheckCircle,
	Mail,
	Smartphone,
	Bell,
	ArrowRight,
	MessageSquare,
	Clock,
} from 'lucide-react';
import Link from 'next/link';

interface NotificationOptionProps {
	icon: React.ElementType;
	title: string;
	description: string;
	enabled: boolean;
}

interface EstimateItemProps {
	label: string;
	value: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const SuccessAnimation = () => (
	<div className="relative flex items-center justify-center">
		<div className="absolute size-32 rounded-full bg-primary/5 animate-pulse" />
		<div className="absolute size-24 rounded-full bg-primary/10" />
		<div className="relative size-16 rounded-full bg-primary flex items-center justify-center">
			<CheckCircle className="size-8 text-primary-foreground" />
		</div>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold tracking-tight text-center">
		{text}
	</h1>
);

const Subtitle = ({ text }: { text: string }) => (
	<p className="text-lg @md:text-xl text-muted-foreground text-center">
		{text}
	</p>
);

const OrderInfo = ({
	orderNumber,
	email,
}: {
	orderNumber: string;
	email: string;
}) => (
	<div className="w-full max-w-md p-4 rounded-xl bg-muted/50 border space-y-3">
		<div className="flex items-center justify-between">
			<span className="text-sm text-muted-foreground">Order Number</span>
			<span className="font-mono font-semibold">{orderNumber}</span>
		</div>
		<Separator />
		<div className="flex items-center gap-2 text-sm">
			<Mail className="size-4 text-muted-foreground" />
			<span className="text-muted-foreground">Confirmation sent to</span>
			<span className="font-medium">{email}</span>
		</div>
	</div>
);

const EstimateItem = ({ label, value }: EstimateItemProps) => (
	<div className="flex items-center justify-between py-3">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

const NotificationOption = ({
	icon: Icon,
	title,
	description,
	enabled,
}: NotificationOptionProps) => (
	<div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
		<div
			className={`size-10 rounded-lg flex items-center justify-center ${enabled ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}
		>
			<Icon className="size-5" />
		</div>
		<div className="flex-1">
			<p className="font-medium text-sm">{title}</p>
			<p className="text-xs text-muted-foreground">{description}</p>
		</div>
		<div
			className={`size-5 rounded-full border-2 flex items-center justify-center ${enabled ? 'border-primary bg-primary' : 'border-muted-foreground/30'}`}
		>
			{enabled && <CheckCircle className="size-3 text-primary-foreground" />}
		</div>
	</div>
);

const DeliveryEstimate = ({
	items,
}: {
	items: EstimateItemProps[];
}) => (
	<Card className="w-full max-w-md">
		<CardContent className="pt-6">
			<div className="flex items-center gap-2 mb-4">
				<Clock className="size-5 text-primary" />
				<h3 className="font-semibold">Delivery Timeline</h3>
			</div>
			<div className="divide-y">
				{items.map((item, i) => (
					<EstimateItem key={i} {...item} />
				))}
			</div>
		</CardContent>
	</Card>
);

const NotificationSettings = ({
	options,
}: {
	options: NotificationOptionProps[];
}) => (
	<Card className="w-full max-w-md">
		<CardContent className="pt-6">
			<div className="flex items-center gap-2 mb-4">
				<Bell className="size-5 text-primary" />
				<h3 className="font-semibold">Stay Updated</h3>
			</div>
			<div className="space-y-1">
				{options.map((option, i) => (
					<NotificationOption key={i} {...option} />
				))}
			</div>
		</CardContent>
	</Card>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3 w-full max-w-md">
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
	const estimateItems: EstimateItemProps[] = [
		{ label: 'Order Processing', value: '1-2 hours' },
		{ label: 'Shipping Time', value: '3-5 business days' },
		{ label: 'Expected Arrival', value: 'Jan 22-25, 2024' },
	];

	const notificationOptions: NotificationOptionProps[] = [
		{
			icon: Mail,
			title: 'Email Updates',
			description: 'Receive order updates via email',
			enabled: true,
		},
		{
			icon: Smartphone,
			title: 'SMS Notifications',
			description: 'Get text messages for shipping',
			enabled: true,
		},
		{
			icon: MessageSquare,
			title: 'Push Notifications',
			description: 'Real-time updates on your device',
			enabled: false,
		},
	];

	return (
		<section className="@container min-h-screen flex items-center py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 w-full">
				<div className="flex flex-col items-center gap-8">
					<SuccessAnimation />

					<div className="space-y-2">
						<Title text="Order Confirmed!" />
						<Subtitle text="Thank you for your purchase" />
					</div>

					<OrderInfo
						orderNumber="ORD-2024-78432"
						email="customer@example.com"
					/>

					<DeliveryEstimate items={estimateItems} />

					<NotificationSettings options={notificationOptions} />

					<CTA
						items={[
							{
								label: 'View Order Details',
								href: '/orders',
								icon: ArrowRight,
							},
							{
								label: 'Continue Shopping',
								href: '/shop',
								variant: 'outline',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}
