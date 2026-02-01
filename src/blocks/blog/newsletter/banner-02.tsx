import { Sparkles, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
	<div className="flex items-center gap-3">
		<div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
			<Icon className="size-5 text-primary" />
		</div>
		<div>
			<h3 className="font-semibold text-sm">{title}</h3>
			<p className="text-xs text-muted-foreground">{description}</p>
		</div>
	</div>
);

const Form = ({ placeholder, buttonText, buttonIcon: Icon }: FormProps) => (
	<form className="flex gap-2">
		<Input type="email" placeholder={placeholder} className="w-56 h-9" />
		<Button size="sm" className="gap-1.5 h-9">
			{buttonText}
			{Icon && <Icon className="size-3.5" />}
		</Button>
	</form>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="w-full bg-primary text-primary-foreground">
				<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-4">
					<div className="flex flex-col @lg:flex-row @lg:items-center @lg:justify-between gap-4">
						<Content
							icon={Sparkles}
							title="Join our newsletter"
							description="Get exclusive content and early access."
						/>
						<Form
							placeholder="you@email.com"
							buttonText="Subscribe"
							buttonIcon={Send}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
