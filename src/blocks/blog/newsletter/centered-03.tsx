import { Zap, Send } from 'lucide-react';
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

interface BenefitsProps {
	items: { icon: React.ElementType; text: string }[];
}

const Eyebrow = ({ icon: Icon, text }: EyebrowProps) => (
	<div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
		<Icon className="size-4 text-primary" />
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
	<p className="text-muted-foreground text-sm @md:text-base max-w-md mx-auto">
		{text}
	</p>
);

const Form = ({ placeholder, buttonText, buttonIcon: Icon }: FormProps) => (
	<form className="flex flex-col @sm:flex-row gap-3 w-full">
		<Input
			type="email"
			placeholder={placeholder}
			className="flex-1 h-10"
		/>
		<Button className="gap-2 h-10">
			{buttonText}
			{Icon && <Icon className="size-4" />}
		</Button>
	</form>
);

const Benefits = ({ items }: BenefitsProps) => (
	<div className="flex flex-wrap justify-center gap-4 @md:gap-6">
		{items.map((item, i) => {
			const Icon = item.icon;
			return (
				<div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
					<Icon className="size-4 text-primary" />
					<span>{item.text}</span>
				</div>
			);
		})}
	</div>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20">
				<Card className="max-w-xl mx-auto">
					<CardContent className="flex flex-col items-center text-center gap-5 p-6 @md:p-8">
						<Eyebrow icon={Zap} text="Weekly Newsletter" />
						<Title text="Get insights" highlight="delivered" />
						<Description text="Join our community of developers and designers. Fresh content every week." />
						<Form
							placeholder="Your email address"
							buttonText="Subscribe"
							buttonIcon={Send}
						/>
						<Benefits
							items={[
								{ icon: Zap, text: 'Weekly updates' },
								{ icon: Zap, text: 'No spam' },
								{ icon: Zap, text: 'Unsubscribe anytime' },
							]}
						/>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
