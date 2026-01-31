import Link from 'next/link';
import { Heart, ArrowRight, Tag, Percent, Truck, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Feature {
	icon: React.ReactNode;
	title: string;
	description: string;
}

const FeatureCard = ({ feature }: { feature: Feature }) => (
	<div className="flex items-start gap-4 p-4 rounded-xl bg-card border">
		<div className="size-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
			{feature.icon}
		</div>
		<div>
			<h3 className="font-medium">{feature.title}</h3>
			<p className="text-sm text-muted-foreground mt-0.5">{feature.description}</p>
		</div>
	</div>
);

const AnimatedHeart = () => (
	<div className="relative size-40">
		<div className="absolute inset-0 animate-ping">
			<Heart className="size-full text-primary/20" strokeWidth={1} />
		</div>
		<div className="absolute inset-4">
			<div className="size-full rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
				<Heart className="size-12 text-primary" strokeWidth={1.5} />
			</div>
		</div>
	</div>
);

export default function Main() {
	const features: Feature[] = [
		{
			icon: <Tag className="size-5 text-primary" />,
			title: 'Price Drop Alerts',
			description: 'Get notified when items go on sale',
		},
		{
			icon: <Percent className="size-5 text-primary" />,
			title: 'Exclusive Deals',
			description: 'Special discounts for wishlist items',
		},
		{
			icon: <Truck className="size-5 text-primary" />,
			title: 'Stock Notifications',
			description: 'Know when items are back in stock',
		},
		{
			icon: <ShieldCheck className="size-5 text-primary" />,
			title: 'Save Forever',
			description: 'Your wishlist syncs across all devices',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 py-12 @md:py-16">
				<div className="flex flex-col items-center text-center mb-12">
					<AnimatedHeart />
					<h1 className="text-3xl font-bold mt-8">Start Your Wishlist</h1>
					<p className="text-lg text-muted-foreground mt-3 max-w-md">
						Save items you love and we'll help you get them at the best prices.
					</p>
					<Button size="lg" className="gap-2 mt-8">
						Explore Products
						<ArrowRight className="size-4" />
					</Button>
				</div>

				<div className="grid @sm:grid-cols-2 gap-4">
					{features.map((feature) => (
						<FeatureCard key={feature.title} feature={feature} />
					))}
				</div>

				<div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-center">
					<Badge className="bg-amber-500 mb-3">Limited Time</Badge>
					<h2 className="text-lg font-bold">First Wishlist Bonus!</h2>
					<p className="text-muted-foreground text-sm mt-1">
						Add 5 items to your wishlist and get 10% off your next purchase
					</p>
					<Button variant="outline" className="mt-4 bg-white">
						Learn More
					</Button>
				</div>
			</div>
		</section>
	);
}
