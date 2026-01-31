'use client';

import { Layers } from 'lucide-react';
import { TreemapChart, Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
} from '@/components/ui/chart';

type TreemapDataPoint = {
	name: string;
	size: number;
	fill: string;
};

type TreemapChartCardProps = {
	title: string;
	description: string;
	data: TreemapDataPoint[];
	config: ChartConfig;
};

const CustomizedContent = (props: {
	x?: number;
	y?: number;
	width?: number;
	height?: number;
	name?: string;
	fill?: string;
	size?: number;
}) => {
	const { x = 0, y = 0, width = 0, height = 0, name, fill, size } = props;

	if (width < 50 || height < 40) return null;

	return (
		<g>
			<rect
				x={x}
				y={y}
				width={width}
				height={height}
				fill={fill}
				stroke="var(--background)"
				strokeWidth={2}
				rx={4}
				className="transition-opacity hover:opacity-80"
			/>
			<text
				x={x + width / 2}
				y={y + height / 2 - 8}
				textAnchor="middle"
				fill="white"
				className="text-xs font-medium"
			>
				{name}
			</text>
			<text
				x={x + width / 2}
				y={y + height / 2 + 10}
				textAnchor="middle"
				fill="white"
				className="text-xs opacity-80"
			>
				${((size ?? 0) / 1000).toFixed(0)}k
			</text>
		</g>
	);
};

const TreemapChartCard = ({
	title,
	description,
	data,
	config,
}: TreemapChartCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-2">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<Layers className="size-4" />
			</div>
			<div>
				<CardTitle className="text-base font-semibold">{title}</CardTitle>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</CardHeader>
		<CardContent>
			<ChartContainer config={config} className="h-[350px] w-full">
				<ResponsiveContainer width="100%" height="100%">
					<Treemap
						data={data}
						dataKey="size"
						aspectRatio={4 / 3}
						stroke="var(--background)"
						content={<CustomizedContent />}
					>
						<Tooltip
							content={({ payload }) => {
								if (!payload?.[0]) return null;
								const data = payload[0].payload as TreemapDataPoint;
								return (
									<div className="bg-card border border-border rounded-lg p-3 shadow-lg">
										<p className="font-semibold">{data.name}</p>
										<p className="text-sm text-muted-foreground">
											${(data.size / 1000).toFixed(1)}k revenue
										</p>
									</div>
								);
							}}
						/>
					</Treemap>
				</ResponsiveContainer>
			</ChartContainer>
		</CardContent>
	</Card>
);

export default function Main() {
	const chartData: TreemapDataPoint[] = [
		{ name: 'Smartphones', size: 45000, fill: 'oklch(0.70 0.18 155)' },
		{ name: 'Laptops', size: 38000, fill: 'oklch(0.67 0.17 160)' },
		{ name: 'Tablets', size: 22000, fill: 'oklch(0.64 0.16 165)' },
		{ name: 'Headphones', size: 18000, fill: 'oklch(0.61 0.15 170)' },
		{ name: 'Smartwatches', size: 15000, fill: 'oklch(0.58 0.14 175)' },
		{ name: 'Cameras', size: 12000, fill: 'oklch(0.55 0.13 180)' },
		{ name: 'Speakers', size: 10000, fill: 'oklch(0.52 0.12 185)' },
		{ name: 'Accessories', size: 8000, fill: 'oklch(0.49 0.11 190)' },
	];

	const chartConfig: ChartConfig = {
		size: { label: 'Revenue', color: 'oklch(0.70 0.18 155)' },
	};

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<TreemapChartCard
					title="Product Revenue Treemap"
					description="Revenue distribution by product category"
					data={chartData}
					config={chartConfig}
				/>
			</div>
		</section>
	);
}
