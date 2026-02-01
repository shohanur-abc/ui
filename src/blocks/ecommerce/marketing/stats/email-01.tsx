import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Mail,
	MousePointer,
	UserPlus,
	ShoppingCart,
	DollarSign,
} from 'lucide-react';

interface EmailStatProps {
	icon: React.ElementType;
	label: string;
	value: string;
	rate: string;
}

const EmailStat = ({ icon: Icon, label, value, rate }: EmailStatProps) => (
	<div className="text-center">
		<div className="mx-auto mb-2 rounded-lg bg-primary/10 p-2 w-fit">
			<Icon className="size-5 text-primary" />
		</div>
		<p className="text-2xl font-bold">{value}</p>
		<p className="text-sm text-muted-foreground">{label}</p>
		<Badge variant="secondary" className="mt-2">
			{rate}
		</Badge>
	</div>
);

export default function Main() {
	const stats: EmailStatProps[] = [
		{ icon: Mail, label: 'Emails Sent', value: '248,294', rate: '100%' },
		{ icon: Mail, label: 'Delivered', value: '242,847', rate: '97.8%' },
		{ icon: Mail, label: 'Opened', value: '84,294', rate: '34.7%' },
		{ icon: MousePointer, label: 'Clicked', value: '18,284', rate: '7.5%' },
		{ icon: ShoppingCart, label: 'Converted', value: '2,847', rate: '1.2%' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card className="p-6 @md:p-8">
					<div className="mb-6 flex items-center gap-3">
						<div className="rounded-lg bg-primary/10 p-2">
							<Mail className="size-5 text-primary" />
						</div>
						<div>
							<h3 className="font-semibold">Email Campaign Performance</h3>
							<p className="text-sm text-muted-foreground">
								Last 30 days funnel metrics
							</p>
						</div>
					</div>
					<Separator className="mb-8" />
					<div className="grid grid-cols-2 gap-6 @md:grid-cols-5">
						{stats.map((stat, i) => (
							<EmailStat key={i} {...stat} />
						))}
					</div>
				</Card>
			</div>
		</section>
	);
}
