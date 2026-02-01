'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight, Check, Globe, Smartphone, Server, Cloud } from 'lucide-react';
import { ComponentType, useState } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Configure" />
					<Title text="Build Your Package" />
					<Description text="Select the services you need and get an instant estimate." />
				</div>

				<ServiceBuilder
					categories={[
						{
							title: 'Platform',
							description: 'Choose your primary platform',
							options: [
								{ icon: Globe, name: 'Web Application', price: 15000 },
								{ icon: Smartphone, name: 'Mobile App', price: 25000 },
								{ icon: Server, name: 'Backend Only', price: 10000 },
								{ icon: Cloud, name: 'Full Stack', price: 35000 },
							],
						},
						{
							title: 'Features',
							description: 'Add additional capabilities',
							options: [
								{ name: 'User Authentication', price: 2500 },
								{ name: 'Payment Integration', price: 3500 },
								{ name: 'Analytics Dashboard', price: 4000 },
								{ name: 'Admin Panel', price: 5000 },
								{ name: 'API Documentation', price: 1500 },
								{ name: 'Multi-language Support', price: 3000 },
							],
						},
						{
							title: 'Support',
							description: 'Choose your support level',
							options: [
								{ name: 'Basic (Email)', price: 500, period: '/month' },
								{ name: 'Standard (Email + Chat)', price: 1500, period: '/month' },
								{ name: 'Premium (24/7)', price: 3000, period: '/month' },
							],
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

interface ServiceOption {
	icon?: ComponentType<{ className?: string }>;
	name: string;
	price: number;
	period?: string;
}

interface ServiceCategory {
	title: string;
	description: string;
	options: ServiceOption[];
}

const ServiceBuilder = ({ categories }: { categories: ServiceCategory[] }) => {
	const [selections, setSelections] = useState<Record<string, string[]>>({});

	const toggleSelection = (category: string, option: string) => {
		setSelections((prev) => {
			const current = prev[category] || [];
			const isSelected = current.includes(option);

			// For Platform and Support, only allow one selection
			if (category === 'Platform' || category === 'Support') {
				return { ...prev, [category]: isSelected ? [] : [option] };
			}

			// For Features, allow multiple
			return {
				...prev,
				[category]: isSelected
					? current.filter((o) => o !== option)
					: [...current, option],
			};
		});
	};

	const calculateTotal = () => {
		let total = 0;
		categories.forEach((category) => {
			const selected = selections[category.title] || [];
			category.options.forEach((option) => {
				if (selected.includes(option.name)) {
					total += option.price;
				}
			});
		});
		return total;
	};

	return (
		<div className="grid @xl:grid-cols-3 gap-6">
			<div className="@xl:col-span-2 space-y-6">
				{categories.map((category) => (
					<Card key={category.title} className="py-0">
						<CardContent className="p-5 @md:p-6">
							<h3 className="font-bold text-lg mb-1">{category.title}</h3>
							<p className="text-sm text-muted-foreground mb-4">
								{category.description}
							</p>

							<div className="grid @sm:grid-cols-2 gap-3">
								{category.options.map((option) => {
									const Icon = option.icon;
									const isSelected = (selections[category.title] || []).includes(
										option.name
									);

									return (
										<button
											key={option.name}
											onClick={() => toggleSelection(category.title, option.name)}
											className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-colors ${
												isSelected
													? 'border-primary bg-primary/5'
													: 'border-border hover:border-primary/50'
											}`}
										>
											<div
												className={`size-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
													isSelected
														? 'border-primary bg-primary text-primary-foreground'
														: 'border-muted-foreground'
												}`}
											>
												{isSelected && <Check className="size-3" />}
											</div>
											{Icon && (
												<Icon
													className={`size-5 ${
														isSelected ? 'text-primary' : 'text-muted-foreground'
													}`}
												/>
											)}
											<div className="flex-1 min-w-0">
												<p className="text-sm font-medium truncate">{option.name}</p>
											</div>
											<span className="text-sm font-semibold">
												${option.price.toLocaleString()}
												{option.period && (
													<span className="text-xs text-muted-foreground">
														{option.period}
													</span>
												)}
											</span>
										</button>
									);
								})}
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="@xl:sticky @xl:top-8 @xl:self-start">
				<Card className="py-0 border-primary">
					<CardContent className="p-5 @md:p-6">
						<h3 className="font-bold text-lg mb-4">Your Estimate</h3>

						<div className="space-y-3 mb-6">
							{categories.map((category) => {
								const selected = selections[category.title] || [];
								if (selected.length === 0) return null;

								return selected.map((optionName) => {
									const option = category.options.find((o) => o.name === optionName);
									if (!option) return null;

									return (
										<div
											key={optionName}
											className="flex items-center justify-between text-sm"
										>
											<span className="text-muted-foreground">{option.name}</span>
											<span>${option.price.toLocaleString()}</span>
										</div>
									);
								});
							})}
						</div>

						<div className="border-t pt-4 mb-6">
							<div className="flex items-center justify-between">
								<span className="font-semibold">Estimated Total</span>
								<span className="text-2xl font-bold text-primary">
									${calculateTotal().toLocaleString()}
								</span>
							</div>
							<p className="text-xs text-muted-foreground mt-1">
								* Final pricing may vary based on requirements
							</p>
						</div>

						<Button className="w-full" asChild>
							<Link href="/contact">
								Request Proposal
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
