import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	avatar: string;
	initials: string;
}

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote: 'Perfect.',
			author: 'Rachel Chen',
			avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'RC',
		},
		{
			quote: 'Outstanding.',
			author: 'Sam Park',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'SP',
		},
		{
			quote: 'Incredible.',
			author: 'Tina Lee',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'TL',
		},
		{
			quote: 'Essential.',
			author: 'Uma Kim',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'UK',
		},
		{
			quote: 'Amazing.',
			author: 'Victor Foster',
			avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
			initials: 'VF',
		},
	];

	return (
		<section className="@container" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16">
				<div className="flex flex-wrap items-center justify-center gap-8">
					{testimonials.map((item, index) => (
						<div key={index} className="flex items-center gap-3 group">
							<Avatar className="size-10 ring-2 ring-border group-hover:ring-primary transition-colors">
								<AvatarImage src={item.avatar} alt={item.author} />
								<AvatarFallback className="bg-muted font-medium text-sm">
									{item.initials}
								</AvatarFallback>
							</Avatar>
							<div>
								<p className="text-sm font-medium text-foreground">"{item.quote}"</p>
								<p className="text-xs text-muted-foreground">{item.author}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
