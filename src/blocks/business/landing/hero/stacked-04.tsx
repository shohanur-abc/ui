import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container min-h-screen" data-theme="emerald">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center mb-10 @md:mb-14">
					<Eyebrow icon={Building} text="Industry Leader" />
					<Title text="Trusted by the World&apos;s Best Companies" />
					<Description text="Join thousands of forward-thinking businesses that rely on our platform to power their growth." />
					<CTA
						items={[
							{ label: 'Request Demo', href: '#demo', icon: ArrowRight },
							{
								label: 'View Case Studies',
								href: '#cases',
								variant: 'outline',
							},
						]}
					/>
				</div>
				<LogoCloud
					items={[
						{
							name: 'Company 1',
							logo: 'https://via.placeholder.com/150x50/f1f5f9/64748b?text=Company',
						},
						{
							name: 'Company 2',
							logo: 'https://via.placeholder.com/150x50/f1f5f9/64748b?text=Company',
						},
						{
							name: 'Company 3',
							logo: 'https://via.placeholder.com/150x50/f1f5f9/64748b?text=Company',
						},
						{
							name: 'Company 4',
							logo: 'https://via.placeholder.com/150x50/f1f5f9/64748b?text=Company',
						},
						{
							name: 'Company 5',
							logo: 'https://via.placeholder.com/150x50/f1f5f9/64748b?text=Company',
						},
						{
							name: 'Company 6',
							logo: 'https://via.placeholder.com/150x50/f1f5f9/64748b?text=Company',
						},
					]}
				/>
				<Rating value={4.9} reviews={2847} />
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
	<Badge variant="secondary" className="mb-4 @md:mb-6 gap-2 mx-auto">
		<Icon className="size-3.5" />
		<span>{text}</span>
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 max-w-4xl mx-auto">
		{text}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 @md:mb-10 leading-relaxed">
		{text}
	</p>
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
	<div className="flex flex-wrap justify-center gap-4">
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

const LogoCloud = ({ items }: { items: { name: string; logo: string }[] }) => (
	<div className="grid grid-cols-2 @sm:grid-cols-3 @xl:grid-cols-6 gap-6 @md:gap-8 items-center mb-10 @md:mb-14">
		{items.map(({ name, logo }, i) => (
			<div
				key={i}
				className="flex justify-center opacity-60 hover:opacity-100 transition-opacity"
			>
				<Image
					src={logo}
					alt={name}
					width={150}
					height={50}
					className="h-8 @md:h-10 w-auto object-contain"
				/>
			</div>
		))}
	</div>
);

const Rating = ({ value, reviews }: { value: number; reviews: number }) => (
	<div className="flex flex-col items-center gap-2">
		<div className="flex items-center gap-1">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className="size-5 text-primary"
					fill={i < Math.floor(value) ? 'currentColor' : 'none'}
				/>
			))}
		</div>
		<p className="text-sm text-muted-foreground">
			<span className="font-semibold text-foreground">{value}</span> out of 5
			based on{' '}
			<span className="font-semibold text-foreground">
				{reviews.toLocaleString()}
			</span>{' '}
			reviews
		</p>
	</div>
);
