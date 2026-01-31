import { ArrowRight, Check, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ContentProps {
	title: string;
	description: string;
	features: string[];
}

interface FormAreaProps {
	avatars: { src: string; fallback: string }[];
	subscriberCount: string;
	rating: string;
	placeholder: string;
	buttonText: string;
	buttonIcon?: React.ElementType;
}

const Content = ({ title, description, features }: ContentProps) => (
	<div className="flex flex-col gap-6">
		<h1 className="text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-bold tracking-tight leading-tight">{title}</h1>
		<p className="text-muted-foreground text-lg @md:text-xl max-w-xl">{description}</p>
		<ul className="grid @sm:grid-cols-2 gap-3">
			{features.map((feature, i) => (
				<li key={i} className="flex items-center gap-2 text-sm">
					<Check className="size-4 text-primary shrink-0" />
					<span>{feature}</span>
				</li>
			))}
		</ul>
	</div>
);

const FormArea = ({ avatars, subscriberCount, rating, placeholder, buttonText, buttonIcon: Icon }: FormAreaProps) => (
	<div className="flex flex-col gap-6 p-6 @md:p-8 rounded-2xl border bg-card">
		<div className="flex items-center gap-4">
			<div className="flex -space-x-2">
				{avatars.map((avatar, i) => (
					<Avatar key={i} className="size-10 border-2 border-card">
						<AvatarImage src={avatar.src} />
						<AvatarFallback>{avatar.fallback}</AvatarFallback>
					</Avatar>
				))}
			</div>
			<div className="text-sm">
				<div className="font-medium">{subscriberCount}</div>
				<div className="flex items-center gap-1 text-muted-foreground">
					<Star className="size-3 fill-primary text-primary" />
					<span>{rating}</span>
				</div>
			</div>
		</div>
		<form className="flex flex-col gap-3">
			<Input
				type="email"
				placeholder={placeholder}
				className="h-12"
			/>
			<Button size="lg" className="gap-2 w-full h-12">
				{buttonText}
				{Icon && <Icon className="size-4" />}
			</Button>
		</form>
		<p className="text-xs text-muted-foreground text-center">Free forever. No credit card required.</p>
	</div>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-24 @xl:py-32">
				<div className="grid @lg:grid-cols-2 gap-10 @lg:gap-16 items-center">
					<Content
						title="The newsletter for modern creators"
						description="Get weekly insights on design, development, and growing your online presence."
						features={[
							'Weekly curated content',
							'Exclusive interviews',
							'Practical tutorials',
							'Community access',
						]}
					/>
					<FormArea
						avatars={[
							{ src: 'https://i.pravatar.cc/100?img=1', fallback: 'JD' },
							{ src: 'https://i.pravatar.cc/100?img=2', fallback: 'AS' },
							{ src: 'https://i.pravatar.cc/100?img=3', fallback: 'MK' },
						]}
						subscriberCount="25,000+ subscribers"
						rating="4.9 rating"
						placeholder="Enter your email"
						buttonText="Subscribe Free"
						buttonIcon={ArrowRight}
					/>
				</div>
			</div>
		</section>
	);
}
