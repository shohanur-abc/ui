import Link from 'next/link';
import { ArrowRight, Truck, Package, Clock, MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ShippingOption = ({
	icon: Icon,
	title,
	description,
	price,
	featured,
}: {
	icon: React.ElementType;
	title: string;
	description: string;
	price: string;
	featured?: boolean;
}) => (
	<div
		className={`relative p-6 rounded-2xl border transition-all ${featured ? 'bg-primary/5 border-primary' : 'bg-card border-border/50'}`}
	>
		{featured && (
			<Badge className="absolute -top-2 right-4 bg-primary text-primary-foreground">
				Most Popular
			</Badge>
		)}
		<div className="flex items-start gap-4">
			<div
				className={`size-12 rounded-xl flex items-center justify-center shrink-0 ${featured ? 'bg-primary/10' : 'bg-muted'}`}
			>
				<Icon
					className={`size-6 ${featured ? 'text-primary' : 'text-muted-foreground'}`}
				/>
			</div>
			<div className="flex-1">
				<h3 className="font-bold mb-1">{title}</h3>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
			<span className={`font-bold text-lg ${featured ? 'text-primary' : ''}`}>
				{price}
			</span>
		</div>
	</div>
);

const SectionHeader = ({
	badge,
	headline,
	subtext,
}: {
	badge: { icon: React.ElementType; text: string };
	headline: string;
	subtext: string;
}) => (
	<div className="text-center mb-10">
		<Badge
			variant="outline"
			className="border-primary/50 text-primary gap-1.5 mb-4"
		>
			<badge.icon className="size-3" />
			{badge.text}
		</Badge>
		<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-3">
			{headline}
		</h2>
		<p className="text-muted-foreground max-w-xl mx-auto">{subtext}</p>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-3xl mx-auto">
					<SectionHeader
						badge={{ icon: Truck, text: 'Shipping Options' }}
						headline="Fast & Free Delivery"
						subtext="Choose the shipping option that works best for you"
					/>
					<div className="space-y-4">
						<ShippingOption
							icon={Truck}
							title="Standard Shipping"
							description="Delivery in 5-7 business days"
							price="Free"
						/>
						<ShippingOption
							icon={Package}
							title="Express Shipping"
							description="Delivery in 2-3 business days"
							price="$9.99"
							featured
						/>
						<ShippingOption
							icon={Clock}
							title="Next-Day Delivery"
							description="Order by 2pm for next-day delivery"
							price="$19.99"
						/>
					</div>
					<div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
						<span className="flex items-center gap-1.5">
							<Check className="size-4 text-green-500" />
							Order tracking included
						</span>
						<span className="flex items-center gap-1.5">
							<MapPin className="size-4 text-green-500" />
							Worldwide shipping
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
