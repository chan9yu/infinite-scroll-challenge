import debug from 'debug';
import EventEmitter from 'eventemitter3';

const logger = debug('Intersection_Observer_Service');

enum INTERSECTION_OBSERVER_EVENTS {
	INTERSECT_EVENT = 'intersect',
	LEAVE_EVENT = 'leave'
}

export class IntersectionObserverService extends EventEmitter {
	public static readonly EVENTS = INTERSECTION_OBSERVER_EVENTS;
	private observer: IntersectionObserver | null = null;

	get isObserving() {
		return this.observer !== null;
	}

	constructor(private readonly options?: IntersectionObserverInit) {
		super();
	}

	public startObserving(target: Element) {
		if (this.observer) {
			logger('IntersectionObserver가 이미 실행 중입니다.');
			return;
		}

		logger('IntersectionObserver를 시작합니다.');

		const callback: IntersectionObserverCallback = entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					this.emit(IntersectionObserverService.EVENTS.INTERSECT_EVENT);
				} else {
					this.emit(IntersectionObserverService.EVENTS.LEAVE_EVENT);
				}
			});
		};

		const observerOptions: IntersectionObserverInit = {
			root: null,
			rootMargin: '100px',
			threshold: 0.1,
			...this.options
		};

		this.observer = new IntersectionObserver(callback, observerOptions);
		this.observer.observe(target);
	}

	public stopObserving() {
		if (this.observer) {
			this.observer.disconnect();
			this.observer = null;
			logger('IntersectionObserver를 종료합니다.');
		}
	}
}
