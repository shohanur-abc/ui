import { BookOpen, ChevronRight, Lock, Mail, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

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
	checkboxLabel: string;
}

interface TrustBadgesProps {
	items: { icon: React.ElementType; text: string }[];
}

const Eyebrow = ({ icon: Icon, text }: EyebrowProps) => (
	<Badge className="gap-1.5">
		<Icon className="size-3" />
		{text}
	</Badge>
);

const Title = ({ text }: TitleProps) => (
	<h2 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold tracking-tight">{text}</h2>
);

const Description = ({ text }: DescriptionProps) => (
	<p className="text-muted-foreground text-sm @md:text-base leading-relaxed">{text}</p>
);

const Form = ({ emailPlaceholder, namePlaceholder, buttonText, buttonIcon: Icon, checkboxLabel }: FormProps) => (
	<form className="flex flex-col gap-4 w-full">
		<Input type="text" placeholder={namePlaceholder} className="h-12" />
		<Input type="email" placeholder={emailPlaceholder} className="h-12" />
		<div className="flex items-start gap-2">
			<Checkbox id="consent" className="mt-0.5" />
			<Label htmlFor="consent" className="text-sm text-muted-foreground leading-tight cursor-pointer">
				{checkboxLabel}
			</Label>
		</div>
		<Button size="lg" className="gap-2 h-12 w-full">
			{buttonText}
			{Icon && <Icon className="size-4" />}
		</Button>
	</form>
);

const TrustBadges = ({ items }: TrustBadgesProps) => (
	<div className="flex flex-wrap gap-4 pt-4 border-t">
		{items.map((item, i) => {
			const Icon = item.icon;
			return (
				<div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
					<Icon className="size-3.5 text-primary" />
					<span>{item.text}</span>
				</div>
			);
		})}
	</div>
);

export default function Main() {
	return (
		<section className="@container" data-theme="corporate">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="max-w-md mx-auto flex flex-col gap-6 p-6 @md:p-8 rounded-2xl border bg-card">
					<div className="flex flex-col gap-4 text-center">
						<Eyebrow icon={BookOpen} text="Business Insights" />
						<Title text="Subscribe to our newsletter" />
						<Description text="Get weekly business strategies, industry analysis, and actionable tips delivered straight to your inbox." />
					</div>
					<Form
						namePlaceholder="Your full name"
						emailPlaceholder="your@company.com"
						buttonText="Subscribe Now"
						buttonIcon={ChevronRight}
						checkboxLabel="I agree to receive marketing emails and can unsubscribe at any time."
					/>
					<TrustBadges
						items={[
							{ icon: Lock, text: 'Privacy protected' },
							{ icon: Mail, text: 'No spam' },
							{ icon: Clock, text: 'Weekly delivery' },
						]}
					/>
				</div>
			</div>
		</section>
	);
}
