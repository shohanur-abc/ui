import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	Clock,
	Heart,
	Package,
	ShoppingCart,
	Star,
	Truck,
	AlertCircle,
} from 'lucide-react';
import Image from 'next/image';

interface TrialProps {
	image: string;
	name: string;
	brand: string;
	trialPrice: number;
	fullPrice: number;
	rating: number;
	reviews: number;
	trialDays: number;
	features: string[];
	autoRenew: boolean;
	shipping: string;
}

const TrialImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
		<Image
			src={src}
			alt={alt}
			fill
			className="object-cover transition-transform duration-500 group-hover:scale-105"
		/>
		<Button
			size="icon-sm"
			variant="secondary"
			className="absolute right-3 top-3 bg-white/90"
		>
			<Heart className="size-4" />
		</Button>
	</div>
);

const TrialBadge = ({ days }: { days: number }) => (
	<Badge className="absolute left-3 top-3 gap-1 bg-gradient-to-r from-blue-600 to-indigo-600">
		<Clock className="size-3" />
		{days}-Day Trial
	</Badge>
);

const BrandLabel = ({ text }: { text: string }) => (
	<span className="text-xs font-semibold uppercase tracking-wider text-primary">
		{text}
	</span>
);

const TrialName = ({ text }: { text: string }) => (
	<h3 className="font-semibold text-foreground">{text}</h3>
);

const TrialRating = ({
	rating,
	reviews,
}: {
	rating: number;
	reviews: number;
}) => (
	<div className="flex items-center gap-1.5">
		<Star className="size-4 fill-yellow-400 text-yellow-400" />
		<span className="font-medium">{rating.toFixed(1)}</span>
		<span className="text-sm text-muted-foreground">({reviews})</span>
	</div>
);

const FeatureList = ({ features }: { features: string[] }) => (
	<ul className="space-y-1.5">
		{features.map((f, i) => (
			<li
				key={i}
				className="flex items-center gap-2 text-sm text-muted-foreground"
			>
				<div className="flex size-4 items-center justify-center rounded-full bg-primary/10">
					<span className="text-[10px] text-primary">✓</span>
				</div>
				{f}
			</li>
		))}
	</ul>
);

const AutoRenewNotice = ({ willRenew }: { willRenew: boolean }) => (
	<div
		className={`flex items-start gap-2 rounded-lg p-2 text-xs ${
			willRenew
				? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
				: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'
		}`}
	>
		<AlertCircle className="mt-0.5 size-4 shrink-0" />
		<span>
			{willRenew
				? 'Auto-renews at full price. Cancel anytime.'
				: 'No auto-renewal. You decide.'}
		</span>
	</div>
);

const ShippingInfo = ({ text }: { text: string }) => (
	<div className="flex items-center gap-2 text-sm text-muted-foreground">
		<Truck className="size-4 text-green-500" />
		{text}
	</div>
);

const PriceDisplay = ({ trial, full }: { trial: number; full: number }) => (
	<div className="space-y-0.5">
		<div className="flex items-baseline gap-2">
			<span className="text-xl font-bold text-foreground">
				${trial.toFixed(2)}
			</span>
			<span className="text-sm text-muted-foreground line-through">
				${full.toFixed(2)}
			</span>
		</div>
		<p className="text-xs text-muted-foreground">Trial price</p>
	</div>
);

const StartButton = ({ label }: { label: string }) => (
	<Button className="gap-2">
		<Package className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const trial: TrialProps = {
		image:
			'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=280&fit=crop',
		name: 'Premium Skincare Kit',
		brand: 'Glow Science',
		trialPrice: 9.99,
		fullPrice: 89.99,
		rating: 4.7,
		reviews: 1234,
		trialDays: 14,
		features: [
			'Full-size products included',
			'Personalized routine guide',
			'Free shipping both ways',
		],
		autoRenew: true,
		shipping: 'Free trial shipping',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-sm px-4 py-8">
				<Card className="group overflow-hidden">
					<div className="relative">
						<TrialImage src={trial.image} alt={trial.name} />
						<TrialBadge days={trial.trialDays} />
					</div>
					<div className="space-y-3 p-4">
						<div className="flex items-center justify-between">
							<BrandLabel text={trial.brand} />
							<TrialRating rating={trial.rating} reviews={trial.reviews} />
						</div>
						<TrialName text={trial.name} />
						<FeatureList features={trial.features} />
						<AutoRenewNotice willRenew={trial.autoRenew} />
						<ShippingInfo text={trial.shipping} />
						<Separator />
						<div className="flex items-center justify-between">
							<PriceDisplay trial={trial.trialPrice} full={trial.fullPrice} />
							<StartButton label="Try" />
						</div>
					</div>
				</Card>
			</div>
		</section>
	);
}
