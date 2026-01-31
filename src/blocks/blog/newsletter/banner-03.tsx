import { Gift, ArrowRight, X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface BannerProps {
	badge: string;
	title: string;
	subtitle: string;
	placeholder: string;
	buttonText: string;
	dismissLabel: string;
}

const GradientDecorative = () => (
	<div className="absolute inset-0 -z-10 overflow-hidden">
		<div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-r from-primary/20 via-primary/10 to-transparent blur-2xl" />
	</div>
);

const Banner = ({ badge, title, subtitle, placeholder, buttonText, dismissLabel }: BannerProps) => (
	<div className="relative flex flex-col @xl:flex-row @xl:items-center gap-4 p-4 @md:p-6 rounded-xl border bg-card overflow-hidden">
		<GradientDecorative />
		<div className="flex-1 flex flex-col @md:flex-row @md:items-center gap-4">
			<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
				<Gift className="size-6 text-primary" />
			</div>
			<div className="flex-1">
				<div className="flex items-center gap-2 mb-1">
					<Badge variant="secondary" className="text-xs">
						<Star className="size-3 mr-1" />
						{badge}
					</Badge>
				</div>
				<h3 className="font-bold text-lg">{title}</h3>
				<p className="text-sm text-muted-foreground">{subtitle}</p>
			</div>
		</div>
		<div className="flex items-center gap-2">
			<form className="flex gap-2">
				<Input
					type="email"
					placeholder={placeholder}
					className="w-48 @lg:w-56 h-10"
				/>
				<Button className="gap-1.5 h-10">
					{buttonText}
					<ArrowRight className="size-4" />
				</Button>
			</form>
			<Button variant="ghost" size="icon" className="shrink-0">
				<X className="size-4" />
				<span className="sr-only">{dismissLabel}</span>
			</Button>
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<Banner
					badge="Limited Offer"
					title="Get 30% off your first month"
					subtitle="Subscribe to our newsletter and unlock exclusive discounts."
					placeholder="Enter your email"
					buttonText="Claim Offer"
					dismissLabel="Dismiss"
				/>
			</div>
		</section>
	);
}
