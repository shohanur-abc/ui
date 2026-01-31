import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface TestimonialProps {
	quote: string;
	author: string;
	role: string;
}

interface FormCardProps {
	title: string;
	description: string;
	placeholder: string;
	buttonText: string;
	features: string[];
}

const Testimonial = ({ quote, author, role }: TestimonialProps) => (
	<div className="flex flex-col gap-6 justify-center h-full p-6 @md:p-8 @xl:p-12 rounded-2xl bg-primary text-primary-foreground">
		<blockquote className="text-lg @md:text-xl @xl:text-2xl font-medium leading-relaxed">
			&ldquo;{quote}&rdquo;
		</blockquote>
		<div>
			<div className="font-semibold">{author}</div>
			<div className="text-primary-foreground/70 text-sm">{role}</div>
		</div>
	</div>
);

const FormCard = ({ title, description, placeholder, buttonText, features }: FormCardProps) => (
	<Card className="h-full">
		<CardHeader>
			<CardTitle className="text-xl @md:text-2xl">{title}</CardTitle>
			<CardDescription>{description}</CardDescription>
		</CardHeader>
		<CardContent className="flex flex-col gap-6">
			<form className="flex flex-col gap-3">
				<Input
					type="email"
					placeholder={placeholder}
					className="h-11"
				/>
				<Button size="lg" className="gap-2 w-full h-11">
					{buttonText}
					<ArrowRight className="size-4" />
				</Button>
			</form>
			<ul className="space-y-2">
				{features.map((feature, i) => (
					<li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
						<CheckCircle2 className="size-4 text-primary shrink-0" />
						<span>{feature}</span>
					</li>
				))}
			</ul>
		</CardContent>
	</Card>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-6 @lg:gap-8">
					<Testimonial
						quote="This newsletter has become my go-to source for staying updated on industry trends. The quality of content is exceptional."
						author="Sarah Chen"
						role="Product Designer at Stripe"
					/>
					<FormCard
						title="Subscribe to our newsletter"
						description="Get the latest articles, tutorials, and resources delivered straight to your inbox."
						placeholder="Enter your email"
						buttonText="Subscribe"
						features={[
							'Weekly curated content',
							'Exclusive insights and tips',
							'Early access to new features',
						]}
					/>
				</div>
			</div>
		</section>
	);
}
