'use client';

import * as React from 'react';
import {
	Filter,
	SlidersHorizontal,
	X,
	Plus,
	Trash2,
	Search,
	Check,
	ChevronDown,
	Code2,
	Copy,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface FilterCondition {
	id: string;
	field: string;
	operator: string;
	value: string;
}

interface FilterGroup {
	id: string;
	connector: 'AND' | 'OR';
	conditions: FilterCondition[];
}

interface ConditionRowProps {
	condition: FilterCondition;
	fields: { value: string; label: string }[];
	operators: { value: string; label: string }[];
	onUpdate: (updates: Partial<FilterCondition>) => void;
	onRemove: () => void;
	isOnly: boolean;
}

const ConditionRow = ({
	condition,
	fields,
	operators,
	onUpdate,
	onRemove,
	isOnly,
}: ConditionRowProps) => (
	<div className="flex flex-wrap items-center gap-2">
		<Select
			value={condition.field}
			onValueChange={(v) => onUpdate({ field: v })}
		>
			<SelectTrigger className="w-40">
				<SelectValue placeholder="Select field..." />
			</SelectTrigger>
			<SelectContent>
				{fields.map((f) => (
					<SelectItem key={f.value} value={f.value}>
						{f.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>

		<Select
			value={condition.operator}
			onValueChange={(v) => onUpdate({ operator: v })}
		>
			<SelectTrigger className="w-32">
				<SelectValue placeholder="Operator..." />
			</SelectTrigger>
			<SelectContent>
				{operators.map((op) => (
					<SelectItem key={op.value} value={op.value}>
						{op.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>

		<Input
			value={condition.value}
			onChange={(e) => onUpdate({ value: e.target.value })}
			placeholder="Value..."
			className="w-40"
		/>

		<Button variant="ghost" size="icon-sm" onClick={onRemove} disabled={isOnly}>
			<Trash2 className="size-4" />
		</Button>
	</div>
);

interface FilterGroupCardProps {
	group: FilterGroup;
	groupIndex: number;
	fields: { value: string; label: string }[];
	operators: { value: string; label: string }[];
	onUpdateCondition: (
		conditionId: string,
		updates: Partial<FilterCondition>,
	) => void;
	onRemoveCondition: (conditionId: string) => void;
	onAddCondition: () => void;
	onRemoveGroup: () => void;
	onChangeConnector: (connector: 'AND' | 'OR') => void;
	isOnly: boolean;
}

const FilterGroupCard = ({
	group,
	groupIndex,
	fields,
	operators,
	onUpdateCondition,
	onRemoveCondition,
	onAddCondition,
	onRemoveGroup,
	onChangeConnector,
	isOnly,
}: FilterGroupCardProps) => (
	<div className="rounded-lg border bg-card p-4">
		<div className="mb-4 flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Badge variant="outline">Group {groupIndex + 1}</Badge>
				<Select
					value={group.connector}
					onValueChange={(v: 'AND' | 'OR') => onChangeConnector(v)}
				>
					<SelectTrigger className="h-7 w-20">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="AND">AND</SelectItem>
						<SelectItem value="OR">OR</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<Button
				variant="ghost"
				size="icon-sm"
				onClick={onRemoveGroup}
				disabled={isOnly}
			>
				<X className="size-4" />
			</Button>
		</div>

		<div className="space-y-3">
			{group.conditions.map((condition, idx) => (
				<React.Fragment key={condition.id}>
					{idx > 0 && (
						<div className="flex items-center gap-2">
							<div className="h-px flex-1 bg-border" />
							<span className="text-xs text-muted-foreground">
								{group.connector}
							</span>
							<div className="h-px flex-1 bg-border" />
						</div>
					)}
					<ConditionRow
						condition={condition}
						fields={fields}
						operators={operators}
						onUpdate={(updates) => onUpdateCondition(condition.id, updates)}
						onRemove={() => onRemoveCondition(condition.id)}
						isOnly={group.conditions.length === 1}
					/>
				</React.Fragment>
			))}
		</div>

		<Button
			variant="ghost"
			size="sm"
			onClick={onAddCondition}
			className="mt-3 gap-2"
		>
			<Plus className="size-4" />
			Add Condition
		</Button>
	</div>
);

interface QueryPreviewProps {
	groups: FilterGroup[];
}

const QueryPreview = ({ groups }: QueryPreviewProps) => {
	const generateQuery = () => {
		return groups
			.map((group, gIdx) => {
				const conditions = group.conditions
					.filter((c) => c.field && c.operator && c.value)
					.map((c) => `${c.field} ${c.operator} "${c.value}"`)
					.join(` ${group.connector} `);

				return gIdx > 0 ? `OR (${conditions})` : `(${conditions})`;
			})
			.join(' ');
	};

	const query = generateQuery();

	return (
		<div className="rounded-lg border bg-muted/30 p-4">
			<div className="mb-2 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Code2 className="size-4" />
					<span className="text-sm font-medium">Query Preview</span>
				</div>
				<Button variant="ghost" size="icon-sm">
					<Copy className="size-4" />
				</Button>
			</div>
			<pre className="overflow-x-auto whitespace-pre-wrap text-sm text-muted-foreground">
				{query || 'No conditions defined'}
			</pre>
		</div>
	);
};

export default function Main() {
	const [groups, setGroups] = React.useState<FilterGroup[]>([
		{
			id: '1',
			connector: 'AND',
			conditions: [
				{ id: '1-1', field: 'status', operator: 'equals', value: 'active' },
				{ id: '1-2', field: 'price', operator: 'greater_than', value: '50' },
			],
		},
	]);

	const fields = [
		{ value: 'name', label: 'Product Name' },
		{ value: 'sku', label: 'SKU' },
		{ value: 'price', label: 'Price' },
		{ value: 'stock', label: 'Stock' },
		{ value: 'status', label: 'Status' },
		{ value: 'category', label: 'Category' },
		{ value: 'rating', label: 'Rating' },
		{ value: 'created_at', label: 'Created Date' },
	];

	const operators = [
		{ value: 'equals', label: 'equals' },
		{ value: 'not_equals', label: 'not equals' },
		{ value: 'contains', label: 'contains' },
		{ value: 'starts_with', label: 'starts with' },
		{ value: 'ends_with', label: 'ends with' },
		{ value: 'greater_than', label: 'greater than' },
		{ value: 'less_than', label: 'less than' },
		{ value: 'is_empty', label: 'is empty' },
		{ value: 'is_not_empty', label: 'is not empty' },
	];

	const addGroup = () => {
		const newGroup: FilterGroup = {
			id: `${Date.now()}`,
			connector: 'AND',
			conditions: [
				{ id: `${Date.now()}-1`, field: '', operator: '', value: '' },
			],
		};
		setGroups((prev) => [...prev, newGroup]);
	};

	const removeGroup = (groupId: string) => {
		setGroups((prev) => prev.filter((g) => g.id !== groupId));
	};

	const addCondition = (groupId: string) => {
		setGroups((prev) =>
			prev.map((g) =>
				g.id === groupId
					? {
							...g,
							conditions: [
								...g.conditions,
								{ id: `${Date.now()}`, field: '', operator: '', value: '' },
							],
						}
					: g,
			),
		);
	};

	const removeCondition = (groupId: string, conditionId: string) => {
		setGroups((prev) =>
			prev.map((g) =>
				g.id === groupId
					? {
							...g,
							conditions: g.conditions.filter((c) => c.id !== conditionId),
						}
					: g,
			),
		);
	};

	const updateCondition = (
		groupId: string,
		conditionId: string,
		updates: Partial<FilterCondition>,
	) => {
		setGroups((prev) =>
			prev.map((g) =>
				g.id === groupId
					? {
							...g,
							conditions: g.conditions.map((c) =>
								c.id === conditionId ? { ...c, ...updates } : c,
							),
						}
					: g,
			),
		);
	};

	const updateGroupConnector = (groupId: string, connector: 'AND' | 'OR') => {
		setGroups((prev) =>
			prev.map((g) => (g.id === groupId ? { ...g, connector } : g)),
		);
	};

	const clearAll = () => {
		setGroups([
			{
				id: `${Date.now()}`,
				connector: 'AND',
				conditions: [
					{ id: `${Date.now()}-1`, field: '', operator: '', value: '' },
				],
			},
		]);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-4xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<SlidersHorizontal className="size-5" />
						<h2 className="text-xl font-semibold">Advanced Query Builder</h2>
					</div>
					<div className="flex items-center gap-2">
						<Button variant="outline" onClick={clearAll}>
							Clear All
						</Button>
						<Button className="gap-2">
							<Filter className="size-4" />
							Apply Filter
						</Button>
					</div>
				</div>

				<div className="space-y-4">
					{groups.map((group, idx) => (
						<React.Fragment key={group.id}>
							{idx > 0 && (
								<div className="flex items-center justify-center">
									<Badge variant="secondary" className="uppercase">
										OR
									</Badge>
								</div>
							)}
							<FilterGroupCard
								group={group}
								groupIndex={idx}
								fields={fields}
								operators={operators}
								onUpdateCondition={(conditionId, updates) =>
									updateCondition(group.id, conditionId, updates)
								}
								onRemoveCondition={(conditionId) =>
									removeCondition(group.id, conditionId)
								}
								onAddCondition={() => addCondition(group.id)}
								onRemoveGroup={() => removeGroup(group.id)}
								onChangeConnector={(connector) =>
									updateGroupConnector(group.id, connector)
								}
								isOnly={groups.length === 1}
							/>
						</React.Fragment>
					))}
				</div>

				<Button variant="outline" onClick={addGroup} className="w-full gap-2">
					<Plus className="size-4" />
					Add Filter Group (OR)
				</Button>

				<QueryPreview groups={groups} />
			</div>
		</section>
	);
}
