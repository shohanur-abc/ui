import { Rss, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ContentProps {
	badge: string;
	title: string;
	description: string;
}

interface FormProps {
	placeholder: string;
	buttonText: string;
	buttonIcon?: React.ElementType;
}

const Content = ({ badge, title, description }: ContentProps) => (
	<div className="flex flex-col gap-3">
		<Badge variant="secondary" className="w-fit">
			<Rss className="size-3 mr-1" />
			{badge}
		</Badge>
		<h2 className="text-2xl @md:text-3xl font-bold">{title}</h2>
		<p className="text-muted-foreground text-sm @md:text-base max-w-md">{description}</p>
	</div>
);

const Form = ({ placeholder, buttonText, buttonIcon: Icon }: FormProps) => (
	<form className="flex flex-col @sm:flex-row gap-3 w-full @lg:w-auto">
		<Input
			type="email"
			placeholder={placeholder}
			className="h-11 @lg:w-64"
		/>
		<Button size="lg" className="gap-2 h-11">
			{buttonText}
			{Icon && <Icon className="size-4" />}
		</Button>
	</form>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16">
				<div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-8">
					<Content
						badge="Newsletter"
						title="Never miss an update"
						description="Subscribe to our newsletter and stay up to date with the latest articles and resources."
					/>
					<Form
						placeholder="your@email.com"
						buttonText="Subscribe"
						buttonIcon={Send}
					/>
				</div>
			</div>
		</section>
	);
}
