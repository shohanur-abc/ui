'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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
					<Eyebrow text="Testimonials" />
					<Title text="Inline Minimal" />
					<Description text="Clean inline testimonial format." />
				</div>

				<InlineMinimal
					items={[
						{
							quote:
								'Exceptional work quality and outstanding communication throughout the project.',
							author: 'James Wilson',
							role: 'CEO',
							company: 'TechStart',
							avatar: 'https://i.pravatar.cc/100?img=2',
						},
						{
							quote:
								'Best decision we made was partnering with this incredible team.',
							author: 'Emily Foster',
							role: 'CTO',
							company: 'CloudPro',
							avatar: 'https://i.pravatar.cc/100?img=3',
						},
						{
							quote:
								'Professional, creative, and reliable. Highly recommended to everyone.',
							author: 'Michael Park',
							role: 'CMO',
							company: 'GrowthCo',
							avatar: 'https://i.pravatar.cc/100?img=4',
						},
						{
							quote:
								'Transformed our digital presence completely in just a few months.',
							author: 'Lisa Chen',
							role: 'Founder',
							company: 'TransformLab',
							avatar: 'https://i.pravatar.cc/100?img=5',
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

const InlineMinimal = ({ items }: { items: TestimonialItem[] }) => (
	<div className="max-w-3xl mx-auto">
		<ul className="space-y-0">
			{items.map(({ quote, author, role, company, avatar }, i) => (
				<li key={i}>
					<div className="flex flex-col @md:flex-row @md:items-center gap-4 @md:gap-6 py-8">
						<div className="flex items-center gap-3 @md:w-48 flex-shrink-0">
							<Avatar className="size-10">
								<AvatarImage src={avatar} />
								<AvatarFallback className="bg-muted">
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
						<blockquote className="text-base @md:text-lg text-muted-foreground italic">
							&ldquo;{quote}&rdquo;
						</blockquote>
					</div>
					{i < items.length - 1 && <Separator />}
				</li>
			))}
		</ul>
	</div>
);
