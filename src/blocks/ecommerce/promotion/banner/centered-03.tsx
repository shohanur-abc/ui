import Link from 'next/link';
import { ShoppingBag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GridDecorative = () => (
	<div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
		<div
			className="absolute inset-0"
			style={{
				backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                                  linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
				backgroundSize: '40px 40px',
			}}
		/>
	</div>
);

const StarRating = ({ count }: { count: number }) => (
	<div className="flex items-center justify-center gap-1 mb-4">
		{Array.from({ length: count }).map((_, i) => (
			<Star key={i} className="size-5 fill-primary text-primary" />
		))}
	</div>
);

const Quote = ({ text }: { text: string }) => (
	<blockquote className="text-xl @sm:text-2xl @md:text-3xl @lg:text-4xl font-medium italic mb-4 @md:mb-6 max-w-3xl mx-auto">
		"{text}"
	</blockquote>
);

const Attribution = ({ name, title }: { name: string; title: string }) => (
	<div className="mb-6 @md:mb-8">
		<p className="font-semibold">{name}</p>
		<p className="text-sm text-muted-foreground">{title}</p>
	</div>
);

const CTAButton = ({
	label,
	href,
	icon: Icon,
}: {
	label: string;
	href: string;
	icon: React.ElementType;
}) => (
	<Button size="lg" className="gap-2" asChild>
		<Link href={href}>
			<Icon className="size-4" />
			{label}
		</Link>
	</Button>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="relative bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<GridDecorative />
				<div className="relative max-w-4xl mx-auto text-center">
					<StarRating count={5} />
					<Quote text="The best shopping experience I've ever had. Quality products, fast delivery, and amazing customer service." />
					<Attribution name="Sarah Johnson" title="Verified Customer" />
					<CTAButton label="Start Shopping" href="/shop" icon={ShoppingBag} />
				</div>
			</div>
		</section>
	);
}
