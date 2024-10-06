import { useCallback, useEffect, useState } from 'react';

import { Header, Item } from './components';
import { useScrollObserver } from './hooks';
import { MockData } from './models';
import { getMockData } from './services';

export default function App() {
	const [products, setProducts] = useState<MockData[]>([]);
	const [pageNum, setPageNum] = useState(0);
	const [loading, setLoading] = useState(false);
	const [isEnd, setIsEnd] = useState(false);

	const fetchProducts = useCallback(() => {
		if (loading || isEnd) return;
		setLoading(true);
		getMockData(pageNum)
			.then(({ datas, isEnd }) => {
				setProducts(prev => [...prev, ...datas]);
				setPageNum(prev => prev + 1);
				setIsEnd(isEnd);
			})
			.finally(() => setLoading(false));
	}, [loading, isEnd, pageNum]);

	const { targetRef, stopObserving } = useScrollObserver(fetchProducts);

	useEffect(() => {
		if (isEnd) stopObserving();
	}, [isEnd, stopObserving]);

	const totalPrice = products.reduce((acc, { price }) => acc + price, 0);

	return (
		<div className="w-full h-full flex flex-col items-center">
			<Header totalPrice={totalPrice} totalItems={products.length} />
			<div className="w-full h-full overflow-y-scroll">
				<ul className="w-11/12 mt-5 mx-auto px-6 bg-white shadow-xl divide-y divide-gray-200 border border-slate-200 rounded-lg">
					{products.map(({ boughtDate, price, productId, productName }) => (
						<Item key={productId} boughtDate={boughtDate} price={price} productName={productName} />
					))}
				</ul>
				<div ref={targetRef} className="p-4 flex justify-center">
					{loading && <p className="text-sm font-normal text-gray-500">Loading...</p>}
					{isEnd && <p className="text-sm font-normal text-gray-500">모든 데이터를 불러왔습니다.</p>}
				</div>
			</div>
		</div>
	);
}
