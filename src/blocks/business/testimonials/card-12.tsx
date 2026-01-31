import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Crown, Quote, Shield } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	tier: 'platinum' | 'gold' | 'silver';
}

export default function Main() {
	return (
		<section className="@container" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Elite Partnership" />
					<Title text="Premium Client Voices" />
					<Description text="Insights from our most valued enterprise partners." />
				</div>

				<TestimonialCard
					quote="As a platinum partner, we've had access to their top-tier services. The dedicated team, priority support, and strategic guidance have been invaluable to our growth."
					author="Richard Sterling"
					role="Chairman"
					company="Sterling Global"
					avatar="https://i.pravatar.cc/100?img=52"
					tier="platinum"
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge className="gap-1.5 bg-gradient-to-r from-primary to-accent">
			<Crown className="size-3" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground max-w-2xl mx-auto">
		{text}
	</p>
);

const TierBadge = ({ tier }: { tier: 'platinum' | 'gold' | 'silver' }) => {
	const tierConfig = {
		platinum: {
			label: 'Platinum Partner',
			className: 'bg-gradient-to-r from-slate-600 to-slate-400 text-white',
		},
		gold: {
			label: 'Gold Partner',
			className: 'bg-gradient-to-r from-amber-600 to-amber-400 text-white',
		},
		silver: {
			label: 'Silver Partner',
			className: 'bg-gradient-to-r from-gray-500 to-gray-300 text-white',
		},
	};

	return (
		<Badge className={`gap-1.5 ${tierConfig[tier].className}`}>
			<Shield className="size-3" />
			{tierConfig[tier].label}
		</Badge>
	);
};

const TestimonialCard = ({
	quote,
	author,
	role,
	company,
	avatar,
	tier,
}: TestimonialItem) => (
	<Card className="max-w-3xl mx-auto border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
		<CardContent className="p-8 @md:p-12">
			<div className="flex justify-between items-start mb-6">
				<Quote className="size-12 text-primary/20" />
				<TierBadge tier={tier} />
			</div>
			<blockquote className="text-lg @md:text-xl @lg:text-2xl leading-relaxed mb-8">
				&ldquo;{quote}&rdquo;
			</blockquote>
			<div className="flex items-center gap-4 pt-6 border-t border-primary/20">
				<Avatar className="size-16 ring-4 ring-primary/20 shadow-lg">
					<AvatarImage src={avatar} alt={author} />
					<AvatarFallback className="bg-primary text-primary-foreground text-lg">
						{author
							.split(' ')
							.map((n) => n[0])
							.join('')}
					</AvatarFallback>
				</Avatar>
				<div>
					<div className="font-bold text-lg @md:text-xl">{author}</div>
					<div className="text-sm text-muted-foreground">{role}</div>
					<div className="text-sm text-primary font-semibold">{company}</div>
				</div>
			</div>
		</CardContent>
	</Card>
);
