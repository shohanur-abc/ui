import { Mail } from 'lucide-react';
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

interface NewsletterFormProps {
	placeholder: string;
	buttonText: string;
	buttonIcon?: React.ElementType;
}

interface DisclaimerProps {
	text: string;
}

const Eyebrow = ({ icon: Icon, text }: EyebrowProps) => (
	<Badge variant="secondary" className="gap-1.5 px-3 py-1">
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

const NewsletterForm = ({
	placeholder,
	buttonText,
	buttonIcon: Icon,
}: NewsletterFormProps) => (
	<form className="flex flex-col @sm:flex-row gap-3 max-w-md mx-auto w-full">
		<Input type="email" placeholder={placeholder} className="flex-1 h-11" />
		<Button size="lg" className="gap-2 h-11">
			{buttonText}
			{Icon && <Icon className="size-4" />}
		</Button>
	</form>
);

const Disclaimer = ({ text }: DisclaimerProps) => (
	<p className="text-xs text-muted-foreground/70">{text}</p>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="flex flex-col items-center text-center gap-6">
					<Eyebrow icon={Mail} text="Newsletter" />
					<Title text="Stay in the" highlight="loop" />
					<Description text="Get the latest articles, tutorials, and updates delivered straight to your inbox. No spam, unsubscribe anytime." />
					<NewsletterForm
						placeholder="Enter your email"
						buttonText="Subscribe"
						buttonIcon={Mail}
					/>
					<Disclaimer text="We respect your privacy. Unsubscribe at any time." />
				</div>
			</div>
		</section>
	);
}
