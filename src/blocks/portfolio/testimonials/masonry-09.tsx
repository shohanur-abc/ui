'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Quote, CheckCircle2 } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	verified: boolean;
}

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Verified Reviews" />
					<Title text="Verified Masonry" />
					<Description text="Authenticated testimonials from real clients." />
				</div>

				<VerifiedMasonry
					items={[
						{
							quote:
								'Absolutely phenomenal work. The project was delivered ahead of schedule with exceptional quality.',
							author: 'Robert Chen',
							role: 'CEO',
							company: 'PhenomCo',
							avatar: 'https://i.pravatar.cc/100?img=36',
							verified: true,
						},
						{
							quote: '10/10 recommend!',
							author: 'Jennifer L.',
							role: 'CTO',
							company: 'TenTen',
							avatar: 'https://i.pravatar.cc/100?img=37',
							verified: true,
						},
						{
							quote: 'Professional team, outstanding results.',
							author: 'David Kim',
							role: 'CMO',
							company: 'ResultPro',
							avatar: 'https://i.pravatar.cc/100?img=38',
							verified: true,
						},
						{
							quote:
								'The best decision we made was partnering with this team. Our digital presence has transformed completely.',
							author: 'Amanda Wright',
							role: 'VP Marketing',
							company: 'TransformDigital',
							avatar: 'https://i.pravatar.cc/100?img=39',
							verified: true,
						},
						{
							quote: 'Highly skilled team.',
							author: 'Chris L.',
							role: 'PM',
							company: 'SkillPro',
							avatar: 'https://i.pravatar.cc/100?img=40',
							verified: true,
						},
						{
							quote: 'Outstanding communication.',
							author: 'Nicole B.',
							role: 'Lead',
							company: 'CommsPro',
							avatar: 'https://i.pravatar.cc/100?img=41',
							verified: true,
						},
						{
							quote: 'Creative solutions that work.',
							author: 'Daniel Kim',
							role: 'Director',
							company: 'SolutionLab',
							avatar: 'https://i.pravatar.cc/100?img=42',
							verified: true,
						},
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge variant="outline">{text}</Badge>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

const VerifiedMasonry = ({ items }: { items: TestimonialItem[] }) => (
	<div className="max-w-6xl mx-auto columns-1 @sm:columns-2 @lg:columns-3 @xl:columns-4 gap-4">
		{items.map(({ quote, author, role, company, avatar, verified }, i) => (
			<div key={i} className="break-inside-avoid mb-4">
				<div className="bg-card border rounded-xl p-5 shadow-sm hover:border-primary/50 transition-colors">
					<div className="flex items-center justify-between mb-3">
						<Quote className="size-5 text-primary/20" />
						{verified && (
							<div className="flex items-center gap-1 text-green-500 text-xs">
								<CheckCircle2 className="size-3.5" />
								<span>Verified</span>
							</div>
						)}
					</div>
					<blockquote className="text-sm leading-relaxed mb-4">
						&ldquo;{quote}&rdquo;
					</blockquote>
					<div className="flex items-center gap-2.5">
						<Avatar className="size-8">
							<AvatarImage src={avatar} />
							<AvatarFallback className="bg-primary text-primary-foreground text-xs">
								{author[0]}
							</AvatarFallback>
						</Avatar>
						<div>
							<div className="font-medium text-xs">{author}</div>
							<div className="text-xs text-muted-foreground">
								{role}, {company}
							</div>
						</div>
					</div>
				</div>
			</div>
		))}
	</div>
);
