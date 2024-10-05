import { formatToKoreanDate, formatToUSDPrice } from '../utils';

type ItemProps = {
	boughtDate: string;
	price: number;
	productName: string;
};

export default function Item({ boughtDate, price, productName }: ItemProps) {
	const formattedBoughtDate = formatToKoreanDate(boughtDate);
	const formattedPrice = formatToUSDPrice(price);

	return (
		<li className="py-6 flex flex-col justify-between items-start sm:flex-row sm:items-center">
			<div>
				<h3 className="text-lg font-semibold text-gray-800">{productName}</h3>
				<p className="text-sm text-gray-600">{formattedBoughtDate}</p>
			</div>
			<p className="text-lg font-bold text-gray-700 mt-2 sm:mt-0">{formattedPrice}</p>
		</li>
	);
}
