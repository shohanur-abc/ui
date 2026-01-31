import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TitleProps {
	text: string;
}

interface FormProps {
	placeholder: string;
	buttonText: string;
}

const Title = ({ text }: TitleProps) => (
	<span className="text-sm font-medium">{text}</span>
);

const Form = ({ placeholder, buttonText }: FormProps) => (
	<form className="flex gap-2">
		<Input
			type="email"
			placeholder={placeholder}
			className="w-48 @md:w-56 h-9"
		/>
		<Button size="sm" className="gap-1">
			{buttonText}
			<ArrowRight className="size-3.5" />
		</Button>
	</form>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-6 @md:py-8">
				<div className="flex flex-col @md:flex-row @md:items-center @md:justify-between gap-4 p-4 rounded-lg bg-muted/50">
					<Title text="Subscribe to our newsletter for weekly updates" />
					<Form placeholder="you@example.com" buttonText="Subscribe" />
				</div>
			</div>
		</section>
	);
}
