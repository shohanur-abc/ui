import Link from 'next/link';
import {
	ArrowRight,
	Truck,
	Percent,
	Gift,
	Star,
	Shield,
	Clock,
} from 'lucide-react';

const MarqueeItem = ({
	icon: Icon,
	text,
}: {
	icon: React.ElementType;
	text: string;
}) => (
	<div className="flex items-center gap-2 mx-6 @md:mx-8">
		<Icon className="size-4 text-primary shrink-0" />
		<span className="whitespace-nowrap">{text}</span>
	</div>
);

const MarqueeTrack = ({
	items,
	direction = 'left',
}: {
	items: { icon: React.ElementType; text: string }[];
	direction?: 'left' | 'right';
}) => (
	<div
		className="flex animate-marquee"
		style={{ animationDirection: direction === 'right' ? 'reverse' : 'normal' }}
	>
		{[...items, ...items].map((item, i) => (
			<MarqueeItem key={i} icon={item.icon} text={item.text} />
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-primary py-3 @md:py-4 overflow-hidden">
				<div className="flex whitespace-nowrap text-sm @md:text-base font-medium text-primary-foreground">
					<MarqueeTrack
						items={[
							{ icon: Truck, text: 'Free Shipping on $50+' },
							{ icon: Percent, text: 'Up to 50% Off Sale' },
							{ icon: Gift, text: 'Free Gift with Purchase' },
							{ icon: Star, text: '4.9★ Customer Rating' },
							{ icon: Shield, text: 'Secure Checkout' },
							{ icon: Clock, text: 'Same Day Delivery' },
						]}
					/>
				</div>
			</div>
			<style jsx>{`
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
            `}</style>
		</section>
	);
}
