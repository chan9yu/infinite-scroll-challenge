export function formatToKoreanDate(boughtDate: string): string {
	const date = new Date(boughtDate);

	return date.toLocaleString('ko-KR', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: 'numeric',
		minute: '2-digit',
		second: '2-digit',
		hour12: true
	});
}

export function formatToUSDPrice(price: number): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	}).format(price);
}
