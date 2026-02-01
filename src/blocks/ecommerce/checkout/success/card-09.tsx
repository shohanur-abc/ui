import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Gift,
	Heart,
	Mail,
	Calendar,
	Edit3,
	ArrowRight,
	Eye,
	Copy,
} from 'lucide-react';
import Link from 'next/link';

interface RecipientProps {
	name: string;
	email: string;
	message?: string;
}

interface GiftCardDetailsProps {
	amount: number;
	currency: string;
	code: string;
	expiresAt: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const GiftSuccessHeader = () => (
	<Card className="bg-gradient-to-br from-pink-500/10 via-rose-500/5 to-red-500/10 border-pink-200 dark:border-pink-800/30 overflow-hidden">
		<div className="absolute top-0 right-0 size-40 bg-pink-200/30 dark:bg-pink-800/10 rounded-full -translate-y-1/2 translate-x-1/2" />
		<CardContent className="pt-8 pb-6 text-center relative">
			<div className="size-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-500/25">
				<Gift className="size-8 text-white" />
			</div>
			<h1 className="text-2xl @lg:text-3xl font-bold mb-2">Gift Card Sent!</h1>
			<p className="text-muted-foreground">
				Your gift is on its way to make someone's day special
			</p>
		</CardContent>
	</Card>
);

const GiftCardPreviewCard = ({
	amount,
	currency,
	code,
	design,
}: GiftCardDetailsProps & { design: string }) => (
	<Card className="overflow-hidden">
		<div
			className={`h-48 flex items-center justify-center text-white ${design}`}
		>
			<div className="text-center">
				<Gift className="size-12 mx-auto mb-3 opacity-80" />
				<p className="text-4xl font-bold">
					{currency}
					{amount}
				</p>
				<p className="opacity-80 text-sm mt-1">Gift Card</p>
			</div>
		</div>
		<CardContent className="pt-4">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm text-muted-foreground">Gift Code</p>
					<p className="font-mono font-bold">{code}</p>
				</div>
				<Button variant="ghost" size="icon">
					<Copy className="size-4" />
				</Button>
			</div>
		</CardContent>
	</Card>
);

const RecipientCard = ({ name, email, message }: RecipientProps) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<Heart className="size-4 text-pink-500" />
				Recipient Details
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="flex items-center gap-3">
				<div className="size-12 rounded-full bg-pink-500/10 flex items-center justify-center">
					<span className="font-bold text-pink-500">{name.charAt(0)}</span>
				</div>
				<div>
					<p className="font-semibold">{name}</p>
					<p className="text-sm text-muted-foreground">{email}</p>
				</div>
			</div>
			{message && (
				<>
					<Separator />
					<div>
						<p className="text-sm text-muted-foreground mb-2">Your Message</p>
						<p className="text-sm italic bg-muted/50 p-3 rounded-lg">
							"{message}"
						</p>
					</div>
				</>
			)}
		</CardContent>
	</Card>
);

const DeliveryCard = ({
	method,
	scheduledDate,
	status,
}: {
	method: string;
	scheduledDate?: string;
	status: string;
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<Mail className="size-4" />
				Delivery Details
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			<div className="flex items-center justify-between">
				<span className="text-muted-foreground">Method</span>
				<span className="font-medium">{method}</span>
			</div>
			{scheduledDate && (
				<div className="flex items-center justify-between">
					<span className="text-muted-foreground">Scheduled For</span>
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
		</CardContent>
	</Card>
);

const OrderSummaryCard = ({
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
	<Card className="bg-muted/30">
		<CardContent className="pt-6 space-y-3">
			<div className="flex items-center justify-between text-sm">
				<span className="text-muted-foreground">Order Number</span>
				<span className="font-mono">{orderNumber}</span>
			</div>
			<div className="flex items-center justify-between text-sm">
				<span className="text-muted-foreground">Gift Card Value</span>
				<span>
					{currency}
					{amount.toFixed(2)}
				</span>
			</div>
			<div className="flex items-center justify-between text-sm">
				<span className="text-muted-foreground">Service Fee</span>
				<span>
					{currency}
					{fee.toFixed(2)}
				</span>
			</div>
			<Separator />
			<div className="flex items-center justify-between">
				<span className="font-medium">Total Paid</span>
				<span className="font-bold text-lg">
					{currency}
					{(amount + fee).toFixed(2)}
				</span>
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
	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 space-y-6">
				<GiftSuccessHeader />

				<div className="grid @md:grid-cols-2 gap-6">
					<GiftCardPreviewCard
						amount={100}
						currency="$"
						code="GIFT-XXXX-YYYY-ZZZZ"
						expiresAt="Jan 2025"
						design="bg-gradient-to-br from-pink-500 via-rose-500 to-red-500"
					/>
					<RecipientCard
						name="Jane Doe"
						email="jane@example.com"
						message="Happy Birthday! Wishing you all the best on your special day. Enjoy this gift!"
					/>
				</div>

				<DeliveryCard
					method="Email"
					scheduledDate="Jan 20, 2024 at 9:00 AM"
					status="Scheduled"
				/>

				<OrderSummaryCard
					orderNumber="GFT-2024-78432"
					amount={100}
					currency="$"
					fee={0}
				/>

				<CTA
					items={[
						{ label: 'Preview Email', href: '/preview', icon: Eye },
						{
							label: 'Edit Details',
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
