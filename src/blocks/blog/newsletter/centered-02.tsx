import { Sparkles, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface EyebrowProps {
	icon: React.ElementType;
	text: string;
}

interface TitleProps {
	text: string;
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
	items: { value: string; label: string }[];
}

const Eyebrow = ({ icon: Icon, text }: EyebrowProps) => (
	<Badge variant="outline" className="gap-1.5 px-3 py-1.5 text-sm">
		<Icon className="size-4" />
		{text}
	</Badge>
);

const Title = ({ text }: TitleProps) => (
	<h2 className="text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-bold tracking-tight leading-tight">
		{text}
	</h2>
);

const Description = ({ text }: DescriptionProps) => (
	<p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto leading-relaxed">
		{text}
	</p>
);

const Form = ({ placeholder, buttonText, buttonIcon: Icon }: FormProps) => (
	<form className="flex flex-col @md:flex-row gap-3 max-w-lg mx-auto w-full">
		<Input
			type="email"
			placeholder={placeholder}
			className="flex-1 h-12 text-base"
		/>
		<Button size="lg" className="gap-2 h-12 px-6">
			{buttonText}
			{Icon && <Icon className="size-4" />}
		</Button>
	</form>
);

const Stats = ({ items }: StatsProps) => (
	<div className="flex flex-wrap justify-center gap-8 @lg:gap-12">
		{items.map((item, i) => (
			<div key={i} className="text-center">
				<div className="text-2xl @md:text-3xl font-bold">{item.value}</div>
				<div className="text-sm text-muted-foreground">{item.label}</div>
			</div>
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-24 @xl:py-32">
				<div className="flex flex-col items-center text-center gap-8">
					<Eyebrow icon={Sparkles} text="Join 50,000+ readers" />
					<Title text="Level up your skills weekly" />
					<Description text="Every week, we send curated insights on development, design, and technology. Join thousands of professionals who start their week with us." />
					<Form
						placeholder="you@example.com"
						buttonText="Get Started"
						buttonIcon={ArrowRight}
					/>
					<Stats
						items={[
							{ value: '50K+', label: 'Subscribers' },
							{ value: '200+', label: 'Articles' },
							{ value: '4.9', label: 'Rating' },
						]}
					/>
				</div>
			</div>
		</section>
	);
}
