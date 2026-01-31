import { Bookmark, Send, TrendingUp, BookOpen, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface ContentProps {
	badge: string;
	title: string;
	description: string;
}

interface TopicsProps {
	items: { icon: React.ElementType; label: string }[];
}

interface FormProps {
	placeholder: string;
	buttonText: string;
	buttonIcon?: React.ElementType;
}

const DecorativePattern = () => (
	<div className="absolute inset-0 opacity-10">
		<svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
			<defs>
				<pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
					<path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
				</pattern>
			</defs>
			<rect width="100" height="100" fill="url(#grid)" />
		</svg>
	</div>
);

const Content = ({ badge, title, description }: ContentProps) => (
	<div className="flex flex-col gap-4">
		<Badge variant="outline" className="w-fit gap-1.5">
			<Bookmark className="size-3" />
			{badge}
		</Badge>
		<h2 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold tracking-tight">{title}</h2>
		<p className="text-muted-foreground">{description}</p>
	</div>
);

const Topics = ({ items }: TopicsProps) => (
	<div className="flex flex-wrap gap-2">
		{items.map((item, i) => {
			const Icon = item.icon;
			return (
				<Badge key={i} variant="secondary" className="gap-1.5 px-3 py-1.5">
					<Icon className="size-3.5" />
					{item.label}
				</Badge>
			);
		})}
	</div>
);

const Form = ({ placeholder, buttonText, buttonIcon: Icon }: FormProps) => (
	<form className="flex flex-col @sm:flex-row gap-3 w-full">
		<Input
			type="email"
			placeholder={placeholder}
			className="flex-1 h-11"
		/>
		<Button size="lg" className="gap-2 h-11">
			{buttonText}
			{Icon && <Icon className="size-4" />}
		</Button>
	</form>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12 items-center">
					<div className="flex flex-col gap-6">
						<Content
							badge="Weekly Digest"
							title="Curated content for curious minds"
							description="Every week, we handpick the best articles, tutorials, and resources to help you stay ahead in the industry."
						/>
						<Topics
							items={[
								{ icon: TrendingUp, label: 'Trends' },
								{ icon: BookOpen, label: 'Tutorials' },
								{ icon: Lightbulb, label: 'Insights' },
							]}
						/>
					</div>
					<div className="relative p-6 @md:p-8 rounded-2xl border bg-card overflow-hidden">
						<DecorativePattern />
						<div className="relative flex flex-col gap-4">
							<h3 className="text-lg font-semibold">Subscribe to the newsletter</h3>
							<Form
								placeholder="you@example.com"
								buttonText="Subscribe"
								buttonIcon={Send}
							/>
							<p className="text-xs text-muted-foreground">
								Join 15,000+ subscribers. Unsubscribe anytime.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
