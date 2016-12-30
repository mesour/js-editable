export default class NumberHelper
{

	static isNumeric(mixed_var)
	{
		let whitespace =
			" \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
		return (typeof mixed_var === 'number' || (typeof mixed_var === 'string' && whitespace.indexOf(mixed_var.slice(-1)) === -
				1)) && mixed_var !== '' && !isNaN(mixed_var);
	}

	static numberFormat(number, decimals, dec_point, thousands_sep)
	{
		number = (number + '')
			.replace(/[^0-9+\-Ee.]/g, '');
		let n = !isFinite(+number) ? 0 : +number,
			prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
			sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
			dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
			s = '',
			toFixedFix = function(n, prec) {
				let k = Math.pow(10, prec);
				return '' + (Math.round(n * k) / k)
						.toFixed(prec);
			};
		s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
			.split('.');
		if (s[0].length > 3) {
			s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
		}
		if ((s[1] || '')
				.length < prec) {
			s[1] = s[1] || '';
			s[1] += new Array(prec - s[1].length + 1)
				.join('0');
		}
		return s.join(dec);
	}

}