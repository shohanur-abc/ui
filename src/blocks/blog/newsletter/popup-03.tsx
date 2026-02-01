import { Mail, ArrowRight, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ContentSideProps {
	title: string;
	subtitle: string;
	features: string[];
}

interface FormSideProps {
	title: string;
	placeholder: string;
	buttonText: string;
	buttonIcon?: React.ElementType;
	disclaimer: string;
	dismissLabel: string;
}

const ContentSide = ({ title, subtitle, features }: ContentSideProps) => (
	<div className="flex flex-col gap-6 p-6 @md:p-8 bg-primary text-primary-foreground rounded-t-2xl @lg:rounded-l-2xl @lg:rounded-tr-none">
		<div>
			<h2 className="text-2xl @md:text-3xl font-bold">{title}</h2>
			<p className="text-primary-foreground/80 mt-2">{subtitle}</p>
		</div>
		<ul className="space-y-3">
			{features.map((feature, i) => (
				<li key={i} className="flex items-center gap-2 text-sm">
					<Check className="size-4 shrink-0" />
					<span>{feature}</span>
				</li>
			))}
		</ul>
	</div>
);

const FormSide = ({
	title,
	placeholder,
	buttonText,
	buttonIcon: Icon,
	disclaimer,
	dismissLabel,
}: FormSideProps) => (
	<div className="relative flex flex-col gap-5 p-6 @md:p-8">
		<Button variant="ghost" size="icon-sm" className="absolute top-4 right-4">
			<X className="size-4" />
			<span className="sr-only">{dismissLabel}</span>
		</Button>
		<h3 className="text-lg font-semibold pr-8">{title}</h3>
		<form className="flex flex-col gap-3">
			<Input type="email" placeholder={placeholder} className="h-11" />
			<Button size="lg" className="gap-2 w-full h-11">
				{buttonText}
				{Icon && <Icon className="size-4" />}
			</Button>
		</form>
		<p className="text-xs text-muted-foreground">{disclaimer}</p>
	</div>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 flex items-center justify-center">
				<div className="grid @lg:grid-cols-2 max-w-3xl w-full rounded-2xl border bg-card shadow-2xl overflow-hidden">
					<ContentSide
						title="Join 50K+ readers"
						subtitle="Get insights that help you grow"
						features={[
							'Weekly curated content',
							'Exclusive tutorials and guides',
							'Early access to new features',
							'Community access',
						]}
					/>
					<FormSide
						title="Subscribe to newsletter"
						placeholder="Enter your email"
						buttonText="Subscribe"
						buttonIcon={ArrowRight}
						disclaimer="No spam, ever. Unsubscribe anytime."
						dismissLabel="Close"
					/>
				</div>
			</div>
		</section>
	);
}
