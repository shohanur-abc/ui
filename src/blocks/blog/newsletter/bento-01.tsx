import { Mail, ArrowRight, Calendar, FileText, Video, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface BentoItemProps {
	icon: React.ElementType;
	title: string;
	description: string;
	className?: string;
}

interface FormCardProps {
	title: string;
	description: string;
	placeholder: string;
	buttonText: string;
	buttonIcon?: React.ElementType;
}

const BentoItem = ({ icon: Icon, title, description, className }: BentoItemProps) => (
	<Card className={`group transition-all hover:shadow-md hover:border-primary/20 ${className}`}>
		<CardContent className="flex flex-col gap-3 p-5 h-full">
			<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/20">
				<Icon className="size-5 text-primary" />
			</div>
			<h3 className="font-semibold">{title}</h3>
			<p className="text-sm text-muted-foreground">{description}</p>
		</CardContent>
	</Card>
);

const FormCard = ({ title, description, placeholder, buttonText, buttonIcon: Icon }: FormCardProps) => (
	<Card className="bg-primary text-primary-foreground">
		<CardContent className="flex flex-col gap-5 p-6 h-full justify-center">
			<div>
				<h3 className="text-xl font-bold">{title}</h3>
				<p className="text-primary-foreground/80 text-sm mt-1">{description}</p>
			</div>
			<form className="flex flex-col gap-3">
				<Input
					type="email"
					placeholder={placeholder}
					className="h-11 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
				/>
				<Button variant="secondary" size="lg" className="gap-2 w-full h-11">
					{buttonText}
					{Icon && <Icon className="size-4" />}
				</Button>
			</form>
		</CardContent>
	</Card>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-4">
					<BentoItem
						icon={Calendar}
						title="Weekly Digest"
						description="Every Friday, get a curated summary of the week's best content."
					/>
					<BentoItem
						icon={FileText}
						title="In-depth Articles"
						description="Long-form content exploring complex topics in detail."
					/>
					<FormCard
						title="Subscribe Now"
						description="Join 20K+ readers"
						placeholder="you@email.com"
						buttonText="Subscribe"
						buttonIcon={ArrowRight}
					/>
					<BentoItem
						icon={Video}
						title="Video Tutorials"
						description="Step-by-step video guides to help you learn faster."
						className="@xl:col-span-2"
					/>
					<BentoItem
						icon={Headphones}
						title="Podcast Episodes"
						description="Listen to expert interviews and discussions."
					/>
				</div>
			</div>
		</section>
	);
}
