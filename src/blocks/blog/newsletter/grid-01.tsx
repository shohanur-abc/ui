import { Mail, Send, Sparkles, Zap, Star, Heart, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
	badge: string;
	title: string;
	description: string;
}

interface FeatureCardProps {
	icon: React.ElementType;
	title: string;
	description: string;
}

interface FormProps {
	placeholder: string;
	buttonText: string;
	buttonIcon?: React.ElementType;
}

const Header = ({ badge, title, description }: HeaderProps) => (
	<div className="text-center flex flex-col gap-4 max-w-2xl mx-auto">
		<Badge variant="outline" className="w-fit mx-auto gap-1.5">
			<Sparkles className="size-3" />
			{badge}
		</Badge>
		<h2 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold tracking-tight">
			{title}
		</h2>
		<p className="text-muted-foreground">{description}</p>
	</div>
);

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
	<Card className="text-center group transition-all hover:shadow-md">
		<CardContent className="flex flex-col items-center gap-3 p-5">
			<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/20">
				<Icon className="size-6 text-primary" />
			</div>
			<h3 className="font-semibold">{title}</h3>
			<p className="text-sm text-muted-foreground">{description}</p>
		</CardContent>
	</Card>
);

const Form = ({ placeholder, buttonText, buttonIcon: Icon }: FormProps) => (
	<form className="flex flex-col @sm:flex-row gap-3 max-w-md mx-auto w-full">
		<Input type="email" placeholder={placeholder} className="flex-1 h-11" />
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
				<div className="flex flex-col gap-10">
					<Header
						badge="Newsletter"
						title="What makes our newsletter special"
						description="Join thousands of subscribers who receive valuable insights every week."
					/>
					<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4">
						<FeatureCard
							icon={Zap}
							title="Weekly Updates"
							description="Fresh content delivered every week."
						/>
						<FeatureCard
							icon={Star}
							title="Expert Insights"
							description="Learn from industry professionals."
						/>
						<FeatureCard
							icon={Heart}
							title="Community"
							description="Join a growing community of readers."
						/>
						<FeatureCard
							icon={Target}
							title="Actionable Tips"
							description="Practical advice you can use today."
						/>
					</div>
					<Form
						placeholder="Enter your email"
						buttonText="Subscribe"
						buttonIcon={Send}
					/>
				</div>
			</div>
		</section>
	);
}
