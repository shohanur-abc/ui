import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Users, Star, Award, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

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

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight text-center">
		{text}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
		{text}
	</p>
);

const SocialProof = ({
	stats,
}: {
	stats: { value: string; label: string }[];
}) => (
	<div className="flex justify-center gap-8 @md:gap-12">
		{stats.map(({ value, label }, i) => (
			<div key={i} className="text-center">
				<div className="text-3xl @md:text-4xl font-bold text-primary">
					{value}
				</div>
				<div className="text-sm text-muted-foreground">{label}</div>
			</div>
		))}
	</div>
);

const Testimonials = ({
	items,
}: {
	items: { avatar: string; name: string; rating: number; text: string }[];
}) => (
	<div className="grid @md:grid-cols-3 gap-6">
		{items.map((item, i) => (
			<div key={i} className="rounded-2xl border bg-card p-6">
				<div className="flex items-center gap-3 mb-4">
					<Avatar>
						<AvatarImage src={item.avatar} />
						<AvatarFallback>{item.name[0]}</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-medium">{item.name}</p>
						<div className="flex">
							{Array.from({ length: 5 }).map((_, j) => (
								<Star
									key={j}
									className={`size-3 ${j < item.rating ? 'fill-primary text-primary' : 'text-muted'}`}
								/>
							))}
						</div>
					</div>
				</div>
				<p className="text-sm text-muted-foreground">{item.text}</p>
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
		icon?: React.ElementType;
		variant?: 'default' | 'outline';
	}[];
}) => (
	<div className="flex flex-wrap justify-center gap-4">
		{items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
			<Button key={i} size="lg" variant={variant} className="gap-2" asChild>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-5" />}
				</Link>
			</Button>
		))}
	</div>
);

const CustomerAvatars = ({
	avatars,
}: {
	avatars: { src: string; fallback: string }[];
}) => (
	<div className="flex justify-center -space-x-3 mb-4">
		{avatars.map((avatar, i) => (
			<Avatar key={i} className="size-10 border-2 border-background">
				<AvatarImage src={avatar.src} />
				<AvatarFallback>{avatar.fallback}</AvatarFallback>
			</Avatar>
		))}
		<div className="size-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold border-2 border-background">
			+50K
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 space-y-12">
				<div className="text-center space-y-6">
					<CustomerAvatars
						avatars={[
							{ src: 'https://i.pravatar.cc/150?img=1', fallback: 'JD' },
							{ src: 'https://i.pravatar.cc/150?img=2', fallback: 'AS' },
							{ src: 'https://i.pravatar.cc/150?img=3', fallback: 'MK' },
							{ src: 'https://i.pravatar.cc/150?img=4', fallback: 'RL' },
							{ src: 'https://i.pravatar.cc/150?img=5', fallback: 'TW' },
						]}
					/>
					<Eyebrow icon={Heart} text="Loved by Thousands" />
					<Title text="See Why Customers Love Us" />
					<Description text="Join over 50,000 happy customers who have transformed their style with us. Real reviews from real people." />
				</div>
				<SocialProof
					stats={[
						{ value: '4.9', label: 'Average Rating' },
						{ value: '50K+', label: 'Happy Customers' },
						{ value: '98%', label: 'Would Recommend' },
					]}
				/>
				<Testimonials
					items={[
						{
							avatar: 'https://i.pravatar.cc/150?img=10',
							name: 'Sarah K.',
							rating: 5,
							text: 'Best online shopping experience! The quality is amazing and shipping was super fast.',
						},
						{
							avatar: 'https://i.pravatar.cc/150?img=11',
							name: 'Michael R.',
							rating: 5,
							text: "I've been a customer for years. The styles are always on-trend and the customer service is top-notch.",
						},
						{
							avatar: 'https://i.pravatar.cc/150?img=12',
							name: 'Emma L.',
							rating: 5,
							text: 'Love the sustainable options! Finally a brand that cares about the planet and still looks great.',
						},
					]}
				/>
				<CTA
					items={[
						{ label: 'Shop Now', href: '/shop', icon: ArrowRight },
						{
							label: 'Read More Reviews',
							href: '/reviews',
							variant: 'outline',
						},
					]}
				/>
			</div>
		</section>
	);
}
