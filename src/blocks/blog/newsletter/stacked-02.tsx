import { Bell, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';

interface CardHeaderContentProps {
	icon: React.ElementType;
	title: string;
	description: string;
}

interface FormProps {
	placeholder: string;
	buttonText: string;
	buttonIcon?: React.ElementType;
}

interface FeaturesProps {
	items: string[];
}

const CardHeaderContent = ({
	icon: Icon,
	title,
	description,
}: CardHeaderContentProps) => (
	<CardHeader className="text-center pb-4">
		<div className="mx-auto size-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
			<Icon className="size-6 text-primary" />
		</div>
		<CardTitle className="text-xl @md:text-2xl">{title}</CardTitle>
		<CardDescription className="text-sm @md:text-base">
			{description}
		</CardDescription>
	</CardHeader>
);

const Form = ({ placeholder, buttonText, buttonIcon: Icon }: FormProps) => (
	<form className="flex flex-col gap-3 w-full">
		<Input type="email" placeholder={placeholder} className="h-11" />
		<Button size="lg" className="gap-2 w-full h-11">
			{buttonText}
			{Icon && <Icon className="size-4" />}
		</Button>
	</form>
);

const Features = ({ items }: FeaturesProps) => (
	<ul className="space-y-2 pt-2">
		{items.map((item, i) => (
			<li
				key={i}
				className="flex items-center gap-2 text-sm text-muted-foreground"
			>
				<Check className="size-4 text-primary shrink-0" />
				<span>{item}</span>
			</li>
		))}
	</ul>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<Card className="max-w-sm mx-auto">
					<CardHeaderContent
						icon={Bell}
						title="Stay Updated"
						description="Get weekly updates on the latest trends and insights."
					/>
					<CardContent className="flex flex-col gap-4">
						<Form
							placeholder="Enter your email"
							buttonText="Subscribe"
							buttonIcon={ArrowRight}
						/>
						<Features
							items={[
								'Weekly curated content',
								'Exclusive subscriber perks',
								'Cancel anytime',
							]}
						/>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
