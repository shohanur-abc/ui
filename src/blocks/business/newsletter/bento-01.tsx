import { Mail, ArrowRight, Zap, BarChart3, Users, Shield, Sparkles, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface EyebrowProps {
	icon: React.ElementType;
	text: string;
}

interface TitleProps {
	text: string;
	highlight?: string;
}

interface DescriptionProps {
	text: string;
}

interface FormProps {
	placeholder: string;
	buttonText: string;
	buttonIcon?: React.ElementType;
}

interface FeatureCardProps {
	icon: React.ElementType;
	title: string;
	description: string;
}

interface StatsCardProps {
	value: string;
	label: string;
	icon: React.ElementType;
}

const Eyebrow = ({ icon: Icon, text }: EyebrowProps) => (
	<Badge variant="secondary" className="gap-1.5 px-3 py-1.5">
		<Icon className="size-3.5" />
		{text}
	</Badge>
);

const Title = ({ text, highlight }: TitleProps) => (
	<h2 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold tracking-tight">
		{text} {highlight && <span className="text-primary">{highlight}</span>}
	</h2>
);

const Description = ({ text }: DescriptionProps) => (
	<p className="text-muted-foreground text-sm @md:text-base leading-relaxed">{text}</p>
);

const Form = ({ placeholder, buttonText, buttonIcon: Icon }: FormProps) => (
	<form className="flex flex-col @sm:flex-row gap-3 w-full">
		<Input type="email" placeholder={placeholder} className="flex-1 h-12" />
		<Button size="lg" className="gap-2 h-12 px-6">
			{buttonText}
			{Icon && <Icon className="size-4" />}
		</Button>
	</form>
);

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
	<div className="flex flex-col gap-3 p-5 rounded-xl border bg-card hover:border-primary/30 transition-colors">
		<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
			<Icon className="size-5 text-primary" />
		</div>
		<span className="font-medium">{title}</span>
		<span className="text-xs text-muted-foreground leading-relaxed">{description}</span>
	</div>
);

const StatsCard = ({ value, label, icon: Icon }: StatsCardProps) => (
	<div className="flex items-center gap-3 p-4 rounded-xl border bg-card">
		<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
			<Icon className="size-5 text-primary" />
		</div>
		<div className="flex flex-col">
			<span className="text-xl font-bold">{value}</span>
			<span className="text-xs text-muted-foreground">{label}</span>
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container" data-theme="corporate">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid gap-6 @lg:grid-cols-3 @lg:grid-rows-[auto_auto_auto]">
					{/* Main newsletter card - spans 2 columns */}
					<div className="@lg:col-span-2 @lg:row-span-2 flex flex-col gap-6 p-6 @md:p-8 rounded-2xl border bg-card">
						<Eyebrow icon={Mail} text="Business Newsletter" />
						<Title text="Strategic insights for" highlight="growth-focused leaders" />
						<Description text="Join thousands of executives and entrepreneurs who receive our weekly newsletter packed with market analysis, growth strategies, and leadership insights." />
						<Form placeholder="Enter your work email" buttonText="Subscribe" buttonIcon={ArrowRight} />
					</div>

					{/* Stats cards */}
					<StatsCard value="25K+" label="Subscribers" icon={Users} />
					<StatsCard value="98%" label="Satisfaction" icon={TrendingUp} />

					{/* Feature cards */}
					<FeatureCard
						icon={BarChart3}
						title="Market Analysis"
						description="Weekly deep-dives into market trends and opportunities."
					/>
					<FeatureCard
						icon={Sparkles}
						title="Expert Insights"
						description="Curated perspectives from industry thought leaders."
					/>
					<FeatureCard
						icon={Shield}
						title="Privacy First"
						description="Your data is protected. Unsubscribe anytime."
					/>
				</div>
			</div>
		</section>
	);
}
