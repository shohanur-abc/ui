import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	CheckCircle2,
	ShoppingBag,
	CreditCard,
	Truck,
	ArrowRight,
	Download,
	Share2,
} from 'lucide-react';
import Link from 'next/link';

interface StepProps {
	number: number;
	title: string;
	description: string;
	completed: boolean;
}

interface PaymentProps {
	method: string;
	last4: string;
	amount: number;
	currency: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const IllustrationPanel = () => (
	<div className="relative h-full min-h-[300px] @lg:min-h-0 rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 overflow-hidden flex items-center justify-center">
		<div className="absolute inset-0 opacity-10">
			<div className="absolute top-10 left-10 size-32 rounded-full bg-white" />
			<div className="absolute bottom-20 right-10 size-24 rounded-full bg-white" />
			<div className="absolute top-1/2 left-1/3 size-16 rounded-full bg-white" />
		</div>
		<div className="relative text-center text-primary-foreground p-8">
			<div className="size-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
				<CheckCircle2 className="size-12" />
			</div>
			<h2 className="text-2xl @xl:text-3xl font-bold mb-2">Order Confirmed!</h2>
			<p className="text-primary-foreground/80 max-w-xs mx-auto">
				Your order has been placed and is being processed
			</p>
		</div>
	</div>
);

const OrderStep = ({ number, title, description, completed }: StepProps) => (
	<div className="flex items-start gap-4">
		<div
			className={`size-8 rounded-full flex items-center justify-center shrink-0 ${completed ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
		>
			{completed ? (
				<CheckCircle2 className="size-4" />
			) : (
				<span className="text-sm font-medium">{number}</span>
			)}
		</div>
		<div>
			<p className={`font-medium ${completed ? '' : 'text-muted-foreground'}`}>
				{title}
			</p>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</div>
);

const OrderProgress = ({ steps }: { steps: StepProps[] }) => (
	<div className="space-y-4">
		{steps.map((step, i) => (
			<OrderStep key={i} {...step} />
		))}
	</div>
);

const PaymentCard = ({ method, last4, amount, currency }: PaymentProps) => (
	<Card>
		<CardContent className="pt-6">
			<div className="flex items-center gap-4">
				<div className="size-12 rounded-xl bg-muted flex items-center justify-center">
					<CreditCard className="size-6 text-muted-foreground" />
				</div>
				<div className="flex-1">
					<p className="font-medium">{method}</p>
					<p className="text-sm text-muted-foreground">**** {last4}</p>
				</div>
				<div className="text-right">
					<p className="text-sm text-muted-foreground">Amount Paid</p>
					<p className="text-xl font-bold">
						{currency}
						{amount.toFixed(2)}
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const OrderInfo = ({
	orderNumber,
	items,
	delivery,
}: {
	orderNumber: string;
	items: number;
	delivery: string;
}) => (
	<div className="grid grid-cols-3 gap-4">
		<div className="p-4 rounded-xl bg-muted/50 text-center">
			<ShoppingBag className="size-5 text-muted-foreground mx-auto mb-2" />
			<p className="text-xs text-muted-foreground">Order</p>
			<p className="font-mono font-semibold text-sm">{orderNumber}</p>
		</div>
		<div className="p-4 rounded-xl bg-muted/50 text-center">
			<ShoppingBag className="size-5 text-muted-foreground mx-auto mb-2" />
			<p className="text-xs text-muted-foreground">Items</p>
			<p className="font-semibold">{items}</p>
		</div>
		<div className="p-4 rounded-xl bg-muted/50 text-center">
			<Truck className="size-5 text-muted-foreground mx-auto mb-2" />
			<p className="text-xs text-muted-foreground">Delivery</p>
			<p className="font-semibold text-sm">{delivery}</p>
		</div>
	</div>
);

const QuickActions = () => (
	<div className="flex items-center justify-center gap-4">
		<Button variant="ghost" size="sm" className="gap-2">
			<Download className="size-4" />
			Invoice
		</Button>
		<Separator orientation="vertical" className="h-6" />
		<Button variant="ghost" size="sm" className="gap-2">
			<Share2 className="size-4" />
			Share
		</Button>
	</div>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col gap-3">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="w-full gap-2"
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
	const orderSteps: StepProps[] = [
		{
			number: 1,
			title: 'Order Placed',
			description: 'Your order has been received',
			completed: true,
		},
		{
			number: 2,
			title: 'Processing',
			description: 'Preparing your items',
			completed: true,
		},
		{
			number: 3,
			title: 'Shipped',
			description: 'On the way to you',
			completed: false,
		},
		{
			number: 4,
			title: 'Delivered',
			description: 'Enjoy your purchase',
			completed: false,
		},
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8">
				<div className="grid @lg:grid-cols-2 gap-8 @lg:gap-0 @lg:min-h-[600px] rounded-2xl overflow-hidden border">
					<IllustrationPanel />

					<div className="p-6 @lg:p-10 space-y-8">
						<OrderInfo orderNumber="78432" items={3} delivery="Jan 20-22" />

						<PaymentCard
							method="Visa Credit Card"
							last4="4242"
							amount={459.99}
							currency="$"
						/>

						<div className="space-y-4">
							<h3 className="font-semibold">Order Status</h3>
							<OrderProgress steps={orderSteps} />
						</div>

						<QuickActions />

						<CTA
							items={[
								{
									label: 'Track Your Order',
									href: '/track',
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
			</div>
		</section>
	);
}
