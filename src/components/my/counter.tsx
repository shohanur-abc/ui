"use client";
import React, { useState, useEffect, useRef } from 'react';

type EasingFunction = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'bounce' | 'elastic';

interface AnimatedCounterProps {
    value: number;
    duration?: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    separator?: string;
    className?: string;
    easing?: EasingFunction;
    delay?: number;
    onComplete?: () => void;
    formatNumber?: (value: number) => string;
    style?: React.CSSProperties;
}

const easingFunctions = {
    linear: (t: number) => t,
    easeIn: (t: number) => t * t * t,
    easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
    easeInOut: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    bounce: (t: number) => {
        const n1 = 7.5625;
        const d1 = 2.75;
        if (t < 1 / d1) return n1 * t * t;
        if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
        if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
        return n1 * (t -= 2.625 / d1) * t + 0.984375;
    },
    elastic: (t: number) => {
        if (t === 0 || t === 1) return t;
        return Math.pow(2, -10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1;
    }
};

export default function AnimatedCounter({
    value, duration = 2000, decimals = 0, prefix = '', suffix = '', separator = '', className = '', easing = 'easeOut', delay = 0, onComplete, formatNumber, style
}: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const countRef = useRef(0);
    const startTimeRef = useRef<number | null>(null);
    const delayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const startValue = countRef.current;
        const endValue = value;
        startTimeRef.current = null;

        const animate = (currentTime: number) => {
            if (!startTimeRef.current) {
                startTimeRef.current = currentTime;
            }

            const elapsed = currentTime - startTimeRef.current;
            const progress = Math.min(elapsed / duration, 1);

            const easedProgress = easingFunctions[easing](progress);
            const current = startValue + (endValue - startValue) * easedProgress;

            setCount(current);
            countRef.current = current;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(endValue);
                countRef.current = endValue;
                if (onComplete) onComplete();
            }
        };

        if (delay > 0) {
            delayTimeoutRef.current = setTimeout(() => {
                requestAnimationFrame(animate);
            }, delay);
        } else {
            requestAnimationFrame(animate);
        }

        return () => {
            if (delayTimeoutRef.current) {
                clearTimeout(delayTimeoutRef.current);
            }
        };
    }, [value, duration, easing, delay, onComplete]);

    const formatValue = (val: number) => {
        if (formatNumber) return formatNumber(val);

        const fixed = val.toFixed(decimals);
        if (separator) {
            const parts = fixed.split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
            return parts.join('.');
        }
        return fixed;
    };

    return (
        <span className={className} style={style}>
            {prefix}
            {formatValue(count)}
            {suffix}
        </span>
    );
}