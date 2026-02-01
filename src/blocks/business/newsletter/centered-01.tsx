import { Mail, ArrowRight, Check } from 'lucide-react';
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

interface BenefitsProps {
	items: string[];
}

interface DisclaimerProps {
	text: string;
}

const Eyebrow = ({ icon: Icon, text }: EyebrowProps) => (
	<Badge variant="secondary" className="gap-1.5 px-3 py-1.5">
		<Icon className="size-3.5" />
		{text}
	</Badge>
);

const Title = ({ text, highlight }: TitleProps) => (
	<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
		{text} {highlight && <span className="text-primary">{highlight}</span>}
	</h2>
);

const Description = ({ text }: DescriptionProps) => (
	<p className="text-muted-foreground text-base @md:text-lg max-w-xl mx-auto leading-relaxed">
		{text}
	</p>
);

const Form = ({ placeholder, buttonText, buttonIcon: Icon }: FormProps) => (
	<form className="flex flex-col @sm:flex-row gap-3 max-w-md mx-auto w-full">
		<Input type="email" placeholder={placeholder} className="flex-1 h-12" />
		<Button size="lg" className="gap-2 h-12 px-6">
			{buttonText}
			{Icon && <Icon className="size-4" />}
		</Button>
	</form>
);

const Benefits = ({ items }: BenefitsProps) => (
	<div className="flex flex-wrap justify-center gap-4 @md:gap-6">
		{items.map((item, i) => (
			<div
				key={i}
				className="flex items-center gap-2 text-sm text-muted-foreground"
			>
				<Check className="size-4 text-primary" />
				<span>{item}</span>
			</div>
		))}
	</div>
);

const Disclaimer = ({ text }: DisclaimerProps) => (
	<p className="text-xs text-muted-foreground/70">{text}</p>
);

export default function Main() {
	return (
		<section className="@container" data-theme="corporate">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="flex flex-col items-center text-center gap-6">
					<Eyebrow icon={Mail} text="Business Newsletter" />
					<Title text="Stay ahead of the" highlight="competition" />
					<Description text="Join 15,000+ business leaders who receive our weekly insights on strategy, growth, and industry trends." />
					<Form
						placeholder="Enter your work email"
						buttonText="Subscribe"
						buttonIcon={ArrowRight}
					/>
					<Benefits
						items={[
							'Weekly insights',
							'Expert analysis',
							'Unsubscribe anytime',
						]}
					/>
					<Disclaimer text="We respect your privacy. Your email is safe with us." />
				</div>
			</div>
		</section>
	);
}
