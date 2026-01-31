import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container relative overflow-hidden">
			<ImageOverlay
				image="https://picsum.photos/seed/overlay1/1920/1080"
				eyebrow={{ icon: Sparkles, text: 'Featured' }}
				title="Building the Future of Web"
				description="Transforming ideas into exceptional digital experiences with cutting-edge technologies and creative solutions."
				cta={[
					{ label: 'Start a Project', href: '#contact', variant: 'default' },
					{ label: 'View Work', href: '#work', variant: 'outline' },
				]}
				stats={[
					{ value: '150+', label: 'Projects' },
					{ value: '50+', label: 'Clients' },
					{ value: '8+', label: 'Years' },
				]}
			/>
		</section>
	);
}

interface EyebrowProps {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}

interface CTAItem {
	label: string;
	href: string;
	variant: 'default' | 'outline';
}

interface StatItem {
	value: string;
	label: string;
}

interface ImageOverlayProps {
	image: string;
	eyebrow: EyebrowProps;
	title: string;
	description: string;
	cta: CTAItem[];
	stats: StatItem[];
}

const ImageOverlay = ({
	image,
	eyebrow,
	title,
	description,
	cta,
	stats,
}: ImageOverlayProps) => {
	const EyebrowIcon = eyebrow.icon;
	return (
		<div className="relative min-h-[500px] @md:min-h-[600px] @xl:min-h-[700px] flex items-center">
			<Image src={image} alt="Background" fill className="object-cover" />
			<div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />

			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-16 @md:py-20 @xl:py-24 w-full">
				<div className="max-w-2xl">
					<Badge variant="secondary" className="mb-4 @md:mb-5 gap-1.5">
						<EyebrowIcon className="size-3.5" />
						{eyebrow.text}
					</Badge>

					<h2 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-5 @md:mb-6">
						{title}
					</h2>

					<p className="text-base @md:text-lg @xl:text-xl text-muted-foreground leading-relaxed mb-8 @md:mb-10">
						{description}
					</p>

					<div className="flex flex-wrap gap-3 @md:gap-4 mb-10 @md:mb-12">
						{cta.map(({ label, href, variant }, i) => (
							<Button key={i} size="lg" variant={variant} asChild>
								<Link href={href}>
									{label}
									{variant === 'default' && <ArrowRight className="size-4" />}
								</Link>
							</Button>
						))}
					</div>

					<div className="flex gap-8 @md:gap-12">
						{stats.map(({ value, label }, i) => (
							<div key={i}>
								<div className="text-2xl @md:text-3xl @xl:text-4xl font-bold">
									{value}
								</div>
								<div className="text-sm @md:text-base text-muted-foreground">
									{label}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
