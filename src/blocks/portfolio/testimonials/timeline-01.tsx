'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Quote } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	date: string;
}

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Client Journey" />
					<Title text="Project Timeline" />
					<Description text="Testimonials from clients throughout our journey." />
				</div>

				<Timeline
					items={[
						{
							quote:
								'Our first project together set the foundation for a long partnership. The website launch was flawless.',
							author: 'James Mitchell',
							role: 'Founder',
							company: 'StartupOne',
							avatar: 'https://i.pravatar.cc/100?img=51',
							date: '2021',
						},
						{
							quote:
								'Second year, second major project. The mobile app exceeded all our expectations.',
							author: 'Anna Rodriguez',
							role: 'CEO',
							company: 'MobileFirst',
							avatar: 'https://i.pravatar.cc/100?img=52',
							date: '2022',
						},
						{
							quote:
								'The enterprise dashboard transformed how we work. Efficiency increased by 200%.',
							author: 'Robert Lee',
							role: 'CTO',
							company: 'EnterpriseCo',
							avatar: 'https://i.pravatar.cc/100?img=53',
							date: '2023',
						},
						{
							quote:
								'Our AI-powered platform launch was a huge success. Looking forward to more projects.',
							author: 'Sarah Chen',
							role: 'VP Product',
							company: 'AITech',
							avatar: 'https://i.pravatar.cc/100?img=54',
							date: '2024',
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

const Timeline = ({ items }: { items: TestimonialItem[] }) => (
	<div className="max-w-3xl mx-auto relative">
		<div className="absolute left-4 @md:left-1/2 top-0 bottom-0 w-0.5 bg-border" />

		<ol className="space-y-12">
			{items.map(({ quote, author, role, company, avatar, date }, i) => (
				<li
					key={i}
					className={`relative flex flex-col @md:flex-row ${i % 2 === 0 ? '@md:flex-row-reverse' : ''} items-start gap-8`}
				>
					<div className="absolute left-4 @md:left-1/2 -translate-x-1/2 size-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold z-10">
						{date.slice(2)}
					</div>

					<div
						className={`flex-1 ml-12 @md:ml-0 ${i % 2 === 0 ? '@md:pl-12' : '@md:pr-12'}`}
					>
						<div className="bg-card border rounded-xl p-6 shadow-sm">
							<Badge className="mb-3">{date}</Badge>
							<Quote className="size-6 text-primary/20 mb-3" />
							<blockquote className="text-sm @md:text-base leading-relaxed mb-4">
								&ldquo;{quote}&rdquo;
							</blockquote>
							<div className="flex items-center gap-3">
								<Avatar className="size-10">
									<AvatarImage src={avatar} />
									<AvatarFallback className="bg-primary text-primary-foreground">
										{author[0]}
									</AvatarFallback>
								</Avatar>
								<div>
									<div className="font-semibold text-sm">{author}</div>
									<div className="text-xs text-muted-foreground">
										{role}, {company}
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="hidden @md:block flex-1" />
				</li>
			))}
		</ol>
	</div>
);
