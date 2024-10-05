import debug from 'debug';
import { useEffect, useRef } from 'react';

import { IntersectionObserverService } from '../services';

const logger = debug('useScrollObserver');
const observerService = new IntersectionObserverService();

export const useScrollObserver = (onEnterViewport?: () => void, onExitViewport?: () => void) => {
	const targetRef = useRef(null);

	useEffect(() => {
		if (targetRef.current && !observerService.isObserving) {
			observerService.startObserving(targetRef.current);
		}

		return () => {
			observerService.stopObserving();
		};
	}, []);

	useEffect(() => {
		const handleEnter = () => {
			onEnterViewport?.();
			logger('Target Element가 화면에서 노출됨');
		};

		const handleExit = () => {
			onExitViewport?.();
			logger('TargetElement가 화면에서 제외됨');
		};

		observerService
			.on(IntersectionObserverService.EVENTS.INTERSECT_EVENT, handleEnter)
			.on(IntersectionObserverService.EVENTS.LEAVE_EVENT, handleExit);

		return () => {
			observerService
				.off(IntersectionObserverService.EVENTS.INTERSECT_EVENT, handleEnter)
				.off(IntersectionObserverService.EVENTS.LEAVE_EVENT, handleExit);
		};
	}, [onEnterViewport, onExitViewport]);

	return {
		targetRef,
		stopObserving: () => observerService.stopObserving()
	};
};
