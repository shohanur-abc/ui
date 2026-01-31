import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Award, Users, Package, Globe } from 'lucide-react';

const StatItem = ({
	icon: Icon,
	value,
	label,
}: {
	icon: React.ElementType;
	value: string;
	label: string;
}) => (
	<div className="flex flex-col items-center text-center p-4 @md:p-6">
		<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
			<Icon className="size-6 text-primary" />
		</div>
		<span className="text-2xl @md:text-3xl font-bold mb-1">{value}</span>
		<span className="text-sm text-muted-foreground">{label}</span>
	</div>
);

const Divider = () => <div className="hidden @md:block w-px h-20 bg-border" />;

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-card py-12 @md:py-16 @xl:py-20 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-5xl mx-auto">
					<div className="flex flex-wrap items-center justify-center gap-4 @md:gap-0">
						<StatItem icon={Award} value="15+" label="Years Experience" />
						<Divider />
						<StatItem icon={Users} value="2M+" label="Happy Customers" />
						<Divider />
						<StatItem icon={Package} value="50K+" label="Products Sold" />
						<Divider />
						<StatItem icon={Globe} value="120+" label="Countries Served" />
					</div>
				</div>
			</div>
		</section>
	);
}
