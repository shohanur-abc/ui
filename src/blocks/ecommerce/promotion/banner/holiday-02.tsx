import Link from 'next/link';
import { ArrowRight, TreePine, Gift, Snowflake, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SnowfallDecorative = () => (
	<div className="absolute inset-0 overflow-hidden pointer-events-none">
		{[...Array(40)].map((_, i) => (
			<div
				key={i}
				className="absolute size-1 @md:size-1.5 rounded-full bg-white/30"
				style={{
					left: `${Math.random() * 100}%`,
					top: `${Math.random() * 100}%`,
				}}
			/>
		))}
	</div>
);

const ChristmasContent = ({
	badge,
	headline,
	description,
	offers,
	cta,
}: {
	badge: { icon: React.ElementType; text: string };
	headline: { lines: string[] };
	description: string;
	offers: { text: string; highlight: string }[];
	cta: { label: string; href: string };
}) => (
	<div className="relative text-center text-white">
		<Badge className="mb-6 bg-red-500 text-white border-0 gap-1.5">
			<badge.icon className="size-3" />
			{badge.text}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl @lg:text-6xl font-bold mb-4">
			{headline.lines.map((line, i) => (
				<span key={i} className="block">
					{line}
				</span>
			))}
		</h2>
		<p className="text-white/80 text-base @md:text-lg mb-8 max-w-xl mx-auto">
			{description}
		</p>
		<div className="flex flex-wrap justify-center gap-4 mb-8">
			{offers.map(({ text, highlight }, i) => (
				<div
					key={i}
					className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4"
				>
					<span className="text-2xl @md:text-3xl font-black">{highlight}</span>
					<p className="text-sm text-white/80">{text}</p>
				</div>
			))}
		</div>
		<Button
			size="lg"
			className="gap-2 bg-white text-red-600 hover:bg-white/90"
			asChild
		>
			<Link href={cta.href}>
				<Gift className="size-4" />
				{cta.label}
			</Link>
		</Button>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="relative bg-gradient-to-br from-red-600 via-red-700 to-green-800 py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<SnowfallDecorative />
				<div className="relative max-w-4xl mx-auto">
					<ChristmasContent
						badge={{ icon: TreePine, text: 'Holiday Special' }}
						headline={{ lines: ["'Tis the Season", 'to Save Big!'] }}
						description="Celebrate the holidays with incredible savings on gifts for everyone on your list."
						offers={[
							{ text: 'Sitewide', highlight: '30% OFF' },
							{ text: 'On $100+', highlight: 'FREE SHIP' },
							{ text: 'With Purchase', highlight: 'FREE GIFT' },
						]}
						cta={{ label: 'Shop Holiday Deals', href: '/holiday' }}
					/>
				</div>
			</div>
		</section>
	);
}
