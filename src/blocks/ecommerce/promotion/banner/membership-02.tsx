import Link from 'next/link';
import {
	ArrowRight,
	Crown,
	Gift,
	Truck,
	Percent,
	Sparkles,
	Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const GlowDecorative = () => (
	<div className="absolute inset-0 overflow-hidden pointer-events-none">
		<div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
		<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
	</div>
);

const VIPBenefitItem = ({
	icon: Icon,
	title,
	description,
}: {
	icon: React.ElementType;
	title: string;
	description: string;
}) => (
	<div className="flex gap-4">
		<div className="size-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
			<Icon className="size-6 text-amber-500" />
		</div>
		<div>
			<h3 className="font-semibold mb-1">{title}</h3>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</div>
);

const VIPContent = ({
	badge,
	headline,
	description,
	benefits,
	cta,
}: {
	badge: { icon: React.ElementType; text: string };
	headline: { text: string; highlight: string };
	description: string;
	benefits: { icon: React.ElementType; title: string; description: string }[];
	cta: { label: string; href: string };
}) => (
	<div className="relative space-y-6">
		<Badge className="bg-amber-500 text-amber-950 hover:bg-amber-600 gap-1.5">
			<badge.icon className="size-3" />
			{badge.text}
		</Badge>
		<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold">
			{headline.text}
			<span className="text-amber-500"> {headline.highlight}</span>
		</h2>
		<p className="text-muted-foreground">{description}</p>
		<div className="space-y-4 py-4">
			{benefits.map((benefit, i) => (
				<VIPBenefitItem key={i} {...benefit} />
			))}
		</div>
		<Button
			size="lg"
			className="gap-2 bg-amber-500 hover:bg-amber-600 text-amber-950"
			asChild
		>
			<Link href={cta.href}>
				{cta.label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);

const VIPCard = () => (
	<div className="relative">
		<div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl blur-xl opacity-30" />
		<div className="relative bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl p-8 text-amber-950">
			<div className="flex items-center gap-3 mb-6">
				<Crown className="size-10" />
				<div>
					<p className="text-sm font-medium opacity-80">VIP Member</p>
					<p className="text-xl font-bold">Gold Status</p>
				</div>
			</div>
			<div className="bg-amber-950/10 rounded-xl p-4 mb-4">
				<p className="text-sm font-medium mb-1">Member Since</p>
				<p className="font-bold">January 2026</p>
			</div>
			<div className="bg-amber-950/10 rounded-xl p-4">
				<p className="text-sm font-medium mb-1">Total Savings</p>
				<p className="text-2xl font-black">$1,247</p>
			</div>
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="relative bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<GlowDecorative />
				<div className="relative max-w-5xl mx-auto">
					<div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12 items-center">
						<VIPContent
							badge={{ icon: Crown, text: 'VIP Program' }}
							headline={{ text: 'Become a', highlight: 'VIP Member' }}
							description="Join our exclusive VIP program and enjoy premium benefits designed for our most valued customers."
							benefits={[
								{
									icon: Percent,
									title: 'Exclusive Discounts',
									description: 'Up to 20% off all purchases',
								},
								{
									icon: Truck,
									title: 'Free Priority Shipping',
									description: '2-day delivery on all orders',
								},
								{
									icon: Clock,
									title: 'Early Access',
									description: 'Shop new arrivals 48 hours early',
								},
							]}
							cta={{ label: 'Join VIP Program', href: '/vip' }}
						/>
						<VIPCard />
					</div>
				</div>
			</div>
		</section>
	);
}
