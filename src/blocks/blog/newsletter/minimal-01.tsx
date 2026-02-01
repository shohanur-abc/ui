import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TitleProps {
	text: string;
}

interface FormProps {
	placeholder: string;
	buttonIcon: React.ElementType;
}

const Title = ({ text }: TitleProps) => (
	<h2 className="text-lg @md:text-xl font-medium">{text}</h2>
);

const Form = ({ placeholder, buttonIcon: Icon }: FormProps) => (
	<form className="flex gap-2 w-full max-w-sm">
		<Input type="email" placeholder={placeholder} className="flex-1" />
		<Button size="icon" className="shrink-0">
			<Icon className="size-4" />
		</Button>
	</form>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-10 @md:py-12">
				<div className="flex flex-col @md:flex-row @md:items-center @md:justify-between gap-4">
					<Title text="Subscribe to our newsletter" />
					<Form placeholder="you@example.com" buttonIcon={ArrowRight} />
				</div>
			</div>
		</section>
	);
}
