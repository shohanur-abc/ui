import { BookOpen, ChevronRight } from 'lucide-react';
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
	emailPlaceholder: string;
	namePlaceholder: string;
	buttonText: string;
	buttonIcon?: React.ElementType;
}

interface DisclaimerProps {
	text: string;
}

const Eyebrow = ({ icon: Icon, text }: EyebrowProps) => (
	<Badge className="gap-1.5">
		<Icon className="size-3" />
		{text}
	</Badge>
);

const Title = ({ text }: TitleProps) => (
	<h2 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold tracking-tight">
		{text}
	</h2>
);

const Description = ({ text }: DescriptionProps) => (
	<p className="text-muted-foreground text-sm @md:text-base leading-relaxed">
		{text}
	</p>
);

const Form = ({
	emailPlaceholder,
	namePlaceholder,
	buttonText,
	buttonIcon: Icon,
}: FormProps) => (
	<form className="flex flex-col gap-3 w-full">
		<Input type="text" placeholder={namePlaceholder} className="h-11" />
		<Input type="email" placeholder={emailPlaceholder} className="h-11" />
		<Button size="lg" className="gap-2 h-11 w-full">
			{buttonText}
			{Icon && <Icon className="size-4" />}
		</Button>
	</form>
);

const Disclaimer = ({ text }: DisclaimerProps) => (
	<p className="text-xs text-muted-foreground/70 text-center">{text}</p>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="max-w-md mx-auto flex flex-col gap-6">
					<div className="flex flex-col gap-4 text-center">
						<Eyebrow icon={BookOpen} text="Free Newsletter" />
						<Title text="Subscribe to our newsletter" />
						<Description text="Get notified about new articles, tutorials, and exclusive content. We promise no spam." />
					</div>
					<Form
						namePlaceholder="Your name"
						emailPlaceholder="Your email"
						buttonText="Subscribe Now"
						buttonIcon={ChevronRight}
					/>
					<Disclaimer text="By subscribing, you agree to our Privacy Policy and Terms of Service." />
				</div>
			</div>
		</section>
	);
}
