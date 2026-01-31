'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Quote, Star, Building2 } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	rating: number;
	companyLogo?: string;
}

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Enterprise" />
					<Title text="Featured 10" />
					<Description text="Enterprise client spotlight testimonial." />
				</div>

				<EnterpriseFeatured
					item={{
						quote:
							'As a Fortune 500 company, we have strict requirements for quality, security, and scalability. This team met every single one and then exceeded our expectations. The project has been transformational for our digital strategy.',
						author: 'Patricia Lane',
						role: 'Chief Technology Officer',
						company: 'Fortune 500 Corporation',
						avatar: 'https://i.pravatar.cc/100?img=20',
						rating: 5,
					}}
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

const EnterpriseFeatured = ({ item }: { item: TestimonialItem }) => (
	<div className="max-w-4xl mx-auto">
		<div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-8 @md:p-12 shadow-2xl relative overflow-hidden">
			<div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
			<div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-2xl" />

			<div className="relative">
				<div className="flex items-center gap-3 mb-8">
					<div className="size-12 rounded-lg bg-white/10 flex items-center justify-center">
						<Building2 className="size-6" />
					</div>
					<div>
						<div className="font-semibold">{item.company}</div>
						<Badge
							variant="secondary"
							className="bg-white/10 text-white border-0 mt-1"
						>
							Enterprise Client
						</Badge>
					</div>
				</div>

				<div className="flex gap-0.5 mb-6">
					{Array.from({ length: 5 }).map((_, j) => (
						<Star
							key={j}
							className={`size-6 ${j < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/30'}`}
						/>
					))}
				</div>

				<Quote className="size-12 text-white/20 mb-6" />

				<blockquote className="text-xl @md:text-2xl @lg:text-3xl font-medium leading-relaxed mb-10">
					&ldquo;{item.quote}&rdquo;
				</blockquote>

				<div className="flex items-center gap-4">
					<Avatar className="size-16 ring-4 ring-white/20">
						<AvatarImage src={item.avatar} />
						<AvatarFallback className="bg-primary text-primary-foreground text-xl">
							{item.author[0]}
						</AvatarFallback>
					</Avatar>
					<div>
						<div className="font-bold text-xl">{item.author}</div>
						<div className="text-white/70">{item.role}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
);
