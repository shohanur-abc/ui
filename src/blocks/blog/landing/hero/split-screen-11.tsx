import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock, Download, FileText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="slate">
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid grid-cols-1 @3xl:grid-cols-2 gap-10 @xl:gap-16 items-center">
					<ResourcePreview
						title="The Complete Guide to Modern CSS"
						type="PDF Guide"
						pages={128}
						downloads={12500}
						cover="https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600"
					/>
					<ContentSection
						eyebrow={{ icon: FileText, text: 'Free Resources' }}
						title="Level Up with"
						highlight="Premium Guides"
						description="Comprehensive PDF guides, cheat sheets, and templates. All free, no email required. Just download and start learning."
						resources={[
							{ title: 'CSS Grid Cheatsheet', downloads: '8.2K' },
							{ title: 'React Hooks Guide', downloads: '15.4K' },
							{ title: 'TypeScript Handbook', downloads: '22.1K' },
						]}
						cta={[
							{
								label: 'Browse All Resources',
								href: '/resources',
								icon: ArrowRight,
							},
							{
								label: 'Download Now',
								href: '/resources/css-guide',
								icon: Download,
								variant: 'outline',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}

interface ResourcePreviewProps {
	title: string;
	type: string;
	pages: number;
	downloads: number;
	cover: string;
}

const ResourcePreview = ({
	title,
	type,
	pages,
	downloads,
	cover,
}: ResourcePreviewProps) => (
	<div className="relative group">
		<div className="relative aspect-[3/4] max-w-sm mx-auto rounded-2xl overflow-hidden shadow-2xl transition-transform group-hover:scale-[1.02]">
			<Image src={cover} alt={title} fill className="object-cover" />
			<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
			<div className="absolute bottom-0 left-0 right-0 p-6">
				<Badge className="mb-3 bg-primary/90 backdrop-blur-sm">{type}</Badge>
				<h3 className="text-xl @md:text-2xl font-bold text-white mb-2">
					{title}
				</h3>
				<div className="flex items-center gap-4 text-sm text-white/80">
					<span className="flex items-center gap-1">
						<FileText className="size-4" />
						{pages} pages
					</span>
					<span className="flex items-center gap-1">
						<Download className="size-4" />
						{downloads.toLocaleString()} downloads
					</span>
				</div>
			</div>
		</div>
		<PreviewDecorative />
	</div>
);

const PreviewDecorative = () => (
	<>
		<div className="absolute -bottom-4 -right-4 size-full rounded-2xl bg-primary/10 -z-10" />
		<div className="absolute -bottom-8 -right-8 size-full rounded-2xl bg-primary/5 -z-20" />
	</>
);

interface Resource {
	title: string;
	downloads: string;
}

interface CTAItem {
	label: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
	variant?: 'default' | 'outline' | 'secondary' | 'ghost';
}

interface ContentSectionProps {
	eyebrow: { icon: React.ComponentType<{ className?: string }>; text: string };
	title: string;
	highlight: string;
	description: string;
	resources: Resource[];
	cta: CTAItem[];
}

const ContentSection = ({
	eyebrow,
	title,
	highlight,
	description,
	resources,
	cta,
}: ContentSectionProps) => (
	<div className="space-y-6">
		<Eyebrow icon={eyebrow.icon} text={eyebrow.text} />
		<Title text={title} highlight={highlight} />
		<Description text={description} />
		<ResourceList items={resources} />
		<CTA items={cta} />
	</div>
);

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge variant="secondary" className="gap-2 px-4 py-1.5">
		<Icon className="size-4 text-primary" />
		{text}
	</Badge>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">
		{text}
		<span className="block text-primary">{highlight}</span>
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

const ResourceList = ({ items }: { items: Resource[] }) => (
	<div className="space-y-3">
		<p className="text-sm font-medium text-muted-foreground">
			Popular Downloads:
		</p>
		{items.map((item) => (
			<Link
				key={item.title}
				href="#"
				className="group flex items-center justify-between p-3 rounded-lg bg-card border transition-all hover:border-primary hover:bg-primary/5"
			>
				<div className="flex items-center gap-3">
					<FileText className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
					<span className="font-medium">{item.title}</span>
				</div>
				<span className="text-sm text-muted-foreground">{item.downloads}</span>
			</Link>
		))}
	</div>
);

const CTA = ({ items }: { items: CTAItem[] }) => (
	<div className="flex flex-wrap gap-3">
		{items.map(({ label, href, icon: Icon, variant = 'default' }) => (
			<Button key={label} size="lg" variant={variant} asChild className="gap-2">
				<Link href={href}>
					{Icon && <Icon className="size-4" />}
					{label}
				</Link>
			</Button>
		))}
	</div>
);
