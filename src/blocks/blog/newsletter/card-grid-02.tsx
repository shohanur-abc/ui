import { Mail, ArrowUpRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface NewsletterCardProps {
	badge?: string;
	title: string;
	description: string;
	features: string[];
	placeholder: string;
	buttonText: string;
	featured?: boolean;
}

const NewsletterCard = ({
	badge,
	title,
	description,
	features,
	placeholder,
	buttonText,
	featured,
}: NewsletterCardProps) => (
	<Card
		className={`flex flex-col h-full ${featured ? 'border-primary shadow-lg' : ''}`}
	>
		<CardHeader>
			{badge && <Badge className="w-fit mb-2">{badge}</Badge>}
			<CardTitle className="text-xl">{title}</CardTitle>
			<CardDescription>{description}</CardDescription>
		</CardHeader>
		<CardContent className="flex-1">
			<ul className="space-y-2">
				{features.map((feature, i) => (
					<li key={i} className="flex items-start gap-2 text-sm">
						<Check className="size-4 text-primary shrink-0 mt-0.5" />
						<span>{feature}</span>
					</li>
				))}
			</ul>
		</CardContent>
		<CardFooter className="flex-col gap-3">
			<Input type="email" placeholder={placeholder} className="w-full h-10" />
			<Button className="w-full gap-2">
				{buttonText}
				<ArrowUpRight className="size-4" />
			</Button>
		</CardFooter>
	</Card>
);

interface TitleProps {
	text: string;
	subtitle: string;
}

const Title = ({ text, subtitle }: TitleProps) => (
	<div className="text-center flex flex-col gap-3 max-w-2xl mx-auto">
		<h2 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold tracking-tight">
			{text}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg">{subtitle}</p>
	</div>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="flex flex-col gap-10">
					<Title
						text="Choose your newsletter"
						subtitle="Select the newsletter that best fits your interests and goals."
					/>
					<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6">
						<NewsletterCard
							title="Weekly Digest"
							description="A curated summary of the week's best content."
							features={[
								'Weekly email every Sunday',
								'Top 5 articles of the week',
								'Industry news roundup',
							]}
							placeholder="Email address"
							buttonText="Subscribe"
						/>
						<NewsletterCard
							badge="Most Popular"
							title="Daily Insights"
							description="Start each day with valuable insights."
							features={[
								'Daily email every morning',
								'Actionable tips and tricks',
								'Exclusive subscriber content',
								'Early access to features',
							]}
							placeholder="Email address"
							buttonText="Subscribe"
							featured
						/>
						<NewsletterCard
							title="Monthly Deep Dive"
							description="In-depth analysis and comprehensive guides."
							features={[
								'Monthly comprehensive guide',
								'Expert interviews',
								'Case studies',
							]}
							placeholder="Email address"
							buttonText="Subscribe"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
