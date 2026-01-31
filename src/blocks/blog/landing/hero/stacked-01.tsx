import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="relative mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-28">
				<div className="flex flex-col items-center text-center gap-6">
					<Eyebrow label="Welcome to Our Blog" icon={Sparkles} />
					<Title text="Insights That Drive Innovation" />
					<Description text="Discover curated articles, tutorials, and stories from industry experts. Learn, grow, and stay ahead." />
					<CTAGroup
						primary={{ label: 'Start Reading', href: '/articles' }}
						secondary={{ label: 'Browse Topics', href: '/topics' }}
					/>
					<FeaturedImage
						src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200"
						alt="Blog workspace"
					/>
				</div>
			</div>
			<BackgroundDecorative />
		</section>
	);
}

interface EyebrowProps {
	label: string;
	icon: React.ComponentType<{ className?: string }>;
}

const Eyebrow = ({ label, icon: Icon }: EyebrowProps) => (
	<Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
		<Icon className="size-3.5 mr-2" />
		{label}
	</Badge>
);

interface TitleProps {
	text: string;
}

const Title = ({ text }: TitleProps) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight leading-tight max-w-3xl">
		{text}
	</h1>
);

interface DescriptionProps {
	text: string;
}

const Description = ({ text }: DescriptionProps) => (
	<p className="text-lg @md:text-xl text-muted-foreground max-w-2xl">{text}</p>
);

interface CTAGroupProps {
	primary: { label: string; href: string };
	secondary: { label: string; href: string };
}

const CTAGroup = ({ primary, secondary }: CTAGroupProps) => (
	<div className="flex flex-wrap justify-center gap-4 mt-2">
		<Button size="lg" asChild className="gap-2">
			<Link href={primary.href}>
				{primary.label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
		<Button size="lg" variant="outline" asChild>
			<Link href={secondary.href}>{secondary.label}</Link>
		</Button>
	</div>
);

interface FeaturedImageProps {
	src: string;
	alt: string;
}

const FeaturedImage = ({ src, alt }: FeaturedImageProps) => (
	<div className="relative w-full aspect-video mt-8 @md:mt-12 rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 ring-1 ring-white/10">
		<Image src={src} alt={alt} fill className="object-cover" priority />
		<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
	</div>
);

const BackgroundDecorative = () => (
	<>
		<div className="absolute top-0 left-1/2 -translate-x-1/2 size-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
		<div className="absolute bottom-0 left-0 size-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
		<div className="absolute bottom-0 right-0 size-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
	</>
);
