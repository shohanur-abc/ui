import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container relative" data-theme="amber">
			<div className="relative mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-24 @xl:py-32">
				<div className="flex flex-col">
					<Title text="Notes on building software" />
					<Subtitle text="by Alex Kim" />
					<NavLinks
						links={[
							{ label: 'Articles', href: '/articles' },
							{ label: 'Projects', href: '/projects' },
							{ label: 'About', href: '/about' },
						]}
					/>
				</div>
			</div>
		</section>
	);
}

interface TitleProps {
	text: string;
}

const Title = ({ text }: TitleProps) => (
	<h1 className="text-3xl @md:text-4xl font-bold tracking-tight mb-2">
		{text}
	</h1>
);

interface SubtitleProps {
	text: string;
}

const Subtitle = ({ text }: SubtitleProps) => (
	<p className="text-muted-foreground mb-8">{text}</p>
);

interface NavLink {
	label: string;
	href: string;
}

interface NavLinksProps {
	links: NavLink[];
}

const NavLinks = ({ links }: NavLinksProps) => (
	<nav className="flex gap-6">
		{links.map((link) => (
			<Link
				key={link.label}
				href={link.href}
				className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
			>
				{link.label}
			</Link>
		))}
	</nav>
);
