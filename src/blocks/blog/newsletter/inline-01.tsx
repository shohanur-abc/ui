import { Inbox, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon } from '@/components/ui/input-group';

interface ContentProps {
	icon: React.ElementType;
	title: string;
	description: string;
}

interface FormProps {
	placeholder: string;
	buttonText: string;
	buttonIcon?: React.ElementType;
}

const Content = ({ icon: Icon, title, description }: ContentProps) => (
	<div className="flex items-start gap-4">
		<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
			<Icon className="size-6 text-primary" />
		</div>
		<div className="flex flex-col gap-1">
			<h2 className="text-lg @md:text-xl font-semibold">{title}</h2>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</div>
);

const Form = ({ placeholder, buttonText, buttonIcon: Icon }: FormProps) => (
	<form className="w-full @lg:w-auto @lg:min-w-[320px]">
		<InputGroup className="h-11">
			<Input
				type="email"
				placeholder={placeholder}
				className="border-0 shadow-none focus-visible:ring-0 h-full"
			/>
			<InputGroupAddon align="inline-end">
				<Button size="sm" className="gap-1.5">
					{buttonText}
					{Icon && <Icon className="size-3.5" />}
				</Button>
			</InputGroupAddon>
		</InputGroup>
	</form>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16">
				<div className="flex flex-col @lg:flex-row @lg:items-center @lg:justify-between gap-6 p-6 @md:p-8 rounded-2xl border bg-card">
					<Content
						icon={Inbox}
						title="Subscribe to updates"
						description="Get the latest news and articles delivered to your inbox."
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
