import { Newspaper, Mail, Lock, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface TitleProps {
	icon: React.ElementType;
	text: string;
}

interface DescriptionProps {
	text: string;
}

interface FormProps {
	placeholder: string;
	buttonText: string;
	checkboxLabel: string;
}

interface TrustBadgesProps {
	items: { icon: React.ElementType; text: string }[];
}

const Title = ({ icon: Icon, text }: TitleProps) => (
	<div className="flex items-center gap-3">
		<div className="size-10 rounded-lg bg-primary flex items-center justify-center">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<h2 className="text-xl @sm:text-2xl @md:text-3xl font-bold">{text}</h2>
	</div>
);

const Description = ({ text }: DescriptionProps) => (
	<p className="text-muted-foreground text-sm @md:text-base">{text}</p>
);

const Form = ({ placeholder, buttonText, checkboxLabel }: FormProps) => (
	<form className="flex flex-col gap-4 w-full">
		<Input type="email" placeholder={placeholder} className="h-11" />
		<div className="flex items-start gap-2">
			<Checkbox id="consent" className="mt-0.5" />
			<Label
				htmlFor="consent"
				className="text-sm text-muted-foreground leading-tight cursor-pointer"
			>
				{checkboxLabel}
			</Label>
		</div>
		<Button size="lg" className="w-full h-11">
			{buttonText}
		</Button>
	</form>
);

const TrustBadges = ({ items }: TrustBadgesProps) => (
	<div className="flex flex-wrap gap-4 pt-2">
		{items.map((item, i) => {
			const Icon = item.icon;
			return (
				<div
					key={i}
					className="flex items-center gap-1.5 text-xs text-muted-foreground"
				>
					<Icon className="size-3.5" />
					<span>{item.text}</span>
				</div>
			);
		})}
	</div>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="max-w-md mx-auto flex flex-col gap-6 p-6 @md:p-8 rounded-2xl border bg-card">
					<Title icon={Newspaper} text="Newsletter" />
					<Description text="Join thousands of readers who get our weekly newsletter with the best content curated just for you." />
					<Form
						placeholder="you@company.com"
						buttonText="Subscribe to Newsletter"
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
