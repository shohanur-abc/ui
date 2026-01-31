import { Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ContentProps {
	title: string;
	description: string;
}

interface FormProps {
	placeholder: string;
	buttonText: string;
	buttonIcon?: React.ElementType;
}

interface SocialLinksProps {
	items: { icon: React.ElementType; href: string; label: string }[];
}

const Content = ({ title, description }: ContentProps) => (
	<div className="flex flex-col gap-2">
		<h3 className="text-lg font-semibold">{title}</h3>
		<p className="text-sm text-muted-foreground max-w-sm">{description}</p>
	</div>
);

const Form = ({ placeholder, buttonText, buttonIcon: Icon }: FormProps) => (
	<form className="flex gap-2 w-full max-w-sm">
		<Input
			type="email"
			placeholder={placeholder}
			className="flex-1 h-10"
		/>
		<Button className="gap-1.5 h-10 shrink-0">
			{buttonText}
			{Icon && <Icon className="size-4" />}
		</Button>
	</form>
);

const SocialLinks = ({ items }: SocialLinksProps) => (
	<div className="flex gap-2">
		{items.map((item, i) => {
			const Icon = item.icon;
			return (
				<Button key={i} variant="outline" size="icon" asChild>
					<a href={item.href} aria-label={item.label}>
						<Icon className="size-4" />
					</a>
				</Button>
			);
		})}
	</div>
);

export default function Main() {
	return (
		<section className="@container border-t bg-muted/50">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16">
				<div className="flex flex-col @lg:flex-row @lg:items-center @lg:justify-between gap-8">
					<Content
						title="Stay in the loop"
						description="Subscribe to our newsletter for the latest updates, articles, and resources."
					/>
					<Form
						placeholder="Enter your email"
						buttonText="Subscribe"
						buttonIcon={ArrowRight}
					/>
				</div>
			</div>
		</section>
	);
}
