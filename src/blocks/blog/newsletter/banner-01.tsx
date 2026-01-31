import { Megaphone, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface BannerContentProps {
	icon: React.ElementType;
	text: string;
}

interface FormProps {
	placeholder: string;
	buttonText: string;
	buttonIcon?: React.ElementType;
}

interface DismissButtonProps {
	label: string;
}

const BannerContent = ({ icon: Icon, text }: BannerContentProps) => (
	<div className="flex items-center gap-2">
		<Icon className="size-4 text-primary shrink-0" />
		<span className="text-sm font-medium">{text}</span>
	</div>
);

const Form = ({ placeholder, buttonText, buttonIcon: Icon }: FormProps) => (
	<form className="flex gap-2">
		<Input
			type="email"
			placeholder={placeholder}
			className="w-48 @lg:w-56 h-8 text-sm"
		/>
		<Button size="sm" className="gap-1 h-8">
			{buttonText}
			{Icon && <Icon className="size-3.5" />}
		</Button>
	</form>
);

const DismissButton = ({ label }: DismissButtonProps) => (
	<Button variant="ghost" size="icon-sm" className="shrink-0">
		<X className="size-4" />
		<span className="sr-only">{label}</span>
	</Button>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="w-full bg-muted/80 border-b">
				<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-3">
					<div className="flex flex-col @lg:flex-row @lg:items-center @lg:justify-between gap-3">
						<BannerContent
							icon={Megaphone}
							text="Subscribe to our newsletter and get 20% off your first order!"
						/>
						<div className="flex items-center gap-2">
							<Form
								placeholder="Email address"
								buttonText="Subscribe"
								buttonIcon={ArrowRight}
							/>
							<DismissButton label="Dismiss" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
