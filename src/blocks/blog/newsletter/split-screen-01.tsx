import { Mail, ArrowRight, Sparkles, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ImageProps {
	src: string;
	alt: string;
}

interface ContentProps {
	title: string;
	description: string;
}

interface FormProps {
	placeholder: string;
	buttonText: string;
	buttonIcon?: React.ElementType;
}

interface FeaturesProps {
	items: { icon: React.ElementType; text: string }[];
}

const NewsletterImage = ({ src, alt }: ImageProps) => (
	<div className="relative aspect-[4/3] @lg:aspect-auto @lg:h-full rounded-xl @lg:rounded-l-2xl @lg:rounded-r-none overflow-hidden bg-muted">
		<img
			src={src}
			alt={alt}
			className="absolute inset-0 w-full h-full object-cover"
		/>
		<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
	</div>
);

const Content = ({ title, description }: ContentProps) => (
	<div className="flex flex-col gap-3">
		<h2 className="text-2xl @md:text-3xl @xl:text-4xl font-bold tracking-tight">
			{title}
		</h2>
		<p className="text-muted-foreground text-sm @md:text-base">{description}</p>
	</div>
);

const Form = ({ placeholder, buttonText, buttonIcon: Icon }: FormProps) => (
	<form className="flex flex-col @sm:flex-row gap-3 w-full">
		<Input type="email" placeholder={placeholder} className="flex-1 h-11" />
		<Button size="lg" className="gap-2 h-11">
			{buttonText}
			{Icon && <Icon className="size-4" />}
		</Button>
	</form>
);

const Features = ({ items }: FeaturesProps) => (
	<div className="flex flex-wrap gap-4">
		{items.map((item, i) => {
			const Icon = item.icon;
			return (
				<div
					key={i}
					className="flex items-center gap-2 text-sm text-muted-foreground"
				>
					<Icon className="size-4 text-primary" />
					<span>{item.text}</span>
				</div>
			);
		})}
	</div>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-8 @lg:gap-0 rounded-2xl border bg-card overflow-hidden">
					<NewsletterImage
						src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80"
						alt="Newsletter preview"
					/>
					<div className="flex flex-col justify-center gap-6 p-6 @md:p-8 @xl:p-12">
						<Content
							title="Get insights that matter"
							description="Subscribe to our weekly newsletter and receive curated content on design, development, and technology."
						/>
						<Form
							placeholder="Enter your email"
							buttonText="Subscribe"
							buttonIcon={ArrowRight}
						/>
						<Features
							items={[
								{ icon: Sparkles, text: 'Weekly insights' },
								{ icon: Shield, text: 'No spam' },
								{ icon: Clock, text: 'Free forever' },
							]}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
