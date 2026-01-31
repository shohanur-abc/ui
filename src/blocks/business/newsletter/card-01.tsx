import { Sparkles, ArrowRight, Check, Shield, Clock, Zap } from 'lucide-react';
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

interface FeaturesProps {
	items: { icon: React.ElementType; title: string; description: string }[];
}

interface DisclaimerProps {
	text: string;
}

const GlassDecorative = () => (
	<div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
		<div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
		<div className="absolute -bottom-32 -left-32 w-64 h-64 bg-accent/15 rounded-full blur-3xl" />
	</div>
);

const Eyebrow = ({ icon: Icon, text }: EyebrowProps) => (
	<div className="inline-flex items-center gap-2 text-sm text-primary font-medium">
		<div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
			<Icon className="size-4" />
		</div>
		<span>{text}</span>
	</div>
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
		<Input type="email" placeholder={placeholder} className="flex-1 h-12 bg-background/80 backdrop-blur-sm" />
		<Button size="lg" className="gap-2 h-12 px-6">
			{buttonText}
			{Icon && <Icon className="size-4" />}
		</Button>
	</form>
);

const Features = ({ items }: FeaturesProps) => (
	<div className="grid @sm:grid-cols-3 gap-4">
		{items.map((item, i) => {
			const Icon = item.icon;
			return (
				<div key={i} className="flex flex-col gap-2 p-4 rounded-xl bg-background/50 backdrop-blur-sm">
					<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
						<Icon className="size-5 text-primary" />
					</div>
					<span className="text-sm font-medium">{item.title}</span>
					<span className="text-xs text-muted-foreground">{item.description}</span>
				</div>
			);
		})}
	</div>
);

const Disclaimer = ({ text }: DisclaimerProps) => (
	<p className="text-xs text-muted-foreground/70 text-center">{text}</p>
);

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<Card className="relative max-w-2xl mx-auto overflow-hidden border-primary/20 bg-card/80 backdrop-blur-xl">
					<GlassDecorative />
					<CardContent className="relative flex flex-col gap-6 p-6 @md:p-8 @xl:p-10">
						<Eyebrow icon={Sparkles} text="Premium Insights" />
						<Title text="Level up your" highlight="business acumen" />
						<Description text="Get exclusive access to in-depth analysis, expert interviews, and actionable strategies that drive real results." />
						<Form placeholder="Enter your work email" buttonText="Get Access" buttonIcon={ArrowRight} />
						<Features
							items={[
								{ icon: Zap, title: 'Weekly Digest', description: 'Curated insights every week' },
								{ icon: Shield, title: 'Privacy First', description: 'Your data stays secure' },
								{ icon: Clock, title: '5 Min Read', description: 'Quick, actionable content' },
							]}
						/>
						<Disclaimer text="Join 25,000+ business leaders. Unsubscribe anytime." />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
