import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, MessageCircle, Star } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container min-h-screen" data-theme="slate">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center mb-10 @md:mb-14">
					<Eyebrow icon={MessageCircle} text="What People Say" />
					<Title text="Loved by Businesses Worldwide" />
					<Description text="Don&apos;t just take our word for it. See what our customers have to say about their experience." />
					<CTA
						items={[
							{ label: 'Start Your Story', href: '#start', icon: ArrowRight },
							{
								label: 'View All Reviews',
								href: '#reviews',
								variant: 'outline',
							},
						]}
					/>
				</div>
				<TestimonialGrid
					items={[
						{
							quote:
								'The best decision we made this year. ROI was visible within the first month.',
							author: 'Michael Chen',
							role: 'CFO, FinTech Pro',
							avatar: 'https://i.pravatar.cc/150?img=11',
							rating: 5,
						},
						{
							quote:
								'Support team is incredible. They helped us migrate 10 years of data seamlessly.',
							author: 'Emily Watson',
							role: 'CTO, DataFlow',
							avatar: 'https://i.pravatar.cc/150?img=23',
							rating: 5,
						},
						{
							quote:
								'Our team productivity increased by 200%. This tool pays for itself.',
							author: 'James Miller',
							role: 'VP Operations, ScaleUp',
							avatar: 'https://i.pravatar.cc/150?img=53',
							rating: 5,
						},
						{
							quote:
								'Finally, a platform that understands enterprise needs without enterprise complexity.',
							author: 'Lisa Park',
							role: 'Director, GlobalCorp',
							avatar: 'https://i.pravatar.cc/150?img=44',
							rating: 5,
						},
						{
							quote:
								'We evaluated 15 solutions. This was the clear winner in every category.',
							author: 'Robert Taylor',
							role: 'CEO, TechStart',
							avatar: 'https://i.pravatar.cc/150?img=68',
							rating: 5,
						},
						{
							quote:
								'Implementation was a breeze. We were up and running in under a week.',
							author: 'Amanda Lee',
							role: 'IT Manager, RetailPlus',
							avatar: 'https://i.pravatar.cc/150?img=29',
							rating: 5,
						},
					]}
				/>
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
	<Badge variant="outline" className="mb-4 @md:mb-6 gap-2 mx-auto">
		<Icon className="size-3.5" />
		<span>{text}</span>
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 max-w-3xl mx-auto">
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

const TestimonialGrid = ({
	items,
}: {
	items: {
		quote: string;
		author: string;
		role: string;
		avatar: string;
		rating: number;
	}[];
}) => (
	<div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
		{items.map(({ quote, author, role, avatar, rating }, i) => (
			<div
				key={i}
				className="bg-card border border-border rounded-xl p-5 @md:p-6 hover:shadow-lg hover:border-primary/30 transition-all"
			>
				<div className="flex gap-0.5 mb-3">
					{Array.from({ length: 5 }).map((_, j) => (
						<Star
							key={j}
							className={`size-4 ${j < rating ? 'text-primary fill-primary' : 'text-muted'}`}
						/>
					))}
				</div>
				<p className="text-sm @md:text-base mb-4 leading-relaxed">
					&ldquo;{quote}&rdquo;
				</p>
				<div className="flex items-center gap-3">
					<Avatar className="size-10">
						<AvatarImage src={avatar} />
						<AvatarFallback className="text-xs">
							{author
								.split(' ')
								.map((n) => n[0])
								.join('')}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-medium text-sm">{author}</p>
						<p className="text-xs text-muted-foreground">{role}</p>
					</div>
				</div>
			</div>
		))}
	</div>
);
