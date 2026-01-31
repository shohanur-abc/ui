import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Check } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="max-w-4xl mx-auto">
					<div className="text-center mb-12 @md:mb-16">
						<Eyebrow text="Philosophy" />
						<Title text="My Development Principles" />
					</div>

					<MinimalList
						items={[
							{
								title: 'User First',
								description:
									'Every decision is made with the end user in mind. Technology serves people, not the other way around.',
							},
							{
								title: 'Quality Over Speed',
								description:
									"While I value efficiency, I never sacrifice code quality. Technical debt today is tomorrow's problem.",
							},
							{
								title: 'Continuous Learning',
								description:
									'The tech landscape evolves rapidly. I dedicate time daily to learning and experimenting with new technologies.',
							},
							{
								title: 'Clear Communication',
								description:
									'Complex technical concepts explained simply. Regular updates and transparent project management.',
							},
							{
								title: 'Sustainable Code',
								description:
									"Writing code that's maintainable, documented, and can be easily understood by other developers.",
							},
						]}
					/>
				</div>
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
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">
		{text}
	</h2>
);

interface ListItem {
	title: string;
	description: string;
}

const MinimalList = ({ items }: { items: ListItem[] }) => (
	<div className="space-y-0">
		{items.map(({ title, description }, i) => (
			<div key={i}>
				<div className="flex gap-4 @md:gap-6 py-6 @md:py-8 group">
					<div className="size-6 @md:size-7 rounded-full border-2 border-primary/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
						<Check className="size-3 @md:size-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
					</div>
					<div>
						<h3 className="font-semibold text-lg @md:text-xl mb-2 group-hover:text-primary transition-colors">
							{title}
						</h3>
						<p className="text-sm @md:text-base text-muted-foreground leading-relaxed">
							{description}
						</p>
					</div>
				</div>
				{i < items.length - 1 && <Separator />}
			</div>
		))}
	</div>
);
