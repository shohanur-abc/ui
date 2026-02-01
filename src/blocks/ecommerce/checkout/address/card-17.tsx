'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import {
	MapPin,
	Building2,
	Home,
	Briefcase,
	Gift,
	Heart,
	Star,
	Check,
} from 'lucide-react';

interface AddressCategoryProps {
	icon: React.ElementType;
	label: string;
	color: string;
	bgColor: string;
	count: number;
}

interface AddressProps {
	id: string;
	name: string;
	address: string;
	isPrimary?: boolean;
}

const PageHeader = () => (
	<div className="flex items-center gap-4 mb-8">
		<div className="size-14 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
			<MapPin className="size-7 text-primary-foreground" />
		</div>
		<div>
			<h1 className="text-2xl @md:text-3xl font-bold">Delivery Address</h1>
			<p className="text-muted-foreground">Choose from 6 saved addresses</p>
		</div>
	</div>
);

const CategoryChip = ({
	icon: Icon,
	label,
	color,
	bgColor,
	count,
}: AddressCategoryProps) => (
	<button
		type="button"
		className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${bgColor} ${color}`}
	>
		<Icon className="size-4" />
		{label}
		<span className="size-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
			{count}
		</span>
	</button>
);

const AddressRow = ({ id, name, address, isPrimary }: AddressProps) => (
	<label className="block cursor-pointer group">
		<Card className="transition-all hover:shadow-md has-[:checked]:ring-2 has-[:checked]:ring-primary has-[:checked]:bg-primary/5">
			<CardContent className="py-4">
				<div className="flex items-start gap-4">
					<div className="relative mt-0.5">
						<RadioGroupItem value={id} />
					</div>
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2 mb-1">
							<span className="font-semibold">{name}</span>
							{isPrimary && (
								<Badge variant="secondary" className="text-xs gap-1">
									<Star className="size-2.5 fill-current" />
									Primary
								</Badge>
							)}
						</div>
						<div className="flex items-start gap-2 text-sm text-muted-foreground">
							<MapPin className="size-3.5 shrink-0 mt-0.5" />
							<span>{address}</span>
						</div>
					</div>
					<Button
						variant="ghost"
						size="sm"
						className="opacity-0 group-hover:opacity-100 transition-opacity"
					>
						Edit
					</Button>
				</div>
			</CardContent>
		</Card>
	</label>
);

const SelectedBanner = () => (
	<div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 mt-6">
		<Check className="size-5" />
		<p className="text-sm font-medium">
			Your order will be delivered to the selected address
		</p>
	</div>
);

export default function Main() {
	const categories = [
		{
			icon: Home,
			label: 'Home',
			color: 'text-blue-600',
			bgColor: 'bg-blue-100 dark:bg-blue-500/20',
			count: 2,
		},
		{
			icon: Building2,
			label: 'Office',
			color: 'text-purple-600',
			bgColor: 'bg-purple-100 dark:bg-purple-500/20',
			count: 1,
		},
		{
			icon: Briefcase,
			label: 'Work',
			color: 'text-amber-600',
			bgColor: 'bg-amber-100 dark:bg-amber-500/20',
			count: 1,
		},
		{
			icon: Gift,
			label: 'Gift',
			color: 'text-pink-600',
			bgColor: 'bg-pink-100 dark:bg-pink-500/20',
			count: 1,
		},
		{
			icon: Heart,
			label: 'Family',
			color: 'text-red-600',
			bgColor: 'bg-red-100 dark:bg-red-500/20',
			count: 1,
		},
	];

	const addresses = [
		{
			id: '1',
			name: 'John Doe - Home',
			address: '123 Main Street, Apt 4B, San Francisco, CA 94102',
			isPrimary: true,
		},
		{
			id: '2',
			name: 'John Doe - Office',
			address: '456 Market Street, Suite 100, San Francisco, CA 94103',
		},
		{
			id: '3',
			name: 'Jane Doe - Family',
			address: '789 Oak Avenue, Los Angeles, CA 90001',
		},
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<PageHeader />

				<div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-border">
					{categories.map((cat) => (
						<CategoryChip key={cat.label} {...cat} />
					))}
				</div>

				<RadioGroup defaultValue="1" className="space-y-3">
					{addresses.map((addr) => (
						<AddressRow key={addr.id} {...addr} />
					))}
				</RadioGroup>

				<Button variant="outline" className="w-full mt-4 gap-2">
					<MapPin className="size-4" />
					Add New Address
				</Button>

				<SelectedBanner />

				<div className="flex gap-3 mt-8">
					<Button variant="outline" size="lg" className="flex-1">
						Back
					</Button>
					<Button size="lg" className="flex-1">
						Continue
					</Button>
				</div>
			</div>
		</section>
	);
}
