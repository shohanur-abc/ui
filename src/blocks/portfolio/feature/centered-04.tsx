import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-4xl mx-auto">
					<Eyebrow text="Expertise" />
					<Title text="Specialized in Modern Web Development" />
					<Description text="Bringing years of experience in creating high-performance web applications with cutting-edge technologies and best practices." />

					<StatRow
						items={[
							{ value: '8+', label: 'Years Experience' },
							{ value: '150+', label: 'Projects Completed' },
							{ value: '50+', label: 'Happy Clients' },
							{ value: '99%', label: 'Success Rate' },
						]}
					/>
				</div>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<Badge variant="outline" className="mb-4 @md:mb-5">
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-5 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg @xl:text-xl text-muted-foreground leading-relaxed mb-10 @md:mb-14">
		{text}
	</p>
);

interface StatItem {
	value: string;
	label: string;
}

const StatRow = ({ items }: { items: StatItem[] }) => (
	<div className="flex flex-wrap justify-center items-center gap-6 @md:gap-0">
		{items.map(({ value, label }, i) => (
			<div key={i} className="flex items-center">
				<div className="text-center px-4 @md:px-8 @xl:px-12">
					<div className="text-3xl @sm:text-4xl @md:text-5xl font-bold text-primary mb-1">
						{value}
					</div>
					<div className="text-sm @md:text-base text-muted-foreground">
						{label}
					</div>
				</div>
				{i < items.length - 1 && (
					<Separator
						orientation="vertical"
						className="h-12 @md:h-16 hidden @md:block"
					/>
				)}
			</div>
		))}
	</div>
);
