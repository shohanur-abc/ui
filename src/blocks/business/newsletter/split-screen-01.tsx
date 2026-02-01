import { ArrowRight, Sparkles, Shield, Clock, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ImageProps {
	src: string;
	alt: string;
}

interface EyebrowProps {
	icon: React.ElementType;
	text: string;
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
	items: { icon: React.ElementType; title: string; description: string }[];
}

const NewsletterImage = ({ src, alt }: ImageProps) => (
	<div className="relative aspect-4/3 @lg:aspect-auto @lg:h-full rounded-xl @lg:rounded-none overflow-hidden bg-muted">
		<img
			src={src}
			alt={alt}
			className="absolute inset-0 w-full h-full object-cover"
		/>
		<div className="absolute inset-0 bg-linear-to-t @lg:bg-linear-to-r from-background/90 via-background/50 to-transparent" />
		<GradientDecorative />
	</div>
);

const GradientDecorative = () => (
	<div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-transparent opacity-60" />
);

const Eyebrow = ({ icon: Icon, text }: EyebrowProps) => (
	<div className="inline-flex items-center gap-2 text-sm text-primary font-medium">
		<Icon className="size-4" />
		<span>{text}</span>
	</div>
);

const Content = ({ title, description }: ContentProps) => (
	<div className="flex flex-col gap-3">
		<h2 className="text-2xl @md:text-3xl @xl:text-4xl font-bold tracking-tight">
			{title}
		</h2>
		<p className="text-muted-foreground text-sm @md:text-base max-w-md">
			{description}
		</p>
	</div>
);

const Form = ({ placeholder, buttonText, buttonIcon: Icon }: FormProps) => (
	<form className="flex flex-col @sm:flex-row gap-3 w-full max-w-md">
		<Input type="email" placeholder={placeholder} className="flex-1 h-12" />
		<Button size="lg" className="gap-2 h-12 px-6">
			{buttonText}
			{Icon && <Icon className="size-4" />}
		</Button>
	</form>
);

const Features = ({ items }: FeaturesProps) => (
	<div className="grid gap-4">
		{items.map((item, i) => {
			const Icon = item.icon;
			return (
				<div key={i} className="flex items-start gap-3">
					<div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
						<Icon className="size-4 text-primary" />
					</div>
					<div className="flex flex-col gap-0.5">
						<span className="text-sm font-medium">{item.title}</span>
						<span className="text-xs text-muted-foreground">
							{item.description}
						</span>
					</div>
				</div>
			);
		})}
	</div>
);

export default function Main() {
	return (
		<section className="@container" data-theme="corporate">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-8 @lg:gap-0 rounded-2xl border bg-card overflow-hidden">
					<NewsletterImage
						src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
						alt="Business analytics dashboard"
					/>
					<div className="flex flex-col justify-center gap-6 p-6 @md:p-8 @xl:p-12">
						<Eyebrow icon={BarChart3} text="Business Intelligence" />
						<Content
							title="Data-driven insights for modern leaders"
							description="Get exclusive market analysis, growth strategies, and leadership insights delivered to your inbox weekly."
						/>
						<Form
							placeholder="Enter your work email"
							buttonText="Subscribe"
							buttonIcon={ArrowRight}
						/>
						<Features
							items={[
								{
									icon: Sparkles,
									title: 'Curated Content',
									description: 'Hand-picked insights from industry experts',
								},
								{
									icon: Shield,
									title: 'Privacy First',
									description: 'Your data stays protected, always',
								},
								{
									icon: Clock,
									title: 'Weekly Digest',
									description: 'One email per week, packed with value',
								},
							]}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
