import { Newspaper, ArrowRight, Gift, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

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

interface IncentiveProps {
	icon: React.ElementType;
	text: string;
}

const GradientDecorative = () => (
	<div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
		<div className="absolute -top-[40%] -right-[20%] w-[60%] h-[80%] rounded-full bg-primary/10 blur-3xl" />
		<div className="absolute -bottom-[30%] -left-[20%] w-[50%] h-[70%] rounded-full bg-primary/5 blur-3xl" />
	</div>
);

const Eyebrow = ({ icon: Icon, text }: EyebrowProps) => (
	<Badge variant="outline" className="gap-1.5 border-primary/30 bg-primary/5">
		<Icon className="size-3 text-primary" />
		{text}
	</Badge>
);

const Title = ({ text, highlight }: TitleProps) => (
	<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
		{text}{' '}
		{highlight && <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{highlight}</span>}
	</h2>
);

const Description = ({ text }: DescriptionProps) => (
	<p className="text-muted-foreground text-base @md:text-lg max-w-xl mx-auto leading-relaxed">
		{text}
	</p>
);

const Form = ({ placeholder, buttonText, buttonIcon: Icon }: FormProps) => (
	<form className="flex flex-col @sm:flex-row gap-3 max-w-md mx-auto w-full">
		<Input
			type="email"
			placeholder={placeholder}
			className="flex-1 h-12"
		/>
		<Button size="lg" className="gap-2 h-12 px-6">
			{buttonText}
			{Icon && <Icon className="size-4" />}
		</Button>
	</form>
);

const Incentive = ({ icon: Icon, text }: IncentiveProps) => (
	<div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-full px-4 py-2">
		<Icon className="size-4 text-primary" />
		<span>{text}</span>
	</div>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="relative flex flex-col items-center text-center gap-6 p-8 @md:p-12 @xl:p-16 rounded-2xl border bg-card overflow-hidden">
					<GradientDecorative />
					<Eyebrow icon={Sparkles} text="New subscribers get a free guide" />
					<Title text="Subscribe for exclusive" highlight="insights" />
					<Description text="Join 25,000+ readers who receive our weekly newsletter packed with industry insights, tips, and exclusive content." />
					<Form
						placeholder="Enter your email"
						buttonText="Subscribe"
						buttonIcon={ArrowRight}
					/>
					<Incentive icon={Gift} text="Get our free eBook when you subscribe" />
				</div>
			</div>
		</section>
	);
}
