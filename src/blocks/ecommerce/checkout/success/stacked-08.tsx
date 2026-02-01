import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	Gift,
	Heart,
	Mail,
	Calendar,
	ArrowRight,
	Copy,
	Edit3,
	QrCode,
} from 'lucide-react';
import Link from 'next/link';

interface GiftCardProps {
	amount: number;
	currency: string;
	code: string;
	recipientName: string;
	recipientEmail: string;
	message?: string;
	deliveryDate?: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const GiftHeader = () => (
	<div className="text-center space-y-4">
		<div className="size-20 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mx-auto shadow-lg shadow-pink-500/25">
			<Gift className="size-10 text-white" />
		</div>
		<div>
			<h1 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold">
				Gift Card Sent!
			</h1>
			<p className="text-muted-foreground mt-2">
				Your thoughtful gift is on its way
			</p>
		</div>
	</div>
);

const GiftCardPreview = ({
	amount,
	currency,
	code,
}: Pick<GiftCardProps, 'amount' | 'currency' | 'code'>) => (
	<div className="space-y-4">
		<div className="aspect-[16/10] rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 p-6 flex flex-col justify-between text-white overflow-hidden relative">
			<div className="absolute top-0 right-0 size-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
			<div className="flex items-start justify-between relative">
				<Gift className="size-8" />
				<Badge className="bg-white/20 backdrop-blur-sm border-0">
					Gift Card
				</Badge>
			</div>
			<div className="relative">
				<p className="text-4xl @lg:text-5xl font-bold">
					{currency}
					{amount}
				</p>
				<p className="text-sm opacity-80 mt-1">Store Credit</p>
			</div>
		</div>
		<div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
			<div>
				<p className="text-sm text-muted-foreground">Gift Code</p>
				<p className="font-mono font-bold">{code}</p>
			</div>
			<Button variant="ghost" size="icon">
				<Copy className="size-4" />
			</Button>
		</div>
	</div>
);

const RecipientInfo = ({
	name,
	email,
	message,
}: {
	name: string;
	email: string;
	message?: string;
}) => (
	<div className="space-y-4">
		<h2 className="font-semibold text-lg flex items-center gap-2">
			<Heart className="size-5 text-pink-500" />
			Recipient
		</h2>
		<div className="p-4 rounded-xl bg-muted/30 space-y-4">
			<div className="flex items-center gap-4">
				<div className="size-12 rounded-full bg-pink-500/10 flex items-center justify-center">
					<span className="font-bold text-pink-500">{name.charAt(0)}</span>
				</div>
				<div>
					<p className="font-medium">{name}</p>
					<p className="text-sm text-muted-foreground">{email}</p>
				</div>
			</div>
			{message && (
				<>
					<Separator />
					<div>
						<p className="text-sm text-muted-foreground mb-2">Your Message</p>
						<p className="text-sm italic p-3 rounded-lg bg-background/50">
							"{message}"
						</p>
					</div>
				</>
			)}
		</div>
	</div>
);

const DeliveryStatus = ({
	method,
	status,
	scheduledDate,
}: {
	method: string;
	status: string;
	scheduledDate?: string;
}) => (
	<div className="space-y-4">
		<h2 className="font-semibold text-lg flex items-center gap-2">
			<Mail className="size-5" />
			Delivery Details
		</h2>
		<div className="p-4 rounded-xl bg-muted/30 space-y-3">
			<div className="flex items-center justify-between">
				<span className="text-muted-foreground">Method</span>
				<span className="font-medium">{method}</span>
			</div>
			{scheduledDate && (
				<div className="flex items-center justify-between">
					<span className="text-muted-foreground">Scheduled</span>
					<div className="flex items-center gap-2">
						<Calendar className="size-4 text-muted-foreground" />
						<span className="font-medium">{scheduledDate}</span>
					</div>
				</div>
			)}
			<div className="flex items-center justify-between">
				<span className="text-muted-foreground">Status</span>
				<Badge variant="secondary">{status}</Badge>
			</div>
		</div>
	</div>
);

const OrderSummary = ({
	orderNumber,
	amount,
	currency,
	fee,
}: {
	orderNumber: string;
	amount: number;
	currency: string;
	fee: number;
}) => (
	<div className="p-4 rounded-xl bg-muted/30 space-y-3">
		<div className="flex items-center justify-between text-sm">
			<span className="text-muted-foreground">Order Number</span>
			<span className="font-mono">{orderNumber}</span>
		</div>
		<Separator />
		<div className="flex items-center justify-between text-sm">
			<span className="text-muted-foreground">Gift Card Value</span>
			<span>
				{currency}
				{amount.toFixed(2)}
			</span>
		</div>
		<div className="flex items-center justify-between text-sm">
			<span className="text-muted-foreground">Service Fee</span>
			<span>{fee === 0 ? 'Free' : `${currency}${fee.toFixed(2)}`}</span>
		</div>
		<Separator />
		<div className="flex items-center justify-between font-semibold">
			<span>Total Paid</span>
			<span>
				{currency}
				{(amount + fee).toFixed(2)}
			</span>
		</div>
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
	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<GiftHeader />

				<GiftCardPreview amount={75} currency="$" code="GIFT-XXXX-YYYY-ZZZZ" />

				<Separator />

				<RecipientInfo
					name="Jane Smith"
					email="jane@example.com"
					message="Happy Birthday! Wishing you all the best on your special day. Enjoy this gift!"
				/>

				<DeliveryStatus
					method="Email Delivery"
					status="Scheduled"
					scheduledDate="Jan 20, 2024 at 9:00 AM"
				/>

				<OrderSummary
					orderNumber="GFT-2024-78432"
					amount={75}
					currency="$"
					fee={0}
				/>

				<CTA
					items={[
						{ label: 'Preview Email', href: '/preview', icon: Mail },
						{
							label: 'Edit Gift',
							href: '/edit',
							variant: 'outline',
							icon: Edit3,
						},
					]}
				/>
			</div>
		</section>
	);
}
