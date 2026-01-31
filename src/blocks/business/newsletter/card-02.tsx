import { Mail, Send, Check, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface ImageHeaderProps {
	src: string;
	alt: string;
	badge?: { icon: React.ElementType; text: string };
}

interface TitleProps {
	text: string;
}

interface DescriptionProps {
	text: string;
}

interface FormProps {
	placeholder: string;
	buttonText: string;
	buttonIcon?: React.ElementType;
}

interface BenefitsProps {
	items: string[];
}

interface SocialProofProps {
	icon: React.ElementType;
	text: string;
}

const ImageHeader = ({ src, alt, badge }: ImageHeaderProps) => (
	<div className="relative aspect-video overflow-hidden">
		<img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
		<div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
		{badge && (
			<Badge className="absolute top-4 left-4 gap-1.5 shadow-lg">
				<badge.icon className="size-3" />
				{badge.text}
			</Badge>
		)}
	</div>
);

const Title = ({ text }: TitleProps) => (
	<h2 className="text-xl @sm:text-2xl @lg:text-3xl font-bold tracking-tight">{text}</h2>
);

const Description = ({ text }: DescriptionProps) => (
	<p className="text-muted-foreground text-sm @md:text-base leading-relaxed">{text}</p>
);

const Form = ({ placeholder, buttonText, buttonIcon: Icon }: FormProps) => (
	<form className="flex flex-col gap-3 w-full">
		<Input type="email" placeholder={placeholder} className="h-12" />
		<Button size="lg" className="gap-2 h-12 w-full">
			{buttonText}
			{Icon && <Icon className="size-4" />}
		</Button>
	</form>
);

const Benefits = ({ items }: BenefitsProps) => (
	<div className="flex flex-col gap-2">
		{items.map((item, i) => (
			<div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
				<Check className="size-4 text-primary shrink-0" />
				<span>{item}</span>
			</div>
		))}
	</div>
);

const SocialProof = ({ icon: Icon, text }: SocialProofProps) => (
	<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-4 border-t">
		<Icon className="size-4 text-primary" />
		<span>{text}</span>
	</div>
);

export default function Main() {
	return (
		<section className="@container" data-theme="corporate">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<Card className="max-w-md mx-auto overflow-hidden">
					<ImageHeader
						src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
						alt="Business team collaboration"
						badge={{ icon: Mail, text: 'Newsletter' }}
					/>
					<CardContent className="flex flex-col gap-5 p-6 -mt-8 relative">
						<Title text="Insights for modern business leaders" />
						<Description text="Weekly analysis, trends, and strategies to help you make smarter business decisions." />
						<Form placeholder="your@company.com" buttonText="Subscribe Now" buttonIcon={Send} />
						<Benefits
							items={['Expert analysis every week', 'Exclusive case studies', 'Actionable strategies']}
						/>
						<SocialProof icon={Users} text="Trusted by 18,000+ professionals" />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
