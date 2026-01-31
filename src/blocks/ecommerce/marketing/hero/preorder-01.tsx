import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Bell, Clock, Sparkles, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: React.ElementType;
	text: string;
}) => (
	<Badge variant="secondary" className="gap-2">
		<Icon className="size-4" />
		{text}
	</Badge>
);

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
	<h1 className="text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-bold tracking-tight">
		{text} {highlight && <span className="text-primary">{highlight}</span>}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground max-w-xl">{text}</p>
);

const Countdown = ({
	items,
}: {
	items: { value: string; label: string }[];
}) => (
	<div className="flex gap-3">
		{items.map(({ value, label }, i) => (
			<div key={i} className="text-center">
				<div className="size-14 @md:size-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl @md:text-2xl">
					{value}
				</div>
				<p className="text-xs text-muted-foreground mt-1">{label}</p>
			</div>
		))}
	</div>
);

const NotifyForm = ({
	placeholder,
	buttonText,
}: {
	placeholder: string;
	buttonText: string;
}) => (
	<div className="flex gap-3 max-w-md">
		<Input placeholder={placeholder} type="email" className="flex-1" />
		<Button className="gap-2 shrink-0">
			<Bell className="size-4" />
			{buttonText}
		</Button>
	</div>
);

const Stats = ({ items }: { items: { value: string; label: string }[] }) => (
	<div className="flex gap-6">
		{items.map(({ value, label }, i) => (
			<div key={i}>
				<p className="text-2xl font-bold text-primary">{value}</p>
				<p className="text-sm text-muted-foreground">{label}</p>
			</div>
		))}
	</div>
);

const ProductPreview = ({ image, alt }: { image: string; alt: string }) => (
	<div className="relative aspect-square rounded-3xl overflow-hidden">
		<Image src={image} alt={alt} fill className="object-cover" />
		<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
		<Badge className="absolute top-6 left-6">Coming Soon</Badge>
		<div className="absolute bottom-6 inset-x-6 flex items-center justify-between">
			<div className="text-white">
				<p className="font-bold text-lg">Limited Edition</p>
				<p className="text-white/70">Only 500 pieces</p>
			</div>
			<Button size="icon" variant="secondary" className="rounded-full">
				<Eye className="size-5" />
			</Button>
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
					<div className="space-y-8">
						<Eyebrow icon={Clock} text="Launching Soon" />
						<Title text="Something Special is" highlight="Coming" />
						<Description text="Be the first to know when our exclusive new collection drops. Sign up for early access and receive a special launch discount." />
						<Countdown
							items={[
								{ value: '14', label: 'Days' },
								{ value: '08', label: 'Hours' },
								{ value: '32', label: 'Mins' },
								{ value: '45', label: 'Secs' },
							]}
						/>
						<NotifyForm placeholder="Enter your email" buttonText="Notify Me" />
						<Stats
							items={[
								{ value: '2.5K+', label: 'On Waitlist' },
								{ value: '500', label: 'Units Only' },
							]}
						/>
					</div>
					<ProductPreview
						image="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop"
						alt="Coming soon product"
					/>
				</div>
			</div>
		</section>
	);
}
