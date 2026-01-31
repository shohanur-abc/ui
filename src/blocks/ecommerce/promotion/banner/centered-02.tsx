import Link from 'next/link';
import { Percent, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const RadialGlowDecorative = () => (
	<div className="absolute inset-0 overflow-hidden pointer-events-none">
		<div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
		<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
	</div>
);

const SaleBadge = ({
	text,
	icon: Icon,
}: {
	text: string;
	icon: React.ElementType;
}) => (
	<Badge
		variant="outline"
		className="gap-1.5 text-primary border-primary/50 mb-4 @md:mb-6"
	>
		<Icon className="size-3" />
		{text}
	</Badge>
);

const DiscountDisplay = ({
	amount,
	suffix,
}: {
	amount: string;
	suffix: string;
}) => (
	<div className="mb-4 @md:mb-6">
		<span className="text-6xl @sm:text-7xl @md:text-8xl @lg:text-9xl font-black tracking-tighter text-primary">
			{amount}
		</span>
		<span className="text-2xl @sm:text-3xl @md:text-4xl font-bold text-primary/80">
			{suffix}
		</span>
	</div>
);

const Headline = ({ text }: { text: string }) => (
	<h2 className="text-xl @sm:text-2xl @md:text-3xl font-semibold mb-3 @md:mb-4">
		{text}
	</h2>
);

const TimerBadge = ({
	icon: Icon,
	text,
}: {
	icon: React.ElementType;
	text: string;
}) => (
	<div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-6 @md:mb-8">
		<Icon className="size-4" />
		<span>{text}</span>
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
			{label}
			<Icon className="size-4" />
		</Link>
	</Button>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="relative bg-card py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<RadialGlowDecorative />
				<div className="relative max-w-3xl mx-auto text-center">
					<SaleBadge icon={Percent} text="Flash Sale" />
					<DiscountDisplay amount="50" suffix="% OFF" />
					<Headline text="On All Electronics This Weekend" />
					<TimerBadge icon={Clock} text="Ends in 2 days, 14 hours" />
					<CTAButton label="Shop Now" href="/electronics" icon={ArrowRight} />
				</div>
			</div>
		</section>
	);
}
