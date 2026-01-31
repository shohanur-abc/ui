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
}

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Reviews" />
					<Title text="Fan Stack" />
					<Description text="Fanned out cards for a creative display." />
				</div>

				<FanStack
					items={[
						{
							quote: 'Creative excellence and technical mastery combined.',
							author: 'Nicole Brown',
							role: 'Design Director',
							company: 'CreativeCo',
							avatar: 'https://i.pravatar.cc/100?img=3',
						},
						{
							quote: "Best ROI we've seen from any digital investment.",
							author: 'Daniel Kim',
							role: 'CFO',
							company: 'ROICorp',
							avatar: 'https://i.pravatar.cc/100?img=4',
						},
						{
							quote: 'Turned our vision into a stunning reality.',
							author: 'Amanda Wright',
							role: 'CEO',
							company: 'VisionTech',
							avatar: 'https://i.pravatar.cc/100?img=5',
						},
						{
							quote: 'Exceptional quality and outstanding support.',
							author: 'Christopher Lee',
							role: 'CTO',
							company: 'QualityFirst',
							avatar: 'https://i.pravatar.cc/100?img=6',
						},
						{
							quote: 'A partnership that continues to deliver value.',
							author: 'Jennifer Park',
							role: 'VP Marketing',
							company: 'ValueCo',
							avatar: 'https://i.pravatar.cc/100?img=7',
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

const FanStack = ({ items }: { items: TestimonialItem[] }) => (
	<div className="max-w-xl mx-auto relative h-96 flex items-center justify-center">
		{items.map(({ quote, author, role, company, avatar }, i) => {
			const rotation = (i - Math.floor(items.length / 2)) * 8;
			const translateY = Math.abs(i - Math.floor(items.length / 2)) * 20;

			return (
				<div
					key={i}
					className="absolute w-72 @md:w-80 bg-card border rounded-2xl p-5 shadow-lg transition-all duration-300 hover:z-20 hover:scale-105 cursor-pointer"
					style={{
						transform: `rotate(${rotation}deg) translateY(${translateY}px)`,
						zIndex: items.length - Math.abs(i - Math.floor(items.length / 2)),
						transformOrigin: 'bottom center',
					}}
				>
					<Quote className="size-6 text-primary/20 mb-3" />
					<blockquote className="text-sm leading-relaxed mb-4">
						&ldquo;{quote}&rdquo;
					</blockquote>
					<div className="flex items-center gap-2.5">
						<Avatar className="size-9">
							<AvatarImage src={avatar} />
							<AvatarFallback className="bg-primary text-primary-foreground">
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
			);
		})}
	</div>
);
