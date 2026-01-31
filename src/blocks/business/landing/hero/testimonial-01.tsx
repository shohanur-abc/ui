import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Quote, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section
			className="@container min-h-screen flex items-center"
			data-theme="emerald"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
				<div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
					<TestimonialCard
						quote="This platform completely transformed how we operate. We've seen a 150% increase in productivity and our team has never been happier."
						author="Sarah Johnson"
						role="CEO, TechFlow Inc."
						avatar="https://i.pravatar.cc/150?img=32"
						rating={5}
					/>
					<div>
						<Eyebrow icon={Star} text="Customer Stories" />
						<Title text="Trusted by Industry Leaders" highlight="Leaders" />
						<Description text="Join 10,000+ companies that have transformed their operations and achieved remarkable results with our platform." />
						<CustomerLogos
							items={[
								'https://via.placeholder.com/100x40/f1f5f9/64748b?text=Logo',
								'https://via.placeholder.com/100x40/f1f5f9/64748b?text=Logo',
								'https://via.placeholder.com/100x40/f1f5f9/64748b?text=Logo',
								'https://via.placeholder.com/100x40/f1f5f9/64748b?text=Logo',
							]}
						/>
						<CTA
							items={[
								{
									label: 'Read More Stories',
									href: '#stories',
									icon: ArrowRight,
								},
								{ label: 'Join Them', href: '#join', variant: 'outline' },
							]}
						/>
					</div>
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
	<Badge className="mb-4 @md:mb-6 gap-2">
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

const CustomerLogos = ({ items }: { items: string[] }) => (
	<div className="flex flex-wrap gap-6 items-center mb-8">
		{items.map((logo, i) => (
			<Image
				key={i}
				src={logo}
				alt="Customer logo"
				width={80}
				height={32}
				className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity"
			/>
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

const TestimonialCard = ({
	quote,
	author,
	role,
	avatar,
	rating,
}: {
	quote: string;
	author: string;
	role: string;
	avatar: string;
	rating: number;
}) => (
	<div className="relative bg-card border border-border rounded-2xl p-6 @md:p-8 shadow-xl">
		<Quote className="absolute top-6 right-6 size-10 text-primary/20" />
		<div className="flex gap-1 mb-4">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={`size-5 ${i < rating ? 'text-primary fill-primary' : 'text-muted-foreground'}`}
				/>
			))}
		</div>
		<p className="text-lg @md:text-xl leading-relaxed mb-6">
			&ldquo;{quote}&rdquo;
		</p>
		<div className="flex items-center gap-4">
			<Avatar className="size-12">
				<AvatarImage src={avatar} />
				<AvatarFallback>
					{author
						.split(' ')
						.map((n) => n[0])
						.join('')}
				</AvatarFallback>
			</Avatar>
			<div>
				<p className="font-semibold">{author}</p>
				<p className="text-sm text-muted-foreground">{role}</p>
			</div>
		</div>
	</div>
);
