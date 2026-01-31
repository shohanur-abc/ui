'use client';

import { useRef, useEffect, useCallback } from 'react';

interface CanvasPlaceholderProps {
	draw: (
		ctx: CanvasRenderingContext2D,
		canvas: HTMLCanvasElement,
		time?: number,
		mouse?: { x: number; y: number },
	) => void;
	className?: string;
	width?: number;
	height?: number;
	animate?: boolean;
	onMouseMove?:
		| ((
				e: React.MouseEvent<HTMLCanvasElement>,
				pos: { x: number; y: number },
		  ) => void)
		| null;
	onClick?:
		| ((
				e: React.MouseEvent<HTMLCanvasElement>,
				pos: { x: number; y: number },
		  ) => void)
		| null;
	onMouseDown?:
		| ((
				e: React.MouseEvent<HTMLCanvasElement>,
				pos: { x: number; y: number },
		  ) => void)
		| null;
	onMouseUp?:
		| ((
				e: React.MouseEvent<HTMLCanvasElement>,
				pos: { x: number; y: number },
		  ) => void)
		| null;
	fps?: number;
	[key: string]: unknown;
}

export function AnimatedCanvas({
	draw,
	className = '',
	width = 400,
	height = 300,
	animate = false,
	onMouseMove = null,
	onClick = null,
	onMouseDown = null,
	onMouseUp = null,
	fps = 60,
	...props
}: CanvasPlaceholderProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animationFrameRef = useRef<number | null>(null);
	const mousePositionRef = useRef({ x: 0, y: 0 });

	useEffect(() => {
		if (!animate) return;

		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let lastTime = 0;
		const interval = 1000 / fps;

		const animationLoop = (currentTime: number) => {
			const deltaTime = currentTime - lastTime;
			if (deltaTime >= interval) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				if (draw) draw(ctx, canvas, currentTime, mousePositionRef.current);
				lastTime = currentTime - (deltaTime % interval);
			}
			animationFrameRef.current = requestAnimationFrame(animationLoop);
		};

		animationFrameRef.current = requestAnimationFrame(animationLoop);
		return () => {
			if (animationFrameRef.current)
				cancelAnimationFrame(animationFrameRef.current);
		};
	}, [draw, animate, fps, width, height]);

	useEffect(() => {
		if (animate) return;
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if (draw) draw(ctx, canvas);
	}, [draw, animate, width, height]);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent<HTMLCanvasElement>) => {
			const canvas = canvasRef.current;
			if (!canvas) return;
			const rect = canvas.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			mousePositionRef.current = { x, y };
			if (onMouseMove) onMouseMove(e, { x, y });
		},
		[onMouseMove],
	);

	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLCanvasElement>) => {
			const canvas = canvasRef.current;
			if (!canvas) return;
			const rect = canvas.getBoundingClientRect();
			if (onClick)
				onClick(e, { x: e.clientX - rect.left, y: e.clientY - rect.top });
		},
		[onClick],
	);

	const handleMouseDown = useCallback(
		(e: React.MouseEvent<HTMLCanvasElement>) => {
			const canvas = canvasRef.current;
			if (!canvas) return;
			const rect = canvas.getBoundingClientRect();
			if (onMouseDown)
				onMouseDown(e, { x: e.clientX - rect.left, y: e.clientY - rect.top });
		},
		[onMouseDown],
	);

	const handleMouseUp = useCallback(
		(e: React.MouseEvent<HTMLCanvasElement>) => {
			const canvas = canvasRef.current;
			if (!canvas) return;
			const rect = canvas.getBoundingClientRect();
			if (onMouseUp)
				onMouseUp(e, { x: e.clientX - rect.left, y: e.clientY - rect.top });
		},
		[onMouseUp],
	);

	return (
		<canvas
			ref={canvasRef}
			width={width}
			height={height}
			className={className}
			onMouseMove={handleMouseMove}
			onClick={handleClick}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			{...props}
		/>
	);
}
