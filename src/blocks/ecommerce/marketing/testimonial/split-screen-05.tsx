import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PanelRight, Quote, Star } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
}

interface CompanyLogo {
	name: string;
	initials: string;
}

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex gap-0.5 mb-4">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-5 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const LogoWall = ({ logos }: { logos: CompanyLogo[] }) => (
	<div className="h-full flex flex-col justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-card rounded-2xl p-8 @lg:p-12">
		<p className="text-sm font-medium text-muted-foreground mb-6 text-center">
			Trusted by industry leaders
		</p>
		<div className="grid grid-cols-3 gap-4">
			{logos.map((logo, index) => (
				<div
					key={index}
					className="aspect-square rounded-xl bg-card border border-border/50 flex items-center justify-center hover:border-primary/30 transition-colors"
				>
					<span className="font-bold text-xl text-muted-foreground">{logo.initials}</span>
				</div>
			))}
		</div>
		<div className="mt-8 text-center">
			<p className="text-3xl font-bold text-primary">500+</p>
			<p className="text-sm text-muted-foreground">Companies worldwide</p>
		</div>
	</div>
);

const TestimonialsStack = ({ testimonials }: { testimonials: TestimonialItem[] }) => (
	<div className="space-y-4">
		<div className="mb-8">
			<Badge variant="outline" className="mb-4 gap-2 border-primary/30">
				<PanelRight className="size-3 text-primary" />
				Client Reviews
			</Badge>
			<h2 className="text-3xl @sm:text-4xl font-bold tracking-tight">
				What Our <span className="text-primary">Clients Say</span>
			</h2>
		</div>
		{testimonials.map((item, index) => (
			<Card
				key={index}
				className="border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group"
			>
				<CardContent className="p-5">
					<div className="flex gap-4">
						<Avatar className="size-12 shrink-0 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
							<AvatarImage src={item.avatar} alt={item.author} />
							<AvatarFallback className="bg-primary/10 text-primary font-semibold">
								{item.initials}
							</AvatarFallback>
						</Avatar>
						<div className="flex-1">
							<div className="flex items-center justify-between mb-2">
								<div>
									<p className="font-semibold text-foreground">{item.author}</p>
									<p className="text-xs text-muted-foreground">
										{item.role} · {item.company}
									</p>
								</div>
								<Quote className="size-6 text-primary/20 shrink-0" />
							</div>
							<StarRating rating={item.rating} />
							<p className="text-foreground leading-relaxed">"{item.quote}"</p>
						</div>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

export default function Main() {
	const logos: CompanyLogo[] = [
		{ name: 'TechCorp', initials: 'TC' },
		{ name: 'DataFlow', initials: 'DF' },
		{ name: 'CloudSync', initials: 'CS' },
		{ name: 'InnovateLab', initials: 'IL' },
		{ name: 'ScalePro', initials: 'SP' },
		{ name: 'GrowthHub', initials: 'GH' },
	];

	const testimonials: TestimonialItem[] = [
		{
			quote:
				'Implementation was faster than expected. The team was incredibly helpful throughout.',
			author: 'Isabel Chen',
			role: 'CTO',
			company: 'TechCorp',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'IC',
			rating: 5,
		},
		{
			quote:
				'The ROI was visible within weeks. Exceptional value for our investment.',
			author: 'James Brown',
			role: 'CFO',
			company: 'DataFlow',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'JB',
			rating: 5,
		},
		{
			quote:
				'Our team productivity increased by 35%. The platform just works.',
			author: 'Kira Patel',
			role: 'Operations',
			company: 'CloudSync',
			avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'KP',
			rating: 5,
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid grid-cols-1 @lg:grid-cols-5 gap-8 @lg:gap-12">
					<div className="@lg:col-span-2">
						<LogoWall logos={logos} />
					</div>
					<div className="@lg:col-span-3">
						<TestimonialsStack testimonials={testimonials} />
					</div>
				</div>
			</div>
		</section>
	);
}
