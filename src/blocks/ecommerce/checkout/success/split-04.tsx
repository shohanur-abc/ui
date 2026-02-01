import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	CheckCircle,
	Smartphone,
	Mail,
	Bell,
	ArrowRight,
	QrCode,
	Truck,
} from 'lucide-react';
import Link from 'next/link';

interface NotificationChannelProps {
	icon: React.ElementType;
	title: string;
	value: string;
	enabled: boolean;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const MobilePreview = () => (
	<div className="relative h-full min-h-[400px] @lg:min-h-0 bg-muted flex items-center justify-center p-8">
		<div className="relative">
			<div className="w-[200px] @xl:w-[240px] h-[400px] @xl:h-[480px] rounded-[2rem] bg-foreground p-2 shadow-2xl">
				<div className="w-full h-full rounded-[1.75rem] bg-background overflow-hidden flex flex-col">
					<div className="h-6 bg-foreground flex items-center justify-center">
						<div className="w-20 h-4 rounded-full bg-muted" />
					</div>
					<div className="flex-1 p-4 flex flex-col items-center justify-center gap-4 text-center">
						<div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
							<CheckCircle className="size-8 text-primary" />
						</div>
						<div>
							<p className="font-bold text-sm">Order Confirmed!</p>
							<p className="text-xs text-muted-foreground mt-1">#ORD-78432</p>
						</div>
						<div className="w-full p-3 rounded-lg bg-muted/50 text-left">
							<p className="text-xs text-muted-foreground">Delivery</p>
							<p className="text-sm font-medium">Jan 20-22</p>
						</div>
					</div>
				</div>
			</div>
			<div className="absolute -bottom-4 -right-4 size-24 rounded-xl bg-background border shadow-lg flex items-center justify-center">
				<QrCode className="size-12 text-muted-foreground" />
			</div>
		</div>
	</div>
);

const Title = ({ text, subtitle }: { text: string; subtitle?: string }) => (
	<div>
		<h1 className="text-2xl @xl:text-3xl font-bold">{text}</h1>
		{subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
	</div>
);

const OrderDetails = ({
	orderNumber,
	total,
	currency,
}: {
	orderNumber: string;
	total: number;
	currency: string;
}) => (
	<div className="flex items-center gap-6 p-4 rounded-xl bg-muted/50 border">
		<div>
			<p className="text-xs text-muted-foreground">Order Number</p>
			<p className="font-mono font-bold">{orderNumber}</p>
		</div>
		<Separator orientation="vertical" className="h-10" />
		<div>
			<p className="text-xs text-muted-foreground">Total Amount</p>
			<p className="font-bold text-lg">
				{currency}
				{total.toFixed(2)}
			</p>
		</div>
	</div>
);

const NotificationChannel = ({
	icon: Icon,
	title,
	value,
	enabled,
}: NotificationChannelProps) => (
	<div className="flex items-center gap-3 p-3 rounded-lg border">
		<div
			className={`size-10 rounded-lg flex items-center justify-center ${enabled ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}
		>
			<Icon className="size-5" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium text-sm">{title}</p>
			<p className="text-xs text-muted-foreground truncate">{value}</p>
		</div>
		<Badge variant={enabled ? 'default' : 'secondary'}>
			{enabled ? 'Active' : 'Off'}
		</Badge>
	</div>
);

const NotificationSettings = ({
	channels,
}: {
	channels: NotificationChannelProps[];
}) => (
	<div className="space-y-3">
		<h3 className="font-semibold text-sm">Notification Channels</h3>
		<div className="space-y-2">
			{channels.map((channel, i) => (
				<NotificationChannel key={i} {...channel} />
			))}
		</div>
	</div>
);

const DeliveryCard = ({ date, address }: { date: string; address: string }) => (
	<Card className="border-primary/20 bg-primary/5">
		<CardContent className="pt-6">
			<div className="flex items-start gap-4">
				<div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
					<Truck className="size-6 text-primary" />
				</div>
				<div>
					<p className="font-semibold">Expected Delivery</p>
					<p className="text-lg font-bold text-primary">{date}</p>
					<p className="text-sm text-muted-foreground mt-1">{address}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const AppDownload = () => (
	<div className="p-4 rounded-xl bg-muted/50 border">
		<div className="flex items-center gap-3">
			<Smartphone className="size-6 text-muted-foreground" />
			<div className="flex-1">
				<p className="font-medium text-sm">Track on mobile</p>
				<p className="text-xs text-muted-foreground">
					Download our app for real-time updates
				</p>
			</div>
			<Button variant="outline" size="sm">
				Get App
			</Button>
		</div>
	</div>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex gap-3">
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
	const channels: NotificationChannelProps[] = [
		{
			icon: Mail,
			title: 'Email',
			value: 'customer@example.com',
			enabled: true,
		},
		{
			icon: Smartphone,
			title: 'SMS',
			value: '+1 (555) 123-4567',
			enabled: true,
		},
		{
			icon: Bell,
			title: 'Push Notifications',
			value: 'Browser notifications',
			enabled: false,
		},
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8">
				<div className="grid @lg:grid-cols-2 gap-8 @xl:gap-12 items-center">
					<MobilePreview />

					<div className="space-y-6">
						<Title
							text="Order Confirmed!"
							subtitle="We'll keep you updated every step of the way"
						/>

						<OrderDetails
							orderNumber="ORD-2024-78432"
							total={349.99}
							currency="$"
						/>

						<DeliveryCard
							date="January 20-22, 2024"
							address="123 Main Street, New York, NY 10001"
						/>

						<NotificationSettings channels={channels} />

						<AppDownload />

						<CTA
							items={[
								{ label: 'Track Order', href: '/track', icon: ArrowRight },
								{ label: 'View Details', href: '/orders', variant: 'outline' },
							]}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
