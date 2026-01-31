import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Star, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section
			className="@container min-h-screen flex items-center"
			data-theme="slate"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
				<div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
					<div>
						<Eyebrow icon={Star} text="Product of the Year" />
						<Title
							text="The Platform That Scales With You"
							highlight="Scales With You"
						/>
						<Description text="From startup to enterprise, our platform grows alongside your business. Start small, dream big—we&apos;ll handle the rest." />
						<StatsList
							items={[
								{ icon: Users, value: '50K+', label: 'Active Teams' },
								{ icon: Star, value: '4.9', label: 'User Rating' },
							]}
						/>
						<CTA
							items={[
								{ label: 'Get Started Free', href: '#start', icon: ArrowRight },
								{
									label: 'Watch Demo',
									href: '#demo',
									icon: Play,
									variant: 'outline',
								},
							]}
						/>
					</div>
					<ProductShowcase
						image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
						caption="Dashboard overview with real-time metrics"
					/>
				</div>
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge variant="outline" className="mb-4 @md:mb-6 gap-2">
		<Icon className="size-3.5" />
		<span>{text}</span>
	</Badge>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">
		{text.split(highlight)[0]}
		<span className="text-primary">{highlight}</span>
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg @xl:text-xl text-muted-foreground mb-6 @md:mb-8 leading-relaxed">
		{text}
	</p>
);

const StatsList = ({
	items,
}: {
	items: {
		icon: ComponentType<{ className?: string }>;
		value: string;
		label: string;
	}[];
}) => (
	<div className="flex gap-8 mb-8">
		{items.map(({ icon: Icon, value, label }, i) => (
			<div key={i} className="flex items-center gap-3">
				<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
					<Icon className="size-5 text-primary" />
				</div>
				<div>
					<div className="text-xl font-bold">{value}</div>
					<div className="text-sm text-muted-foreground">{label}</div>
				</div>
			</div>
		))}
	</div>
);

const CTA = ({
	items,
}: {
	items: {
		label: string;
		href: string;
		icon?: ComponentType<{ className?: string }>;
		variant?: 'default' | 'outline';
	}[];
}) => (
	<div className="flex flex-wrap gap-3 @md:gap-4">
		{items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
			<Button key={i} size="lg" variant={variant} className="gap-2" asChild>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

const ProductShowcase = ({
	image,
	caption,
}: {
	image: string;
	caption: string;
}) => (
	<div className="relative">
		<div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-border">
			<Image
				src={image}
				alt="Product Screenshot"
				fill
				className="object-cover"
			/>
		</div>
		<p className="text-center text-sm text-muted-foreground mt-4">{caption}</p>
	</div>
);
