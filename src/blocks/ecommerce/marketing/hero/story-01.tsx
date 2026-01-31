import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingBag, Award, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Eyebrow = ({ text }: { text: string }) => (
	<Badge variant="outline" className="border-primary/50 text-primary">
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
		{text}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground">{text}</p>
);

const Timeline = ({
	items,
}: {
	items: { year: string; title: string; description: string }[];
}) => (
	<div className="space-y-6">
		{items.map(({ year, title, description }, i) => (
			<div key={i} className="flex gap-4">
				<div className="flex flex-col items-center">
					<div className="size-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
						{year}
					</div>
					{i < items.length - 1 && (
						<div className="w-0.5 flex-1 bg-border mt-2" />
					)}
				</div>
				<div className="pb-6">
					<h3 className="font-semibold">{title}</h3>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
			</div>
		))}
	</div>
);

const Stats = ({
	items,
}: {
	items: { icon: React.ElementType; value: string; label: string }[];
}) => (
	<div className="grid grid-cols-2 gap-4">
		{items.map(({ icon: Icon, value, label }, i) => (
			<div key={i} className="rounded-xl border bg-card p-4 text-center">
				<Icon className="size-6 text-primary mx-auto mb-2" />
				<div className="text-2xl font-bold">{value}</div>
				<div className="text-xs text-muted-foreground">{label}</div>
			</div>
		))}
	</div>
);

const CTA = ({ label, href }: { label: string; href: string }) => (
	<Button size="lg" className="gap-2" asChild>
		<Link href={href}>
			{label}
			<ArrowRight className="size-5" />
		</Link>
	</Button>
);

const FounderImage = ({
	src,
	alt,
	name,
	role,
}: {
	src: string;
	alt: string;
	name: string;
	role: string;
}) => (
	<div className="relative">
		<div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
			<Image src={src} alt={alt} fill className="object-cover" />
			<div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
		</div>
		<div className="absolute bottom-6 left-6 right-6">
			<p className="font-bold text-lg">{name}</p>
			<p className="text-sm text-muted-foreground">{role}</p>
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
					<div className="space-y-8">
						<Eyebrow text="Our Story" />
						<Title text="From Passion to Purpose" />
						<Description text="What started as a small dream in a garage has grown into a global brand loved by millions. Our journey is built on quality, integrity, and a relentless pursuit of excellence." />
						<Timeline
							items={[
								{
									year: "'15",
									title: 'The Beginning',
									description: 'Started in a small garage with a vision',
								},
								{
									year: "'18",
									title: 'First Store',
									description: 'Opened our flagship location',
								},
								{
									year: "'22",
									title: 'Global Reach',
									description: 'Expanded to 50+ countries',
								},
								{
									year: "'26",
									title: 'Today',
									description: 'Serving millions of happy customers',
								},
							]}
						/>
						<Stats
							items={[
								{ icon: Users, value: '5M+', label: 'Customers' },
								{ icon: ShoppingBag, value: '10M+', label: 'Orders' },
								{ icon: Award, value: '50+', label: 'Awards' },
								{ icon: Clock, value: '10+', label: 'Years' },
							]}
						/>
						<CTA label="Learn More About Us" href="/about" />
					</div>
					<FounderImage
						src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=750&fit=crop"
						alt="Founder"
						name="John Williams"
						role="Founder & CEO"
					/>
				</div>
			</div>
		</section>
	);
}
