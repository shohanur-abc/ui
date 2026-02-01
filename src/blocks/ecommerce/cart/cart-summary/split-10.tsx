import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Calendar,
	Repeat,
	Bell,
	Settings,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

type SubscriptionItemProps = {
	image: string;
	name: string;
	frequency: string;
	price: string;
	nextDelivery: string;
};

type SummaryRowProps = {
	label: string;
	value: string;
};

type SubscriptionSettingProps = {
	icon: LucideIcon;
	title: string;
	value: string;
	actionLabel: string;
	actionHref: string;
};

const SubscriptionItem = ({
	image,
	name,
	frequency,
	price,
	nextDelivery,
}: SubscriptionItemProps) => (
	<div className="flex gap-4 rounded-lg border p-4">
		<Avatar className="size-16 rounded-lg">
			<AvatarImage src={image} alt={name} className="object-cover" />
			<AvatarFallback className="rounded-lg">
				{name.slice(0, 2).toUpperCase()}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1 space-y-2">
			<div className="flex items-start justify-between">
				<div>
					<p className="font-medium">{name}</p>
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<Repeat className="size-3" />
						<span>{frequency}</span>
					</div>
				</div>
				<span className="font-semibold">{price}</span>
			</div>
			<div className="flex items-center gap-2 text-xs text-muted-foreground">
				<Calendar className="size-3" />
				<span>Next delivery: {nextDelivery}</span>
			</div>
		</div>
	</div>
);

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalRow = ({
	label,
	value,
	period,
}: {
	label: string;
	value: string;
	period: string;
}) => (
	<div className="space-y-1">
		<div className="flex items-center justify-between">
			<span className="text-lg font-semibold">{label}</span>
			<span className="text-2xl font-bold">{value}</span>
		</div>
		<p className="text-right text-xs text-muted-foreground">{period}</p>
	</div>
);

const SubscriptionSetting = ({
	icon: Icon,
	title,
	value,
	actionLabel,
	actionHref,
}: SubscriptionSettingProps) => (
	<div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
		<div className="flex items-center gap-3">
			<Icon className="size-4 text-muted-foreground" />
			<div>
				<p className="text-sm font-medium">{title}</p>
				<p className="text-xs text-muted-foreground">{value}</p>
			</div>
		</div>
		<Link href={actionHref} className="text-xs text-primary hover:underline">
			{actionLabel}
		</Link>
	</div>
);

export default function Main() {
	const subscriptionItems: SubscriptionItemProps[] = [
		{
			image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200',
			name: 'Premium Coffee Blend',
			frequency: 'Every 2 weeks',
			price: '$24.99',
			nextDelivery: 'Jan 15, 2026',
		},
		{
			image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200',
			name: 'Artisan Tea Collection',
			frequency: 'Monthly',
			price: '$19.99',
			nextDelivery: 'Feb 1, 2026',
		},
	];

	const summaryItems: SummaryRowProps[] = [
		{ label: 'Products (2)', value: '$44.98' },
		{ label: 'Subscription Discount', value: '-$4.50' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$3.24' },
	];

	const settings: SubscriptionSettingProps[] = [
		{
			icon: Calendar,
			title: 'Delivery Schedule',
			value: 'Bi-weekly / Monthly',
			actionLabel: 'Modify',
			actionHref: '/subscriptions/schedule',
		},
		{
			icon: Bell,
			title: 'Notifications',
			value: 'Email + SMS reminders',
			actionLabel: 'Settings',
			actionHref: '/subscriptions/notifications',
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-4xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-[1fr_360px]">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Repeat className="size-5 text-primary" />
								Your Subscriptions
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{subscriptionItems.map((item, i) => (
								<SubscriptionItem key={i} {...item} />
							))}
							<Separator />
							<div className="space-y-2">
								{settings.map((setting, i) => (
									<SubscriptionSetting key={i} {...setting} />
								))}
							</div>
						</CardContent>
					</Card>
					<Card className="h-fit">
						<CardHeader className="border-b">
							<CardTitle className="flex items-center justify-between">
								Upcoming Charge
								<Badge variant="outline">Active</Badge>
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								{summaryItems.map((item, i) => (
									<SummaryRow key={i} {...item} />
								))}
							</div>
							<Separator />
							<TotalRow
								label="Total"
								value="$43.72"
								period="Next charge on Jan 15, 2026"
							/>
							<div className="space-y-2">
								<Button className="w-full" size="lg" asChild>
									<Link href="/subscriptions/manage">Manage Subscriptions</Link>
								</Button>
								<Button variant="ghost" className="w-full" asChild>
									<Link href="/subscriptions/pause">Skip Next Delivery</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
