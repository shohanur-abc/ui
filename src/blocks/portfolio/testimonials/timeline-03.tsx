'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Quote, Briefcase, Rocket, Award, Target, Zap } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	milestone: string;
	icon: React.ComponentType<{ className?: string }>;
}

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Milestones" />
					<Title text="Milestone Timeline" />
					<Description text="Key moments in our client success journey." />
				</div>

				<MilestoneTimeline
					items={[
						{
							quote:
								'First enterprise client signed. The journey began with this transformative project.',
							author: 'Richard Adams',
							role: 'CEO',
							company: 'EnterpriseCo',
							avatar: 'https://i.pravatar.cc/100?img=60',
							milestone: 'First Enterprise Deal',
							icon: Briefcase,
						},
						{
							quote:
								'Our startup client got acquired for $50M. Proud to be part of their journey.',
							author: 'Jennifer Lee',
							role: 'Founder',
							company: 'AcquiredStartup',
							avatar: 'https://i.pravatar.cc/100?img=61',
							milestone: 'Client Exit',
							icon: Rocket,
						},
						{
							quote:
								'Won best digital agency award partly due to this incredible project.',
							author: 'David Chen',
							role: 'CMO',
							company: 'AwardWinner',
							avatar: 'https://i.pravatar.cc/100?img=62',
							milestone: 'Industry Award',
							icon: Award,
						},
						{
							quote:
								'Helped our 100th client launch. Each one taught us something valuable.',
							author: 'Sarah Kim',
							role: 'CEO',
							company: 'Client100',
							avatar: 'https://i.pravatar.cc/100?img=63',
							milestone: '100th Client',
							icon: Target,
						},
						{
							quote:
								'The largest project in our history. 18 months of incredible teamwork.',
							author: 'Michael Torres',
							role: 'CTO',
							company: 'MegaProject',
							avatar: 'https://i.pravatar.cc/100?img=64',
							milestone: 'Biggest Project',
							icon: Zap,
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

const MilestoneTimeline = ({ items }: { items: TestimonialItem[] }) => (
	<div className="max-w-4xl mx-auto relative">
		<div className="absolute left-6 @md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

		<ol className="space-y-10">
			{items.map(
				(
					{ quote, author, role, company, avatar, milestone, icon: Icon },
					i,
				) => (
					<li key={i} className="relative flex gap-6 @md:gap-8">
						<div className="flex-shrink-0 size-12 @md:size-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground z-10 shadow-lg">
							<Icon className="size-5 @md:size-6" />
						</div>

						<div className="flex-1 bg-card border rounded-xl p-5 @md:p-6 shadow-sm">
							<Badge className="mb-3">{milestone}</Badge>
							<Quote className="size-5 text-primary/20 mb-2" />
							<blockquote className="text-sm @md:text-base leading-relaxed mb-4">
								&ldquo;{quote}&rdquo;
							</blockquote>
							<div className="flex items-center gap-3">
								<Avatar className="size-9">
									<AvatarImage src={avatar} />
									<AvatarFallback className="bg-muted">
										{author[0]}
									</AvatarFallback>
								</Avatar>
								<div>
									<div className="font-medium text-sm">{author}</div>
									<div className="text-xs text-muted-foreground">
										{role}, {company}
									</div>
								</div>
							</div>
						</div>
					</li>
				),
			)}
		</ol>
	</div>
);
