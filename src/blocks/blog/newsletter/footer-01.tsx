import { Mail, Send, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

interface FooterNewsletterProps {
	icon: React.ElementType;
	title: string;
	description: string;
	placeholder: string;
	buttonText: string;
	buttonIcon?: React.ElementType;
}

const FooterNewsletter = ({
	icon: Icon,
	title,
	description,
	placeholder,
	buttonText,
	buttonIcon: ButtonIcon,
}: FooterNewsletterProps) => (
	<div className="flex flex-col gap-4">
		<div className="flex items-center gap-2">
			<Icon className="size-5 text-primary" />
			<h3 className="font-semibold">{title}</h3>
		</div>
		<p className="text-sm text-muted-foreground">{description}</p>
		<form className="flex gap-2">
			<Input type="email" placeholder={placeholder} className="flex-1 h-9" />
			<Button size="sm" className="gap-1.5 h-9 shrink-0">
				{buttonText}
				{ButtonIcon && <ButtonIcon className="size-3.5" />}
			</Button>
		</form>
	</div>
);

interface FooterLinksProps {
	title: string;
	links: { label: string; href: string }[];
}

const FooterLinks = ({ title, links }: FooterLinksProps) => (
	<div className="flex flex-col gap-3">
		<h4 className="font-semibold text-sm">{title}</h4>
		<ul className="space-y-2">
			{links.map((link, i) => (
				<li key={i}>
					<a
						href={link.href}
						className="text-sm text-muted-foreground hover:text-foreground transition-colors"
					>
						{link.label}
					</a>
				</li>
			))}
		</ul>
	</div>
);

interface CopyrightProps {
	text: string;
}

const Copyright = ({ text }: CopyrightProps) => (
	<p className="text-sm text-muted-foreground">{text}</p>
);

export default function Main() {
	return (
		<section className="@container border-t">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16">
				<div className="grid @md:grid-cols-2 @xl:grid-cols-4 gap-8 @xl:gap-12">
					<FooterNewsletter
						icon={Newspaper}
						title="Newsletter"
						description="Subscribe to get the latest updates and news."
						placeholder="Email"
						buttonText="Subscribe"
						buttonIcon={Send}
					/>
					<FooterLinks
						title="Product"
						links={[
							{ label: 'Features', href: '#' },
							{ label: 'Pricing', href: '#' },
							{ label: 'Changelog', href: '#' },
							{ label: 'Docs', href: '#' },
						]}
					/>
					<FooterLinks
						title="Company"
						links={[
							{ label: 'About', href: '#' },
							{ label: 'Blog', href: '#' },
							{ label: 'Careers', href: '#' },
							{ label: 'Contact', href: '#' },
						]}
					/>
					<FooterLinks
						title="Legal"
						links={[
							{ label: 'Privacy', href: '#' },
							{ label: 'Terms', href: '#' },
							{ label: 'Cookies', href: '#' },
						]}
					/>
				</div>
				<Separator className="my-8" />
				<Copyright text="© 2024 Company. All rights reserved." />
			</div>
		</section>
	);
}
