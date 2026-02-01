import { Zap, Send, Users, FileText, TrendingUp, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

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

interface StatsProps {
	items: { icon: React.ElementType; value: string; label: string }[];
}

interface TrustBadgesProps {
	items: { icon: React.ElementType; text: string }[];
}

const Eyebrow = ({ icon: Icon, text }: EyebrowProps) => (
	<div className="inline-flex items-center gap-2 text-sm text-primary font-medium">
		<div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
			<Icon className="size-4" />
		</div>
		<span>{text}</span>
	</div>
);

const Title = ({ text, highlight }: TitleProps) => (
	<h2 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold tracking-tight">
		{text}
		{highlight && <span className="text-primary"> {highlight}</span>}
	</h2>
);

const Description = ({ text }: DescriptionProps) => (
	<p className="text-muted-foreground text-sm @md:text-base max-w-lg mx-auto">
		{text}
	</p>
);

const Form = ({ placeholder, buttonText, buttonIcon: Icon }: FormProps) => (
	<form className="flex flex-col @sm:flex-row gap-3 w-full">
		<Input type="email" placeholder={placeholder} className="flex-1 h-11" />
		<Button className="gap-2 h-11">
			{buttonText}
			{Icon && <Icon className="size-4" />}
		</Button>
	</form>
);

const Stats = ({ items }: StatsProps) => (
	<div className="grid grid-cols-3 gap-4 w-full">
		{items.map((item, i) => {
			const Icon = item.icon;
			return (
				<div
					key={i}
					className="flex flex-col items-center gap-1 p-3 rounded-lg bg-muted/50"
				>
					<Icon className="size-4 text-primary" />
					<span className="text-lg @md:text-xl font-bold">{item.value}</span>
					<span className="text-xs text-muted-foreground">{item.label}</span>
				</div>
			);
		})}
	</div>
);

const TrustBadges = ({ items }: TrustBadgesProps) => (
	<div className="flex flex-wrap justify-center gap-4">
		{items.map((item, i) => {
			const Icon = item.icon;
			return (
				<Badge
					key={i}
					variant="outline"
					className="gap-1.5 text-xs font-normal"
				>
					<Icon className="size-3" />
					{item.text}
				</Badge>
			);
		})}
	</div>
);

export default function Main() {
	return (
		<section className="@container" data-theme="corporate">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20">
				<Card className="max-w-xl mx-auto">
					<CardContent className="flex flex-col items-center text-center gap-6 p-6 @md:p-8">
						<Eyebrow icon={Zap} text="Growth Insights" />
						<Title text="Accelerate your" highlight="business growth" />
						<Description text="Get exclusive access to market research, case studies, and actionable strategies delivered weekly." />
						<Stats
							items={[
								{ icon: Users, value: '25K+', label: 'Subscribers' },
								{ icon: FileText, value: '200+', label: 'Articles' },
								{ icon: TrendingUp, value: '98%', label: 'Open Rate' },
							]}
						/>
						<Form
							placeholder="your@company.com"
							buttonText="Subscribe Now"
							buttonIcon={Send}
						/>
						<TrustBadges
							items={[
								{ icon: Shield, text: 'Privacy first' },
								{ icon: Zap, text: 'Weekly delivery' },
							]}
						/>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
