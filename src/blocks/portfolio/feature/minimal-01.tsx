import { Badge } from '@/components/ui/badge';
import { ArrowRight, Code2, Palette, Server, Smartphone } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Expertise" />
					<Title text="Core Skills" />
					<Description text="Focused expertise across the development spectrum." />
				</div>

				<MinimalFeatures
					items={[
						{
							icon: Code2,
							title: 'Frontend',
							description: 'React, Next.js, TypeScript',
							link: '#frontend',
						},
						{
							icon: Server,
							title: 'Backend',
							description: 'Node.js, Python, APIs',
							link: '#backend',
						},
						{
							icon: Palette,
							title: 'Design',
							description: 'UI/UX, Design Systems',
							link: '#design',
						},
						{
							icon: Smartphone,
							title: 'Mobile',
							description: 'React Native, Expo',
							link: '#mobile',
						},
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

interface FeatureItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	link: string;
}

const MinimalFeatures = ({ items }: { items: FeatureItem[] }) => (
	<div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-6 @md:gap-8 max-w-4xl mx-auto">
		{items.map(({ icon: Icon, title, description, link }, i) => (
			<a
				key={i}
				href={link}
				className="group text-center p-4 @md:p-6 rounded-xl hover:bg-muted/50 transition-colors"
			>
				<div className="size-12 @md:size-14 rounded-xl border-2 border-border flex items-center justify-center mx-auto mb-4 group-hover:border-primary group-hover:bg-primary/5 transition-all">
					<Icon className="size-6 @md:size-7 text-muted-foreground group-hover:text-primary transition-colors" />
				</div>
				<h3 className="font-semibold text-base @md:text-lg mb-1">{title}</h3>
				<p className="text-sm text-muted-foreground mb-2">{description}</p>
				<span className="inline-flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
					Learn more <ArrowRight className="size-3" />
				</span>
			</a>
		))}
	</div>
);
