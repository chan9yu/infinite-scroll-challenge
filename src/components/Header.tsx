import { formatToUSDPrice } from '../utils';

type HeaderProps = {
	totalPrice: number;
	totalItems: number;
};

export default function Header({ totalPrice, totalItems }: HeaderProps) {
	const formattedTotalPrice = formatToUSDPrice(totalPrice);

	return (
		<header className="w-full flex flex-col bg-white shadow-md z-10 p-4">
			<h1 className="text-3xl font-bold text-gray-800 mb-4">Infinite Scroll with IntersectionObserver</h1>
			<p className="text-lg font-semibold text-gray-700">Total Price: {formattedTotalPrice}</p>
			<p className="text-sm font-medium text-gray-500">Total Items: {totalItems}</p>
		</header>
	);
}
