import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Rocket,
	Star,
	Clock,
	MapPin,
	ArrowRight,
	Gift,
	Sparkles,
} from 'lucide-react';
import Link from 'next/link';

interface DeliveryOptionProps {
	icon: React.ElementType;
	title: string;
	description: string;
	selected: boolean;
}

interface OfferProps {
	title: string;
	description: string;
	code: string;
	expiry: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const AnimatedRocket = () => (
	<div className="relative">
		<div className="absolute inset-0 size-24 rounded-full bg-primary/20 animate-ping" />
		<div className="relative size-24 rounded-full bg-gradient-to-br from-primary via-primary/90 to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30">
			<Rocket className="size-12 text-primary-foreground -rotate-45" />
		</div>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold tracking-tight text-center">
		{text}
	</h1>
);

const Subtitle = ({ text }: { text: string }) => (
	<p className="text-muted-foreground text-center">
		{text}
	</p>
);

const OrderStatus = ({
	orderNumber,
	status,
}: {
	orderNumber: string;
	status: string;
}) => (
	<div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-muted border">
		<span className="font-mono font-semibold">{orderNumber}</span>
		<Badge className="bg-primary/10 text-primary border-0">{status}</Badge>
	</div>
);

const DeliveryOption = ({
	icon: Icon,
	title,
	description,
	selected,
}: DeliveryOptionProps) => (
	<div
		className={`p-4 rounded-xl border-2 transition-colors ${selected ? 'border-primary bg-primary/5' : 'border-transparent bg-muted/50'}`}
	>
		<div className="flex items-center gap-3">
			<div
				className={`size-10 rounded-lg flex items-center justify-center ${selected ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}
			>
				<Icon className="size-5" />
			</div>
			<div>
				<p className="font-medium">{title}</p>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
			{selected && (
				<Badge className="ml-auto" variant="default">
					Selected
				</Badge>
			)}
		</div>
	</div>
);

const DeliveryCard = ({
	options,
}: {
	options: DeliveryOptionProps[];
}) => (
	<Card className="w-full max-w-md">
		<CardContent className="pt-6 space-y-3">
			<h3 className="font-semibold text-sm text-muted-foreground mb-4">
				Delivery Method
			</h3>
			{options.map((option, i) => (
				<DeliveryOption key={i} {...option} />
			))}
		</CardContent>
	</Card>
);

const NextOrderOffer = ({ title, description, code, expiry }: OfferProps) => (
	<Card className="w-full max-w-md border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent overflow-hidden">
		<CardContent className="pt-6">
			<div className="flex items-start gap-4">
				<div className="size-12 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
					<Gift className="size-6 text-amber-500" />
				</div>
				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-2 mb-1">
						<p className="font-semibold">{title}</p>
						<Sparkles className="size-4 text-amber-500" />
					</div>
					<p className="text-sm text-muted-foreground mb-3">{description}</p>
					<div className="flex items-center gap-3">
						<code className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-600 font-mono font-semibold text-sm">
							{code}
						</code>
						<span className="text-xs text-muted-foreground">
							Expires {expiry}
						</span>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const RatingPrompt = () => (
	<div className="w-full max-w-md p-4 rounded-xl bg-muted/50 border text-center">
		<p className="text-sm text-muted-foreground mb-3">
			How was your checkout experience?
		</p>
		<div className="flex items-center justify-center gap-2">
			{[1, 2, 3, 4, 5].map((rating) => (
				<button
					key={rating}
					className="size-10 rounded-full bg-background border hover:border-amber-400 hover:bg-amber-50 transition-colors"
				>
					<Star
						className={`size-5 mx-auto ${rating <= 4 ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`}
					/>
				</button>
			))}
		</div>
	</div>
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
	const deliveryOptions: DeliveryOptionProps[] = [
		{
			icon: Rocket,
			title: 'Express Delivery',
			description: 'Jan 18-19, 2024',
			selected: true,
		},
		{
			icon: Clock,
			title: 'Standard Delivery',
			description: 'Jan 22-25, 2024',
			selected: false,
		},
	];

	return (
		<section className="@container min-h-screen flex items-center py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 w-full">
				<div className="flex flex-col items-center gap-6">
					<AnimatedRocket />

					<div className="space-y-2">
						<Title text="Blast off! Order confirmed." />
						<Subtitle text="Your order is on its way to the warehouse" />
					</div>

					<OrderStatus orderNumber="ORD-2024-78432" status="Processing" />

					<DeliveryCard options={deliveryOptions} />

					<NextOrderOffer
						title="15% Off Your Next Order"
						description="Thank you for shopping with us! Here's a special offer."
						code="THANKYOU15"
						expiry="Feb 15, 2024"
					/>

					<RatingPrompt />

					<CTA
						items={[
							{
								label: 'Track Order',
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
		</section>
	);
}
