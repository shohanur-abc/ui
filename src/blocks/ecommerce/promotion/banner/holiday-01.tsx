import Link from 'next/link';
import { ArrowRight, Heart, Sparkles, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HeartsDecorative = () => (
	<div className="absolute inset-0 overflow-hidden pointer-events-none">
		{[...Array(15)].map((_, i) => (
			<Heart
				key={i}
				className="absolute text-pink-500/20"
				style={{
					left: `${Math.random() * 100}%`,
					top: `${Math.random() * 100}%`,
					width: `${Math.random() * 30 + 10}px`,
					height: `${Math.random() * 30 + 10}px`,
					transform: `rotate(${Math.random() * 30 - 15}deg)`,
				}}
			/>
		))}
	</div>
);

const HolidayContent = ({
	badge,
	headline,
	description,
	discount,
	cta,
}: {
	badge: { icon: React.ElementType; text: string };
	headline: { text: string; highlight: string };
	description: string;
	discount: { value: string; code: string };
	cta: { label: string; href: string };
}) => (
	<div className="relative text-center max-w-2xl mx-auto">
		<Badge className="mb-6 bg-pink-500 text-white border-0 gap-1.5">
			<badge.icon className="size-3" />
			{badge.text}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl @lg:text-6xl font-bold mb-4">
			{headline.text}
			<span className="text-pink-500"> {headline.highlight}</span>
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg mb-8">
			{description}
		</p>
		<div className="bg-pink-500/10 rounded-2xl p-6 mb-8 inline-block">
			<span className="text-4xl @md:text-5xl font-black text-pink-500">
				{discount.value}
			</span>
			<p className="text-sm text-muted-foreground mt-2">
				Use code:{' '}
				<span className="font-mono font-bold text-foreground">
					{discount.code}
				</span>
			</p>
		</div>
		<div className="flex justify-center">
			<Button size="lg" className="gap-2 bg-pink-500 hover:bg-pink-600" asChild>
				<Link href={cta.href}>
					<Gift className="size-4" />
					{cta.label}
				</Link>
			</Button>
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="relative bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<HeartsDecorative />
				<HolidayContent
					badge={{ icon: Heart, text: "Valentine's Day" }}
					headline={{ text: 'Fall in', highlight: 'Love' }}
					description="Find the perfect gift for your special someone. Shop our curated Valentine's collection with exclusive discounts."
					discount={{ value: '20% OFF', code: 'LOVE20' }}
					cta={{ label: 'Shop Gifts', href: '/valentines' }}
				/>
			</div>
		</section>
	);
}
