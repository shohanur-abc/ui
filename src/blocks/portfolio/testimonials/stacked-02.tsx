'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Quote, ChevronUp, ChevronDown } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
}

export default function Main() {
	return (
		<section className="@container bg-muted/30">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Testimonials" />
					<Title text="Interactive Stack" />
					<Description text="Navigate through stacked testimonials." />
				</div>

				<InteractiveStack
					items={[
						{
							quote:
								'Working with this team transformed our digital presence completely.',
							author: 'Patricia Lane',
							role: 'CEO',
							company: 'TransformCo',
							avatar: 'https://i.pravatar.cc/100?img=78',
						},
						{
							quote: "The most professional agency we've ever partnered with.",
							author: 'Kevin Zhang',
							role: 'CTO',
							company: 'ProTech',
							avatar: 'https://i.pravatar.cc/100?img=79',
						},
						{
							quote:
								'Results exceeded our expectations by a significant margin.',
							author: 'Maria Santos',
							role: 'CMO',
							company: 'ExceedCorp',
							avatar: 'https://i.pravatar.cc/100?img=80',
						},
						{
							quote: 'Innovative solutions that actually solve real problems.',
							author: 'James Wilson',
							role: 'Founder',
							company: 'InnovateLab',
							avatar: 'https://i.pravatar.cc/100?img=1',
						},
						{
							quote: 'A true partner in our growth journey.',
							author: 'Emily Foster',
							role: 'VP Product',
							company: 'GrowthPro',
							avatar: 'https://i.pravatar.cc/100?img=2',
						},
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge>{text}</Badge>
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

const InteractiveStack = ({ items }: { items: TestimonialItem[] }) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const prev = () =>
		setActiveIndex((i) => (i === 0 ? items.length - 1 : i - 1));
	const next = () =>
		setActiveIndex((i) => (i === items.length - 1 ? 0 : i + 1));

	return (
		<div className="max-w-lg mx-auto">
			<div className="relative h-72 @md:h-80 mb-6">
				{items.map(({ quote, author, role, company, avatar }, i) => {
					const offset = i - activeIndex;
					const isVisible = Math.abs(offset) <= 2;

					if (!isVisible) return null;

					return (
						<div
							key={i}
							className="absolute inset-x-0 bg-background border rounded-2xl p-6 shadow-lg transition-all duration-500"
							style={{
								top: `${Math.abs(offset) * 12}px`,
								transform: `scale(${1 - Math.abs(offset) * 0.05})`,
								opacity: offset === 0 ? 1 : 0.5 - Math.abs(offset) * 0.15,
								zIndex: 10 - Math.abs(offset),
							}}
						>
							<Quote className="size-8 text-primary/20 mb-4" />
							<blockquote className="text-base @md:text-lg leading-relaxed mb-6">
								&ldquo;{quote}&rdquo;
							</blockquote>
							<div className="flex items-center gap-3">
								<Avatar className="size-11">
									<AvatarImage src={avatar} />
									<AvatarFallback className="bg-primary text-primary-foreground">
										{author[0]}
									</AvatarFallback>
								</Avatar>
								<div>
									<div className="font-semibold">{author}</div>
									<div className="text-sm text-muted-foreground">
										{role}, {company}
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<div className="flex justify-center gap-3">
				<Button variant="outline" size="icon" onClick={prev}>
					<ChevronUp className="size-4" />
				</Button>
				<div className="flex items-center gap-1.5">
					{items.map((_, i) => (
						<button
							key={i}
							onClick={() => setActiveIndex(i)}
							className={`size-2 rounded-full transition-colors ${i === activeIndex ? 'bg-primary' : 'bg-muted-foreground/30'}`}
						/>
					))}
				</div>
				<Button variant="outline" size="icon" onClick={next}>
					<ChevronDown className="size-4" />
				</Button>
			</div>
		</div>
	);
};
