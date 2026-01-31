import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	CheckCircle,
	Gift,
	Heart,
	Calendar,
	Clock,
	Mail,
	Palette,
	Eye,
	ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

interface GiftInfoProps {
	icon: React.ElementType;
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

const PageHeader = ({ orderNumber }: { orderNumber: string }) => (
	<div className="text-center space-y-4">
		<div className="size-20 mx-auto rounded-full bg-pink-500/10 flex items-center justify-center">
			<Gift className="size-10 text-pink-500" />
		</div>
		<div>
			<h1 className="text-2xl @lg:text-4xl font-bold">Gift Sent!</h1>
			<p className="text-muted-foreground">Order #{orderNumber}</p>
		</div>
	</div>
);

const GiftPreviewCard = ({
	recipientName,
	message,
	senderName,
	style,
}: {
	recipientName: string;
	message: string;
	senderName: string;
	style: string;
}) => (
	<Card className="overflow-hidden">
		<div
			className={`p-8 text-white ${
				style === 'elegant'
					? 'bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600'
					: style === 'celebration'
						? 'bg-gradient-to-br from-amber-400 via-orange-500 to-red-500'
						: 'bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600'
			}`}
		>
			<div className="text-center space-y-4">
				<Gift className="size-12 mx-auto opacity-80" />
				<h2 className="text-2xl font-bold">A Gift for {recipientName}!</h2>
				<p className="opacity-90">From {senderName}</p>
			</div>
		</div>
		<CardContent className="pt-6">
			<div className="p-4 rounded-xl bg-muted/30 text-center italic">
				<p className="text-lg">&ldquo;{message}&rdquo;</p>
			</div>
		</CardContent>
	</Card>
);

const InfoGridCard = ({ icon: Icon, label, value }: GiftInfoProps) => (
	<Card>
		<CardContent className="pt-6">
			<div className="text-center space-y-2">
				<div className="size-10 mx-auto rounded-lg bg-pink-500/10 flex items-center justify-center">
					<Icon className="size-5 text-pink-500" />
				</div>
				<p className="text-xs text-muted-foreground">{label}</p>
				<p className="font-semibold">{value}</p>
			</div>
		</CardContent>
	</Card>
);

const RecipientCard = ({
	name,
	email,
}: {
	name: string;
	email: string;
}) => (
	<Card>
		<CardContent className="pt-6">
			<div className="flex items-center gap-4">
				<div className="size-14 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-lg">
					{name.split(' ').map(n => n[0]).join('')}
				</div>
				<div>
					<p className="font-semibold">{name}</p>
					<p className="text-sm text-muted-foreground">{email}</p>
				</div>
				<Badge className="ml-auto bg-pink-500">Recipient</Badge>
			</div>
		</CardContent>
	</Card>
);

const GiftDetailsCard = ({
	productName,
	value,
	currency,
	wrapping,
}: {
	productName: string;
	value: number;
	currency: string;
	wrapping: string;
}) => (
	<Card>
		<CardContent className="pt-6">
			<div className="flex items-start gap-4">
				<div className="size-16 rounded-xl bg-pink-500/10 flex items-center justify-center">
					<Gift className="size-8 text-pink-500" />
				</div>
				<div className="flex-1">
					<p className="font-semibold">{productName}</p>
					<p className="text-2xl font-bold mt-1">
						{currency}
						{value.toFixed(2)}
					</p>
					<div className="flex items-center gap-2 mt-2">
						<Palette className="size-4 text-muted-foreground" />
						<span className="text-sm text-muted-foreground capitalize">
							{wrapping} wrap
						</span>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const DeliveryStatusCard = ({
	status,
	steps,
}: {
	status: string;
	steps: { label: string; done: boolean }[];
}) => (
	<Card>
		<CardContent className="pt-6">
			<div className="flex items-center justify-between mb-4">
				<h3 className="font-semibold">Delivery Status</h3>
				<Badge variant="secondary">{status}</Badge>
			</div>
			<div className="space-y-2">
				{steps.map((step, i) => (
					<div key={i} className="flex items-center gap-2">
						<div
							className={`size-5 rounded-full flex items-center justify-center text-xs ${
								step.done
									? 'bg-pink-500 text-white'
									: 'bg-muted text-muted-foreground'
							}`}
						>
							{step.done ? '✓' : i + 1}
						</div>
						<span className={step.done ? '' : 'text-muted-foreground'}>
							{step.label}
						</span>
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
					{Icon && <Icon className="size-4" />}
					{label}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const giftInfo: GiftInfoProps[] = [
		{ icon: Calendar, label: 'Delivery Date', value: 'Jan 20, 2024' },
		{ icon: Clock, label: 'Delivery Time', value: '9:00 AM' },
		{ icon: Heart, label: 'Gift Type', value: 'Digital' },
		{ icon: Mail, label: 'Notification', value: 'Email' },
	];

	const deliverySteps = [
		{ label: 'Gift purchased', done: true },
		{ label: 'Gift prepared', done: true },
		{ label: 'Scheduled', done: true },
		{ label: 'Delivered', done: false },
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<PageHeader orderNumber="GFT-78432" />

				<GiftPreviewCard
					recipientName="Sarah"
					message="Wishing you the happiest birthday! May all your dreams come true."
					senderName="Alex"
					style="elegant"
				/>

				<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4">
					{giftInfo.map((info, i) => (
						<InfoGridCard key={i} {...info} />
					))}
				</div>

				<div className="grid @lg:grid-cols-2 gap-6">
					<RecipientCard name="Sarah Johnson" email="sarah@example.com" />
					<GiftDetailsCard
						productName="$100 Store Gift Card"
						value={100}
						currency="$"
						wrapping="elegant"
					/>
				</div>

				<DeliveryStatusCard status="Scheduled" steps={deliverySteps} />

				<CTA
					items={[
						{ label: 'Preview Email', href: '/preview', icon: Eye },
						{ label: 'Send Another Gift', href: '/gifts', variant: 'outline', icon: ArrowRight },
					]}
				/>
			</div>
		</section>
	);
}
